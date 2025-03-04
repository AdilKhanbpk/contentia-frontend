"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import "../i18n";
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAdmin, isUser, isLoading } = useAuth();
    // console.log("🚀 ~ isLoading:", isLoading);
    // console.log("🚀 ~ isUser:", isUser);
    // console.log("🚀 ~ isAdmin:", isAdmin);

    const isPublicPath =
        pathname === "/" ||
        pathname.startsWith("/contentiaio/authentication") ||
        pathname.startsWith("/blog") ||
        pathname.startsWith("/contentiaio");

    const isAfterContentiaio =
        pathname === "/" ||
        pathname.startsWith("/contentiaio/") ||
        pathname.startsWith("/blog");

    const isOrdersPage =
        pathname === "/orders" || pathname.startsWith("/orders/");

    const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");

    // Redirect unauthorized users after first render
    useEffect(() => {
        if (!isLoading) {
            if (!isPublicPath && !isUser && !isAdmin) {
                router.replace("/contentiaio/authentication");
            }
            if (isAdminPage && !isAdmin) {
                router.replace("/");
            }
        }
    }, [isLoading, isUser, isAdmin, isPublicPath, isAdminPage, router]);

    // Show loading spinner during authentication check
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

                            {/* Navbar and Footer */}
                            {isAfterContentiaio && <Navbar />}
                            {isUser && isOrdersPage && <CustomerNavbar />}
                            {isAdmin && isAdminPage && <AdminNavbar />}

                            <main>{children}</main>

                            {isAfterContentiaio && <Footer />}
                            <ToastContainer />
                        </I18nextProvider>
                    </Provider>
                </FileProvider>
            </body>
        </html>
    );
}
