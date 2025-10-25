// Handles login/signup/logout API requests
// src/services/authService.js
import { isTokenExpired } from "../utils/helpers";

const API_URL = "http://127.0.0.1:5000/api/auth"; // adjust to the solarmatch backend

// Login
export async function loginService(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");

  // Backend returns { access_token, user }
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

// Register
export async function registerService(full_name, email, password, phone_number) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name, email, password, phone_number }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed");

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