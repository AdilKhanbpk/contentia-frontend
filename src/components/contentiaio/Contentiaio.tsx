"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchLandingPage } from "@/store/features/admin/lanPageSlice";
import { fetchPricePlans } from "@/store/features/admin/pricingSlice";
import HeroSection from "./sections/HeroSection";
import WhyContentia from "./sections/WhyContentia";
import SuccessRates from "./sections/SuccessRates";
import Special from "./sections/Special";
import Discover from "./sections/Discover";
import Packages from "./sections/Packages";
import FourStep from "./sections/FourStep";
import SmallCards from "./sections/SmallCards";

export const LoadingSkeleton = () => (
    <div className='flex flex-col lg:flex-row w-full'>
        {/* First Half */}
        <div className='flex flex-col w-full lg:w-1/2'>
            <div className='bg-gray-200 animate-pulse w-full h-8 mb-3 rounded-md'></div>
            <div className='bg-gray-200 animate-pulse w-3/4 h-8 mb-5 rounded-md'></div>
            <div className='bg-gray-200 animate-pulse w-4/5 h-8 mb-5 rounded-md'></div>
            <div className='bg-gray-200 animate-pulse w-1/4 h-10 mb-6 rounded-md'></div>
        </div>
        {/* Second Half */}
        <div className='flex justify-center lg:w-1/2 w-full space-x-4'>
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className='w-36 h-36 bg-gray-300 animate-pulse rounded-xl'
                ></div>
            ))}
        </div>
    </div>
);

// Section header with rotating border image component
export const SectionHeader = ({ title }: { title: string }) => (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='headingText text-center mb-3'>{title}</h1>
        <div className='imageRotate'>
            <Image
                src='/borderImage.svg'
                height={300}
                width={270}
                alt='border image'
                className='h-100 w-100'
            />
        </div>
    </div>
);

export function Contentiaio() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: landingPage,
        loading: landingPageLoading,
        error: landingPageError,
    } = useSelector((state: RootState) => state.landingPage);

    const {
        data: packages,
        loading: packagesLoading,
        error: packagesError,
    } = useSelector((state: RootState) => state.pricing);

    useEffect(() => {
        // Try to fetch data, but handle potential API failures
        const fetchData = async () => {
            try {
                // Only log in development
                if (process.env.NODE_ENV !== 'production') {
                    console.log("Fetching landing page data...");
                }

                const landingPageData = await dispatch(fetchLandingPage()).unwrap();

                if (process.env.NODE_ENV !== 'production') {
                    console.log("Landing page data fetched successfully:", landingPageData);
                }
            } catch (error) {
                // In production, we'll still have mock data, so just log the error
                console.error("Failed to fetch landing page data:", error);
            }

            try {
                if (process.env.NODE_ENV !== 'production') {
                    console.log("Fetching pricing plans...");
                }

                const pricingData = await dispatch(fetchPricePlans()).unwrap();

                if (process.env.NODE_ENV !== 'production') {
                    console.log("Pricing plans fetched successfully:", pricingData);
                }
            } catch (error) {
                // In production, we'll still have mock data, so just log the error
                console.error("Failed to fetch pricing plans:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-24 '>
                <HeroSection
                    landingPage={landingPage}
                    landingPageLoading={landingPageLoading}
                    landingPageError={landingPageError}
                />

                <Discover
                    landingPage={landingPage}
                    landingPageLoading={landingPageLoading}
                    landingPageError={landingPageError}
                />

                <SmallCards />

                <FourStep />

                <SuccessRates />

                <WhyContentia />

                <div id={"fiyatlandırma"}>
                    {packages && (
                        <Packages
                            packages={packages}
                            packagesLoading={packagesLoading}
                            packagesError={packagesError}
                        />
                    )}
                </div>

                <Special />
            </div>
        </>
    );
}
