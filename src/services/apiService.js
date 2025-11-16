import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle network errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      console.error('Network error:', error.message);
      // Return a custom error response
      return Promise.reject(new Error('Unable to connect to the server. Please make sure the backend is running.'));
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getProfile: () => api.get('/auth/profile'),
  updateBusinessType: (businessData) => api.put('/auth/business-type', businessData),
};

// Product API
export const productAPI = {
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getAnalytics: () => api.get('/products/analytics'),
};

export default api;