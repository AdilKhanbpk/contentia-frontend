'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder } from '@/store/features/profile/orderSlice';
import { useFileContext } from '@/context/FileContext';
import { AppDispatch } from '@/store/store';
import OrderSuccess from '@/components/orders/ordercompletion/orderSuccess';
import OrderFail from '@/components/orders/ordercompletion/Orderfailed';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedFiles, setSelectedFiles } = useFileContext();

  const status = searchParams.get('status');
  const order_id = searchParams.get('orderId');
  const paymentStatus = searchParams.get('paymentStatus');

  const [orderCreated, setOrderCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasCreatedOrder = useRef(false); // ✅ Prevent double dispatch

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      // ✅ Ensure order creation runs only once
      if (
        status === 'success' &&
        order_id &&
        paymentStatus === 'paid' &&
        !hasCreatedOrder.current
      ) {
        hasCreatedOrder.current = true;

        try {
          const orderFormData = JSON.parse(localStorage.getItem('orderFormData') || '{}');
          console.log("🚀 Order Form Data:", orderFormData);

          await dispatch(createOrder({
            selectedFiles,
            customerInfo: orderFormData.customerInfo,
            paymentInfo: orderFormData.paymentInfo,
            coupon: orderFormData.coupon || null,
            paymentStatus: paymentStatus
          })).unwrap();

          // ✅ Clean up
          localStorage.removeItem('orderFormData');
          setSelectedFiles([]);
          setOrderCreated(true);
          toast.success("Sipariş başarıyla oluşturuldu!");
        } catch (error: any) {
          setSelectedFiles([]);
          setError(error.message || "Sipariş oluşturulurken bir hata oluştu.");
          toast.error(error.message || "Sipariş oluşturulurken bir hata oluştu.");
        }
      }
    };

    createOrderAfterPayment();
  }, [status, order_id, paymentStatus, dispatch, selectedFiles, setSelectedFiles]);

  if (status === 'failed') {
    return <OrderFail order_id={order_id ?? ''} />;
  }

  if (status === 'success' && orderCreated) {
    return <OrderSuccess order_id={order_id ?? ''} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center text-gray-500">
      {error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : (
        <p>Ödeme doğrulanıyor ve sipariş oluşturuluyor...</p>
      )}
    </div>
  );
}
