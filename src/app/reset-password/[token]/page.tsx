"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { resetPassword } from '@/store/features/auth/ResetPasswordToBAckend';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    setPasswordError('');
    setIsLoading(true);

    // Dispatch reset password action
    dispatch(resetPassword({ token, password }))
      .unwrap()
      .then((response) => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err || 'An error occurred. Please try again.');
        setIsLoading(false);
      });
  };

  return (
    <div className="flex mt-20 justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 pt-8 pb-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/contentiaLogo.png"
                alt="Contentia Logo"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </div>

            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <LockClosedIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                {success ? 'Password Reset Complete' : 'Create New Password'}
              </h1>
              <p className="text-gray-600 mt-2">
                {success
                  ? 'Your password has been successfully reset.'
                  : ''}
              </p>
            </div>

            {/* Token error message */}
            {!token && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No reset token found in URL. Please make sure you're using the correct link.
                    </p>
                    <p className="mt-2 text-sm">
                      <Link href="/forgot-password" className="text-yellow-700 font-medium hover:text-yellow-600">
                        Request a new reset link →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Success message */}
            {success ? (
              <div className="text-center">
                <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6">
                  <p className="text-green-800">
                    Your password has been reset successfully!
                  </p>
                  <p className="text-green-700 mt-2">
                    You can now log in with your new password.
                  </p>
                </div>

                <Link
                  href="/giris-yap"
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              /* Password reset form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Confirm password field */}
                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password requirements */}
                <div className="text-xs text-gray-500">
                  <p>Your password must:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Be at least 6 characters long</li>
                    <li>Match in both fields</li>
                  </ul>
                </div>

                {/* Password error message */}
                {passwordError && (
                  <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
                    {passwordError}
                  </div>
                )}

                {/* API error message */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting Password...
                    </span>
                  ) : 'Reset Password'}
                </button>
              </form>
            )}

            {/* Back to login link */}
            <div className="mt-8 text-center">
              <Link
                href="/giris-yap"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Need help? <a href="mailto:info@contentia.io" className="text-blue-600 hover:text-blue-800">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
