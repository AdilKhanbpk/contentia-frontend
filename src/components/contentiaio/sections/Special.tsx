"use client";

import Image from "next/image";
import React from "react";

export default function Special() {
    return (
        <div className='yellowGradient px-4 md:px-10 lg:px-24 py-6 md:py-8 my-10 rounded-3xl'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 lg:gap-36'>
                <div className='relative flex-shrink-0 w-[250px] h-[400px]'>
                    <Image
                        fill
                        className='rounded-3xl object-contain'
                        src='/phonePic.png'
                        alt='phone'
                    />
                </div>

                <div className='flex flex-col justify-center text-center md:text-left'>
                    <h1 className='headingTextTwo mb-2 text-lg md:text-xl lg:text-2xl'>
                        Özel tekliflerden yararlanın
                    </h1>
                    <p className='paraTextTwo mb-4 text-sm md:text-base lg:text-lg'>
                        Paket seçeneklerimizden fazlasına mı ihtiyacınız var?
                        Ajans olarak birden çok ​marka ve müşteriye mi hizmet
                        veriyorsunuz?
                    </p>
                    <p className='paraTextTwo mb-4 text-sm md:text-base lg:text-lg'>
                        Hemen iletişime geçin, ihtiyacınıza özel tekliflerden
                        faydalanın
                    </p>
                    <div className='flex justify-center'>
                        <div>
                            <button className='Button text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline'>
                                İletişime Geç{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
