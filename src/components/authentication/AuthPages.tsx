"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import scannerImage1 from "../../../public/BecomeCreator/scanner1png.png";
import appStoreImage from "../../../public/BecomeCreator/AppStore1.png";
import googlePlayImage from "../../../public/BecomeCreator/google3.png";
import axios from 'axios';

const AuthPages = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
  };

  const handleLogin = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/login', data);
      console.log("Login Response:", response.data);
      const token = response.data.token; // Assume the token is in the response

      // Store the token in local storage
      localStorage.setItem('your_token_key', token);
      console.log('Token stored successfully');
      alert('Login successful');
    } catch (error: any) {
      // Default error message
      let errorMessage = 'Something went wrong during login. Please try again.';

      // Check if we have a server response and display a relevant message
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      }

      console.error("Login Error:", errorMessage);
      alert(errorMessage);
    }
  };

  const handleSignup = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/signup', data);
      console.log("Signup Response:", response.data);
      const token = response.data.token; // Assume the token is in the response

      // Store the token in local storage
      localStorage.setItem('your_token_key', token);
      console.log('Token stored successfully');
      alert('Signup successful');
    } catch (error: any) {
      // Default error message
      let errorMessage = 'Something went wrong during signup. Please try again.';

      // Check if we have a server response and display a relevant message
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      }

      console.error("Signup Error:", errorMessage);
      alert(errorMessage);
    }
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

          {activeTab === 'login' ? (
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className='px-4'>
                <button type='button' className="flex justify-center w-full text-gray-700 mb-4 border border-gray-300">
                  <Image src='/googleIcon.svg' width={15} height={15} alt="Google Icon" className="p-1.5 w-10 h-10 border-r border-gray-300" />
                  <div className='w-11/12 py-2'>Google ile devam et</div>
                </button>

                <div className="text-center mb-4 text-gray-500">veya</div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/messageIcon.png" alt="Password Icon" className="w-7 h-7" />
                    </div>
                    <input
                      type="email"
                      id="loginEmail"
                      {...register("email", { required: true })}
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="eposta@gmail.com"
                    />
                  </div>
                  {errors.email && <span className="text-red-500">E-posta zorunludur</span>}
                </div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/lockIcon.png" alt="Password Icon" className="h-7 w-7" />
                    </div>
                    <input
                      type="password"
                      id="loginPassword"
                      {...register("password", { required: true })}
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="şifrenizi girin"
                    />
                  </div>
                  {errors.password && <span className="text-red-500">Şifre zorunludur</span>}
                  <div className="flex items-start mt-4 mb-4">
                    <input
                      id="beniHatirla" // Updated ID to a more meaningful Turkish identifier
                      type="checkbox"
                      className="mt-1 mr-2"
                      {...register("beniHatirla")} // Registering with a Turkish name
                    />
                    <label htmlFor="beniHatirla" className="text-sm text-gray-500">
                      Beni Hatırla
                    </label>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <a href="#" className="">Şifrenizi hatırlamıyor musunuz?</a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full ButtonBlue text-white py-2 rounded-lg font-semibold"
              >
                Giriş Yap
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleSignup)}>
              <div className='px-4'>
                <button className="flex justify-center w-full text-gray-700 mb-4 border border-gray-300">
                  <Image src='/googleIcon.svg' width={15} height={15} alt="Google Icon" className="p-1.5 w-10 h-10 border-r border-gray-300" />
                  <div className='w-11/12 py-2'>Google ile devam et</div>
                </button>

                <div className="text-center mb-4 text-gray-500">veya</div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/messageIcon.png" alt="Email Icon" className="w-7 h-7" />
                    </div>
                    <input
                      type="email"
                      id="signupEmail"
                      {...register("email", { required: true })}
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="eposta@gmail.com"
                    />
                  </div>
                  {errors.email && <span className="text-red-500">E-posta zorunludur</span>}
                </div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 ">
                    <div className="bg-gray-100 p-2 rounded-l border-r border-gray-300">
                      <img src="/lockIcon.png" alt="Password Icon" className="h-7 w-7" />
                    </div>
                    <input
                      type="password"
                      id="signupPassword"
                      {...register("password", { required: true })}
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="şifrenizi girin"
                    />
                  </div>
                  {errors.password && <span className="text-red-500">Şifre zorunludur</span>}
                </div>

                {/* First Checkbox */}
                <div className="flex items-start mb-2">
                  <input
                    id="termsAgreement"
                    type="checkbox"
                    className="mt-1 mr-2"
                    {...register("sozlesme", { required: true })}
                  />
                  <label htmlFor="termsAgreement" className="text-sm text-gray-500">
                    Kullanıcı Sözleşmesi’ni, Aydınlatma Metni’ni, Açık Rıza Metni’ni ve Ödeme Platformu Kullanım Sözleşmesi’ni okudum, onaylıyorum.
                  </label>
                </div>
                {errors.sozlesme && <span className="text-red-500">Kullanıcı sözleşmesi onaylanmalıdır</span>}

                {/* Second Checkbox */}
                <div className="flex items-start mb-4">
                  <input
                    id="pazarlamaIzni" // Keep the ID for the input
                    type="checkbox"
                    className="mt-1 mr-2"
                    {...register("pazarlamaIzni", { required: true })} // Use the Turkish name
                  />
                  <label htmlFor="pazarlamaIzni" className="text-sm text-gray-500">
                    Ticari Elektronik İleti ile iletişim izinlerini onaylıyorum.
                  </label>
                </div>
                {errors.pazarlamaIzni && <span className="text-red-500">İletişim izni onaylanmalıdır.</span>}

              </div>

              <button
                type="submit"
                className="w-full ButtonBlue text-white py-2 rounded-lg font-semibold"
              >
                Üye Ol
              </button>
            </form>
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
