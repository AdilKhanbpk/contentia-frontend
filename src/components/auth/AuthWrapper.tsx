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

    useEffect(() => {
        if (!isLoading) {
            if (isAdminRoute && user?.role !== "admin") {
                toast.error("Admin access only");
                router.replace("/contentiaio/authentication");
            }
            if (isCustomerRoute && user?.role !== "user") {
                toast.error("Login is required");
                router.replace("/contentiaio/authentication");
            }
        }
    }, [user, isLoading, pathname, router]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return <>{children}</>;
};

export default AuthWrapper;
