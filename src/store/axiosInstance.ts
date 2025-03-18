import axios from "axios";

const url = "https://contentia-backend-s4pw.onrender.com/api/v1"
// const url = "http://localhost:8000/api/v1"


export const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

