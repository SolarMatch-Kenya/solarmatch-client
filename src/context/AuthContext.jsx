// Manages authentication state and user info

import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, getStoredUser, registerService } from "../services/authService";

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
  const login = async (username, password) => {
    const { user: loggedInUser, token: accessToken } = await loginService(username, password);
    setUser(loggedInUser);
    setToken(accessToken);
    return { user: loggedInUser, token: accessToken };
  };

  // Register (using service)
  const register = async (full_name, email, password, phone_number) => {
    const { user: registeredUser, token: accessToken } = await registerService(full_name, email, password, phone_number);
    setUser(registeredUser);
    setToken(accessToken);
    return { user: registeredUser, token: accessToken };
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
      const response = await fetch("http://127.0.0.1:5000/api/auth/forgot-password", {
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


  const value = { user, token, login, register, logout, loading, resetPassword, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);