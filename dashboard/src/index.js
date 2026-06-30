import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Home from "./components/Home";

const ProtectedApp = () => {
  useEffect(() => {
    // URL se token check karo
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const urlEmail = params.get("email");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      localStorage.setItem("userEmail", urlEmail);
      // URL clean kar do taaki token address bar mein na dikhe
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProtectedApp />
  </React.StrictMode>
);