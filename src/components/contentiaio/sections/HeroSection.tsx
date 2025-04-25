"use client";
import React from "react";
import { LoadingSkeleton } from "../Contentiaio";
import MyCarousel from "@/components/carousel/MyCarousel";
import DOMPurify from "dompurify";
import Link from "next/link";

interface HeroSectionProps {
    landingPage: any;
    landingPageLoading: boolean;
    landingPageError: string | null;
}

export default function HeroSection({
    landingPage,
    landingPageLoading,
    landingPageError,
}: HeroSectionProps) {
    return (
        <div className='flex flex-col lg:flex-row w-full pt-24  md:pt-24 lg:pt-[180px] lg:justify-between'>
            {landingPageLoading ? (
                <LoadingSkeleton />
            ) : landingPageError ? (
                <p className='text-red-500'>Error: {landingPageError}</p>
            ) : (
                <>
                    <div className='flex flex-col'>
                        <h1 className='headingText mb-5'>
                            <span className='headingTextBlue'>
                                {landingPage?.carouselHeroTitle}
                            </span>
                            <span className='ml-2'>
                                {landingPage?.staticHeroTitle}
                            </span>
                        </h1>

                        <div className='mx-3'>
                            {landingPage?.heroSubTitle && (
                                <p
                                    className='paraText mb-5'
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            landingPage.heroSubTitle
                                        ),
                                    }}
                                />
                            )}
                        </div>

                        {landingPage && (
                            <div>
                                <Link href='/siparis-olustur'>
                                    <button className='Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                        UGC Siparişini Oluştur
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className='lg:w-1/2 w-full lg:ml-2 mx-auto'>
                        <MyCarousel videos={landingPage?.videos || []} />
                    </div>
                </>
            )}
        </div>
    );
}
