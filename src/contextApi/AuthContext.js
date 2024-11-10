import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(); // Default is false

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    // Check if token exists in localStorage
    if (localStorage.getItem("token")) {
      login(); // Log the user in if the token exists
    } else {
      logout(); // Ensure the user is logged out if no token
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
