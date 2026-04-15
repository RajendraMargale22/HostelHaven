import axios from 'axios';

// In production (Vercel), VITE_API_URL is set in Vercel environment variables.
// In local dev, the Vite proxy forwards /api → http://localhost:5000
// so baseURL can be just '/api' locally — but the fallback covers both cases.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://hostelhaven-backend.onrender.com/api',
  withCredentials: true,
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hh_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired — clear local auth
    if (error.response?.status === 401) {
      const path = window.location.pathname;
      if (path !== '/' && path !== '/admin') {
        localStorage.removeItem('hh_token');
        localStorage.removeItem('hh_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;