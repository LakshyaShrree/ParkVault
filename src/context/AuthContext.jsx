import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRoleState] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* =========================
     SIGNUP
  ========================= */
  const signup = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  };

  /* =========================
     LOGIN
  ========================= */
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = async () => {
    await signOut(auth);
    setUserRoleState(null);
  };

  /* =========================
     SET ROLE (🔥 IMPORTANT)
  ========================= */
  const setUserRole = async (role) => {
    if (!currentUser) return;

    await setDoc(
      doc(db, "users", currentUser.uid),
      {
        role: role
      },
      { merge: true }
    );

    setUserRoleState(role);
  };

  /* =========================
     FETCH USER ROLE
  ========================= */
  const fetchUserRole = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setUserRoleState(snap.data().role);
      } else {
        setUserRoleState(null);
      }
    } catch (err) {
      console.error("Role fetch error:", err);
    }
  };

  /* =========================
     AUTH LISTENER
  ========================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await fetchUserRole(user.uid);
      } else {
        setUserRoleState(null);
      }

      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  /* =========================
     CONTEXT VALUE
  ========================= */
  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    setUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}