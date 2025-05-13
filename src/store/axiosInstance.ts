import axios, { AxiosInstance } from "axios";

// This should be http://localhost:8000/api/v1
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// For debugging
console.log("API Base URL:", baseURL);

export const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log the full URL for debugging
        console.log("API Request URL:", (config.baseURL || '') + (config.url || ''));

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a function to handle form data (instead of extending the axios instance)
export const patchForm = async (url: string, data: FormData) => {
    return axiosInstance.patch(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

