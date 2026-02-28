import axios from "axios";

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("namo_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;