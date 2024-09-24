import axios from "axios";
import { API_URL } from "./env";
import { Navigate } from "react-router-dom";
import Store from "@/store";
import { logout } from "@/store/action/auth.action";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: API_URL, // Your API base URL
  // timeout: 10000, // Set timeout if needed
});

// Add a request interceptor to inject token and dynamic headers
axiosInstance.interceptors.request.use(
  (config) => {

    // You can also add more custom headers here if needed
    config.headers['Content-Type'] = 'application/json';

    // Return the modified config
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optionally add a response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response data for successful requests
  (error) => {
    // Handle errors globally (optional)
    // Example: if the token is invalid or expired, redirect to login
    if (error.response?.status === 401) {
      // Reset the Redux store
      Store.dispatch(logout()); // Reset the store by dispatching the reset action
      Navigate("/sign-in");

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
