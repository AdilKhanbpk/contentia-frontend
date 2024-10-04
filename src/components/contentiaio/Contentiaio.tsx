"use client";
import React from 'react';
import Image from 'next/image';
import MyCarousel from '@/components/carousel/MyCarousel';
import CustomCard from '@/components/customCard/CustomCard';
import { useTranslation } from 'react-i18next';
import SmallCard from '@/components/customCard/SmallCard';
import { useRouter } from 'next/navigation';

const videos = [
    '/videos/firstVideo.mp4',
    '/videos/secondVideo.mp4',
    '/videos/thirdVideo.mp4',
    '/videos/firstVideo.mp4',
    '/videos/secondVideo.mp4',
    '/videos/thirdVideo.mp4',
    '/videos/thirdVideo.mp4',
    '/videos/firstVideo.mp4'
];

const cards = [
    {
        "image": "image1.webp",
        "title": "RESULTS_DRIVEN",
        "description": "RESULTS_DRIVEN_DESC"
    },
    {
        "image": "image2.webp",
        "title": "FAST_AND_EASY",
        "description": "FAST_AND_EASY_DESC"
    },
    {
        "image": "image3.webp",
        "title": "DEDICATED_MANAGER",
        "description": "DEDICATED_MANAGER_DESC"
    },
    {
        "image": "image4.webp",
        "title": "NO_SURPRISES",
        "description": "NO_SURPRISES_DESC"
    },
    {
        "image": "image5.webp",
        "title": "VETTED_CREATORS",
        "description": "VETTED_CREATORS_DESC"
    },
    {
        "image": "image6.webp",
        "title": "CUSTOM_VIDEOS",
        "description": "CUSTOM_VIDEOS_DESC"
    }
];


