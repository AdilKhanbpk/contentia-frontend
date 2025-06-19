'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function PaymentFailed() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
      <div className="text-red-500 text-6xl mb-4">✗</div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
      <p className="text-gray-600 mb-6">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <button
        onClick={() => router.push('/payment/checkout')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
      >
        Try Again
      </button>
      <button
        onClick={() => router.push('/')}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Return to Home
      </button>
    </div>
  );
}