import axios from "axios";

const API = axios.create({
  baseURL: "https://jobport-backend-eyz6.onrender.com/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;