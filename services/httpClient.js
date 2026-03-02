import axios from "axios";
import { APP_URL } from "../consts";

const httpClient = axios.create({
  baseURL: APP_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("API CALL ERROR", error);
    return Promise.reject(error);
  }
);

export default httpClient;
