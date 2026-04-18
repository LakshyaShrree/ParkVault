import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './config.js';

const usersCollection = collection(db, 'users');
const spacesCollection = collection(db, 'spaces');
const bookingsCollection = collection(db, 'bookings');

export async function createUserProfile(uid, data) {
  try {
    await setDoc(doc(usersCollection, uid), data);
  } catch (error) {
    throw new Error(error.message || 'Failed to create user profile');
  }
}

export async function getUserProfile(uid) {
  try {
    const docRef = doc(usersCollection, uid);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user profile');
  }
}

export async function updateUserProfile(uid, data) {
  try {
    const docRef = doc(usersCollection, uid);
    await updateDoc(docRef, data);
  } catch (error) {
    throw new Error(error.message || 'Failed to update user profile');
  }
}

export async function addSpace(spaceData) {
  try {
    const docRef = await addDoc(spacesCollection, {
      ...spaceData,
      availableSlots: spaceData.slots,
      totalBookings: 0,
      createdAt: serverTimestamp(),
      isActive: true
    });
    return docRef.id;
  } catch (error) {
    throw new Error(error.message || 'Failed to add parking space');
  }
}

export async function getSpaces(filters = {}) {
  try {
    const queries = [orderBy('createdAt', 'desc')];
    if (filters.tier) {
      queries.push(where('tier', '==', filters.tier));
    }
    if (filters.vehicleType) {
      queries.push(where('vehicleTypes', 'array-contains', filters.vehicleType));
    }
    if (filters.maxPrice) {
      queries.push(where('pricePerHour', '<=', filters.maxPrice));
    }
    const q = query(spacesCollection, ...queries);
    const snapshot = await getDocs(q);
    const results = [];
    snapshot.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() });
    });
    return results;
  } catch (error) {
    throw new Error(error.message || 'Failed to load spaces');
  }
}

export async function getSpaceById(spaceId) {
  try {
    const snapshot = await getDoc(doc(spacesCollection, spaceId));
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    throw new Error(error.message || 'Failed to load space details');
  }
}

export async function getUserSpaces(userId) {
  try {
    const q = query(spacesCollection, where('ownerId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const results = [];
    snapshot.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() });
    });
    return results;
  } catch (error) {
    throw new Error(error.message || 'Failed to load your spaces');
  }
}

export async function addBooking(bookingData) {
  try {
    const batch = writeBatch(db);
    const spaceRef = doc(spacesCollection, bookingData.spaceId);
    const bookingRef = doc(bookingsCollection);
    const spaceSnapshot = await getDoc(spaceRef);
    if (!spaceSnapshot.exists()) {
      throw new Error('Space does not exist');
    }
    const space = spaceSnapshot.data();
    if (space.availableSlots <= 0) {
      throw new Error('No available slots');
    }
    batch.update(spaceRef, { availableSlots: space.availableSlots - 1 });
    batch.set(bookingRef, {
      ...bookingData,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: serverTimestamp()
    });
    await batch.commit();
    return bookingRef.id;
  } catch (error) {
    throw new Error(error.message || 'Failed to create booking');
  }
}

export function getUserBookings(userId, callback) {
  try {
    const q = query(bookingsCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    return onSnapshot(q, callback, (error) => {
      console.error(error);
    });
  } catch (error) {
    throw new Error(error.message || 'Failed to listen for bookings');
  }
}

export async function getSpaceBookings(spaceId) {
  try {
    const q = query(bookingsCollection, where('spaceId', '==', spaceId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const results = [];
    snapshot.forEach((docSnap) => results.push({ id: docSnap.id, ...docSnap.data() }));
    return results;
  } catch (error) {
    throw new Error(error.message || 'Failed to load space bookings');
  }
}

export async function cancelBooking(bookingId, spaceId) {
  try {
    const batch = writeBatch(db);
    const bookingRef = doc(bookingsCollection, bookingId);
    const spaceRef = doc(spacesCollection, spaceId);
    const spaceSnapshot = await getDoc(spaceRef);
    if (!spaceSnapshot.exists()) {
      throw new Error('Space not found');
    }
    batch.update(bookingRef, { status: 'cancelled' });
    batch.update(spaceRef, { availableSlots: spaceSnapshot.data().availableSlots + 1 });
    await batch.commit();
  } catch (error) {
    throw new Error(error.message || 'Failed to cancel booking');
  }
}

export async function updateSpaceRating(spaceId, newRating) {
  try {
    const docRef = doc(spacesCollection, spaceId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error('Space not found');
    }
    const space = snapshot.data();
    const currentCount = space.totalBookings || 0;
    const currentRating = space.rating || 0;
    const total = currentRating * currentCount + newRating;
    const updatedCount = currentCount + 1;
    const average = parseFloat((total / updatedCount).toFixed(1));
    await updateDoc(docRef, { rating: average, totalBookings: updatedCount });
  } catch (error) {
    throw new Error(error.message || 'Failed to update rating');
  }
}
