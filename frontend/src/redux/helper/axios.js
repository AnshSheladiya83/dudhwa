import axios from "axios";
import toast from "react-hot-toast";

export const baseURL = import.meta.env.VITE_APP_API_URL;

const Axios = axios.create({
  baseURL,
});

// ✅ Request interceptor → attach token
Axios.interceptors.request.use(
  (config) => {
    try {
      const persistData = localStorage.getItem("persist:admin");
      const parsed = persistData ? JSON.parse(persistData) : null;
      // 🔑 adjust based on your authSlice state shape
      const userToken = parsed?.auth
        ? JSON.parse(parsed.auth)?.token
        : null;

      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    } catch (err) {
      console.error("Token parse error:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor → handle 401
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "";

    if (
      status === 401 &&
      (message.toLowerCase().includes("token") ||
        message.toLowerCase().includes("unauthorized"))
    ) {
      localStorage.clear();
      window.location.href = "/login"; // redirect to login
    }

    return Promise.reject(error);
  }
);

export default Axios;
