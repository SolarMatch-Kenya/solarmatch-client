// General helper functions used across components

// Decode a JWT token
export function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
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
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;

  const now = Date.now() / 1000; // seconds
  return decoded.exp < now;
}