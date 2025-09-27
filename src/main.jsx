import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AuthProvider } from "./providers/AuthProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1078269800426-7a2u9f93lhfk5me997tm13j2fq0lnm70.apps.googleusercontent.com">
        {/* <AuthProvider> */}
          <App />
        {/* </AuthProvider> */}
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


      // <GoogleOAuthProvider clientId="1078269800426-7a2u9f93lhfk5me997tm13j2fq0lnm70.apps.googleusercontent.com">
