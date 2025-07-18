'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const merchant_oid = searchParams.get('merchant_oid');

  // ✅ Notify the parent iframe (if embedded)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      console.log('✅ [iframe] Payment success page loaded, sending postMessage to parent');
      window.parent.postMessage({ paymentStatus: 'success', merchant_oid }, '*');
    }
    
    // Create invoice after successful payment
    if (merchant_oid) {
      createInvoice(merchant_oid);
    }
  }, [merchant_oid]);

  const createInvoice = async (orderId: string) => {
    try {
      const response = await fetch(`https://contentia-backend-s4pw.onrender.com/api/create-invoice/${orderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        console.log('Invoice created successfully for order:', orderId);
        toast.success("Fatura oluşturuldu!");
      }
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">
        Your payment has been processed successfully.
        {merchant_oid && <><br />Order ID: {merchant_oid}</>}
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Return to Home
      </button>
    </div>
  );
}
