import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">User Dashboard Overview</h2>
      <p>Welcome to your personal dashboard. Here you can view your energy data, find installers, and manage your profile.</p>
      {/* Add more content here later */}
    </DashboardLayout>
  );
};

export default Dashboard;
