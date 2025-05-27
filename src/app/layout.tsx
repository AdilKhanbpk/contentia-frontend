"use client";

import { useEffect } from "react";
import "../i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "../app/globals.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";

import { ToastContainer } from "react-toastify";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { FileProvider } from "@/context/FileContext";
import { TokenProvider } from "@/context/TokenCheckingContext";
import { initGA } from "@/utils/googleAnalytics/Analytics";
import RouteChangeTracker from "@/utils/googleAnalytics/RouteChangeTracker";
import Hotjar from '@hotjar/browser';


import Head from "next/head";
import Script from "next/script"; // ✅ Import next/script
import AuthWrapper from "@/components/auth/AuthWrapper";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        try {
            const siteId = 6390584;
            const hotjarVersion = 6;
          
            Hotjar.init(siteId, hotjarVersion);
            console.log("hotjar Initialized:--------------------------");
            
            initGA();
        } catch (error) {
            console.error("Failed to initialize Google Analytics:", error);
        }
    }, []);




    return (
        <html lang='en'>
            <Head>
                <title>Contentia</title>
                <meta name='description' content='Contentia' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' type='image/png' href='/contentiaLogo.png' sizes='32x32' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
            </Head>

            {/* ✅ Inject Hotjar Official Script */}
            {/* <Script
                id="hotjar"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(h,o,t,j,a,r){
                            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                            h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};
                            a=o.getElementsByTagName('head')[0];
                            r=o.createElement('script');r.async=1;
                            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                            a.appendChild(r);
                        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                    `,
                }}
            /> */}

            <body suppressHydrationWarning={true}>
                <FileProvider>
                    <Provider store={store}>
                        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
                            <TokenProvider>
                                <I18nextProvider i18n={i18n}>
                                    <RouteChangeTracker />

                                    <AuthWrapper>
                                        <LayoutWrapper>{children}</LayoutWrapper>
                                    </AuthWrapper>

                                    <ToastContainer />
                                </I18nextProvider>
                            </TokenProvider>
                        </PersistGate>
                    </Provider>
                </FileProvider>
            </body>
        </html>
    );
}
