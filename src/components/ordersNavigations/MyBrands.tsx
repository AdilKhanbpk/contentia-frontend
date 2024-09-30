import React from 'react';
import Image from 'next/image';

export default function MyBrands() {
    return (
        <>
            <div className="px-4 sm:px-6 md:px-8 lg:px-28 py-14 sm:py-14 md:py-16 lg:py-24 bg-gray-50 ">
                <div className="p-6 my-8">
                    {/* Brand Profiles */}
                    <div className="mb-6 p-6 bg-white">
                        <div className='flex items-center flex-row space-x-2'>
                            <div>
                                <Image width={16} height={16} src='/plusIcon.png' alt='plus icon' ></Image>

                            </div>
                            <div>
                                <p className='BlueText text-sm font-semibold'>Marka Ekle</p>

                            </div>
                        </div>
                        {/* First Brand Box */}
                        <div className="flex flex-row justify-start items-start space-x-36 p-6 mt-2 mb-8 border-2 border-gray-200">
                            <div className="flex flex-col justify-start items-center">
                                <h2 className="text-base font-semibold mb-10">Contentia</h2>
                                <div className="w-28 h-28 font-semibold ButtonBlue text-white rounded-full flex items-center justify-center">
                                    Logo
                                </div>
                            </div>
                            <div className="w-1/4 flex flex-col">
                                <div className="flex flex-col mb-2">
                                    <p>Marka Adı:</p>
                                    <p className="font-semibold">Contentia</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Marka Kategorisi:</p>
                                    <p className="font-semibold">E-Ticaret</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p className='whitespace-nowrap'>Marka Websitesi: (Opsiyonel)</p>
                                    <p className="font-semibold">www.contentia.io</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Ülke:</p>
                                    <p className="font-semibold">Türkiye</p>
                                </div>
                            </div>
                            <div className='absolute right-48'>
                                <div className=''>
                                    <Image width={16} height={16} src='/editIcon.png' alt='plus icon' ></Image>

                                </div>

                            </div>
                        </div>

                        {/* Second Brand Box */}
                        <div className="flex flex-row justify-start items-start space-x-36 p-6 my-8 border-2 border-gray-200">
                            <div className="flex flex-col justify-start items-center">
                                <h2 className="text-base font-semibold mb-10">Brand 1</h2>
                                <div className="w-28 h-28 ButtonBlue font-semibold text-white rounded-full flex items-center justify-center">

                                    Logo
                                </div>
                            </div>
                            <div className="w-1/4 flex flex-col">
                                <div className="flex flex-col mb-2">
                                    <p>Marka Adı:</p>
                                    <p className="font-semibold">Brand 1</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Marka Kategorisi:</p>
                                    <p className="font-semibold">Seyahat</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p className='whitespace-nowrap'>Marka Websitesi: (Opsiyonel)</p>
                                    <p className="font-semibold">www.contentia.io</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Ülke:</p>
                                    <p className="font-semibold">Türkiye</p>
                                </div>
                            </div>
                        </div>

                        {/* Third Brand Box */}
                        <div className="flex flex-row justify-start items-start space-x-36 p-6 my-8 border-2 border-gray-200">
                            <div className="flex flex-col justify-start items-center">
                                <h2 className="text-base font-semibold mb-10">Brand 2</h2>
                                <div className="w-28 h-28 ButtonBlue font-semibold text-white rounded-full flex items-center justify-center">

                                    Logo
                                </div>
                            </div>
                            <div className="w-1/4 flex flex-col">
                                <div className="flex flex-col mb-2">
                                    <p>Marka Adı:</p>
                                    <p className="font-semibold">Brand 2</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Marka Kategorisi:</p>
                                    <p className="font-semibold">Kozmetik</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p className='whitespace-nowrap'>Marka Websitesi: (Opsiyonel)</p>
                                    <p className="font-semibold">www.contentia.io</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Ülke:</p>
                                    <p className="font-semibold">Türkiye</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
