import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">User Dashboard Overview</h2>
      <h1 className="text-2xl font-bold">Welcome, {user.full_name}!</h1>
      <p>Your role: {user.role}</p>
      <p>Welcome to your personal dashboard. Here you can view your energy data, find installers, and manage your profile.</p>
      {/* Add more content here later */}
    </DashboardLayout>
  );
};

export default Dashboard;
