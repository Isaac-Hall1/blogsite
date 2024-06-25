import axios, { AxiosError } from "axios";
import { ACCESS_TOKEN } from "./constants";

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

export default api;
