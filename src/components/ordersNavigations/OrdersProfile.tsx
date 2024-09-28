"use client";
import React, { useState } from 'react';

const OrdersProfile: React.FC = () => {
    const [invoiceType, setInvoiceType] = useState('Bireysel');

    return (
        <div className="my-14 sm:my-14 md:my-16 lg:my-24 px-4 sm:px-6 md:px-8 lg:px-28 p-8 bg-gray-50 min-h-screen">
            <div className=" bg-white rounded-lg shadow-lg px-12 py-6">
                {/* Profil Bilgileri */}
                <div className="mb-6  border-2 border-gray-200 p-8">
                    <div className="flex flex-row justify-start items-start space-x-36 mb-4">
                        <div className=' flex flex-col justify-start items-center'>
                            <h2 className="text-xl font-semibold mb-6">Profil Bilgileri</h2>

                            <div className="w-28 h-28 ButtonBlue text-white rounded-full flex items-center justify-center">
                                SK
                            </div>
                        </div>
                        <div className='w-1/4 flex flex-col'>
                            <div className='flex flex-col mb-4'>
                                <p>Ad Soyad:</p>
                                <p className='font-semibold'>Saud Khan</p>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <p>E-Posta: </p>
                                <p className='font-semibold'>saudkhan@gmail.com</p>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <p>Telefon Numarası:</p>
                                <p className='font-semibold'>+90 850 303 11 22</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fatura Bilgileri */}
                <div className="mb-6 flex flex-row space-x-32 border-2 border-gray-200 p-8">
                    <h2 className="text-xl font-semibold mb-4 whitespace-nowrap">Fatura Bilgileri</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left side for personal or corporate details */}
                        <div>
                            <label className="block mb-2">Fatura Türü:</label>
                            <select
                                value={invoiceType}
                                onChange={(e) => setInvoiceType(e.target.value)}
                                className="w-1/2 font-semibold px-1 py-0.5 border rounded-md focus:outline-none"
                            >
                                <option value="Bireysel">Bireysel</option>
                                <option value="Kurumsal">Kurumsal</option>
                            </select>

                            {invoiceType === 'Bireysel' && (
                                <>
                                    <div className='flex flex-col mb-4'>
                                        <p className="mt-4">Ad Soyad:</p>
                                        <p className='font-semibold'>Saud Khan</p>
                                    </div>
                                    <div className='flex flex-col mb-4'>
                                        <p>T.C. Kimlik No:</p>
                                        <p className='font-semibold'>12345678900</p>
                                    </div>
                                    <div className='flex flex-col mb-4'>
                                        <p>Fatura Adresi:</p>
                                        <p className='font-semibold whitespace-nowrap'>Maslak Mah. Beybi Giz Plaza No:1 Sarıyer / İstanbul</p>
                                    </div>
                                </>
                            )}

                            {invoiceType === 'Kurumsal' && (
                                <>
                                    <div className='flex flex-col mb-4'>
                                        <p className="mt-4">Şirket Ünvanı:</p>
                                        <p className='font-semibold'>Contentia Ticaret A.Ş</p>
                                    </div>
                                    <div className='flex flex-col mb-4'>
                                        <p>Vergi Numarası / TCKN</p>
                                        <p className='font-semibold'>9010538392</p>
                                    </div>
                                    <div className='flex flex-col mb-4'>
                                        <p>Vergi Dairesi:</p>
                                        <p className='font-semibold'>Maslak</p>
                                    </div>
                                    <div className='flex flex-col mb-4'>
                                        <p>Fatura Adresi:</p>
                                        <p className='font-semibold whitespace-nowrap'>Maslak Mah. Beybi Giz Plaza No:1 Sarıyer / İstanbul</p>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>

                {/* Şifre Değiştir */}
                <div className='flex flex-row space-x-36 border-2 border-gray-200 p-8'>
                    <h2 className="text-xl font-semibold mb-4 whitespace-nowrap">Şifre Değiştir</h2>
                    <div className="flex flex-col w-2/4">
                        <div>
                            <label className="block ">Mevcut Şifre</label>
                            <input type="text" className="mb-4 w-1/2 px-1 py-0.5 border rounded-md focus:outline-none" />
                        </div>
                        <div>
                            <label className="block ">Yeni Şifre</label>
                            <input type="text" className="mb-4 w-1/2 px-1 py-0.5 border rounded-md focus:outline-none" />
                        </div>
                        <div>
                            <label className="block ">Yeni Şifre Tekrar</label>
                            <input type="text" className="w-1/2 px-1 py-0.5 border rounded-md focus:outline-none" />
                        </div>
                    </div>
                    <div className='w-1/4 flex justify-end items-end'>
                        <button className="font-semibold px-8 py-0.5 ButtonBlue text-white rounded-lg">Güncelle</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersProfile;
