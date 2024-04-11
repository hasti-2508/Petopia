import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.HOST}`,
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
 // const encryptedToken = localStorage.getItem("token");
    // const token = decryptToken(encryptedToken);
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
