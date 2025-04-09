"use client";

import CustomCard from "@/components/customCard/CustomCard";
import React from "react";
import { SectionHeader } from "../Contentiaio";
import { useRouter } from "next/navigation";
import { PricePlan } from "@/store/features/admin/pricingSlice";

interface PackagesProps {
    packages: PricePlan[];
    packagesLoading: boolean;
    packagesError: string | null;
}

export default function Packages({
    packages,
    packagesLoading,
    packagesError,
}: PackagesProps) {
    const router = useRouter();
    const handleOrderClick = () => {
        router.push("/orders");
    };
    return (
        <div className='w-full ml-2 mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
            <SectionHeader title='Fiyatlandırma' />
            <div>
                <p className='paraText text-center mb-8'>
                    İhtiyaçlarınıza uygun paketleri inceleyin ve avantajlı
                    fiyatlardan yararlanın.
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {packagesLoading ? (
                        <p>Loading Packages...</p>
                    ) : (
                        packages &&
                        packages.map((pkg: any, index: any) => (
                            <CustomCard
                                key={index}
                                title={pkg.title}
                                description={pkg.description}
                                videoCount={pkg.videoCount}
                                durationOptions={["15s", "30s", "60s"]}
                                editingOptions={["Evet", "Hayir"]}
                                aspectRatioOptions={["9:16", "16:9"]}
                                price={pkg.finalPrice}
                                onOrderClick={handleOrderClick}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
