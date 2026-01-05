import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// 🔐 Interceptor de request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('lasiesta:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
