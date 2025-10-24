// Route wrapper that checks authentication before rendering

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth(); // assuming `user` is stored in context after login

  // Not logged in? Redirect to login
  if (!user) {
    return <Navigate to={`/login/${role}`} replace />;
  }

  // Role mismatch? (for extra security)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // if installer contract isn't signed
  if (!user.contractAccepted) {
    return <Navigate to="/installer-contract" replace />;
  }

  // Otherwise show the protected content
  return children;
}
