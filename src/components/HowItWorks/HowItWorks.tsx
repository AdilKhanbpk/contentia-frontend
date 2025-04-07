"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SmallCard from "../customCard/SmallCard";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchFaqs } from "@/store/features/admin/faqSlice";
import { fetchHowItWorks } from "@/store/features/admin/howWorkSlice";
import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/checkToken";
import DOMPurify from "dompurify";

const cards = [
    {
        image: "/image1.webp",
        title: "RESULTS_DRIVEN",
        description: "RESULTS_DRIVEN_DESC",
    },
    {
        image: "/image2.webp",
        title: "FAST_AND_EASY",
        description: "FAST_AND_EASY_DESC",
    },
    {
        image: "/image3.webp",
        title: "DEDICATED_MANAGER",
        description: "DEDICATED_MANAGER_DESC",
    },
    {
        image: "/image4.webp",
        title: "NO_SURPRISES",
        description: "NO_SURPRISES_DESC",
    },
    {
        image: "/image5.webp",
        title: "VETTED_CREATORS",
        description: "VETTED_CREATORS_DESC",
    },
    {
        image: "/image6.webp",
        title: "CUSTOM_VIDEOS",
        description: "CUSTOM_VIDEOS_DESC",
    },
];

export default function HowItWorks() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { faqs } = useSelector((state: RootState) => state.faq);
    const { sections } = useSelector((state: RootState) => state.howWork);
    const { t } = useTranslation();

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;

        const fetchData = async () => {
            try {
                await dispatch(fetchFaqs(token)).unwrap();
                toast.success("FAQs fetched successfully");
            } catch {
                toast.error("Failed to fetch FAQs");
            }

            try {
                await dispatch(fetchHowItWorks(token)).unwrap();
                toast.success("Data fetched successfully");
            } catch {
                toast.error("Failed to fetch data");
            }
        };

        fetchData();
    }, [dispatch]);

    const isLoading = !sections.length || !faqs.length;

    if (isLoading) {
        return (
            <div className='w-full flex justify-center items-center py-24'>
                <p className='text-xl font-medium text-gray-600'>
                    Yükleniyor...
                </p>
            </div>
        );
    }

    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-[38px]'>
            {/* HOW IT WORKS */}
            <div className='pt-24 lg:pt-[180px]'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='headingText mb-3 text-center'>
                        {sections[0]?.sectionTitle || "Nasıl Çalışır?"}
                    </h1>
                    <div className='imageRotate'>
                        <Image
                            src='/borderImage.svg'
                            height={300}
                            width={270}
                            alt='border image'
                            className='h-100 w-100'
                        />
                    </div>
                    <p className='paraTextTwo mb-14'>
                        {sections[0]?.sectionDescription}
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    {sections[0]?.steps?.map((step: any, index: number) => (
                        <div key={index}>
                            <div className='flex flex-row items-start gap-4'>
                                {/* Left: Number */}
                                <div className='headingTextBlue min-w-[40px]'>
                                    {index + 1}
                                </div>

                                {/* Right: Title & Description */}
                                <div>
                                    <div className='headingTextTwo mb-2'>
                                        {step.title}
                                    </div>
                                    <p className='paraTextTwo'>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className='mt-20'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='headingText mb-3 text-center'>
                        Sıkça Sorulan Sorular
                    </h1>
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

                <div className='space-y-4 mt-6'>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className='p-4 rounded-lg cursor-pointer'
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <Image
                                        width={20}
                                        height={20}
                                        src='/icons/ArrowRight.svg'
                                        className='w-6 h-6 text-[#5d5dbd] mr-2'
                                        alt='arrow icon'
                                    />
                                    <h2 className='font-semibold text-lg'>
                                        {faq.question}
                                    </h2>
                                </div>
                                <Image
                                    width={20}
                                    height={20}
                                    src={
                                        openIndex === index
                                            ? "/icons/minus.svg"
                                            : "/icons/plus.svg"
                                    }
                                    className='w-6 h-6 text-[#5d5dbd]'
                                    alt='toggle icon'
                                />
                            </div>
                            {openIndex === index && faq.answer && (
                                <p
                                    className='mt-4 paraTextTwo'
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(faq.answer),
                                    }}
                                />
                            )}
                            <div className='w-full h-1 sectionBG mt-4'></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BENEFITS */}
            <div className='mt-20'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='headingText mb-3'>Sağlanan Faydalar</h1>
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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                    {cards.map((card, index) => (
                        <SmallCard
                            key={index}
                            image={card.image}
                            title={t(card.title)}
                            description={t(card.description)}
                        />
                    ))}
                </div>
                <div className='flex justify-center items-center mt-8'>
                    <Link href='/pricing'>
                        <button className='Button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline'>
                            Fiyatlar
                        </button>
                    </Link>
                </div>
            </div>

            {/* WHY CONTENTIA */}
            <div className='mt-24'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='headingText mb-3 text-center'>
                        Neden Contentia?
                    </h1>
                    <div className='imageRotate'>
                        <Image
                            src='/borderImage.svg'
                            height={300}
                            width={270}
                            alt='border image'
                            className='object-contain'
                        />
                    </div>
                </div>

                <div className='w-full mt-6'>
                    <Image
                        className='object-cover rounded-3xl w-full h-auto'
                        src='/whyContentia.png'
                        alt='why Contentia'
                        width={1500}
                        height={1500}
                    />
                </div>
            </div>
        </div>
    );
}
