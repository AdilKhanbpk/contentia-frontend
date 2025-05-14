import axios from "axios";

// This should be the backend API URL
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Enhanced debugging
console.log("Environment NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
console.log("Actual baseURL being used:", baseURL);
console.log("Build timestamp:", process.env.NEXT_PUBLIC_BUILD_TIMESTAMP || "Not set");

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

// Add functions to handle form data (instead of extending the axios instance)
export const patchForm = async (url: string, data: FormData) => {
    return axiosInstance.patch(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const postForm = async (url: string, data: FormData) => {
    return axiosInstance.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

