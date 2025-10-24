// Handles login/signup/logout API requests
// src/services/authService.js
import { isTokenExpired } from "../utils/helpers";

const API_URL = "http://127.0.0.1:5000/api/auth"; // adjust to the solarmatch backend

// Login
export async function loginService(user_name, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_name, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");

  // Backend sends: "Confirmation code sent to email"
  return data;
}

export async function confirmCodeService(user_name, code) {
  const response = await fetch(`${API_URL}/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_name, code }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Invalid code");

  // Backend returns { access_token, user }
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
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
