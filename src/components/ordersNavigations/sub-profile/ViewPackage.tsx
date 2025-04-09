import React from "react";

function ViewPackage() {
    return (
        <>
            {/* model */}
            <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
                {/* First Box: Fields and Profile Section */}
                <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                        <div className='col-span-2'>
                            <div className='mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                <label className='block text-gray-700 font-semibold'>
                                    İçerikleriniz
                                </label>
                                <span className='text-gray-900'>
                                    İçerik üreticiler içeriklerinizi
                                    hazırladığında bu sayfada görünecektir.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='text-xs lg:text-sm bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                    <table className='min-w-full bg-white'>
                        <thead>
                            <tr>
                                <th className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    No
                                </th>
                                <th className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    İçerik Üretici No
                                </th>
                                <th className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    Bağlantı
                                </th>
                                <th className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    Yükleme Tarihi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    1
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    128510
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    <a
                                        className='BlueText'
                                        href='#'
                                    >
                                        http://we.tl/send/
                                    </a>
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    23/09/2024
                                </td>
                            </tr>
                            <tr>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    2
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    67846
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    <a
                                        className='BlueText'
                                        href='#'
                                    >
                                        http://we.tl/send/7431
                                    </a>
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    23/09/2024
                                </td>
                            </tr>
                            <tr>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    3
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    95378
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    <a
                                        className='BlueText'
                                        href='#'
                                    >
                                        http://we.tl/send/3523
                                    </a>
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-1 sm:px-1 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    30/09/2024
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='flex flex-col lg:flex-row lg:space-x-28'>
                    {/* Paket Bilgileri Section */}
                    <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                        <h3 className='text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                            Paket Bilgileri:
                        </h3>
                        <div className='grid grid-cols-2 gap-0.5 sm:gap-0.5 md:gap-4 lg:gap-4'>
                            {/* Ödeme No */}
                            <div className='text-gray-700'>Ödeme No:</div>
                            <div className='text-right BlueText font-medium lg:font-semibold'>
                                201240184112
                            </div>

                            {/* Ödeme Tarihi */}
                            <div className='text-gray-700'>Ödeme Tarihi:</div>
                            <div className='text-right BlueText font-medium lg:font-semibold'>
                                19/09/2024
                            </div>

                            {/* İçerik Sayısı */}
                            <div className='text-gray-700'>İçerik Sayısı:</div>
                            <div className='text-right BlueText font-medium lg:font-semibold'>
                                9 / 12
                            </div>

                            {/* Paket Durumu */}
                            <div className='text-gray-700'>Paket Durumu:</div>
                            <div className='text-right BlueText font-medium lg:font-semibold'>
                                Aktif / Tamamlandı / İptal
                            </div>

                            {/* Fatura */}
                            <div className='text-gray-700'>Fatura:</div>
                            <div className='text-right BlueText font-medium lg:font-semibold'>
                                <a
                                    href='https://we.tl/send/5323'
                                    className='underline whitespace-normal lg:whitespace-nowrap'
                                >
                                    https://we.tl/send/5323
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sipariş Özeti Section */}
                    <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                        <h3 className='text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                            Sipariş Özeti:
                        </h3>
                        <div className='grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-11'>
                            {/* 12 Video */}
                            <div className='text-gray-700 flex flex-col font-semibold'>
                                12 Video{" "}
                                <span className='text-xs font-medium'>
                                    2.500 TL/Video
                                </span>
                            </div>
                            <div className='text-right BlueText font-semibold'>
                                30.000 TL
                            </div>

                            {/* 12 Edit */}
                            <div className='text-gray-700 flex flex-col font-semibold'>
                                12 Edit{" "}
                                <span className='text-xs font-medium'>
                                    500 TL/Video
                                </span>
                            </div>
                            <div className='text-right BlueText font-semibold'>
                                30.000 TL
                            </div>

                            {/* Toplam */}
                            <div className='text-gray-700 font-semibold'>
                                Toplam
                            </div>
                            <div className='text-right BlueText font-semibold'>
                                36.000 TL
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex'>
                    <div className='bg-white rounded-md w-full lg:w-1/3'>
                        <h2 className='BlueText text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            İçerik Detayı:
                        </h2>
                        <div className='flex justify-between  mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>Platform:</p>
                            <p className='BlueText font-semibold'>Meta</p>
                        </div>

                        <div className='flex justify-between  mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>Süre:</p>
                            <p className='BlueText font-semibold'>15s</p>
                        </div>

                        <div className='flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>Edit:</p>
                            <p className='BlueText font-semibold'>Evet</p>
                        </div>

                        <div className='flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>En Boy Oranı:</p>
                            <p className='BlueText font-semibold'>9:16</p>
                        </div>

                        <div className='flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>
                                Sosyal Medya Paylaşım:
                            </p>
                            <p className='BlueText font-semibold'>Hayır</p>
                        </div>

                        <div className='flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>Kapak Görseli:</p>
                            <p className='BlueText font-semibold'>Hayır</p>
                        </div>

                        <div className='flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>Influencer Seçimi:</p>
                            <p className='BlueText font-semibold'>Nano</p>
                        </div>

                        <div className='flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>Ürün Gönderimi:</p>
                            <p className='BlueText font-semibold'>Hayır</p>
                        </div>

                        <div className='flex justify-between mb-2 sm:mb-2 md:mb-3 lg:mb-3'>
                            <p className='font-medium'>İçerik Türü:</p>
                            <p className='BlueText font-semibold'>Hizmet</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPackage;
