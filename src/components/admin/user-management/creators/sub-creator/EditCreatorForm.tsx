"use client";
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Image from 'next/image';
import Link from "next/link";
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import ThirdTab from './ThirdTab';
import FourthTab from './FourthTab';

interface Creator {
    id: number;
    fullName: string;
    creatorType: "individual" | "company";
    userType: "customer" | "creator";
    role: "user" | "admin";
    password: string;
    tckn: string;
    email: string;
    dateOfBirth: string; // Format: "YYYY-MM-DD"
    gender: "male" | "female" | "other";
    phoneNumber: string;
    isVerified: boolean;
    addressOne: string;
    addressTwo?: string;
    accountType: "individual" | "institutional";
    invoiceType: "individual" | "institutional";
    paymentInformation: {
        ibanNumber?: string;
        address: string;
        fullName: string;
        trId?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
    billingInformation: {
        invoiceStatus: boolean;
        address: string;
        fullName: string;
        trId?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
    preferences: {
        contentInformation: {
            contentType: "product" | "service" | "other";
            contentFormats: string[]; // Example: ["video", "image"]
            areaOfInterest: string[]; // Example: ["tech", "gadgets"]
            addressDetails: {
                country: string;
                state: string;
                district: string;
                neighbourhood?: string;
                fullAddress: string;
            };
        };
        socialInformation: {
            contentType: "product" | "service" | "other";
            platforms: {
                Instagram?: {
                    followers: number;
                    username: string;
                };
                TikTok?: {
                    followers: number;
                    username: string;
                };
                Youtube?: {
                    followers: number;
                    username: string;
                };
            };
            portfolioLink?: string;
        };
    };
    userAgreement: boolean;
    approvedCommercial: boolean;
}


interface EditCreatorFormProps {
    customerData: Creator | null;
    onSubmit: (data: Creator) => void;
}

// memoization
const MemoizedFirstTab = React.memo(FirstTab);
const MemoizedSecondTab = React.memo(SecondTab);
const MemoizedThirdTab = React.memo(ThirdTab);
const MemoizedFourthTab = React.memo(FourthTab);

const EditCreatorForm: React.FC<EditCreatorFormProps> = ({
    customerData, onSubmit
}) => {
    console.log("data sent to editCreatorForm : ", customerData);
    const [activeSection, setActiveSection] = useState('personal-info');

    const handleLinkClick = (section: string) => {
        setActiveSection(section);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Creator>();

    // Reset the form if customerData changes
    useEffect(() => {
        if (customerData) {
            reset(customerData);
        }
    }, [customerData, reset]);

    return (
        <div className="mt-10 flex flex-col space-y-8">
            <div className="bg-gray-100 px-6 pt-2 py-1 rounded-lg">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row">
                        <div className="rounded-full mb-2">
                            <Image
                                src='/icons/progress.png'
                                alt="Avatar"
                                width={70}
                                height={70}
                                className="rounded-full"
                            />
                        </div>
                        <div className="ml-4 flex flex-col justify-center">
                            <div className="font-semibold">Edit Your Profile</div>
                            <div>Complete your profile to unlock all features</div>
                        </div>
                    </div>
                    <button className="ButtonBlue text-white px-4 py-2 rounded-md">
                        Edit Your Profile
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-12">
                {/* Profile navigation */}
                <div className="w-full sm:w-1/3 bg-white rounded-lg flex flex-col space-y-8">
                    <div className="flex flex-col items-center">
                        <Image
                            src='/icons/avatar.png'
                            alt="Avatar"
                            width={120}
                            height={120}
                            className="rounded-full"
                        />
                        <div className="flex flex-col space-y-4 text-center">
                            <h3 className="mt-4 text-xl font-semibold">JWT User</h3>
                            <p className="text-gray-600">UI/UX Designer</p>
                            <div className="flex space-x-8 mt-2 justify-center">
                                <Image src="/BecomeCreator/facebook_icon..png" alt="Facebook" width={20} height={20} />
                                <Image src="/BecomeCreator/x_icon.png" alt="Twitter" width={20} height={20} />
                                <Image src="/BecomeCreator/linkedin_icon.png" alt="LinkedIn" width={20} height={20} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between bg-white p-4 ">
                        <div className="text-center">
                            <span className="block text-lg font-bold">86</span>
                            <span className="text-gray-500">Post</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-lg font-bold">40</span>
                            <span className="text-gray-500">Project</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-lg font-bold">4.5K</span>
                            <span className="text-gray-500">Members</span>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <button
                            onClick={() => handleLinkClick('personal-info')}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${activeSection === 'personal-info' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image src='/icons/info.png' alt="Info" width={20} height={20} />
                            <span>Personal Information</span>
                        </button>

                        <button
                            onClick={() => handleLinkClick('payment')}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${activeSection === 'payment' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image src='/icons/payment.png' alt="Payment" width={20} height={20} />
                            <span>Payment</span>
                        </button>

                        <button
                            onClick={() => handleLinkClick('Preferences')}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${activeSection === 'Preferences' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image src='/icons/preferences.png' alt="Change Password" width={20} height={20} />
                            <span>Preferences</span>
                        </button>

                        <button
                            onClick={() => handleLinkClick('settings')}
                            className={`flex items-center space-x-6 p-2 rounded-lg 
                                ${activeSection === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}
                                hover:bg-blue-50 hover:text-blue-500`}
                        >
                            <Image src='/icons/settings.png' alt="Settings" width={20} height={20} />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>

                {/* Conditional Rendering of Content */}
                {activeSection === 'personal-info' && <MemoizedFirstTab editCreatorForm={customerData} onSubmit={onSubmit} />}
                {activeSection === 'payment' && <MemoizedSecondTab />}
                {activeSection === 'Preferences' && <MemoizedThirdTab />}
                {activeSection === 'settings' && <MemoizedFourthTab />}
            </div>
        </div>
    );
};

export default EditCreatorForm;
