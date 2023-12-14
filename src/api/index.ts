import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'Application/json',
  },
});

export default api;
