import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/check", {
        withCredentials: true,
      });
      setIsAuthenticated(response.data.isAuthenticated);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData,
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
      checkAuth(); // Verificar autenticación después de iniciar sesión
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setUser(null);
      checkAuth(); // Verificar autenticación después de cerrar sesión
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