export default function Contentiaio() {

    const { t } = useTranslation();
    const router = useRouter(); // Initialize the router



    const handleOrderClick = () => {
        router.push('/orders'); // Navigate to the orders page
    };

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-[38px] '>
                <div className='flex flex-col lg:flex-row lg:justify-between pt-12 sm:pt-16 md:pt-24 lg:pt-[180px]'>
                    <div className='flex flex-col lg:w-1/2 w-full lg:mt-0 mt-9 mx-auto'>
                        <h1 className='headingText mb-3' dangerouslySetInnerHTML={{ __html: t('header') }} />
                        <div className='mx-3'>
                            <p className='paraText mb-5'>{t('promoText1')}</p>
                            <p className='paraText mb-14'>{t('promoText2')}</p>
                        </div>
                        <div className="">
                            <div>
                                <button className="Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    {t('buttonText')}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='lg:w-1/2 w-full lg:ml-2 mx-auto'>
                        <MyCarousel videos={videos} />
                    </div>
                </div>


                {/* /////////////////// */}

                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText mb-3'>{t('discoverContentHeader')}</h1>
                        <div className='imageRotate'>
                            <Image
                                src="/borderImage.svg"
                                height={300}
                                width={270}
                                alt="border image"
                                className="h-100 w-100"
                            />
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row lg:justify-between lg:mx-0 mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-10'>
                        <div className='w-full mb-8 sm:mb-8 md:mb-0 lg:mb-0 lg:w-1/2 mx-auto lg:ml-2'>
                            <MyCarousel videos={videos} />
                        </div>

                        <div className='flex flex-col w-full lg:w-1/2 sm:mt-28 md:mt-28 lg:mt-9 lg:ml-8 mx-auto'>
                            <h1 className='headingTextTwo mb-3'>{t('discoverContentHeader')}</h1>
                            <div className=''>
                                <p className='paraText mb-5'>{t('discoverContentText')}</p>
                            </div>
                            <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row lg:justify-between lg:mt-[94px]'>
                                <div className="flex flex-row sm:flex-row md:flex-row lg:flex-row lg:-ml-14 mx-auto">
                                    <Image
                                        src="/starIcon.svg"
                                        height={44}
                                        width={151}
                                        alt="star icon"
                                        className="h-[60px] w-[170px]"
                                    />
                                    <div>
                                        <h1 className='headingTextTwo mb-1'>{t('satisfactionRate')}</h1>
                                        <p className='paraTextTwo mb-5'>{t('satisfactionRateText')}</p>
                                    </div>
                                </div>

                                <div className="flex flex-row sm:flex-row md:flex-row lg:flex-row mx-auto">
                                    <Image
                                        src="/usersIcon.svg"
                                        height={44}
                                        width={151}
                                        alt="users icon"
                                        className="h-[60px] w-[170px]"
                                    />
                                    <div>
                                        <h1 className='headingTextTwo mb-1'>{t('ageRange')}</h1>
                                        <p className='paraTextTwo mb-5'>{t('ageRangeText')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ////////////////// */}


                <div className='w-full ml-2  mt-10 sm:mt-10 md:mt-16 lg:mt-20'>
                    <div>
                        <p className='paraText text-center mb-8'>
                            {t('PAGE_TITLE')}

                        </p>
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
                                    {t('buttonText2')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ///////////////////////// */}


                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText mb-3'>{t('successRatesHeader')}</h1>
                        <div className='imageRotate'>
                            <Image
                                src="/borderImage.svg"
                                height={300}
                                width={270}
                                alt="border image"
                                className="h-100 w-100"
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-4 md:mx-10'>
                        <div className='relative flex flex-col w-full'>
                            <div className='relative w-full h-[450px]'>
                                <Image
                                    className='object-cover rounded-3xl'
                                    src="/roiImage.jpg"
                                    alt='ROI Image'
                                    layout='fill'
                                />
                                <button className='button absolute bottom-0 left-0 w-full rounded-3xl'>
                                    {t('roiIncrease')}
                                </button>
                            </div>
                            <p className='paraTextTwo mt-5'>{t('roiIncreaseText')}</p>
                        </div>

                        <div className='relative flex flex-col w-full'>
                            <div className='relative w-full h-[450px]'>
                                <Image
                                    className='object-cover rounded-3xl'
                                    src="/ctrIncrease.jpg"
                                    alt='CTR Image'
                                    layout='fill'
                                />
                                <button className='button absolute bottom-0 left-0 w-full rounded-3xl'>
                                    {t('ctrIncrease')}
                                </button>
                            </div>
                            <p className='paraTextTwo mt-5'>{t('ctrIncreaseText')}</p>
                        </div>

                        <div className='relative flex flex-col w-full'>
                            <div className='relative w-full h-[450px]'>
                                <Image
                                    className='object-cover rounded-3xl'
                                    src="/cpiImage.jpg"
                                    alt='CPI Image'
                                    layout='fill'
                                />
                                <button className='button absolute bottom-0 left-0 w-full rounded-3xl'>
                                    {t('cpiReduction')}
                                </button>
                            </div>
                            <p className='paraTextTwo mt-5'>{t('cpiReductionText')}</p>
                        </div>
                    </div>
                </div>


                {/* //////////////////// */}

                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText mb-3'>{t('whyContentiaHeader')}</h1>
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

                <div className='w-full ml-2  mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
                    <div>
                        <p className='paraText text-center mb-8'>
                            {t('checkPackages')}
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            <CustomCard
                                title={t('starterTitle')}
                                description={t('starterDescription')}
                                videoCount={3}
                                durationOptions={["15s", "30s", "60s"]}
                                editingOptions={["yes", "no"]}
                                aspectRatioOptions={["9:16", "16:9"]}
                                price={t('starterPrice')}
                                onOrderClick={handleOrderClick}
                            />

                            <CustomCard
                                title={t('launchTitle')}
                                description={t('launchDescription')}
                                videoCount={6}
                                durationOptions={["15s", "30s", "60s"]}
                                editingOptions={["yes", "no"]}
                                aspectRatioOptions={["9:16", "16:9"]}
                                price={t('launchPrice')}
                                onOrderClick={handleOrderClick}
                            />

                            <CustomCard
                                title={t('growthTitle')}
                                description={t('growthDescription')}
                                videoCount={12}
                                durationOptions={["15s", "30s", "60s"]}
                                editingOptions={["yes", "no"]}
                                aspectRatioOptions={["9:16", "16:9"]}
                                price={t('growthPrice')}
                                onOrderClick={handleOrderClick}
                            />

                            <CustomCard
                                title={t('customTitle')}
                                description={t('customDescription')}
                                videoCount={3}
                                durationOptions={["15s", "30s", "60s"]}
                                editingOptions={["yes", "no"]}
                                aspectRatioOptions={["9:16", "16:9"]}
                                price={t('customPrice')}
                                onOrderClick={handleOrderClick}
                            />
                        </div>
                    </div>
                </div>


                {/* /////////////// */}

                <div className=' mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
                    <div className='flex justify-center items-center'>
                        <h1 className='paraText text-center mb-8'>
                            {t('easilyAccessUGCContent')}
                        </h1>
                    </div>

                    {/* Updated container for 2x2 grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {/* First Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>1</h1>
                                    <div className='headingTextTwo'>{t('determineNeedsTitle')}</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>{t('determineNeedsDescription')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>2</h1>
                                    <div className='headingTextTwo'>{t('findCreatorsTitle')}</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>{t('findCreatorsDescription')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Third Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>3</h1>
                                    <div className='headingTextTwo'>{t('collaborateTitle')}</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>{t('collaborateDescription')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Fourth Box */}
                        <div className=''>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <h1 className='headingTextBlue mr-2'>4</h1>
                                    <div className='headingTextTwo'>{t('launchCampaignTitle')}</div>
                                </div>
                                <div>
                                    <p className='paraTextTwo'>{t('launchCampaignDescription')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* //////////// */}

                <div className='yellowGradient px-4 md:px-10 lg:px-24 py-6 md:py-8 my-10  rounded-3xl'>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 lg:gap-36'>
                        <div className='flex-shrink-0'>
                            <Image
                                height={100}
                                width={300}
                                className='rounded-3xl'
                                src="/phonePic.png"
                                alt='phone'
                            />
                        </div>
                        <div className='flex flex-col justify-center text-center md:text-left'>
                            <h1 className='headingTextTwo mb-2 text-lg md:text-xl lg:text-2xl'>
                                {t('specialOffersTitle')}
                            </h1>
                            <p className='paraTextTwo mb-4 text-sm md:text-base lg:text-lg'>
                                {t('specialOffersDescription1')}
                            </p>
                            <p className='paraTextTwo mb-4 text-sm md:text-base lg:text-lg'>
                                {t('specialOffersDescription2')}
                            </p>
                            <div className='flex justify-center md:justify-start'>
                                <div>
                                    <button className="Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        {t('contactUsButton')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
}
