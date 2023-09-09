import axios from "axios";

const repository = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false,
});

repository.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("accessToken");

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
  },
);

export default repository;
