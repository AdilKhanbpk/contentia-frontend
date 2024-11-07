"use client";
import { useState } from 'react';
import LoginForm from './sub-auth/LoginForm';
import SignupForm from './sub-auth/SignupForm';
import SideSec from './sub-auth/SideSec';


const AuthPages = () => {
  const [activeTab, setActiveTab] = useState('login');

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
              className={`w-1/2 py-2 px-4 font-semibold text-gray-900 ${activeTab === 'register' ? 'border-b-2 border-black' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Üye Ol
            </button>
          </div>
          {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
      
      <SideSec></SideSec>

    </div>
  );
};

export default AuthPages;
