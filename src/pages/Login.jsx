// src/pages/Login.jsx
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { auth } from "../firebase";
import { signInWithCredential, GoogleAuthProvider, signOut } from "firebase/auth";

export default function Login() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      setJwt(credentialResponse.credential);

      // Link Google login with Firebase Auth
      const credential = GoogleAuthProvider.credential(credentialResponse.credential);
      await signInWithCredential(auth, credential);

      console.log("User:", decoded);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setJwt(null);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {!user ? (
        <div className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-700">Smart Healthcare</h1>
          <p className="text-gray-500 text-sm">Sign in to continue</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
            size="large"
          />
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <img
              src={user.picture}
              alt={user.name}
              className="w-20 h-20 rounded-full shadow-md"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Welcome, {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
