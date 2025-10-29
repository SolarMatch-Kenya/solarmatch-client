import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import { toast } from 'sonner';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { updateUser } = useAuth(); 
  const navigate = useNavigate(); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.warning("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      toast.warning("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      // The backend now returns { message: "...", user: { ... } }
      const res = await API.post('/auth/change-password', { new_password: password });
      
      toast.success(res.data.message || "Password updated!");
      
      let updatedUser;
      // Update the user in context
      if (res.data.user) {
        updateUser(res.data.user);
        updatedUser = res.data.user; // Store for navigation
      } else {
        // Fallback: manually update just the one field
        updatedUser = (prevUser) => ({ ...prevUser, password_reset_required: false });
        updateUser(updatedUser);
      }

      // --- SMART NAVIGATION ---
      setTimeout(() => {
        // Now, decides where to go next based on the *updated* user
        if (updatedUser.role === 'installer' && !updatedUser.contractAccepted) {
          // New installer flow: password done, now sign contract
          navigate("/installer-contract", { replace: true });
        
        } else if (updatedUser.role === 'installer') {
          // Returning installer (who already signed contract)
          navigate("/installer-dashboard", { replace: true });
        
        } else if (updatedUser.role === 'admin') {
          // Admin flow
          navigate("/admin-dashboard", { replace: true });
        
        } else {
          // Default/customer flow
          navigate("/dashboard", { replace: true });
        }
      }, 1500); // 2-second delay to show success message

    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to update password";
      setError(errorMsg); 
      toast.error(errorMsg); 
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Set Your New Password</h1>
        <p className="text-gray-600 mb-6">
          As a new installer, you must set a permanent password before proceeding.
        </p>
        
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Confirm New Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f79436] text-white py-2 rounded hover:bg-[#e68529]"
            >
              {isSubmitting ? "Saving..." : "Set Password & Continue"}
            </button>
          </form>
      </div>
    </div>
  );
};

export default ChangePassword;