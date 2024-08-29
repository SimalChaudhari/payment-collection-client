import axios from "axios";
import { API_URL } from "./env";

const axiosInstance = axios.create({
    baseURL: API_URL, // Replace with your API base URL
  });


  export default axiosInstance;