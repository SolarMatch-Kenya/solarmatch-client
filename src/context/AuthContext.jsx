// Manages authentication state and user info

import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, getStoredUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived state for isLoggedIn
  const isLoggedIn = !!user && !!token;

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
    console.log("AuthContext: Calling logoutService.");
    logoutService();
    console.log("AuthContext: Setting user to null.");
    setUser(null);
    console.log("AuthContext: Setting token to null.");
    setToken(null);
    console.log("AuthContext: Logout complete. User and token states are null.");
  };

  async function resetPassword(email) {
    try {
      const response = await fetch("http://localhost:5000/auth/forgot-password", {
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

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };


  const value = { user, token, isLoggedIn, login, logout, loading, resetPassword, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);