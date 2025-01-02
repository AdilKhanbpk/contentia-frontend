"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import "../i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import CustomerNavbar from "@/components/navbar/CustomerNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer/Footer";
import store from "@/store/store";
import { Provider } from "react-redux";
import InitializeSocket from "@/socket/InitializeSocket";
import { ToastContainer } from "react-toastify";

const metadata = {
  title: "Your Site Title",
  description: "Your Site Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('Checking for access token in localStorage...');
    const token = localStorage.getItem('accessToken');

    if (token) {
      console.log('Access token found:', token);
      try {
        // Decode the token
        console.log('Decoding the token...');
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        // Check if the role is 'admin'
        if (decodedToken.role === 'admin') {
          console.log('User is authorized as admin.');
          setIsAuthorized(true);
          setIsUserAuthorized(true);
        } else if (decodedToken.role === 'user' || decodedToken.role === 'admin') {
          console.log("user is authorized as a user");
          setIsUserAuthorized(true);
        } else {
          console.warn('User is not authorized. Redirecting to /unauthorized...');
          // router.push('/unauthorized'); // Redirect if not an admin
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        console.warn('Invalid token. Redirecting to /contentiaio/authentication...');
        router.push('/contentiaio/authentication');
      }
    } else {
      console.warn('No access token found. Redirecting to /contentiaio/authentication...');
      router.push('/contentiaio/authentication');
    }
  }, [router]);

  if (!isAuthorized) {
    console.log('Authorization check in progress...');
  }

  const isAfterContentiaio =
    pathname === "/" ||
    pathname.startsWith("/contentiaio/") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/blog/");

  // Check if the current path is "/orders"
  const isOrdersPage =
    pathname === "/orders" || pathname.startsWith("/orders/");

  // check if the current path is "/admin"
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <InitializeSocket />
            {isAfterContentiaio && <Navbar />}{" "}
            {/* Render Navbar on landing page */}
            {isUserAuthorized && isOrdersPage && <CustomerNavbar />}{" "}
            {/* Render CustomerNavbar on /orders */}
            {isAuthorized && isAdminPage && <AdminNavbar />}{" "}
            {/* Render AdminNavbar on /orders */}
            {children}
            {isAfterContentiaio && <Footer />}{" "}
            {/* Render Footer on landing page */}
            {isUserAuthorized && isOrdersPage && <Footer />}
            {/* Add the ToastContainer to render toasts */}
            <ToastContainer />
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}
