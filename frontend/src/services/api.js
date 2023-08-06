// services/api.js
import axios from 'axios';

const PORT = process.env.BACKEND_API_PORT || 2000
const baseURL = `http://localhost:${PORT}/`; // Replace with actual backend URL

const api = axios.create({
  baseURL,
});

export default api;
