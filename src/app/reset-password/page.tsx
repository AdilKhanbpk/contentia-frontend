"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Extract token from URL path
    const pathname = window.location.pathname;
    const tokenFromPath = pathname.split('/reset-password/')[1];

    if (tokenFromPath) {
      // Redirect to the dynamic route with the token
      router.push(`/reset-password/${tokenFromPath}`);
    } else {
      // Redirect to forgot password page if no token
      router.push('/forgot-password');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the password reset page.</p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;