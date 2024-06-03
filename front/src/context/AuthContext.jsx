import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/check",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(response.data.isAuthenticated);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };

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
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
