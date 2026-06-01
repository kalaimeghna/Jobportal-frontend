import axios from "axios";

const API = axios.create({
  baseURL: "https://jobport-backend-eyz6.onrender.com/api",
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // safer defaults for all requests
    config.headers.Accept = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 AUTO LOGOUT ON 401 (VERY IMPORTANT)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // optional redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;