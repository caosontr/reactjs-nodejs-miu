import axios from "axios";

const BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;


const ACCESS_TOKEN_KEY = "access-token-key";
export { ACCESS_TOKEN_KEY };
