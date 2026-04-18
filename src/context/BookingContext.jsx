import { createContext, useContext, useEffect, useState } from 'react';
import { getUserBookings } from '../firebase/firestore.js';
import { useAuth } from './AuthContext.jsx';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    setLoadingBookings(true);
    const unsubscribe = getUserBookings(currentUser.uid, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setBookings(items);
      setLoadingBookings(false);
    });
    return unsubscribe;
  }, [currentUser]);

  return (
    <BookingContext.Provider value={{ bookings, loadingBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
