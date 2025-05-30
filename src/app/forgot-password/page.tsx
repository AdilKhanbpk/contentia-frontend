'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { forgotPassword } from '@/store/features/auth/ForgotPasswordSlice';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Get state from Redux
  const loading = useAppSelector((state) => state.forgotPassword?.loading);
  const success = useAppSelector((state) => state.forgotPassword?.success);
  
  const error = useAppSelector((state) => state.forgotPassword?.error);
  const message = useAppSelector((state) => state.forgotPassword?.message);

  useEffect(() => {
    if (success) {
      setSubmitted(true);
      toast.success(message || 'Password reset link sent successfully');
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="flex mt-24 justify-center items-center min-h-screen bg-gray-50">
      {/* <div className='mb-16'>

      </div> */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/contentiaLogo.png"
                alt="Contentia Logo"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              {submitted ? 'E-postanızı Kontrol Edin!' : 'Şifrenizi mi unuttunuz?'}
            </h2>

            <p className="text-center text-gray-600 mb-8">
              {submitted
                ? 'E-posta adresinize şifre sıfırlama bağlantısı gönderdik.'
                : 'Kayıtlı e-posta adresini girin, şifre yenileme adımlarını takip edin.'}
            </p>

            {submitted ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-700">
                  <p>Şifre sıfırlama bağlantısı şu adrese gönderildi: <strong>{email}</strong></p>
                  <p className="mt-2">Lütfen gelen kutunuzu kontrol edin ve şifrenizi sıfırlamak için talimatları izleyin.</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">E-postayı almadınız mı?</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                 Farklı bir e-posta ile tekrar deneyin
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Posta Adresi
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-Posta Adresini Girin"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : ' Şifre Yenileme'}
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <Link
                href="/giris-yap"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Giriş Sayfasına Dön
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Yardıma mı İhtiyacın Var? <a href="mailto:info@contentia.io" className="text-blue-600 hover:text-blue-800"> İletişime Geç</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
