import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { uploadProfilePicture } from '../../services/userService';

const ProfilePicture = () => {
  const { user, refreshUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first!');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('profile_picture', selectedFile);
      await uploadProfilePicture(user.id, formData);
      await refreshUser();
      toast.success('Profile picture updated successfully!');
      setSelectedFile(null);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to upload profile picture.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile Picture</h2>
      <div className="flex items-center space-x-4">
        <img
          src={user?.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e68529] file:text-white hover:file:bg-[#f79436]"
          />
          <button
            onClick={handleUpload}
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f79436] hover:bg-[#e68529] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f79436]"
            disabled={!selectedFile || loading}
          >
            {loading ? 'Uploading...' : 'Upload Picture'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;