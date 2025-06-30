'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const merchant_oid = searchParams.get('merchant_oid');

  // ✅ Notify the parent iframe (if embedded)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      console.log('✅ [iframe] Payment success page loaded, sending postMessage to parent');
      window.parent.postMessage({ paymentStatus: 'success', merchant_oid }, '*');
    } else {
      console.log('ℹ️ [iframe] Not in iframe or window undefined');
    }
  }, [merchant_oid]);

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
