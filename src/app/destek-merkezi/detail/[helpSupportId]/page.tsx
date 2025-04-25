"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchHelpSupportById } from "@/store/features/admin/helpSlice";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface PageProps {
    params: {
        helpSupportId: string;
    };
}

const DetailsPage: React.FC<PageProps> = ({ params }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentHelpSupport, loading, error } = useSelector(
        (state: RootState) => state.helpSupport
    );
    const router = useRouter();
    console.log("🚀 ~ useEffect ~ helpSupportId:", params.helpSupportId);

    useEffect(() => {
        if (params.helpSupportId) {
            dispatch(
                fetchHelpSupportById({ helpSupportId: params.helpSupportId })
            );
        }
    }, [dispatch, params.helpSupportId]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500'></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-xl text-red-500'>{error}</p>
                <button
                    onClick={() => router.push("/")}
                    className='mt-4 px-4 py-2 Button text-white rounded-lg shadow-md hover:bg-blue-600 transition'
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-32 '>
            <div className=' py-24 sm:py-24 md:py-24 lg:py-[100px]'>
                <div className=' p-2 sm:p-4 md:p-8 lg:px-12 lg:py-8'>
                    <div>
                        <h4 className='text-gray-600'>
                            {currentHelpSupport?.category}
                        </h4>
                        <h1 className='mt-2 text-3xl font-bold text-gray-800'>
                            {currentHelpSupport?.title}
                        </h1>
                        <div className='flex gap-3 p-2 items-center rounded-md mt-9 mb-4 bg-gray-200'>
                            <CiSearch size={20} />
                            <input
                                type='text'
                                placeholder='Destek almak istediğiniz konu nedir?'
                                className='outline-none w-full py-1 bg-gray-200'
                                aria-label='Search'
                            />
                        </div>
                    </div>

                    <div className='flex text-sm mt-6 space-x-3 flex-wrap pb-2'>
                        <div className='flex items-center'>
                            <span>All Collections</span>
                            <span className='text-xl'>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <span>Sipariş Oluşturma</span>
                            <span className='text-xl'>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <span>Order A Video</span>
                            <span className='text-xl'>
                                <MdOutlineKeyboardArrowRight />
                            </span>
                        </div>
                        <span className='text-gray-500'>
                            Getting Started Guide for Brands
                        </span>
                    </div>

                    <div className='flex md:flex-row flex-col items-start justify-start mt-6 '>
                        <div
                            className='prose prose-sm sm:prose lg:prose-lg max-w-none mt-6 text-gray-700'
                            dangerouslySetInnerHTML={{
                                __html: currentHelpSupport?.content || "",
                            }}
                        />

                        <div className='flex flex-col gap-6 border-l-2 pl-5 md:ml-9 mt-8 md:mt-0'>
                            <p className='whitespace-nowrap'>UGC Siparişi</p>
                            <p className='whitespace-nowrap'>Paket Seçimi</p>
                            <p className='whitespace-nowrap'>Marka Ekleme</p>
                            <p className='whitespace-nowrap'>İçerik Türleri</p>
                            <p className='whitespace-nowrap'>
                                İçerik Üreticileri Tercihi
                            </p>
                            <p className='whitespace-nowrap'>Ek Hizmetler</p>
                            <p className='whitespace-nowrap'>
                                Ödeme ve Faturalandırma
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
