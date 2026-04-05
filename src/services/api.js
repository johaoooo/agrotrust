const API_URL = 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('access_token');

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

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: getHeaders(),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erreur serveur' }));
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
};

// API Commandes
export const commandesAPI = {
  getAll: () => request('/commandes/'),
  getById: (id) => request(`/commandes/${id}/`),
  create: (data) => request('/commandes/creer/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  confirmer: (commandeId) => request(`/commandes/${commandeId}/confirmer/`, {
    method: 'POST',
  }),
  annuler: (commandeId) => request(`/commandes/${commandeId}/annuler/`, {
    method: 'POST',
  }),
  getNotifications: () => request('/commandes/notifications/'),
  marquerNotificationLue: (notificationId) => request(`/commandes/notifications/${notificationId}/lue/`, {
    method: 'POST',
  }),
};

export default {
  auth: authAPI,
  produits: produitsAPI,
  commandes: commandesAPI,
};
