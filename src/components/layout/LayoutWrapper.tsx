"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import CustomerNavbar from "@/components/navbar/CustomerNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import Footer from "@/components/footer/Footer";
import { useTokenContext } from "@/context/TokenCheckingContext";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const { token, loading } = useTokenContext();

    const isRootRoute = pathname === "/";
    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthRoute = pathname.startsWith("/verify-otp") || pathname === "/signup" || pathname === "/login";

    if (loading) {
        console.log("🎯 LayoutWrapper: Still loading, showing LoadingSpinner");
        return <LoadingSpinner />;
    }

    // For auth routes, render without navbar and footer
    if (isAuthRoute) {
        return <>{children}</>;
    }

    return (
        <>
            {/* Show Navbar for non-authenticated users */}
            {!token && <Navbar />}

            {/* Show CustomerNavbar for authenticated users on any non-admin route */}
            {token && !isAdminRoute && <CustomerNavbar />}

            {/* Show AdminNavbar for admin routes */}
            {isAdminRoute && <AdminNavbar />}

            <main>{children}</main>

            {!isAdminRoute && <Footer />}
        </>
    );
};

export default LayoutWrapper;
