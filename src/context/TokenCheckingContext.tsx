import { selectToken, selectUser, restoreAuthState } from "@/store/features/auth/loginSlice";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
    const dispatch = useDispatch();

    const tokenFromRedux = useSelector(selectToken);
    const userFromRedux = useSelector(selectUser);
    const { loading: reduxLoading } = useSelector((state: RootState) => state.login);

    useEffect(() => {
        console.log("🔍 TokenProvider: Initializing token check", {
            tokenFromRedux,
            userFromRedux,
            reduxLoading,
            currentPath: typeof window !== 'undefined' ? window.location.pathname : 'N/A'
        });

        const tokenFromParams = new URLSearchParams(window.location.search).get(
            "accessToken"
        );
        const storedToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        // Priority: 1) URL param token 2) Redux token 3) LocalStorage token
        if (tokenFromParams) {
            console.log("🔍 TokenProvider: Using token from URL params");
            setToken(tokenFromParams);
        } else if (tokenFromRedux) {
            console.log("🔍 TokenProvider: Using token from Redux");
            setToken(tokenFromRedux);
        } else if (storedToken && storedUser) {
            console.log("🔍 TokenProvider: Using token from localStorage and restoring Redux state");

            try {
                const parsedUser = JSON.parse(storedUser);
                // Validate that the parsed user has required properties
                if (parsedUser && typeof parsedUser === 'object' && parsedUser.role) {
                    setToken(storedToken);

                    // Restore Redux state from localStorage if it's not already there
                    if (!tokenFromRedux && !reduxLoading) {
                        dispatch(restoreAuthState({ user: parsedUser, token: storedToken }));
                        console.log("🔍 TokenProvider: Redux state restored from localStorage");
                    }
                } else {
                    console.warn("🔍 TokenProvider: Invalid user data in localStorage");
                    localStorage.removeItem("user");
                    localStorage.removeItem("accessToken");
                    setToken(null);
                }
            } catch (error) {
                console.error("🔍 TokenProvider: Error parsing stored user data", error);
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                setToken(null);
            }
        } else {
            console.log("🔍 TokenProvider: No token found");
            setToken(null);
        }

        console.log("🔍 TokenProvider: Setting loading to false");
        setLoading(false);
    }, [tokenFromRedux, userFromRedux, reduxLoading, dispatch]);

    useEffect(() => {
        if (token) {
            console.log("🔍 TokenProvider: Saving token to localStorage");
            localStorage.setItem("accessToken", token);
        } else {
            console.log("🔍 TokenProvider: Removing token from localStorage");
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
