// src/app/layout.tsx
"use client";
import React from 'react';
import { usePathname } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAdmin, isUser, isLoading } = useAuth();

  const isPublicPath = 
    pathname === "/" ||
    pathname.startsWith("/contentiaio/authentication") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/contentiaio");

  const isAfterContentiaio =
    pathname === "/" ||
    pathname.startsWith("/contentiaio/") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/blog/");

  const isOrdersPage =
    pathname === "/orders" || pathname.startsWith("/orders/");

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");

  // Render loading spinner while checking authentication
  if (isLoading && !isPublicPath) {
    return (
      <html lang="en">
        <body>
          <LoadingSpinner />
        </body>
      </html>
    );
  }

  // Protect non-public routes
  if (!isPublicPath && !isLoading && !isUser) {
    return null; // Return nothing while redirecting
  }

  // Protect admin routes
  if (isAdminPage && !isLoading && !isAdmin) {
    return null; // Return nothing while redirecting
  }

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <InitializeSocket />
            {isAfterContentiaio && <Navbar />}
            {isUser && isOrdersPage && <CustomerNavbar />}
            {isAdmin && isAdminPage && <AdminNavbar />}
            {children}
            {(isAfterContentiaio || (isUser && isOrdersPage)) && <Footer />}
            <ToastContainer />
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}