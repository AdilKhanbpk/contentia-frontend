"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();

    const { user, loading: isLoading } = useSelector(
        (state: RootState) => state.login
    );

    const isCustomerRoute = pathname.startsWith("/orders");
    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthPage = ["/contentiaio/authentication"].includes(pathname);

    useEffect(() => {
        if (!isLoading) {
            if (isAdminRoute && user?.role !== "admin") {
                router.replace("/");
                toast.error("Admin access only");
            }
            if (isCustomerRoute && user?.role !== "user") {
                router.replace("/contentiaio/authentication");
                toast.error("Login is required");
            }
            if (user && isAuthPage) {
                router.replace("/");
                toast.info("You are already logged in");
            }
        }
    }, [user, isLoading, pathname, router]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return <>{children}</>;
};

export default AuthWrapper;
