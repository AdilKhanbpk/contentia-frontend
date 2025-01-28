"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import TabFirst from '@/components/orders/TabFirst';
import TabSecond from '@/components/orders/TabSecond';
import TabThird from '@/components/orders/TabThird';
import TabFourth from '@/components/orders/TabFourth';

interface CustomJwtPayload {
  role: string;
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
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        if (decodedToken.role === 'user' || decodedToken.role === 'admin') {
          setIsAuthorized(true);
        } else {
          router.push('/unauthorized');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        router.push('/contentiaio/authentication');
      }
    } else {
      router.push('/contentiaio/authentication');
    }
  }, [router]);

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