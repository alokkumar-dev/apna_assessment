// src/context/AuthContext.jsx
import React from 'react'
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // Optionally, handle error state or alert user
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
