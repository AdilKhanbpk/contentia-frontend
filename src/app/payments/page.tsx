'use client';
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useSelector } from 'react-redux';

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
  const [tokenData, setTokenData] = useState<PayTRTokenData | null>(null);
  const [user, setUser] = useState<LocalUser | null>(null);
  const orderid = useSelector((state: any) => state.order.orderFormData.paymentInfo.orderId);
  useEffect(() => {
    const stored = localStorage.getItem('user');
    const storedv2 = localStorage.getItem('userdata');
    if (stored && storedv2) {
      try {
        const parsed = JSON.parse(stored);
        const parsedv2 = JSON.parse(storedv2);
        setUser({
          name: parsedv2.name,
          email: parsedv2.email || '',
          phone: parsedv2.phoneNumber || '',
          address: parsedv2.address || '',
          amount: parsedv2.amount || '',
        });

        fetch('https://26a9fd7b8d98.ngrok-free.app/api/paytr/direct-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parsedv2.amount,
            orderId: orderid,
            userEmail: parsed.email,
            userName: parsed.name || 'umair amjad',
            userPhone: parsed.phoneNumber,
            installment_count: 0,
          }),
        })
          .then(res => res.json())
          .then(data => setTokenData(data))
          .catch(err => console.error('Token fetch error:', err));

      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
      }
    }
  }, [orderid]);

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