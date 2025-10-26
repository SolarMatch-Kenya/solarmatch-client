import React from 'react';
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Dashboard Overview</h2>
      <h1 className="text-2xl font-bold">Welcome, {user.full_name}!</h1>
      <p>Your role: {user.role}</p>
      <p>Welcome to your personal dashboard. Here you can view your energy data, find installers, and manage your profile.</p>
      {/* Add more content here later */}
    </div>
  );
};

export default Dashboard;
