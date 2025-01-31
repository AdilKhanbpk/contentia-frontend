import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
    updateAdminCreator,
    fetchAdminCreators,
} from "@/store/features/admin/creatorsSlice";
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import instIcon from "../../../../../../public/BecomeCreator/Instagram_icon.png";
import facebookIcon from "../../../../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../../../../public/BecomeCreator/tiktik_icon.png";
import { toast } from "react-toastify";

interface Creator {
    id: number;
    fullName: string;
    creatorType: "individual" | "company";
    userType: "customer" | "creator";
    role: "user" | "admin";
    password: string;
    tckn: string;
    email: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    isVerified: "pending" | "approved" | "rejected";
    accountType: "individual" | "institutional";
    invoiceType: "individual" | "institutional";
    addressDetails: {
        addressOne: string;
        addressTwo: string;
        country: string;
        zipCode: number;
    };
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
            contentType: ("product" | "service" | "location")[];
            creatorType: "nano" | "micro";
            contentFormats: string[];
            areaOfInterest: string[];
            addressDetails: {
                country: string;
                state: string;
                district: string;
                neighbourhood?: string;
                fullAddress: string;
            };
        };
        socialInformation: {
            contentType: "yes" | "no";
            platforms: {
                Instagram?: {
                    followers: number;
                    username: string;
                };
                TikTok?: {
                    followers: number;
                    username: string;
                };
                Facebook?: {
                    followers: number;
                    username: string;
                };
                Youtube?: {
                    followers: number;
                    username: string;
                };
                X?: {
                    followers: number;
                    username: string;
                };
                Linkedin?: {
                    followers: number;
                    username: string;
                };
            };
            portfolioLink?: string[];
        };
    };
    userAgreement: boolean;
    approvedCommercial: boolean;
}

interface ThirdTabProps {
    editCreatorForm: Creator | null;
    onSubmit?: (data: Creator) => void;
}

