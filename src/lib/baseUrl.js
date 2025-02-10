import axios from "axios";

const API_URL = "http://38.242.131.177:4000/api/v1";

const baseURL = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Request timeout in milliseconds
});

baseURL.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseURL.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token is invalid or expired. Please login again.");
      localStorage.removeItem("jwt-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default baseURL;
