"use client";
import { useState } from "react";
import CustomModal from "../modal/CustomModel";
import ViewPackage from "./sub-profile/ViewPackage";

export default function OrdersPackages() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const packages: any = [
        {
            id: 1,
            name: "Launch",
            status: "Aktif",
            orderDate: "13/09/2024",
            remainingContent: 3,
            totalContent: 12,
        },
        // {
        //     id: 2,
        //     name: "Growth",
        //     status: "Aktif",
        //     orderDate: "13/09/2024",
        //     remainingContent: 3,
        //     totalContent: 12,
        // },
    ];

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-28 py-24 sm:py-24 md:py-24 lg:py-24 bg-gray-50'>
                <div className='flex flex-col'>
                    <div className='p-4 my-6 sm:p-5 sm:my-7 md:p-6 md:my-8 lg:p-6 lg:my-8'>
                        <div className='mb-5'>
                            <button className='font-semibold px-2 py-1 Button text-white rounded-lg'>
                                UGC Siparişini Oluştur
                            </button>
                        </div>
                        <div className='bg-white p-6 mt-2 mb-8'>
                            {/* Sipariş Detay Box 1 */}
                            <div className='pb-2 mb-2 sm:pb-3 sm:mb-3 md:pb-4 md:mb-4 lg:pb-4 lg:mb-4'>
                                {/* Profil Bilgileri */}
                                <div className='mb-4 p-6 sm:mb-5 sm:p-7 md:mb-6 md:p-8 lg:mb-6 lg:p-8'>
                                    <div className='flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-start mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                        <div className='w-full lg:w-2/4 flex flex-col justify-between items-start md:items-start lg:items-start'>
                                            <h2 className='text-base font-semibold mb-12'>
                                                Profil Bilgileri
                                            </h2>
                                            <div className='w-36 h-36 Button font-semibold text-white rounded-full flex items-center justify-center'>
                                                SK
                                            </div>
                                        </div>
                                        <div className='mt-4 lg:mt-0 w-full lg:w-2/4 flex flex-col items-start md:items-start lg:items-start'>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p className='font-semibold text-base'>
                                                    Paket Özeti
                                                </p>
                                            </div>

                                            {/* Aktif Paket */}
                                            <div className='flex items-center mb-3 sm:mb-4 md:mb-5 lg:mb-5'>
                                                <p className='w-10 text-3xl font-semibold BlueText mr-8'>
                                                    0
                                                </p>
                                                <p className='font-semibold text-sm'>
                                                    Aktif Paket
                                                </p>
                                            </div>

                                            {/* Kalan İçerik */}
                                            <div className='flex items-center mb-3 sm:mb-4 md:mb-5 lg:mb-5'>
                                                <p className='w-10 text-3xl font-semibold BlueText mr-8'>
                                                    0
                                                </p>
                                                <p className='font-semibold text-sm'>
                                                    Kalan İçerik
                                                </p>
                                            </div>

                                            {/* Tamamlanan Paket */}
                                            <div className='flex items-center mb-3 sm:mb-4 md:mb-5 lg:mb-5'>
                                                <p className='w-10 text-3xl font-semibold BlueText mr-8'>
                                                    0
                                                </p>
                                                <p className='font-semibold text-sm'>
                                                    Tamamlanan Paket
                                                </p>
                                            </div>

                                            {/* Onaylanan İçerik */}
                                            <div className='flex items-center mb-5'>
                                                <p className='w-10 text-3xl font-semibold BlueText mr-8'>
                                                    0
                                                </p>
                                                <p className='font-semibold text-sm'>
                                                    Onaylanan İçerik
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sipariş Detay Box 2 */}
                        <div className='font-semibold mb-3'>Paketlerim</div>
                        <div className='bg-white p-4 pb-3 mb-3 sm:p-5 sm:pb-3.5 sm:mb-4 md:p-6 md:pb-4 md:mb-5 lg:p-6 lg:pb-4 lg:mb-5'>
                            {packages.length > 0 ? (
                                packages.map((pkg: any) => (
                                    <div
                                        key={pkg.id}
                                        className='flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-end lg:space-x-28 mb-4'
                                    >
                                        {/* First Section */}
                                        <div className='bg-white rounded-md'>
                                            <h3 className='text-lg font-semibold mb-3 sm:mb-4 md:mb-5 lg:mb-5 BlueText'>
                                                {pkg.name}
                                            </h3>
                                            <div className='grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                                                {/* Paket Durumu */}
                                                <div className='text-gray-700'>
                                                    Paket Durumu:
                                                </div>
                                                <div className='text-right BlueText font-semibold'>
                                                    {pkg.status}
                                                </div>

                                                {/* Sipariş Tarihi */}
                                                <div className='text-gray-700'>
                                                    Sipariş Tarihi:
                                                </div>
                                                <div className='text-right BlueText font-semibold'>
                                                    {pkg.orderDate}
                                                </div>

                                                {/* Kalan İçerik */}
                                                <div className='text-gray-700'>
                                                    Kalan İçerik:
                                                </div>
                                                <div className='text-right BlueText font-semibold'>
                                                    {pkg.remainingContent}
                                                </div>

                                                {/* İçerik Sayısı */}
                                                <div className='text-gray-700'>
                                                    İçerik Sayısı:
                                                </div>
                                                <div className='text-right BlueText font-semibold'>
                                                    {pkg.totalContent}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Second Section (Button) */}
                                        <div className=''>
                                            <button
                                                onClick={openModal}
                                                className='mt-4 lg:mt-0 border BlueBorder BlueText font-semibold px-2 sm:px-3 md:px-4 lg:px-4 py-1 rounded-lg'
                                            >
                                                Detaylar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-center text-gray-500'>
                                    Paket mevcut değil.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                title=''
            >
                <ViewPackage />
            </CustomModal>
        </>
    );
}
