// src/components/common/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optional: Add a loading spinner component here
    return <div className="p-6 text-center">Authenticating...</div>;
  }

  // 1. Not Logged In? Redirect to login, remembering intended destination
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- Onboarding / Role Checks ---

  // 2. Password Reset Required? (Highest priority)
  if (user.password_reset_required) {
    // Allow access ONLY to the change password page
    if (location.pathname === '/change-password') {
      return children; // They are on the correct page
    } else {
      // Force redirect to change password page
      return <Navigate to="/change-password" replace />;
    }
  }

  // 3. Installer Contract Not Accepted? (Second priority)
  if (user.role === "installer" && !user.contract_accepted) {
     // Allow access ONLY to the contract page
     if (location.pathname === '/installer-contract') {
       return children; // They are on the correct page
     } else {
       // Force redirect to contract page
       return <Navigate to="/installer-contract" replace />;
     }
  }

  // --- Role-Based Access Control (After onboarding checks pass) ---

  // 4. Role required, but user doesn't match?
  if (role && user.role !== role) {
    // User is logged in, has set password, signed contract (if applicable),
    // but is trying to access a page for a different role.
    // Send them to their *correct* default dashboard.
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (user.role === 'installer') {
       return <Navigate to="/installer-dashboard" replace />;
    } else { // Default to customer dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  // 5. All checks passed! User is logged in, onboarded, and has the correct role (or no role was specified).
  return children;
}