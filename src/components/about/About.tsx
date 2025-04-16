"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchAbout } from "@/store/features/admin/aboutSlice";
import { toast } from "react-toastify";

const About = () => {
    const dispatch = useDispatch();
    const { sections } = useSelector((state: RootState) => state.about);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            dispatch(fetchAbout(token) as any)
                .then(() => {
                    toast.success("Data fetched successfully!");
                })
                .catch(() => {
                    toast.error("Failed to fetch data!");
                });
        } else {
            toast.error("No Token Found in Local Storage");
        }
    }, [dispatch]);

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-[38px] pt-24 sm:pt-24 md:pt-24 lg:pt-[100px]'>
                <div className='flex flex-col lg:flex-row gap-10 justify-between items-center'>
                    {/* Display the Image */}
                    <div className='flex justify-center'>
                        {sections?.aboutImage ? (
                            <Image
                                className=''
                                src={sections.aboutImage}
                                alt='About Image'
                                width={500}
                                height={300}
                            />
                        ) : (
                            <p>Image not available</p>
                        )}
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <h1 className='text-2xl font-bold text-[#4D4EC9]'>
                            {sections?.title}
                        </h1>

                        <h2 className='font-semibold mt-8'>
                            {sections?.content ? (
                                <>
                                    <div
                                        className='prose prose-sm sm:prose lg:prose-lg max-w-none mt-6 text-gray-700'
                                        dangerouslySetInnerHTML={{
                                            __html: sections.content,
                                        }}
                                    />
                                </>
                            ) : (
                                ""
                            )}
                        </h2>
                    </div>
                </div>

                {/* Contact Section */}
                <div className='flex flex-col justify-center mt-24'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText mb-3'>
                            {sections?.contactTitle}
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

                    <div className='flex flex-col justify-center mx-auto mt-6 mb-5'>
                        <div className='flex items-center gap-2 mt-6'>
                            <Image
                                width={30}
                                height={30}
                                src='/messageIcon.png'
                                alt='message icon'
                            />
                            <span>{sections?.contactEmail}</span>
                        </div>
                        <div className='flex items-center gap-2 my-6'>
                            <Image
                                width={30}
                                height={30}
                                src='/whatsappIcon.svg'
                                alt='message icon'
                            />
                            <span>{sections?.contactPhone}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image
                                width={30}
                                height={30}
                                src='/locationIcon.png'
                                alt='location icon'
                            />
                            <span>{sections?.contactAddress}</span>
                        </div>
                    </div>

                    <div className='pt-24 sm:pt-24 md:pt-24 lg:pt-[100px]'>
                        <div className='yellowGradient p-4 px-6 md:px-12 rounded-lg flex flex-col md:flex-row justify-between items-center gap-10 sm:gap-12 lg:gap-28  w-full  relative mb-6'>
                            <div className='flex-shrink-0'>
                                <Image
                                    height={50}
                                    width={200}
                                    className='rounded-3xl'
                                    src='/phonePic.png'
                                    alt='phone'
                                />
                            </div>
                            <div className='w-full '>
                                <h1 className='text-xl font-bold mb-5'>
                                    İhtiyacınızı Belirleyelim
                                </h1>
                                <div className='flex flex-col items-center'>
                                    <p>
                                        Sorularınız ve ihtiyaçlarınız için
                                        yardıma mı ihtiyacınız var?
                                        Hizmetlerimiz için bilgi almak adına
                                        temsilcimizle görüşme gerçekleştirin!
                                    </p>
                                    <button className='Button text-white w-fit px-6 py-2 rounded-full font-bold mt-6'>
                                        İletişime Geç
                                    </button>
                                </div>
                            </div>
                            <div className='absolute bottom-3 left-0 w-full md:w-[280px] bg-purple-700 md:block hidden text-white p-6'>
                                <h1 className='text-center'>
                                    Will be provided later
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
