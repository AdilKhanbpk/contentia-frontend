"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { useTokenContext } from "@/context/TokenCheckingContext";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    const { user, loading: reduxLoading } = useSelector(
        (state: RootState) => state.login
    );
    const { loading: tokenLoading, isAuthenticated } = useTokenContext();

    const isCustomerRoute = pathname.startsWith("/siparis-olustur");
    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthPage = ["/giris-yap"].includes(pathname);

    // Wait for both Redux and Token context to be ready
    const isLoading = reduxLoading || tokenLoading;

    useEffect(() => {
        console.log("🔒 AuthWrapper: Auth check", {
            user,
            isAuthenticated,
            isLoading,
            pathname,
            hasCheckedAuth,
            userRole: user?.role
        });

        if (!isLoading && !hasCheckedAuth) {
            setHasCheckedAuth(true);

            if (isAdminRoute && user?.role !== "admin") {
                console.log("🔒 AuthWrapper: Non-admin user trying to access admin route", {
                    userRole: user?.role,
                    pathname
                });

                if (user?.role === "user") {
                    // User is logged in but not admin, redirect to customer area
                    router.replace("/siparis-olustur");
                    toast.error("Bu sayfa sadece yöneticiler için erişilebilir. Müşteri paneline yönlendiriliyorsunuz.");
                } else {
                    // User is not logged in at all
                    router.replace("/giris-yap");
                    toast.error("Bu sayfaya erişmek için giriş yapmanız gerekiyor.");
                }
            } else if (isCustomerRoute && !user) {
                console.log("🔒 AuthWrapper: Unauthenticated user trying to access customer route");
                router.replace("/giris-yap");
                toast.error("Bu sayfaya erişmek için giriş yapmanız gerekiyor.");
            } else if (user && isAuthPage) {
                // Always redirect to OTP verification page if user exists
                router.replace(`/verify-otp?phoneNumber=${encodeURIComponent(user.phoneNumber || "")}`);
                toast.info("Lütfen hesabınızı doğrulayın (OTP).");
            }
        }
    }, [user, isAuthenticated, isLoading, pathname, router, hasCheckedAuth, isAdminRoute, isCustomerRoute, isAuthPage]);

    // Reset hasCheckedAuth when pathname changes
    useEffect(() => {
        setHasCheckedAuth(false);
    }, [pathname]);

    if (isLoading) {
        console.log("🔒 AuthWrapper: Still loading, showing spinner");
        return <LoadingSpinner />;
    }

    return <>{children}</>;
};

export default AuthWrapper;
