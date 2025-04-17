import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.status < 200 || res.status >= 300) {
      Promise.reject(res);
    } else if (res.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth/login";
    }
    return res;
  },
  (error) => Promise.reject(error)
);

export default http;