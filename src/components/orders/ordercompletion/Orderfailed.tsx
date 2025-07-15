'use client';
import { XCircle } from 'lucide-react';

export default function OrderFail({ order_id }: { order_id: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-600 w-16 h-16" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ödeme Başarısız ❌
        </h2>
        <p className="text-gray-600 mb-6">
          Ödemeniz tamamlanamadı. Lütfen tekrar deneyin veya başka bir ödeme yöntemi seçin.
        </p>

        {order_id && (
          <div className="bg-gray-100 p-4 rounded-md text-left mb-6">
            <p className="text-sm text-gray-500">Sipariş Numaranız:</p>
            <p className="text-lg font-semibold text-gray-700">{order_id}</p>
          </div>
        )}

        <a
          href="/"
          className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition"
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
}
