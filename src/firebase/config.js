import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCgh58TXggEHIUEa5KNITTlAff6x8sgN9I',
  authDomain: 'parkvault-3c379.firebaseapp.com',
  projectId: 'parkvault-3c379',
  storageBucket: 'parkvault-3c379.firebasestorage.app',
  messagingSenderId: '964846834457',
  appId: '1:964846834457:web:2998ac239a31fb155b6b88'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
