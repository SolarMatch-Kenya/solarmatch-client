import api from './api';

export const updateUserProfile = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.post('/users/change-password', { current_password: currentPassword, new_password: newPassword });
  return response.data;
};

export const uploadProfilePicture = async (userId, formData) => {
  const response = await api.post(`/users/${userId}/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
