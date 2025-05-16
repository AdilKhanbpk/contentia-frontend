import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

// This should be the backend API URL
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Fallback to localhost if not defined (for development)
const apiBaseURL = baseURL || "http://localhost:8000";

// Only log in development
if (process.env.NODE_ENV !== 'production') {
    console.log("Environment NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
    console.log("Actual baseURL being used:", apiBaseURL);
    console.log("Build timestamp:", process.env.NEXT_PUBLIC_BUILD_TIMESTAMP || "Not set");
}

// Track if we're currently refreshing the token
let isRefreshing = false;
// Store pending requests that should be retried after token refresh
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export const axiosInstance = axios.create({
    baseURL: apiBaseURL,
    headers: {
        "Content-Type": "application/json",
    },
    // Increase timeout for slower production servers
    timeout: 15000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Only log in development
        if (process.env.NODE_ENV !== 'production') {
            console.log("API Request URL:", (config.baseURL || '') + (config.url || ''));
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // If we can't access the config or it's already been retried, reject
        if (!originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        // Handle 401 Unauthorized errors (expired token)
        if (error.response?.status === 401 && !originalRequest._retry) {
            // If we're not already refreshing
            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    // Try to refresh the token
                    const refreshToken = localStorage.getItem("refreshToken");

                    if (!refreshToken) {
                        // No refresh token, redirect to login
                        localStorage.clear();
                        window.location.href = "/login";
                        return Promise.reject(error);
                    }

                    // Call your refresh token endpoint
                    const response = await axios.post(
                        `${apiBaseURL}/api/v1/auth/refresh-token`,
                        { refreshToken },
                        { headers: { "Content-Type": "application/json" } }
                    );

                    if (response.data.accessToken) {
                        // Store the new tokens
                        localStorage.setItem("accessToken", response.data.accessToken);
                        if (response.data.refreshToken) {
                            localStorage.setItem("refreshToken", response.data.refreshToken);
                        }

                        // Update the authorization header
                        axiosInstance.defaults.headers.common["Authorization"] =
                            `Bearer ${response.data.accessToken}`;

                        // Process the queue with the new token
                        processQueue(null, response.data.accessToken);

                        // Retry the original request with the new token
                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${response.data.accessToken}`
                        };

                        return axiosInstance(originalRequest);
                    } else {
                        // No new token received
                        processQueue(error, null);
                        localStorage.clear();
                        window.location.href = "/login";
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    // Token refresh failed
                    processQueue(refreshError, null);
                    localStorage.clear();
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                // If we're already refreshing, add this request to the queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${token}`
                    };
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }
        }

        // Handle other common errors
        if (error.response?.status === 404) {
            // Resource not found - could be missing data
            console.error("Resource not found:", error.config?.url);
        } else if (error.response?.status === 500) {
            // Server error
            console.error("Server error:", error);
            toast.error("An unexpected server error occurred. Please try again later.");
        }

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

