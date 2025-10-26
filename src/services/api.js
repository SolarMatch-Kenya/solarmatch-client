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

export default API;