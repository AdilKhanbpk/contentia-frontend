"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SmallCard from '../customCard/SmallCard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
    fetchFaqs,
} from "@/store/features/admin/faqSlice";
import {
    fetchHowItWorks,
} from "@/store/features/admin/howWorkSlice";



// Define the FAQProps interface to specify the shape of the FAQ items
interface FAQProps {
    question: string;
    answer: string;
}

const cards = [
    {
        "image": "/image1.webp",
        "title": "RESULTS_DRIVEN",
        "description": "RESULTS_DRIVEN_DESC"
    },
    {
        "image": "/image2.webp",
        "title": "FAST_AND_EASY",
        "description": "FAST_AND_EASY_DESC"
    },
    {
        "image": "/image3.webp",
        "title": "DEDICATED_MANAGER",
        "description": "DEDICATED_MANAGER_DESC"
    },
    {
        "image": "/image4.webp",
        "title": "NO_SURPRISES",
        "description": "NO_SURPRISES_DESC"
    },
    {
        "image": "/image5.webp",
        "title": "VETTED_CREATORS",
        "description": "VETTED_CREATORS_DESC"
    },
    {
        "image": "/image6.webp",
        "title": "CUSTOM_VIDEOS",
        "description": "CUSTOM_VIDEOS_DESC"
    }
];


export default function HowItWorks() {

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { faqs, loading } = useSelector((state: RootState) => state.faq);
    console.log("faq from the component", faqs);

    const { sections } = useSelector(
        (state: RootState) => state.howWork
    );

    console.log("sections from the component", sections);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const { t } = useTranslation();

    useEffect(() => {
        console.log("useEffect triggered");

        const tokenFromStorage = localStorage.getItem('accessToken');
        console.log("Token from localStorage:", tokenFromStorage);

        if (tokenFromStorage) {
            console.log("Token exists. Dispatching fetchFaqs...");
            dispatch(fetchFaqs(tokenFromStorage));
        } else {
            console.log("No token found in localStorage.");
        }
    }, [dispatch]);

    // Fetch data on mount
    useEffect(() => {
        console.log("Initialization - Component Mounted");

        const token = localStorage.getItem("accessToken");
        console.log("Token from localStorage:", token);

        if (token) {
            console.log("Token found. Fetching data with token...");
            dispatch(fetchHowItWorks(token) as any);
        } else {
            console.log("No token found in localStorage.");
        }

        return () => {
            console.log("Cleanup - Component Unmounted");
        };
    }, [dispatch]);

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-[38px] '>
                {/* /////////////// */}

                <div className="pt-24 sm:pt-24 md:pt-24 lg:pt-[180px]">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="headingText mb-3">{sections[0]?.sectionTitle || "Nasıl Çalışır?"}</h1>
                            <div className="imageRotate">
                                <Image
                                    src="/borderImage.svg"
                                    height={300}
                                    width={270}
                                    alt="border image"
                                    className="h-100 w-100"
                                />
                            </div>
                        </div>
                        <p className="paraTextTwo mb-14">
                            {sections[0]?.sectionDescription}
                        </p>
                    </div>
                    {/* Updated container for dynamic steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {sections[0]?.steps?.map((step: any, index: number) => (
                            <div key={index}>
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center">
                                        <h1 className="headingTextBlue mr-2">{index + 1}</h1>
                                        <div className="headingTextTwo">{step.title}</div>
                                    </div>
                                    <div>
                                        <p className="paraTextTwo">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                {/* //////////// */}

                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="headingText mb-3">Sıkça Sorulan Sorular</h1>
                        <div className="imageRotate">
                            <Image
                                src="/borderImage.svg"
                                height={300}
                                width={270}
                                alt="border image"
                                className="h-100 w-100"
                            />
                        </div>
                    </div>

                    {/* FAQ items */}
                    <div className='space-y-4'>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={` p-4 rounded-lg `}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className='flex justify-between items-center cursor-pointer'>
                                    <div className='flex items-center'>
                                        <Image width={20} height={20} src='/icons/ArrowRight.svg' className='w-6 h-6 text-[#5d5dbd] mr-2' alt="arrow icon" />
                                        <h2 className='font-semibold text-lg'>{faq.question}</h2>
                                    </div>
                                    <Image width={20} height={20} src='/icons/plus.svg' className='w-6 h-6 text-[#5d5dbd]' alt="plus icon" />
                                </div>

                                {/* FAQ Answer */}
                                {openIndex === index && (
                                    <div className='mt-4 paraTextTwo '>
                                        {faq.answer}
                                    </div>
                                )}

                                <div className="w-full h-1 sectionBG mt-4"></div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* ////////////////// */}


                <div className='w-full ml-2  mt-10 sm:mt-10 md:mt-16 lg:mt-20'>
                    <div>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="headingText mb-3">Sağlanan Faydalar</h1>
                            <div className="imageRotate">
                                <Image
                                    src="/borderImage.svg"
                                    height={300}
                                    width={270}
                                    alt="border image"
                                    className="h-100 w-100"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {cards.map((card, index) => (
                                <SmallCard
                                    key={index}
                                    image={card.image}
                                    title={t(card.title)}
                                    description={t(card.description)}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center items-center mt-8">
                            <div>
                                <button className="Button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline">

                                    Fiyatlar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ///////////////////////// */}
                {/* //////////////////// */}

                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText mb-3'>Neden Contentia?</h1>
                        <div className='imageRotate'>
                            <Image
                                src="/borderImage.svg"
                                height={300}
                                width={270}
                                alt="border image"
                                className="object-contain" // Use object-contain to maintain aspect ratio
                            />
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <Image
                        className='object-cover rounded-3xl w-full h-auto'
                        src="/whyContentia.png"
                        alt='videoCarousal'
                        width={1500}
                        height={1500}
                    />
                </div>

                {/* ///////////////// */}

            </div>
        </>
    );
}
