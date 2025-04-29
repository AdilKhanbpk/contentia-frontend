import { selectToken } from "@/store/features/auth/loginSlice";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface TokenContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const tokenFromRedux = useSelector(selectToken);

    useEffect(() => {
        const tokenFromParams = new URLSearchParams(window.location.search).get(
            "accessToken"
        );
        const storedToken = localStorage.getItem("accessToken");

        // Priority: 1) URL param token 2) Redux token 3) LocalStorage token
        if (tokenFromParams) {
            setToken(tokenFromParams);
        } else if (tokenFromRedux) {
            setToken(tokenFromRedux);
        } else if (storedToken) {
            setToken(storedToken);
        }

        setLoading(false);
    }, [tokenFromRedux]); // notice we depend on tokenFromRedux here

    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token);
        } else {
            localStorage.removeItem("accessToken");
        }
    }, [token]);

    const isAuthenticated = !!token;

    return (
        <TokenContext.Provider
            value={{ token, setToken, isAuthenticated, loading }}
        >
            {children}
        </TokenContext.Provider>
    );
};

export const useTokenContext = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useTokenContext must be used within a TokenProvider");
    }
    return context;
};
