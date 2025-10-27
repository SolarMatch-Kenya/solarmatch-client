// components/common/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom"; // <-- Import useLocation
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation(); // <-- Get current location

  // Get the most up-to-date user info
  const activeUser = user || JSON.parse(localStorage.getItem("user"));

  // 1. Show loading spinner while auth state is being determined
  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  // 2. If no user, redirect to login
  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }

  // --- NEW LOGIC ORDER ---

  // 3. Priority 1: Password Reset Required
  // This applies to ALL users
  if (activeUser.password_reset_required) {
    // If they are *already* on the change-password page, let them stay
    if (location.pathname === '/change-password') {
      return children;
    }
    // Otherwise, force them there
    return <Navigate to="/change-password" replace />;
  }

  // 4. Priority 2: Contract Not Signed (Only for Installers)
  // This runs *after* the password check
  if (activeUser.role === "installer" && !activeUser.contractAccepted) {
    // If they are *already* on the contract page, let them stay
    if (location.pathname === '/installer-contract') {
      return children;
    }
    // Otherwise, force them there (e.g., if they try to access /installer-dashboard)
    return <Navigate to="/installer-contract" replace />;
  }

  // 5. Role Check (Wrong Role)
  // This runs *after* password and contract checks are complete
  if (role && activeUser.role !== role) {
    // User is trying to access a page for a different role
    // Send them to their *correct* dashboard
    if (activeUser.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    if (activeUser.role === 'installer') {
      return <Navigate to="/installer-dashboard" replace />;
    }
    // Default for 'customer'
    return <Navigate to="/dashboard" replace />;
  }

  // 6. Success: User is logged in, password is set, contract is signed (if installer), and role is correct
  return children;
}