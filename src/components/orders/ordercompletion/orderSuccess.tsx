// components/orders/ordercompletion/OrderSuccess.tsx
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { createInvoice } from '@/store/features/profile/orderSlice';
import { AppDispatch } from '@/store/store';

interface OrderSuccessProps {
  order_id: string;
}

export default function OrderSuccess({ order_id }: OrderSuccessProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (order_id) {
      handleCreateInvoice(order_id);
    }
  }, [order_id]);

  const handleCreateInvoice = async (orderId: string) => {
    try {
      await dispatch(createInvoice({ orderId })).unwrap();
      console.log('Invoice created successfully for order:', orderId);
      toast.success("Fatura oluşturuldu!");
    } catch (error: any) {
      console.error('Failed to create invoice:', error);
      toast.error(error.message || "Fatura oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-green-600 w-16 h-16" />
        </div> 

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ödeme Başarılı 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Siparişiniz başarıyla oluşturuldu. Teşekkür ederiz!
        </p>

        <div className="bg-gray-100 p-4 rounded-md text-left mb-6">
          <p className="text-sm text-gray-500">Sipariş Numaranız:</p>
          <p className="text-lg font-semibold text-gray-700">{order_id}</p>
        </div>

        <a
          href="/"
          className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
}
