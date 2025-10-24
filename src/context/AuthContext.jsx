// Manages authentication state and user info

import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, getStoredUser, confirmCodeService } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://127.0.0.1:5000/api/auth";

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
  const login = async (user_name, password) => {
    // Only triggers OTP, does not set user yet
    await loginService(user_name, password);
    localStorage.setItem("pendingUser", JSON.stringify({ user_name }));
  };

  const verifyOTP = async (user_name, code) => {
    const data = await confirmCodeService(user_name, code);

    // Save user & token in context
    setUser(data.user);
    setToken(data.access_token);

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.access_token);

    return data;
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

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };


  const value = { user, token, login, logout, verifyOTP, loading, resetPassword, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);