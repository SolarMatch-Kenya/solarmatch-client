import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth(); // Get the real user

  // Initialize state with data from AuthContext
  const [userInfo, setUserInfo] = useState({
    name: user.full_name || 'Jelani Okoro',
    email: user.email || 'jelani.okoro@email.com',
    location: user.county || 'Nairobi, Kenya',
    phone: user.phone_number || '+254 712 345678',
  });

  const [notifications, setNotifications] = useState({
    analyses: true,
    security: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update profile would go here
    console.log('Profile updated:', userInfo);
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button className="bg-[#f79436] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#e68529]">
          Edit Profile
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex items-center space-x-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
        {/* Placeholder for Avatar */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
          {userInfo.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{userInfo.name}</h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Forms) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text" id="name" name="name"
                  value={userInfo.name} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={userInfo.email} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text" id="phone" name="phone"
                  value={userInfo.phone} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                <input
                  type="text" id="location" name="location"
                  value={userInfo.location} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button type="submit" className="bg-[#f79436] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#e68529]">
                Save Changes
              </button>
            </div>
          </form>

          {/* Account Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Account Settings & Preferences</h2>
            {/* Change Password */}
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-700">Change Password</h3>
                <p className="text-sm text-gray-500">Update your account password.</p>
              </div>
              <button className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200">
                Change
              </button>
            </div>
            {/* Notification Preferences */}
            <div className="py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">Notification Preferences</h3>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="analyses" className="text-gray-600">Email updates on new analyses</label>
                <input type="checkbox" id="analyses" name="analyses" checked={notifications.analyses} onChange={handleToggle} className="toggle-switch" />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="security" className="text-gray-600">System alerts and security notices</label>
                <input type="checkbox" id="security" name="security" checked={notifications.security} onChange={handleToggle} className="toggle-switch" />
              </div>
            </div>
            {/* Delete Account */}
            <div className="flex justify-between items-center py-3 mt-2">
              <div>
                <h3 className="font-semibold text-red-600">Delete Account</h3>
                <p className="text-sm text-gray-500">Permanently delete your account and all data.</p>
              </div>
              <button className="bg-red-50 border border-red-200 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-100">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Leaderboard) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Eco-Homes Leaderboard</h2>
          <p className="text-gray-500 text-center">Your Rank</p>
          <p className="text-5xl font-bold text-[#f79436] text-center my-2">#1,234</p>
          <p className="text-gray-500 text-center text-sm mb-4">out of 5,000 users</p>
          
          <div className="space-y-1">
             <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Total CO₂ Saved</span>
                <span>1,520 kg</span>
             </div>
             {/* Progress Bar */}
             <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
             </div>
             <p className="text-right text-xs text-gray-500">480kg to next level</p>
          </div>
          
          <button className="w-full bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-200 mt-6">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;