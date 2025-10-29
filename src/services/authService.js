// Handles login/signup/logout API requests

import { isTokenExpired } from "../utils/helpers";
import API from './api'; // <-- 1. Import your axios instance

// Login
export async function loginService(user_name, password) {
  // 2. Use API.post. Note: /auth/login (no base URL)
  const response = await API.post('/auth/login', { user_name, password });

  // 3. Axios puts data in response.data
  const data = response.data;
  if (response.status !== 200) throw new Error(data.message || "Login failed");

  // Backend sends: "Confirmation code sent to email"
  return data;
}

export async function confirmCodeService(user_name, code) {
  // 4. Use API.post
  const response = await API.post('/auth/confirm', { user_name, code });

  const data = response.data;
  if (response.status !== 200) throw new Error(data.message || "Invalid code");

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
