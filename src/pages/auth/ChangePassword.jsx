import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { updateUser } = useAuth(); // <-- Get updateUser
  const navigate = useNavigate(); // <-- Add

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      // The backend now returns { message: "...", user: { ... } }
      const res = await API.post('/auth/change-password', { new_password: password });
      
      setSuccess(res.data.message || "Password updated!");
      
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

      // --- START SMART NAVIGATION ---
      setTimeout(() => {
        // Now, decide where to go next based on the *updated* user
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
      }, 2000); // 2-second delay to show success message
      // --- END SMART NAVIGATION ---

    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Set Your New Password</h1>
        <p className="text-gray-600 mb-6">
          As a new installer, you must set a permanent password before proceeding.
        </p>
        
        {success ? (
          <div className="text-green-600 text-center">{success}</div>
        ) : (
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
              className="w-full bg-[#f79436] text-white py-2 rounded hover:bg-[#e68529]"
            >
              Set Password & Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;