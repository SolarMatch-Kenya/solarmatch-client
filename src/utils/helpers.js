// General helper functions used across components

// Decode a JWT token
export function decodeToken(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid token format: expected 3 parts, got", parts.length);
      return null;
    }

    const base64Url = parts[1];
    if (!base64Url) {
      console.error("Invalid token: missing payload part");
      return null;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

// Check if token is expired
export function isTokenExpired(token) {
  if (!token) return true;
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;

  const now = Date.now() / 1000; // seconds
  return decoded.exp < now;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
