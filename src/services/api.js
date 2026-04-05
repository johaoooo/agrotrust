const API_URL = 'http://localhost:8000/api';

// Récupérer le token du localStorage
const getToken = () => localStorage.getItem('access_token');

// Headers par défaut
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Requête générique
const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: getHeaders(),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Une erreur est survenue');
  }
  
  return response.json();
};

// API Auth
export const authAPI = {
  register: (userData) => request('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => request('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getProfile: () => request('/auth/profile/'),
  
  updateProfile: (data) => request('/auth/profile/', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// API Produits
export const produitsAPI = {
  getAll: () => request('/produits/'),
  getById: (id) => request(`/produits/${id}/`),
  create: (data) => request('/produits/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => request(`/produits/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => request(`/produits/${id}/`, {
    method: 'DELETE',
  }),
};

export default {
  auth: authAPI,
  produits: produitsAPI,
};
