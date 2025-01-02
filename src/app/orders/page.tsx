"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import TabFirst from '@/components/orders/TabFirst';
import TabSecond from '@/components/orders/TabSecond';
import TabThird from '@/components/orders/TabThird';
import TabFourth from '@/components/orders/TabFourth';

// Define interface for the JWT token payload
interface CustomJwtPayload {
  role: string;
  // Add other expected properties from your token here
  [key: string]: any;
}

const OrderDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const tabs = [
    { id: 0, label: "Sipariş Detayları" },
    { id: 1, label: "Ödeme" },
    { id: 2, label: "UGC Brief" },
    { id: 3, label: "Tercihler" },
  ];

  useEffect(() => {
    console.log('Checking for access token in localStorage...');
    const token = localStorage.getItem('accessToken');

    if (token) {
      console.log('Access token found:', token);
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        console.log('Decoded token:', decodedToken);

        // Check if user has appropriate role (adjust roles as needed)
        if (decodedToken.role === 'user' || decodedToken.role === 'admin') {
          console.log('User is authorized to view orders.');
          setIsAuthorized(true);
        } else {
          console.warn('User is not authorized. Redirecting to /unauthorized...');
          router.push('/unauthorized');
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
    return null;
  }

  return (
    <div className='sectionBackground pb-4'>
      <div className="flex px-4 sm:px-6 md:px-12 lg:px-20 space-x-8  pt-36">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-1/4 pt-2 pb-2 border-t-4 text-sm ${
              activeTab === tab.id
                ? "BlueBorder  BlueText font-bold"
                : "pinkBorder text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 0 && (<TabFirst></TabFirst>)}
      {activeTab === 1 && (<TabSecond></TabSecond>)}
      {activeTab === 2 && (<TabThird></TabThird>)}
      {activeTab === 3 && (<TabFourth></TabFourth>)}
    </div>
  );
};

export default OrderDetails;