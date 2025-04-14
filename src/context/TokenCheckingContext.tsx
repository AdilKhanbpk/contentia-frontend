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

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false); // Mark token check complete
    }, []);

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
