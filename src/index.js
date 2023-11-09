import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import GitHubLogin from "react-github-login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="703684881995-4e6k4frkpts7cie8csh3mau17e2v1no9.apps.googleusercontent.com">
    {/* <GitHubLogin clientId> */}
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
    {/* </GitHubLogin> */}
  </GoogleOAuthProvider>
);
