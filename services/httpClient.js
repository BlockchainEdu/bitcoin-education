import axios from "axios";
import { API_KEY, APP_URL } from "../consts";

const httpClient = axios.create({
  baseURL: APP_URL
});

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `${API_KEY}`;
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn("API CALL ERROR",error);
    return Promise.reject(error);
  }
);

export default httpClient;
