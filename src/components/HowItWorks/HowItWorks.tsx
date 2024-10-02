"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import SmallCard from '../customCard/SmallCard';
import { useTranslation } from 'react-i18next';



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

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs: FAQProps[] = [
        { question: 'Contentia.io Nedir?', answer: 'Contentia.io, kullanıcıların içerik üreticilerle eşleştiği ve içeriklerini talep ettiği bir platformdur.' },
        { question: 'Contentia.io Nedir?', answer: 'Contentia.io, kullanıcıların içerik üreticilerle eşleştiği ve içeriklerini talep ettiği bir platformdur.' },
        { question: 'Contentia.io Nedir?', answer: 'Contentia.io, kullanıcıların içerik üreticilerle eşleştiği ve içeriklerini talep ettiği bir platformdur.' },
        { question: 'Contentia.io Nedir?', answer: 'Contentia.io, kullanıcıların içerik üreticilerle eşleştiği ve içeriklerini talep ettiği bir platformdur.' },
    ];

    const { t } = useTranslation();

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-[38px] '>
                {/* /////////////// */}

                <div className=' pt-24 sm:pt-24 md:pt-24 lg:pt-[180px]'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText BlueText mb-3'>Nasıl Çalışır?</h1>
                        <div className='imageRotate'>
                            <Image
                                src="/borderImage.svg"
                                height={300}
                                width={270}
                                alt="border image"
                                className="object-contain" // Use object-contain to maintain aspect ratio
                            />
                        </div>
                        <p className='paraTextTwo mb-14'>Tek bir platformda, UGC içeriklerine kolayca erişin</p>
                    </div>
                    {/* Updated container for 2x2 grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {/* First Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>1</h1>
                                    <div className='headingTextTwo'>İhtiyacınızı belirleyin</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>
                                        Tanıtmak istediğiniz marka, ürün, hizmet, yenilik veya kampanya gibi içerik üreticilere neden ihtiyacınız olduğunu belirleyin
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Second Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>2</h1>
                                    <div className='headingTextTwo'>Paketinizi Seçin</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>
                                        Amacınızı belirledikten sonra içerik üretimine ihtiyaç duyduğunuz içerik sayısına göre seçim yapın ve istediğiniz UGC'leri detaylandırın
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Third Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>3</h1>
                                    <div className='headingTextTwo'>İçerik Üreticilerle Eşleşin</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>
                                        İhtiyacınıza yönelik içerik üreticilerle eşleşin ve talepleriniz doğrultusunda içeriklerinizi üretelim
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fourth Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>4</h1>
                                    <div className='headingTextTwo'>Kaliteli ve güvenilir UGC'lere erişin</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>
                                        Ürün ve hizmetlerinize özel hazırlanmış UGC'lere Contentia üzerinden erişin ve dilediğiniz platformda kullanın
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                {/* //////////// */}

                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText BlueText mb-3'>Sıkça Sorulan Sorular</h1>
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
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='headingText BlueText mb-3'>
                                Sağlanan Faydalar</h1>
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
