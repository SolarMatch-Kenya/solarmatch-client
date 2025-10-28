// Handles login/signup/logout API requests
// src/services/authService.js
import { isTokenExpired } from "../utils/helpers";

const API_URL = "http://localhost:5000/auth"; // Updated to match backend

// Login
export async function loginService(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();

  // Example expected response: { access_token, user }
  const { access_token, user } = data;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", access_token);

  return { user, token: access_token };
}

// Logout
export function logoutService() {
  console.log("logoutService: Removing user from localStorage.");
  localStorage.removeItem("user");
  console.log("logoutService: Removing token from localStorage.");
  localStorage.removeItem("token");
  console.log("logoutService: localStorage cleared.");
}

// Restore saved user/token if valid
export function getStoredUser() {
  try {
    const savedUserStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      return { user: null, token: null };
    }

    const savedUser = savedUserStr ? JSON.parse(savedUserStr) : null;

    if (!isTokenExpired(token)) {
      return { user: savedUser, token };
    }

    logoutService();
    return { user: null, token: null };
  } catch (error) {
    console.error("Error getting stored user:", error);
    logoutService();
    return { user: null, token: null };
  }
}
