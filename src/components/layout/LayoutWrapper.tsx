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
    const { loading } = useTokenContext();

    const isCustomerRoute = pathname.startsWith("/orders");
    const isAdminRoute = pathname.startsWith("/admin");

    if (loading) return <LoadingSpinner />;

    return (
        <>
            {!isCustomerRoute && !isAdminRoute && <Navbar />}
            {isCustomerRoute && <CustomerNavbar />}
            {isAdminRoute && <AdminNavbar />}

            <main>{children}</main>

            {!isCustomerRoute && !isAdminRoute && <Footer />}
        </>
    );
};

export default LayoutWrapper;
