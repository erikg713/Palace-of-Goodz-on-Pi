import axios from 'axios';

/**
 * Palace of Goodz - API Service
 * Using Axios to communicate with the backend at 50.87.138.35
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// --- Request Interceptor ---
// Automatically attaches the JWT to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor ---
// Handles 401 (Expired token) and 500 (Server error) globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized, you might trigger a token refresh or redirect to login
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn("Session expired. Redirecting to login...");
      // Logic: localStorage.removeItem('access_token'); window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// --- API Modules ---
export const productApi = {
  fetchInventory: () => api.get('/products'),
  fetchById: (id) => api.get(`/products/${id}`),
  addGood: (productData) => api.post('/products', productData),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export default api;
