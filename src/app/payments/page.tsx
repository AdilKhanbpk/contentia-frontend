'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { Lock } from 'lucide-react';
import { toast } from 'react-toastify';

import { useFileContext } from '@/context/FileContext';
import { createOrder } from '@/store/features/profile/orderSlice';
import { AppDispatch } from '@/store/store';

interface PayTRTokenData {
  merchant_id: string;
  user_ip: string;
  merchant_oid: string;
  email: string;
  payment_amount: string;
  payment_type: string;
  installment_count: string;
  currency: string;
  test_mode: string;
  non_3d: string;
  merchant_ok_url: string;
  merchant_fail_url: string;
  user_name: string;
  user_address: string;
  user_phone: string;
  user_basket: string;
  paytr_token: string;
  debug_on: string;
  client_lang: string;
}

interface LocalUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  amount?: string;
}

export default function PayTRForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [tokenData, setTokenData] = useState<PayTRTokenData | null>(null);
  const [user, setUser] = useState<LocalUser | null>(null);
  const { selectedFiles, setSelectedFiles } = useFileContext();
  const orderId = useSelector((state: any) => state.order?.orderFormData?.paymentInfo?.orderId);

  const hasTriggered = useRef(false); // ✅ prevents multiple calls

  useEffect(() => {
    const fetchPayTRToken = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedUserData = localStorage.getItem('userdata');

        if (!storedUser || !storedUserData) return;

        const userObj = JSON.parse(storedUser);
        const userData = JSON.parse(storedUserData);

        const localUser: LocalUser = {
          name: userData.name,
          email: userData.email || '',
          phone: userData.phoneNumber || '',
          address: userData.address || '',
          amount: userData.amount || '',
        };

        setUser(localUser);

        // 1️⃣ Call payment API
        const res = await fetch('http://localhost:8000/api/paytr/direct-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: userData.amount,
            orderId: orderId,
            userEmail: userData.email,
            userName: userObj.name || 'umair amjad',
            userPhone: userData.phoneNumber,
            installment_count: 0,
          }),
        });

        const data = await res.json();
        setTokenData(data);

        // 2️⃣ Call createOrder AFTER token is generated
        await dispatch(createOrder({ selectedFiles })).unwrap();
        setSelectedFiles([]);
        toast.success("Sipariş başarıyla oluşturuldu!");
      } catch (error: any) {
        console.error('Token fetch or order creation error:', error.message || error);
        toast.error(error.message || "Sipariş oluşturulurken bir hata oluştu.");
        setSelectedFiles([]);
      }
    };

    if (orderId && !hasTriggered.current) {
      hasTriggered.current = true; // ✅ lock before call
      fetchPayTRToken();
    }
  }, [orderId, dispatch, selectedFiles, setSelectedFiles]);

  if (!tokenData) {
    return <p className="text-center mt-10 text-gray-600">Yükleniyor...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Kart ile Güvenli Ödeme</h2>

      <form action="https://www.paytr.com/odeme" method="POST" className="space-y-4">
        {Object.entries(tokenData).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Kart Sahibinin Adı</label>
          <input
            name="cc_owner"
            placeholder="Örnek: UMAIR AMJAD"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Kart Numarası</label>
          <input
            name="card_number"
            placeholder="XXXX XXXX XXXX XXXX"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Ay (MM)</label>
            <input
              name="expiry_month"
              placeholder="MM"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Yıl (YY)</label>
            <input
              name="expiry_year"
              placeholder="YY"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            name="cvv"
            placeholder="CVV"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {user && (
          <div className="pt-4 space-y-3 text-sm text-gray-700">
            <div>
              <label className="block font-semibold">Ad Soyad</label>
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full bg-gray-100 border rounded px-3 py-2 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-gray-100 border rounded px-3 py-2 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold">Telefon</label>
              <input
                type="text"
                value={user.phone}
                disabled
                className="w-full bg-gray-100 border rounded px-3 py-2 cursor-not-allowed"
              />
            </div>
          </div>
        )}

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            Ödemeyi Tamamla
          </button>
        </div>
      </form>

      <div className="mt-6 flex items-center text-sm text-gray-500 justify-center">
        <Lock className="w-4 h-4 mr-1" />
        <span>Ödemeniz Contentia.io ve PayTR tarafından güvence altındadır</span>
      </div>
    </div>
  );
}
