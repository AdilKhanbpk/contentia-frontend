import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const SaveAccessToken = () => {
    const token = useSelector((state: RootState) => state.login.token);

    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token);
        }
    }, [token]);

    return null;
};

export const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("No token found. Please log in again.");
        return null;
    }

    return token;
};

