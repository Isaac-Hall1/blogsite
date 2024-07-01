import axios, { AxiosError } from "axios";
import { ACCESS_TOKEN } from "./constants";
import refreshAccessToken from "./components/RefreshToken";

const baseURL: string = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: baseURL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default api;
