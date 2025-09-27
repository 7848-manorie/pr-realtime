import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBFHKHsho4b7KRnXlEbCAitX4pW32ZzYQk",
  authDomain: "shms-bf1e9.firebaseapp.com",
  databaseURL: "https://shms-bf1e9-default-rtdb.firebaseio.com", // ✅ THIS IS REQUIRED
  projectId: "shms-bf1e9",
  storageBucket: "shms-bf1e9.appspot.com",
  messagingSenderId: "1078269800426",
  appId: "1:1078269800426:web:12f587252b8ad5df39cc93",
  measurementId: "G-HH8GVTLFP1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
