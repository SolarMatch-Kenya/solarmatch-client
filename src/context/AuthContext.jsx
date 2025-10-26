// Manages authentication state and user info

import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, getStoredUser, confirmCodeService } from "../services/authService";
import API from '../services/api';

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
      // 2. Use API.post
      const response = await API.post("/auth/forgot-password", { email });

      if (response.status !== 200) {
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