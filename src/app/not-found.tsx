// app/404.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const Custom404 = () => {
    const router = useRouter();
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='text-center p-8 bg-white shadow-lg rounded-md w-[80%] sm:w-[60%] md:w-[40%]'>
                <h1 className='text-7xl font-extrabold text-red-500'>404</h1>
                <p className='mt-6 text-2xl text-gray-700'>
                    Üzgünüm! Aradığınız sayfa bulunamadı.
                </p>
                <div className='mt-8 flex justify-center gap-6'>
                    <button
                        onClick={() => router.back()}
                        className='px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg'
                    >
                        Geri Git
                    </button>
                    <Link
                        href='/'
                        className='px-6 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-md text-lg'
                    >
                        Ana Sayfaya Git
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Custom404;
