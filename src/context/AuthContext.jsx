// Manages authentication state and user info

import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, getStoredUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user & token on app load
  useEffect(() => {
    const { user, token } = getStoredUser();
    if (user && token) {
      setUser(user);
      setToken(token);
    }
    setLoading(false);
  }, []);

  // Login (using service)
  const login = async (email, password) => {
    const { user, token } = await loginService(email, password);
    setUser(user);
    setToken(token);
  };

  // Logout (using service)
  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);