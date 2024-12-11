import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateAdminCreator, fetchAdminCreators } from '@/store/features/admin/creatorsSlice';
import { AppDispatch } from '@/store/store';
import Image from 'next/image';
import instIcon from "../../../../../../public/BecomeCreator/Instagram_icon.png";
import facebookIcon from "../../../../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../../../../public/BecomeCreator/tiktik_icon.png";
import { toast } from 'react-toastify';

interface Creator {
    id: number;
    fullName: string;
    creatorType: "individual" | "company";
    userType: "customer" | "creator";
    role: "user" | "admin";
    password: string;
    identityNo: number;
    email: string;
    dateOfBirth: string; // Format: "YYYY-MM-DD"
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
    },
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
            creatorType: "nano" | "micro"; // Updated
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
            contentType: "product" | "service";
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
                contentType: editCreatorForm.preferences.contentInformation.contentType,
                creatorType: editCreatorForm.preferences.contentInformation.creatorType,
                contentFormats: editCreatorForm.preferences.contentInformation.contentFormats,
                interests: editCreatorForm.preferences.contentInformation.areaOfInterest,
                social_information: {
                    contentType: editCreatorForm.preferences.socialInformation.contentType,
                    platforms: {
                        Instagram: editCreatorForm.preferences.socialInformation.platforms.Instagram || {},
                        TikTok: editCreatorForm.preferences.socialInformation.platforms.TikTok || {},
                        Facebook: editCreatorForm.preferences.socialInformation.platforms.Facebook || {},
                        Youtube: editCreatorForm.preferences.socialInformation.platforms.Youtube || {},
                        X: editCreatorForm.preferences.socialInformation.platforms.X || {},
                        Linkedin: editCreatorForm.preferences.socialInformation.platforms.Linkedin || {},
                    },
                    portfolioLink: editCreatorForm.preferences.socialInformation.portfolioLink || []
                }
            });
        }
    }, [editCreatorForm, reset]);

    const onSubmit = async (formData: any) => {
        console.log('Data from the third tab:', formData);

        // Ensure creator ID exists before updating
        if (!editCreatorForm?.id) {
            console.error('No creator ID found');
            toast.error('No creator ID found. Please ensure a creator is selected.');
            return;
        }

        // Retrieve access token from localStorage
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            toast.error('No access token found. Please log in again.');
            return;
        }

        try {
            // Data transformation to match API expectations
            const transformedData = {
                preferences: {
                    contentInformation: {
                        contentType: formData.contentType,
                        creatorType: formData.creatorType,
                        contentFormats: formData.contentFormats || [],
                        areaOfInterest: formData.interests || []
                    },
                    socialInformation: {
                        contentType: formData.social_information.contentType,
                        platforms: formData.social_information.platforms || [],
                        portfolioLink: formData.social_information.portfolioLink || ''
                    }
                }
            };

            // Dispatch the update action
            const resultAction = await dispatch(
                updateAdminCreator({
                    customerId: editCreatorForm.id.toString(),  // Convert ID to string for API
                    data: transformedData,  // Send the transformed data
                    token,  // Provide the token for authentication
                })
            );

            // Handle the result of the update action
            if (updateAdminCreator.fulfilled.match(resultAction)) {
                console.log('Update successful');
                toast.success('Creator updated successfully.');
                // Fetch the updated list of creators
                await dispatch(fetchAdminCreators(token));
            } else {
                console.error('Update failed:', resultAction.error);
                toast.error('Failed to update creator. Please try again.');
            }
        } catch (error: any) {
            console.error('Error updating creator:', error);
            toast.error(`Error updating creator: ${error.message || 'Unknown error'}`);
        }
    };

    const socialPlatforms = [
        { icon: instIcon, label: "Instagram" },
        { icon: tiktokIcon, label: "TikTok" },
        { icon: facebookIcon, label: "Facebook" },
        { icon: youtubeIcon, label: "Youtube" },
        { icon: xIcon, label: "X" },
        { icon: linkdinIcon, label: "Linkedin" }
    ];

    return (
        <div className="w-full sm:w-2/3 bg-white p-6 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Creator Preferences
                    </h2>

                    <div className='flex flex-col sm:flex-row justify-between sm:space-x-8'>
                        <div className="mb-4 w-full sm:w-1/2">
                            <label className="block mb-3 text-sm font-semibold text-gray-700">Content Type:</label>
                            <div className="flex space-x-4 mt-2">
                                {['product', 'service', 'other'].map((type) => (
                                    <label key={type} className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            {...register('contentType')}
                                            value={type}
                                            className="hidden peer"
                                        />
                                        <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                            <div className="w-full h-full bg-white rounded-full"></div>
                                        </div>
                                        <span className="ml-1 text-sm capitalize">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4 w-full sm:w-1/2">
                            <label className="block text-sm font-semibold text-gray-700">Creator Type:</label>
                            <select
                                {...register('creatorType')} // Updated
                                className="border px-2 py-1 rounded mt-2 w-full focus:outline-none"
                            >
                                <option value="nano">Nano</option>
                                <option value="micro">Micro</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Content Formats:</label>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            {['Instagram Reels', 'Instagram Post', 'TikTok Video', 'LinkedIn Post'].map((format) => (
                                <label key={format} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('contentFormats')}
                                        value={format}
                                        className="hidden peer"
                                    />
                                    <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                        <div className="w-full h-full bg-white rounded-full"></div>
                                    </div>
                                    <span className="ml-1 text-sm">{format}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Interests:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
                            {[
                                'Spor ve Aktivite',
                                'Sanal ve El İşleri',
                                'Müzik',
                                'Eğlence ve Oyun',
                                'Yemek ve İçecek ',
                                'Bilim ve Teknoloji',
                                'Seyahat ve Kültür',
                                'Kitap ve Edebiyat',
                                'Film ve Dizi',
                                'Doğa ve Hayvanlar',
                                'Gönüllülük',
                                'Moda ve Güzellik',
                                'E-Ticaret',
                                'Üretim ve Mühendislik',
                                'Sağlık',
                                'Eğitim',
                            ].map((interest) => (
                                <label key={interest} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('interests')}
                                        value={interest}
                                        className="hidden peer"
                                    />
                                    <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                        <div className="w-full h-full bg-white rounded-full"></div>
                                    </div>
                                    <span className="ml-1 text-sm">{interest}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="text-lg font-semibold">Social Media Information</span>
                        <div className="flex gap-2 items-center mt-3">
                            <h2 className="text-sm font-semibold mb-2 text-gray-700">Social Media Share</h2>
                        </div>

                        <div className="flex justify-start space-x-4">
                            <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
                                <input
                                    type="radio"
                                    {...register("social_information.contentType")}
                                    value="product"
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                    <div className="w-full h-full bg-white rounded-full"></div>
                                </div>
                                <span className="ml-1 text-sm">Product</span>
                            </label>

                            <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
                                <input
                                    type="radio"
                                    {...register("social_information.contentType")}
                                    value="service"
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                    <div className="w-full h-full bg-white rounded-full"></div>
                                </div>
                                <span className="ml-1 text-sm">Service</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-4">Social Media Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                            {socialPlatforms.map((platform) => (
                                <div key={platform.label} className="flex flex-col mb-4">
                                    <div className="flex items-center mt-4">
                                        <Image
                                            src={platform.icon}
                                            alt={`${platform.label} Icon`}
                                            width={24}
                                            height={24}
                                        />
                                        <h1 className="text-sm font-bold ml-2 text-gray-700">{platform.label}:</h1>
                                    </div>

                                    <input
                                        type="text"
                                        {...register(`social_information.platforms.${platform.label}.username`)}
                                        className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Username"
                                    />

                                    <input
                                        type="number"
                                        {...register(`social_information.platforms.${platform.label}.followers`, {
                                            valueAsNumber: true,
                                            min: 0
                                        })}
                                        className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Followers"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700">Portfolio Link:</label>
                            <input
                                type="url"
                                {...register("social_information.portfolioLink")}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your portfolio URL"
                            />
                        </div>
                    </div>

                    <div className=" flex justify-end mt-6">
                        <button type="submit" className="ButtonBlue text-white px-4 py-2 rounded-md">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ThirdTab;