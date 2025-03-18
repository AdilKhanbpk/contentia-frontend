import { toast } from "react-toastify";

export const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        toast.error("No token found. Please log in again.");
        return null;
    }
    return token;
};