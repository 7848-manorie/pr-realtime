import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider, db } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const signup = async (email, password, role) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), { email, role });
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const googleLogin = async () => {
    const res = await signInWithPopup(auth, provider);
    const docSnap = await getDoc(doc(db, "users", res.user.uid));
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", res.user.uid), {
        email: res.user.email,
        role: "patient",
      });
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      setUser(currUser);
      if (currUser) {
        const docSnap = await getDoc(doc(db, "users", currUser.uid));
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, signup, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
