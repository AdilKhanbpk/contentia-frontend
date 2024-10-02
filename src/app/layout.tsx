"use client";
// app/layout.tsx
import '../i18n'; // Ensure this import is present to initialize i18n
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import './globals.css'; // Import your global CSS
import Navbar from '@/components/navbar/Navbar';
import CustomerNavbar from '@/components/navbar/CustomerNavbar'; // Import your CustomerNavbar component
import { usePathname } from 'next/navigation'; // Import usePathname hook
import Footer from '@/components/footer/Footer';


const metadata = {
  title: 'Your Site Title',
  description: 'Your Site Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path

  // Check if the current path is the root ("/")
  const isAfterContentiaio = pathname === '/contentiaio' || pathname.startsWith('/contentiaio/');
  
  // Check if the current path is "/orders"
  const isOrdersPage = pathname === '/orders' || pathname.startsWith('/orders/');

  return (
    <html lang="en">
      <body>
        <I18nextProvider i18n={i18n}>
          {isAfterContentiaio && <Navbar />} {/* Render Navbar on landing page */}
          {isOrdersPage && <CustomerNavbar />} {/* Render CustomerNavbar on /orders */}
          {children}
          <Footer></Footer>
        </I18nextProvider>
      </body>
    </html>
  );
}
