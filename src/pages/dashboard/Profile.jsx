import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Profile = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
      <p className="mt-2 text-lg text-gray-600">View and edit your profile information.</p>
      {/* Placeholder for profile form */}
    </DashboardLayout>
  );
};

export default Profile;