"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchAbout } from "@/store/features/admin/aboutSlice";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import Special from "../contentiaio/sections/Special";

const About = () => {
    const dispatch = useDispatch();
    const { sections } = useSelector((state: RootState) => state.about);

    useEffect(() => {
        dispatch(fetchAbout() as any)
            .then(() => {
                toast.success("Data fetched successfully!");
            })
            .catch(() => {
                toast.error("Failed to fetch data!");
            });
    }, [dispatch]);

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-[38px] pt-24 sm:pt-24 md:pt-24 lg:pt-[100px]'>
                <div className='flex flex-col lg:flex-row gap-10 justify-between'>
                    {/* Display the Image */}
                    <div className='flex justify-center max-h-96'>
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

                        <div className='mt-8'>
                            {sections?.content ? (
                                <>
                                    <div
                                        className='prose prose-sm sm:prose lg:prose-lg max-w-none mt-6 text-gray-700'
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                sections.content
                                            ),
                                        }}
                                    />
                                </>
                            ) : (
                                "No content available till now"
                            )}
                        </div>
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
                                alt='location  icon'
                            />
                            <span>{sections?.contactAddress}</span>
                        </div>
                    </div>

                    <div className='pt-24 sm:pt-24 md:pt-24 lg:pt-[100px]'>
                        <Special />
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
