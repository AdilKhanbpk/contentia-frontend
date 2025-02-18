"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
import FourthTab from "./FourthTab";
import instIcon from "../../../../../../public/BecomeCreator/Instagram_icon.png";
import facebookIcon from "../../../../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../../../../public/BecomeCreator/tiktik_icon.png";
import { CreatorInterface } from "@/types/interfaces";

interface EditCreatorFormProps {
    creatorData: CreatorInterface | null;
    onSubmit: (data: CreatorInterface) => void;
}

const MemoizedFirstTab = React.memo(FirstTab);
const MemoizedSecondTab = React.memo(SecondTab);
const MemoizedThirdTab = React.memo(ThirdTab);
const MemoizedFourthTab = React.memo(FourthTab);

const EditCreatorForm: React.FC<EditCreatorFormProps> = ({
    creatorData,
    onSubmit,
}) => {
    const [activeSection, setActiveSection] = useState("personal-info");
    const handleLinkClick = (section: string) => {
        setActiveSection(section);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatorInterface>();

    useEffect(() => {
        // console.log("Creator data : ", creatorData);
        if (creatorData) {
            reset(creatorData);
        }
    }, [creatorData, reset]);

    return (
        <div className='mt-10 flex flex-col space-y-8'>
            <div className='bg-gray-100 px-6 pt-2 py-1 rounded-lg'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row'>
                        <div className='rounded-full mb-2'>
                            <Image
                                src='/icons/progress.png'
                                alt='Avatar'
                                width={70}
                                height={70}
                                className='rounded-full'
                            />
                        </div>
                        <div className='ml-4 flex flex-col justify-center'>
                            <div className='font-semibold'>
                                Edit Your Profile
                            </div>
                            <div>
                                Complete your profile to unlock all features
                            </div>
                        </div>
                    </div>
                    <button className='ButtonBlue text-white px-4 py-2 rounded-md'>
                        Edit Your Profile
                    </button>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row sm:space-x-12'>
                {/* Profile navigation */}
                <div className='w-full sm:w-1/3 bg-white rounded-lg flex flex-col space-y-8'>
                    <div className='flex flex-col items-center'>
                        <Image
                            src={creatorData?.profilePic || "/icons/avatar.png"}
                            alt='Avatar'
                            width={100}
                            height={100}
                            className='rounded-full h-40 w-40 object-cover'
                        />
                        <div className='flex flex-col space-y-4 text-center'>
                            <h3 className='mt-4 text-xl font-semibold'>
                                {creatorData?.fullName}
                            </h3>
                            <p className='text-gray-600'>
                                {creatorData?.userType}
                            </p>
                            <div className='flex space-x-8 mt-2 justify-center'>
                                {creatorData?.preferences?.socialInformation
                                    ?.platforms?.Instagram?.username &&
                                    creatorData?.preferences?.socialInformation
                                        ?.platforms?.Instagram?.followers && (
                                        <Image
                                            src={instIcon}
                                            alt='Instagram'
                                            width={20}
                                            height={20}
                                        />
                                    )}

                                {creatorData?.preferences?.socialInformation
                                    ?.platforms?.Facebook?.username &&
                                    creatorData?.preferences?.socialInformation
                                        ?.platforms?.Facebook?.followers && (
                                        <Image
                                            src={facebookIcon}
                                            alt='Facebook'
                                            width={20}
                                            height={20}
                                        />
                                    )}

                                {creatorData?.preferences?.socialInformation
                                    ?.platforms?.Youtube?.username &&
                                    creatorData?.preferences?.socialInformation
                                        ?.platforms?.Youtube?.followers && (
                                        <Image
                                            src={youtubeIcon}
                                            alt='YouTube'
                                            width={20}
                                            height={20}
                                        />
                                    )}

                                {creatorData?.preferences?.socialInformation
                                    ?.platforms?.Linkedin?.username &&
                                    creatorData?.preferences?.socialInformation
                                        ?.platforms?.Linkedin?.followers && (
                                        <Image
                                            src={linkdinIcon}
                                            alt='LinkedIn'
                                            width={20}
                                            height={20}
                                        />
                                    )}

                                {creatorData?.preferences?.socialInformation
                                    ?.platforms?.X?.username &&
                                    creatorData?.preferences?.socialInformation
                                        ?.platforms?.X?.followers && (
                                        <Image
                                            src={xIcon}
                                            alt='X'
                                            width={20}
                                            height={20}
                                        />
                                    )}

                                {creatorData?.preferences?.socialInformation
                                    ?.platforms?.TikTok?.username &&
                                    creatorData?.preferences?.socialInformation
                                        ?.platforms?.TikTok?.followers && (
                                        <Image
                                            src={tiktokIcon}
                                            alt='TikTok'
                                            width={20}
                                            height={20}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between bg-white p-4 '>
                        <div className='text-center'>
                            <span className='block text-lg font-bold'>0</span>
                            <span className='text-gray-500'>Post</span>
                        </div>
                        <div className='text-center'>
                            <span className='block text-lg font-bold'>0</span>
                            <span className='text-gray-500'>Project</span>
                        </div>
                        <div className='text-center'>
                            <span className='block text-lg font-bold'>0</span>
                            <span className='text-gray-500'>Members</span>
                        </div>
                    </div>

                    <div className='flex flex-col space-y-5'>
                        <button
                            onClick={() => handleLinkClick("personal-info")}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${
                                    activeSection === "personal-info"
                                        ? "bg-blue-100 text-blue-600"
                                        : "text-gray-700"
                                }
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image
                                src='/icons/info.png'
                                alt='Info'
                                width={20}
                                height={20}
                            />
                            <span>Personal Information</span>
                        </button>

                        <button
                            onClick={() => handleLinkClick("payment")}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${
                                    activeSection === "payment"
                                        ? "bg-blue-100 text-blue-600"
                                        : "text-gray-700"
                                }
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image
                                src='/icons/payment.png'
                                alt='Payment'
                                width={20}
                                height={20}
                            />
                            <span>Payment</span>
                        </button>

                        <button
                            onClick={() => handleLinkClick("Preferences")}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${
                                    activeSection === "Preferences"
                                        ? "bg-blue-100 text-blue-600"
                                        : "text-gray-700"
                                }
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image
                                src='/icons/preferences.png'
                                alt='Change Password'
                                width={20}
                                height={20}
                            />
                            <span>Preferences</span>
                        </button>

                        <button
                            onClick={() => handleLinkClick("settings")}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${
                                    activeSection === "settings"
                                        ? "bg-blue-100 text-blue-600"
                                        : "text-gray-700"
                                }
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image
                                src='/icons/settings.png'
                                alt='Settings'
                                width={20}
                                height={20}
                            />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>

                {/* Conditional Rendering of Content */}
                {activeSection === "personal-info" && (
                    <MemoizedFirstTab
                        editCreatorForm={creatorData}
                        onSubmit={onSubmit}
                    />
                )}
                {activeSection === "payment" && (
                    <MemoizedSecondTab
                        editCreatorForm={creatorData}
                        onSubmit={onSubmit}
                    />
                )}
                {activeSection === "Preferences" && (
                    <MemoizedThirdTab
                        editCreatorForm={creatorData}
                        onSubmit={onSubmit}
                    />
                )}
                {activeSection === "settings" && <MemoizedFourthTab />}
            </div>
        </div>
    );
};

export default EditCreatorForm;
