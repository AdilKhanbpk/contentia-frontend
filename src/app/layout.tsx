"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "../i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import CustomerNavbar from "@/components/navbar/CustomerNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import Footer from "@/components/footer/Footer";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store"; // Import persistor
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { FileProvider } from "@/context/FileContext";
import { RootState } from "@/store/store"; // Import RootState for proper typing
import { SaveAccessToken } from "@/utils/checkToken";
import { initGA } from "@/utils/googleAnalytics/Analytics";
import RouteChangeTracker from "@/utils/googleAnalytics/RouteChangeTracker";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        initGA();
        console.log("Google Analytics initialized");
    }, []);

    return (
        <html lang='en'>
            <head>
                <title>Contentia</title>
                <meta
                    name='description'
                    content='Contentia'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/contentiaLogo.png'
                    sizes='32x32'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
            </head>
            <body>
                <FileProvider>
                    <Provider store={store}>
                        <PersistGate
                            loading={<LoadingSpinner />}
                            persistor={persistor}
                        >
                            <I18nextProvider i18n={i18n}>
                                <RouteChangeTracker />
                                <AuthWrapper>{children}</AuthWrapper>
                                <ToastContainer />
                            </I18nextProvider>
                        </PersistGate>
                    </Provider>
                </FileProvider>
            </body>
        </html>
    );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
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

    return (
        <>
            <SaveAccessToken />
            {!isCustomerRoute && !isAdminRoute && <Navbar />}
            {isCustomerRoute && <CustomerNavbar />}
            {isAdminRoute && <AdminNavbar />}

            <main>{children}</main>

            {!isCustomerRoute && !isAdminRoute && <Footer />}
        </>
    );
}
