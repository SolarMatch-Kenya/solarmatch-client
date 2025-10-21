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

  async function resetPassword(email) {
  try {
    // This depends on how your backend is set up.
    // Example if you have an API endpoint for this:
    const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send reset email");
    }

    console.log("Password reset link sent to:", email);
    return true;
  } catch (err) {
    console.error("Error in resetPassword:", err);
    throw err;
  }
}


  const value = { user, token, login, logout, loading, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);