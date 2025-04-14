import React, { createContext, useState, useContext, useEffect } from "react";

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

    // Load token on first render
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
            console.log(
                "[TokenProvider] Loaded token from localStorage:",
                storedToken
            );
        } else {
            console.log("[TokenProvider] No token found in localStorage");
        }
        setLoading(false);
    }, []);

    // Sync token to localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token);
            console.log("[TokenProvider] Token set in localStorage:", token);
        } else {
            localStorage.removeItem("accessToken");
            console.log("[TokenProvider] Token removed from localStorage");
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
