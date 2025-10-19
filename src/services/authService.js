// Handles login/signup/logout API requests
// src/services/authService.js
import { isTokenExpired } from "../utils/helpers";

const API_URL = "https://api.solarmatch.com/auth"; // adjust to the solarmatch backend

// Login
export async function loginService(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();

  // Example expected response: { user, token }
  const { user, token } = data;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  return { user, token };
}

// Logout
export function logoutService() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

// Restore saved user/token if valid
export function getStoredUser() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (token && !isTokenExpired(token)) {
    return { user: savedUser, token };
  }

  logoutService();
  return { user: null, token: null };
}
