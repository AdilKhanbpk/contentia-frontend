"use client";

import Image from "next/image";
import React from "react";
import { SectionHeader } from "../Contentiaio";

const METRICS = [
    {
        image: "/roiImage.jpg",
        alt: "ROI Image",
        buttonText: "%50 Etkileşim Artışı",
        description:
            "Gerçek kullanıcılar tarafından ​oluşturulan içeriklerle %50'ye varan ​Etkileşim ve %20'ye varan ROI artışı ​sağlanıyor.",
    },
    {
        image: "/ctrIncrease.jpg",
        alt: "CTR Image",
        buttonText: "%73 Tıklanma Oranı Artışı",
        description:
            "UGC içeren reklam kampanylarında ​%73'e varan Tıklanma Oranı (CTR) ​artışı ve %50'ye varan Tıklanma ​Maliyeti düşüşü gözlemleniyor.",
    },
    {
        image: "/cpiImage.jpg",
        alt: "CPI Image",
        buttonText: "85% Gü​venilirlik Artışı",
        description:
            "Kullanıcıların %85'i Influencer’lar ​tarafından üretilen içerikleri daha ​güvenilir buluyor.",
    },
];

export default function SuccessRates() {
    return (
        <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
            <SectionHeader title='Başarı Oranları' />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-4 md:mx-10'>
                {METRICS.map((metric, index) => (
                    <div
                        key={index}
                        className='relative flex flex-col w-full'
                    >
                        <div className='relative w-full h-[450px]'>
                            <Image
                                className='object-cover rounded-3xl'
                                src={metric.image}
                                alt={metric.alt}
                                layout='fill'
                            />
                            <button className='button absolute bottom-0 left-0 w-full rounded-3xl'>
                                {metric.buttonText}
                            </button>
                        </div>
                        <p className='paraTextTwo mt-5'>{metric.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
