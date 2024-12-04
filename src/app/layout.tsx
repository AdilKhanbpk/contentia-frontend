"use client";
// app/layout.tsx
import "../i18n"; // Ensure this import is present to initialize i18n
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./globals.css"; // Import your global CSS
import Navbar from "@/components/navbar/Navbar";
import CustomerNavbar from "@/components/navbar/CustomerNavbar"; // Import your CustomerNavbar component
import AdminNavbar from "@/components/navbar/AdminNavbar"; // Import your AdminNavbar component
import { usePathname } from "next/navigation"; // Import usePathname hook
import Footer from "@/components/footer/Footer";
import store from "@/store/store";
import { Provider } from "react-redux";

const metadata = {
  title: "Your Site Title",
  description: "Your Site Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path

  // Check if the current path is the root ("/")
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
            {isAfterContentiaio && <Navbar />}{" "}
            {/* Render Navbar on landing page */}
            {isOrdersPage && <CustomerNavbar />}{" "}
            {/* Render CustomerNavbar on /orders */}
            {isAdminPage && <AdminNavbar />}{" "}
            {/* Render AdminNavbar on /orders */}
            {children}
            {isAfterContentiaio && <Footer />}{" "}
            {/* Render Footer on landing page */}
            {isOrdersPage && <Footer />} {/* Render Footer on /orders */}
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}
