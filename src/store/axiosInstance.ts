import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAuthConfig = (accessToken: string, contentType = "application/json") => {
    const config: any = {
        headers: {
            "Content-Type": contentType,
        },
    };
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}
