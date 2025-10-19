import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Welcome to the admin dashboard. Manage users, installers, and website content.</p>
      {/* Add more content here later */}
    </DashboardLayout>
  );
};

export default AdminDashboard;
