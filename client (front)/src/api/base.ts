import axios from 'axios';

export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
