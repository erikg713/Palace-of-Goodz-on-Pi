import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * Palace of Goodz - API Service
 * Centralized Axios instance for communicating with the Unified Layer backend.
 */

// 1. Create the base instance using environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10-second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor (Use this for adding Auth tokens/Headers)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Use this for global error handling)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Logic for unauthorized access (e.g., redirect to login)
      console.error('Unauthorized! Redirecting...');
    }
    return Promise.reject(error);
  }
);

// 4. API Endpoints
export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
};

export const authApi = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export default api;
