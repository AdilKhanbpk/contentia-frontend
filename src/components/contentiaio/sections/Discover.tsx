import React from "react";
import { SectionHeader } from "../Contentiaio";
import Image from "next/image";
import MyCarousel from "@/components/carousel/MyCarousel";

interface DiscoverProps {
    landingPageLoading: boolean;
    landingPageError: any; // Changed from string | null to any to handle error objects
    landingPage: any;
}

export default function Discover({
    landingPageLoading,
    landingPageError,
    landingPage,
}: DiscoverProps) {
    return (
        <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
            <SectionHeader title={"İçeriklerimizi Keşfet"} />

            <div className='flex flex-col lg:flex-row lg:justify-between lg:mx-0 mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-10'>
                <div className='w-full mb-8 sm:mb-8 md:mb-0 lg:mb-0 lg:w-1/2 mx-auto lg:ml-2'>
                    {landingPageLoading ? (
                        <div className='flex justify-center space-x-4'>
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className='w-36 h-36 bg-gray-300 animate-pulse rounded-xl'
                                />
                            ))}
                        </div>
                    ) : landingPageError ? (
                        <p className='text-red-500'>
                            Error: {typeof landingPageError === 'object'
                                ? (landingPageError.message || JSON.stringify(landingPageError))
                                : landingPageError}
                        </p>
                    ) : (
                        <MyCarousel videos={landingPage?.videos || []} />
                    )}
                </div>

                <div className='flex flex-col w-full lg:w-1/2 sm:mt-28 md:mt-28 lg:mt-9 lg:ml-8 mx-auto'>
                    <h1 className='headingTextTwo mb-3'>
                        Gerçek içeriklerin gücünü keşfedin!
                    </h1>
                    <div className=''>
                        <p className='paraText mb-5'>
                            Influencer ve dijital içerik üreticilerimizle
                            birlikte markanızı tanıtın, yenilikleri ve
                            kampanyaları duyurun{" "}
                        </p>
                    </div>
                    <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row lg:justify-between lg:mt-[94px]'>
                        <div className='flex items-center justify-center mx-auto px-10'>
                            <Image
                                src='/starIcon.svg'
                                height={100}
                                width={100}
                                alt='star icon'
                                className='xs:h-[40px] lg:h-[60px] px-4'
                            />
                            <div>
                                <h1 className='headingTextTwo text-center mb-1'>
                                    4.5/5
                                </h1>
                                <p className='paraTextTwo mb-5 text-nowrap'>
                                    Memnuniyet Oranı
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center justify-center mx-auto px-10'>
                            <Image
                                src='/usersIcon.svg'
                                height={100}
                                width={100}
                                alt='users icon'
                                className='xs:h-[35px] lg:h-[55px] pr-2'
                            />
                            <div>
                                <h1 className='headingTextTwo text-center mb-1'>
                                    18-65
                                </h1>
                                <p className='paraTextTwo mb-5 text-nowrap'>
                                    Yaş aralığı içerik üreticiler
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
