import axios from "axios";

export const setTokenHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export const retrieveToken = () => {
  try {
    const storedAuthData = localStorage.getItem("persist:auth");
    if (!storedAuthData) return null;

    const parsedData = JSON.parse(storedAuthData);
    const token = parsedData?.auth?.token;

    return token && token !== "null" ? token : null;
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: "https://moneyg-01-back.onrender.com/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = retrieveToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
