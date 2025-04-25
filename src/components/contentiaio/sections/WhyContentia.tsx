"use client";

import Image from "next/image";
import React from "react";
import { SectionHeader } from "../Contentiaio";
import Link from "next/link";

export default function WhyContentia() {
    return (
        <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
            <SectionHeader title='Neden Contentia.io?' />
            <div className='w-full'>
                <div className='overflow-x-auto mt-8'>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr className=''>
                                <th className='px-4 py-3'></th>
                                <th className='xs:w-[150px] sm:w-[300px] px-4 py-3 flex justify-center border-x-2 border-t-2 rounded-tl-md rounded-tr-md border-[#4d4ec9]'>
                                    {" "}
                                    <Image
                                        src='/contentiaLogo.png'
                                        height={44}
                                        width={151}
                                        alt='logo'
                                        className='h-[33px] w-[173px]'
                                    />
                                </th>
                                <th className='px-4 py-3 text-gray-500 text-center'>
                                    Influencer
                                </th>
                                <th className='px-4 py-3 text-gray-500 text-center'>
                                    Reklam Ajansı
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='bg-white'>
                                <td className='px-4 py-3 font-bold text-gray-500'>
                                    Uygun Fiyat
                                </td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                            </tr>
                            <tr className='bg-gray-50'>
                                <td className='px-4 py-3 font-bold text-gray-500'>
                                    Hızlı Çözüm
                                </td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 bg-white text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                            </tr>
                            <tr className='bg-white'>
                                <td className='px-4 py-3 font-bold text-gray-500'>
                                    Erişim Kolaylığı
                                </td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                            </tr>
                            <tr className='bg-gray-50  text-gray-500'>
                                <td className='px-4 py-3 font-bold'>
                                    Kişiselleştirme
                                </td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 bg-white text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>{" "}
                                </td>
                            </tr>
                            <tr className='bg-white text-gray-500'>
                                <td className='px-4 py-3 font-bold'>
                                    Ölçeklenebilirlik
                                </td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>{" "}
                                </td>
                            </tr>
                            <tr className='bg-gray-50 text-gray-500'>
                                <td className='px-4 py-3 font-bold'>
                                    Orjinallik
                                </td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 bg-white text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>{" "}
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                            </tr>
                            <tr className='bg-white'>
                                <td className='px-4 py-3 font-bold text-gray-500'>
                                    Paylaşıma Hazırlık
                                </td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-xl text-gray-500'>
                                        x
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-center'>
                                    <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                        ✓
                                    </span>{" "}
                                </td>
                            </tr>

                            <tr className='bg-white'>
                                <td className='px-4 py-3'></td>
                                <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-x-2 border-b-2 rounded-bl-lg rounded-br-lg border-[#4d4ec9]'>
                                    <Link href='/siparis-olustur'>
                                        <button className='Button xs:text-xs sm:text-base text-white font-bold py-3 px-4 !rounded-full focus:outline-none focus:shadow-outline'>
                                            UGC Siparişini Oluştur{" "}
                                        </button>
                                    </Link>
                                </td>

                                <td className='px-4 py-3'></td>
                                <td className='px-4 py-3'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>{" "}
            </div>
        </div>
    );
}
