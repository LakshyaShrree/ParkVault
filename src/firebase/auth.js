import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './config.js';
import { createUserProfile } from './firestore.js';

export async function signup(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await createUserProfile(user.uid, {
      name,
      email,
      role: null,
      country: 'India',
      language: 'Tamil',
      createdAt: new Date().toISOString(),
      totalBookings: 0,
      totalEarnings: 0,
      rating: 0,
      photoURL: null
    });
    return user;
  } catch (error) {
    throw new Error(error.message || 'Failed to create account');
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message || 'Failed to login');
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message || 'Failed to logout');
  }
}
