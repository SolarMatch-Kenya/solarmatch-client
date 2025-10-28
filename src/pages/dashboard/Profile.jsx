import React from 'react';
import UserProfileForm from '../../components/forms/UserProfileForm';
import ChangePasswordForm from '../../components/forms/ChangePasswordForm';
import ProfilePicture from '../../components/ui/ProfilePicture';

const Profile = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile Settings</h1>
      <div className="space-y-8">
        <ProfilePicture />
        <UserProfileForm />
        <ChangePasswordForm />
      </div>
      <p className="text-gray-600 mt-8 text-sm">
        Manage your personal information and settings here. Your data privacy is important to us.
      </p>
    </div>
  );
};

export default Profile;