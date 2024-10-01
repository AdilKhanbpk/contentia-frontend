"use client";
import { useState } from 'react';
import Image from 'next/image';
import scannerImage1 from "../../../public/BecomeCreator/scanner1png.png";
import appStoreImage from "../../../public/BecomeCreator/AppStore1.png";
import googlePlayImage from "../../../public/BecomeCreator/google3.png"

const AuthPages = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = () => {
    // Handle login logic here
  };

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col lg:flex lg:flex-row justify-center items-start my-14 sm:my-14 md:my-16 lg:my-24 px-4 sm:px-6 md:px-8 lg:px-28 ">
      <div className="authBG px-4 py-2 sm:px-8 sm:py-4 md:px-12 md:py-6 lg:px-20 lg:py-8 xl:px-20 xl:py-8 rounded-sm w-full lg:w-3/5">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">İşletmeler ve Müşteriler</h1>
        <p className="text-gray-500 mb-4">Gerçek kullanıcılar tarafından üretilen içeriklere erişmek mi istiyorsun?</p>

        <div className='bg-white py-4'>
          <div className="flex border-b border-gray-300 mb-6">
            <button
              className={`w-1/2 py-2 px-4 font-semibold text-gray-900 ${activeTab === 'login' ? 'border-b-2 border-black' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Giriş Yap
            </button>
            <button
              className={`w-1/2 py-2 px-4 font-semibold text-gray-500 ${activeTab === 'register' ? 'border-b-2 border-black' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Üye Ol
            </button>
          </div>

          {activeTab === 'login' ? (
            <div className=''>
              <div className='px-4'>
                <button className="flex justify-center w-full text-gray-700  mb-4 border border-gray-300">
                  <Image src='/googleIcon.svg' width={15} height={15} alt="Google Icon" className="p-1.5 w-10 h-10 border-r border-gray-300" />
                  <div className='w-11/12 py-2  '>Google ile devam et</div>
                </button>

                <div className="text-center mb-4 text-gray-500">veya</div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/messageIcon.png" alt="Password Icon" className="w-7 h-7" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="eposta@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/lockIcon.png" alt="Password Icon" className="h-7 w-7" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="şifrenizi girin"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start  mt-4 mb-4">
                    <input
                      id="iletisim"
                      type="checkbox"
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="iletisim" className="text-sm text-gray-500">
                      Beni Hatırla
                    </label>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <a href="#" className="">Şifrenizi hatırlamıyor musunuz?</a>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full ButtonBlue text-white py-2 rounded-lg font-semibold"
              >
                Giriş Yap
              </button>
            </div>
          ) : (
            <div className=''>
              <div className='px-4'>
                <button className="flex justify-center w-full text-gray-700  mb-4 border border-gray-300">
                  <Image src='/googleIcon.svg' width={15} height={15} alt="Google Icon" className="p-1.5 w-10 h-10 border-r border-gray-300" />
                  <div className='w-11/12 py-2  '>Google ile devam et</div>
                </button>

                <div className="text-center mb-4 text-gray-500">veya</div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/messageIcon.png" alt="Email Icon" className="w-7 h-7" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="eposta@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/lockIcon.png" alt="Password Icon" className="h-7 w-7" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="şifrenizi girin"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>



                {/* First Checkbox */}
                <div className="flex items-start mb-2">
                  <input
                    id="sozlesme"
                    type="checkbox"
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="sozlesme" className="text-sm text-gray-500">
                    Kullanıcı Sözleşmesi’ni, Aydınlatma Metni’ni, Açık Rıza Metni’ni ve Ödeme Platformu Kullanım Sözleşmesi’ni okudum, onaylıyorum.
                  </label>
                </div>

                {/* Second Checkbox */}
                <div className="flex items-start mb-4">
                  <input
                    id="iletisim"
                    type="checkbox"
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="iletisim" className="text-sm text-gray-500">
                    Ticari Elektronik İleti ile iletişim izinlerini onaylıyorum.
                  </label>
                </div>

              </div>

              <button
                onClick={handleLogin}
                className="w-full ButtonBlue text-white py-2 rounded-lg font-semibold"
              >
                Üye Ol
              </button>
            </div>

          )}

        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-2/5 p-8 pb-14 authBG2 lg:ml-8 rounded-sm mt-2 lg:mt-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">İçerik Üreticiler</h1>
        <p className="text-gray-500 mb-4">
          İçerik üreticisi olarak ürün, hizmet ya da mekan tanıtımı yaparak gelir elde etmek mi istiyorsun?
        </p>

        <button className="w-full ButtonBlue text-white py-2 rounded-lg mb-4  transition font-semibold">
          İçerik Üreticisi Ol
        </button>

        <p className="font-semibold text-center mb-4">Contentia'da zaten içerik üreticisi misin?</p>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start lg:space-x-8">
          <div className='flex justify-center gap-5 items-center mt-6'>
            <div className='flex flex-col items-center '>
              <Image src={scannerImage1} alt="Scanner for mobile app download" className='w-[100px]' /> {/* Adjusted width */}
              <Image src={appStoreImage} alt="Download on the App Store" className='w-[150px] mt-3' />
            </div>
            <div className='flex flex-col items-center '>
              <Image src={scannerImage1} alt="Scanner for mobile app download" className='w-[100px]' /> {/* Adjusted width */}
              <Image src={googlePlayImage} alt="Get it on Google Play" className='w-[150px] mt-3' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;