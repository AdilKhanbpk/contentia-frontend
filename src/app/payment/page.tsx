'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
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
  const orderId = searchParams.get('orderId');
  const paymentStatus = searchParams.get('paymentStatus');

  const [orderCreated, setOrderCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasCreatedOrder = useRef(false);

  // const getOrderFormData = (): any | null => {
  //   try {
  //     const storedData = localStorage.getItem('orderFormData');
  //     if (!storedData) return null;

  //     const parsed = JSON.parse(storedData);
  //     if (!parsed.customerInfo || !parsed.paymentInfo) return null;

  //     return parsed;
  //   } catch (err) {
  //     console.error("Failed to parse order form data:", err);
  //     return null;
  //   }
  // };

  // const handleOrderCreation = useCallback(async () => {
  //   if (
  //     status === 'success' &&
  //     orderId &&
  //     paymentStatus === 'paid' &&
  //     !hasCreatedOrder.current
  //   ) {
  //     hasCreatedOrder.current = true;

  //     const orderFormData = getOrderFormData();
  //     if (!orderFormData) {
  //       setError("Sipariş verisi eksik veya hatalı.");
  //       toast.error("Sipariş verisi eksik veya hatalı.");
  //       return;
  //     }

  //     try {
  //       await dispatch(createOrder({
  //         selectedFiles,
  //         customerInfo: orderFormData.customerInfo,
  //         paymentInfo: orderFormData.paymentInfo,
  //         coupon: orderFormData.coupon || null,
  //         paymentStatus,
  //       })).unwrap();

  //       // Cleanup
  //       localStorage.removeItem('orderFormData');
  //       setSelectedFiles([]);
  //       setOrderCreated(true);
  //       toast.success("Sipariş başarıyla oluşturuldu!");
  //     } catch (err: any) {
  //       setSelectedFiles([]);
  //       const message = err.message || "Sipariş oluşturulurken bir hata oluştu.";
  //       setError(message);
  //       toast.error(message);
  //     }
  //   }
  // }, [status, orderId, paymentStatus, dispatch, selectedFiles, setSelectedFiles]);

  // useEffect(() => {
  //   handleOrderCreation();
  // }, [handleOrderCreation]);

  // Render
  if (status === 'failed') {
    return <OrderFail order_id={orderId ?? ''} />;
  }

  if (status === 'success') {
    return <OrderSuccess order_id={orderId ?? ''} />;
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
