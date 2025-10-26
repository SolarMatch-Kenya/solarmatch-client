// Route wrapper that checks authentication before rendering

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth(); // assuming `user` is stored in context after login

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user && !storedUser) return <Navigate to="/login" />;

  // Not logged in? Redirect to login
  if (!user) {
    return <Navigate to={`/login/${role}`} replace />;
  }

  if (role && user.role !== role) {
    // User is logged in, but wrong role. Send them to their default dashboard.
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    // Default for all other roles
    return <Navigate to="/dashboard" replace />;
  }

  // if installer contract isn't signed
  // if an INSTALLER'S contract isn't signed
  if (user.role === "installer" && !user.contractAccepted) {
    return <Navigate to="/installer-contract" replace />;
  }

  // Otherwise show the protected content
  return children;
}