const ThirdTab: React.FC<ThirdTabProps> = ({ editCreatorForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (editCreatorForm) {
            reset({
                creatorType: editCreatorForm.creatorType,
                preferences: {
                    contentInformation: {
                        contentType:
                            editCreatorForm.preferences.contentInformation
                                ?.contentType || [],
                        contentFormats:
                            editCreatorForm.preferences.contentInformation
                                ?.contentFormats || [],
                        areaOfInterest:
                            editCreatorForm.preferences.contentInformation
                                ?.areaOfInterest || [],
                        addressDetails: {
                            country:
                                editCreatorForm.preferences.contentInformation
                                    ?.addressDetails?.country || "",
                            state:
                                editCreatorForm.preferences.contentInformation
                                    ?.addressDetails?.state || "",
                            district:
                                editCreatorForm.preferences.contentInformation
                                    ?.addressDetails?.district || "",
                            neighbourhood:
                                editCreatorForm.preferences.contentInformation
                                    ?.addressDetails?.neighbourhood || "",
                            fullAddress:
                                editCreatorForm.preferences.contentInformation
                                    ?.addressDetails?.fullAddress || "",
                        },
                    },
                    socialInformation: {
                        contentType:
                            editCreatorForm.preferences.socialInformation
                                ?.contentType,
                        platforms: {
                            Instagram: editCreatorForm.preferences
                                .socialInformation?.platforms?.Instagram || {
                                followers: 0,
                                username: "",
                            },
                            TikTok: editCreatorForm.preferences
                                .socialInformation?.platforms?.TikTok || {
                                followers: 0,
                                username: "",
                            },
                            Facebook: editCreatorForm.preferences
                                .socialInformation?.platforms?.Facebook || {
                                followers: 0,
                                username: "",
                            },
                            Youtube: editCreatorForm.preferences
                                .socialInformation?.platforms?.Youtube || {
                                followers: 0,
                                username: "",
                            },
                            X: editCreatorForm.preferences.socialInformation
                                ?.platforms?.X || {
                                followers: 0,
                                username: "",
                            },
                            Linkedin: editCreatorForm.preferences
                                .socialInformation?.platforms?.Linkedin || {
                                followers: 0,
                                username: "",
                            },
                        },
                        portfolioLink:
                            editCreatorForm.preferences.socialInformation
                                ?.portfolioLink || [],
                    },
                },
            });
        }
    }, [editCreatorForm, reset]);

    const onSubmit = async (formData: any) => {
        if (!editCreatorForm?.id) {
            toast.error(
                "No creator ID found. Please ensure a creator is selected."
            );
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("No access token found. Please log in again.");
            return;
        }

        try {
            const transformedData = {
                creatorType: formData.creatorType,
                preferences: {
                    contentInformation: {
                        contentType:
                            formData.preferences.contentInformation
                                .contentType || [],
                        creatorType:
                            formData.preferences.contentInformation.creatorType,
                        contentFormats:
                            formData.preferences.contentInformation
                                .contentFormats || [],
                        areaOfInterest:
                            formData.preferences.contentInformation.interests ||
                            [],
                    },
                    socialInformation: {
                        contentType:
                            formData.preferences.socialInformation.contentType,
                        platforms:
                            formData.preferences.socialInformation.platforms ||
                            [],
                        portfolioLink:
                            formData.preferences.socialInformation
                                .portfolioLink || [],
                    },
                },
            };

            const resultAction = await dispatch(
                updateAdminCreator({
                    customerId: editCreatorForm.id.toString(),
                    data: transformedData,
                    token,
                })
            );

            if (updateAdminCreator.fulfilled.match(resultAction)) {
                toast.success("Creator updated successfully.");
                await dispatch(fetchAdminCreators(token));
            } else {
                toast.error("Failed to update creator. Please try again.");
            }
        } catch (error: any) {
            console.log(error);
            toast.error(
                `Error updating creator: ${error.message || "Unknown error"}`
            );
        }
    };

    const socialPlatforms = [
        { icon: instIcon, label: "Instagram" },
        { icon: tiktokIcon, label: "TikTok" },
        { icon: facebookIcon, label: "Facebook" },
        { icon: youtubeIcon, label: "Youtube" },
        { icon: xIcon, label: "X" },
        { icon: linkdinIcon, label: "Linkedin" },
    ];

    return (
        <div className='w-full sm:w-2/3 bg-white p-6 rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className='text-xl font-semibold mb-4'>
                        Creator Preferences
                    </h2>

                    <div className='flex flex-col sm:flex-row justify-between sm:space-x-8'>
                        <div className='flex justify-between space-x-4'>
                            <label className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'>
                                <input
                                    type='checkbox'
                                    value='product'
                                    {...register(
                                        "preferences.contentInformation.contentType"
                                    )}
                                    className='hidden peer'
                                />
                                <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                    <div className='w-full h-full bg-white rounded-full'></div>
                                </div>
                                <span className='ml-1 text-sm'>Ürün</span>
                            </label>

                            <label className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'>
                                <input
                                    type='checkbox'
                                    value='service'
                                    {...register(
                                        "preferences.contentInformation.contentType"
                                    )}
                                    className='hidden peer'
                                />
                                <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                    <div className='w-full h-full bg-white rounded-full'></div>
                                </div>
                                <span className='ml-1 text-sm'>Hizmet</span>
                            </label>

                            <label className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'>
                                <input
                                    type='checkbox'
                                    value='location'
                                    {...register(
                                        "preferences.contentInformation.contentType"
                                    )}
                                    className='hidden peer'
                                />
                                <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                    <div className='w-full h-full bg-white rounded-full'></div>
                                </div>
                                <span className='ml-1 text-sm'>Mekan</span>
                            </label>
                        </div>

                        {/* TODO the creator type is not in become creator form */}
                        <div className='mb-4 w-full sm:w-1/2'>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Creator Type:
                            </label>
                            <select
                                {...register("creatorType")} // Updated
                                className='border px-2 py-1 rounded mt-2 w-full focus:outline-none'
                            >
                                <option value='nano'>Nano</option>
                                <option value='micro'>Micro</option>
                            </select>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-semibold text-gray-700'>
                            Content Formats:
                        </label>
                        <div className='grid grid-cols-1 gap-4 mt-2'>
                            {[
                                "Instagram / TikTok Videosu (Dikey)",
                                "Instagram Gönderi",
                                "TikTok Videosu",
                                "Linkedin Gönderisi",
                            ].map((format) => (
                                <label
                                    key={format}
                                    className='inline-flex items-center cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        {...register(
                                            "preferences.contentInformation.contentFormats"
                                        )}
                                        value={format}
                                        className='hidden peer'
                                    />
                                    <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                        <div className='w-full h-full bg-white rounded-full'></div>
                                    </div>
                                    <span className='ml-1 text-sm'>
                                        {format}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-semibold text-gray-700'>
                            Interests:
                        </label>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2'>
                            {[
                                "Spor ve Aktivite",
                                "Sanal ve El İşleri",
                                "Müzik",
                                "Eğlence ve Oyun",
                                "Yemek ve İçecek",
                                "Bilim ve Teknoloji",
                                "Seyahat ve Kültür",
                                "Kitap ve Edebiyat",
                                "Film ve Dizi",
                                "Doğa ve Hayvanlar",
                                "Gönüllülük",
                                "Moda ve Güzellik",
                                "E-Ticaret",
                                "Üretim ve Mühendislik",
                                "Sağlık",
                                "Eğitim",
                            ].map((interest) => (
                                <label
                                    key={interest}
                                    className='inline-flex items-center cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        {...register(
                                            "preferences.contentInformation.areaOfInterest"
                                        )}
                                        value={interest}
                                        className='hidden peer'
                                    />
                                    <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                        <div className='w-full h-full bg-white rounded-full'></div>
                                    </div>
                                    <span className='ml-1 text-sm'>
                                        {interest}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className='text-lg font-semibold'>
                            Social Media Information
                        </span>
                        <div className='flex gap-2 items-center mt-3'>
                            <h2 className='text-sm font-semibold mb-2 text-gray-700'>
                                Social Media Share
                            </h2>
                        </div>

                        <div className='flex justify-start space-x-4'>
                            <label className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'>
                                <input
                                    type='radio'
                                    {...register(
                                        "preferences.socialInformation.contentType"
                                    )}
                                    value='yes'
                                    className='hidden peer'
                                />
                                <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                    <div className='w-full h-full bg-white rounded-full'></div>
                                </div>
                                <span className='ml-1 text-sm'>Evit</span>
                            </label>

                            <label className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'>
                                <input
                                    type='radio'
                                    {...register(
                                        "preferences.socialInformation.contentType"
                                    )}
                                    value='no'
                                    className='hidden peer'
                                />
                                <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                    <div className='w-full h-full bg-white rounded-full'></div>
                                </div>
                                <span className='ml-1 text-sm'>Hayir</span>
                            </label>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <h2 className='text-xl font-semibold mb-4'>
                            Social Media Information
                        </h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1'>
                            {socialPlatforms.map((platform) => (
                                <div
                                    key={platform.label}
                                    className='flex flex-col mb-4'
                                >
                                    <div className='flex items-center mt-4'>
                                        <Image
                                            src={platform.icon}
                                            alt={`${platform.label} Icon`}
                                            width={24}
                                            height={24}
                                        />
                                        <h1 className='text-sm font-bold ml-2 text-gray-700'>
                                            {platform.label}:
                                        </h1>
                                    </div>

                                    <input
                                        type='text'
                                        {...register(
                                            `preferences.socialInformation.platforms.${platform.label}.username`
                                        )}
                                        className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        placeholder='Username'
                                    />

                                    <input
                                        type='number'
                                        {...register(
                                            `preferences.socialInformation.platforms.${platform.label}.followers`,
                                            {
                                                valueAsNumber: true,
                                                min: 0,
                                            }
                                        )}
                                        className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        placeholder='Followers'
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='mt-4'>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Portfolio Link:
                            </label>
                            <input
                                type='url'
                                {...register(
                                    "preferences.socialInformation.portfolioLink"
                                )}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                placeholder='Enter your portfolio URL'
                            />
                        </div>
                    </div>

                    <div className=' flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='ButtonBlue text-white px-4 py-2 rounded-md'
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ThirdTab;
