"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import CustomerNavbar from "@/components/navbar/CustomerNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import Footer from "@/components/footer/Footer";
import store from "@/store/store";
import { Provider } from "react-redux";
import InitializeSocket from "@/socket/InitializeSocket";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { FileProvider } from "@/context/FileContext";
import { initGA, logPageView } from "@/utils/googleAnalytics/Analytics";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading } = useAuth();

    const isCustomerRoute = pathname.startsWith("/orders");
    const isAdminRoute = pathname.startsWith("/admin");

    useEffect(() => {
        if (!isLoading) {
            if (isAdminRoute && user?.role !== "admin") {
                router.replace("/contentiaio/authentication");
            }
            if (isCustomerRoute && user?.role !== "user") {
                router.replace("/contentiaio/authentication");
            }

            if (pathname === "/") {
                if (user?.role === "admin") {
                    router.replace("/admin");
                } else if (user?.role === "user") {
                    router.replace("/orders");
                }
            }
        }
    }, [user, isLoading, pathname, router]);

    if (isLoading) {
        return (
            <html lang='en'>
                <body>
                    <LoadingSpinner />
                </body>
            </html>
        );
    }

    return (
        <html lang='en'>
            <body>
                <FileProvider>
                    <Provider store={store}>
                        <I18nextProvider i18n={i18n}>
                            <InitializeSocket />

                            {/* Navbar for different routes */}
                            {!isCustomerRoute && !isAdminRoute && <Navbar />}
                            {isCustomerRoute && <CustomerNavbar />}
                            {isAdminRoute && <AdminNavbar />}

                            <main>{children}</main>

                            {/* Footer for public pages */}
                            {!isCustomerRoute && !isAdminRoute && <Footer />}
                            <ToastContainer />
                        </I18nextProvider>
                    </Provider>
                </FileProvider>
            </body>
        </html>
    );
}
