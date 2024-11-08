

"use client";
import React from 'react';
import Image from 'next/image';
import scannerImage1 from "../../../../public/BecomeCreator/scanner1png.png";
import appStoreImage from "../../../../public/BecomeCreator/AppStore1.png";
import googlePlayImage from "../../../../public/BecomeCreator/google3.png";

export default function SideSec() {
    return (
        <>
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
        </>
    );
}
