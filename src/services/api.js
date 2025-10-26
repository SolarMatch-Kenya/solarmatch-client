// Base Axios instance with interceptors and config

import axios from 'axios';

// Create an instance of axios
const API = axios.create({
  baseURL: 'http://127.0.0.1:5000/api' // Your backend API URL
});

// Add an interceptor to include the auth token in all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Check if it's a 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      // Clear token and user from storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page
      // We use window.location to force a full refresh, clearing all state
      window.location.href = '/login?session=expired';
    }
    return Promise.reject(error);
  }
);

export default API;