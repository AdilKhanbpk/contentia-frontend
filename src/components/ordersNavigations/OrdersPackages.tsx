'use client';
import { useState } from 'react';
import CustomModal from '../modal/CustomModel'

export default function OrdersPackages() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="px-4 sm:px-6 md:px-8 lg:px-28 py-24 sm:py-24 md:py-24 lg:py-24 bg-gray-50 ">
                <div className='flex flex-col'>
                    <div className="p-4 my-6 sm:p-5 sm:my-7 md:p-6 md:my-8 lg:p-6 lg:my-8">
                        <div className=''>
                            <button className="font-semibold px-2 py-0.5 ButtonBlue text-white rounded-lg">UGC Siparişini Oluştur</button>
                        </div>
                        <div className='bg-white p-6 mt-2 mb-8'>

                            {/* Sipariş Detay Box 1 */}
                            <div className=" pb-2 mb-2 sm:pb-3 sm:mb-3 md:pb-4 md:mb-4 lg:pb-4 lg:mb-4">
                            
                                {/* Profil Bilgileri */}
                                <div className="mb-4 p-6 sm:mb-5 sm:p-7 md:mb-6 md:p-8 lg:mb-6 lg:p-8 border-2 border-gray-200 ">
                                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-start mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                        <div className='w-full lg:w-2/4 flex flex-col justify-between items-start md:items-start lg:items-start'>
                                            <h2 className="text-base font-semibold mb-12">Profil Bilgileri</h2>
                                            <div className="w-36 h-36 ButtonBlue font-semibold text-white rounded-full flex items-center justify-center">
                                                SK
                                            </div>
                                        </div>
                                        <div className="mt-4 lg:mt-0 w-full lg:w-2/4 flex flex-col items-start md:items-start lg:items-start">
                                            <div className="flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                                <p className="font-semibold text-base ">Paket Özeti</p>
                                            </div>

                                            {/* Aktif Paket */}
                                            <div className="flex items-center mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                                <p className="w-10 text-3xl font-semibold BlueText mr-8">1</p>
                                                <p className="font-semibold text-sm">Aktif Paket</p>
                                            </div>

                                            {/* Kalan İçerik */}
                                            <div className="flex items-center mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                                <p className="w-10 text-3xl font-semibold BlueText mr-8">3</p>
                                                <p className="font-semibold text-sm">Kalan İçerik</p>
                                            </div>

                                            {/* Tamamlanan Paket */}
                                            <div className="flex items-center mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                                <p className="w-10 text-3xl font-semibold BlueText mr-8">2</p>
                                                <p className="font-semibold text-sm">Tamamlanan Paket</p>
                                            </div>

                                            {/* Onaylanan İçerik */}
                                            <div className="flex items-center mb-4">
                                                <p className="w-10 text-3xl font-semibold BlueText mr-8">15</p>
                                                <p className="font-semibold text-sm">Onaylanan İçerik</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sipariş Detay Box 2 */}
                        <div className='font-semibold mb-2'>Paketlerim</div>
                        <div className="bg-white p-4 pb-3 mb-2 sm:p-5 sm:pb-3.5 sm:mb-3 md:p-6 md:pb-4 md:mb-4 lg:p-6 lg:pb-4 lg:mb-4">
                            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-end lg:space-x-28">
                               
                                {/* First Section */}
                                <div className="bg-white rounded-md">
                                    <h3 className="text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText">Launch</h3>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                                      
                                        {/* Paket Durumu */}
                                        <div className="text-gray-700">Paket Durumu:</div>
                                        <div className="text-right BlueText font-semibold">Aktif</div>

                                        {/* Sipariş Tarihi */}
                                        <div className="text-gray-700">Sipariş Tarihi:</div>
                                        <div className="text-right BlueText font-semibold">13/09/2024</div>

                                        {/* Kalan İçerik */}
                                        <div className="text-gray-700">Kalan İçerik:</div>
                                        <div className="text-right BlueText font-semibold">3</div>

                                        {/* İçerik Sayısı */}
                                        <div className="text-gray-700">İçerik Sayısı:</div>
                                        <div className="text-right BlueText font-semibold">12</div>
                                    </div>
                                </div>

                                {/* Second Section (Button) */}
                                <div className="">
                                    <button onClick={openModal} className="mt-4 lg:mt-0 border BlueBorder BlueText font-semibold px-2 sm:px-3 md:px-4 lg:px-4 py-1 rounded-lg">
                                        Detaylar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <CustomModal isOpen={isModalOpen} closeModal={closeModal} title="">
                       
                            {/* model */}
                            <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
                              
                                {/* First Box: Fields and Profile Section */}
                                <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                                        <div className="col-span-2">
                                            <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                                <label className="block text-gray-700 font-semibold">İçerikleriniz</label>
                                                <span className="text-gray-900">İçerik üreticiler içeriklerinizi hazırladığında bu sayfada görünecektir.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="text-xs lg:text-sm bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">No</th>
                                                <th className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">İçerik Üretici No</th>
                                                <th className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Bağlantı</th>
                                                <th className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Yükleme Tarihi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">1</td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">128510</td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='BlueText' href="#">http://we.tl/send/</a></td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">23/09/2024</td>
                                            </tr>
                                            <tr>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">2</td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">67846</td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='BlueText' href="#">http://we.tl/send/7431</a></td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">23/09/2024</td>
                                            </tr>
                                            <tr>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">3</td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">95378</td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='BlueText' href="#">http://we.tl/send/3523</a></td>
                                                <td className="py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border">30/09/2024</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='flex flex-col lg:flex-row lg:space-x-28'>
                                
                                    {/* Paket Bilgileri Section */}
                                    <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                                        <h3 className="text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText">Paket Bilgileri:</h3>
                                        <div className="grid grid-cols-2 gap-0.5 sm:gap-0.5 md:gap-4 lg:gap-4">
                                        
                                            {/* Ödeme No */}
                                            <div className="text-gray-700">Ödeme No:</div>
                                            <div className="text-right BlueText font-medium lg:font-semibold">201240184112</div>

                                            {/* Ödeme Tarihi */}
                                            <div className="text-gray-700">Ödeme Tarihi:</div>
                                            <div className="text-right BlueText font-medium lg:font-semibold">19/09/2024</div>

                                            {/* İçerik Sayısı */}
                                            <div className="text-gray-700">İçerik Sayısı:</div>
                                            <div className="text-right BlueText font-medium lg:font-semibold">9 / 12</div>

                                            {/* Paket Durumu */}
                                            <div className="text-gray-700">Paket Durumu:</div>
                                            <div className="text-right BlueText font-medium lg:font-semibold">Aktif / Tamamlandı / İptal</div>

                                            {/* Fatura */}
                                            <div className="text-gray-700">Fatura:</div>
                                            <div className="text-right BlueText font-medium lg:font-semibold">
                                                <a href="https://we.tl/send/5323" className="underline whitespace-normal lg:whitespace-nowrap">https://we.tl/send/5323</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sipariş Özeti Section */}
                                    <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                                        <h3 className="text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText">Sipariş Özeti:</h3>
                                        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-11">
                                            {/* 12 Video */}
                                            <div className="text-gray-700 flex flex-col font-semibold">12 Video <span className='text-xs font-medium'>2.500 TL/Video</span></div>
                                            <div className="text-right BlueText font-semibold">30.000 TL</div>

                                            {/* 12 Edit */}
                                            <div className="text-gray-700 flex flex-col font-semibold">12 Edit <span className='text-xs font-medium'>500 TL/Video</span></div>
                                            <div className="text-right BlueText font-semibold">30.000 TL</div>

                                            {/* Toplam */}
                                            <div className="text-gray-700 font-semibold">Toplam</div>
                                            <div className="text-right BlueText font-semibold">36.000 TL</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="bg-white rounded-md w-full lg:w-1/3">
                                        <h2 className="BlueText text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4">İçerik Detayı:</h2>
                                        <div className="flex justify-between  mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">Platform:</p>
                                            <p className="BlueText font-semibold">Meta</p>
                                        </div>

                                        <div className="flex justify-between  mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">Süre:</p>
                                            <p className="BlueText font-semibold">15s</p>
                                        </div>

                                        <div className="flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">Edit:</p>
                                            <p className="BlueText font-semibold">Evet</p>
                                        </div>

                                        <div className="flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">En Boy Oranı:</p>
                                            <p className="BlueText font-semibold">9:16</p>
                                        </div>

                                        <div className="flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">Sosyal Medya Paylaşım:</p>
                                            <p className="BlueText font-semibold">Hayır</p>
                                        </div>

                                        <div className="flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">Kapak Görseli:</p>
                                            <p className="BlueText font-semibold">Hayır</p>
                                        </div>

                                        <div className="flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">Influencer Seçimi:</p>
                                            <p className="BlueText font-semibold">Nano</p>
                                        </div>

                                        <div className="flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">Ürün Gönderimi:</p>
                                            <p className="BlueText font-semibold">Hayır</p>
                                        </div>

                                        <div className="flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3">
                                            <p className="font-medium">İçerik Türü:</p>
                                            <p className="BlueText font-semibold">Hizmet</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CustomModal>
                    </div>
                </div>
            </div>
        </>
    );
}
