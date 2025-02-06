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
import { CreatorInterface } from "@/types/interfaces";

interface ThirdTabProps {
    editCreatorForm: CreatorInterface | null;
    onSubmit?: (data: CreatorInterface) => void;
}

const ThirdTab: React.FC<ThirdTabProps> = ({ editCreatorForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    useEffect(() => {
        if (editCreatorForm) {
            reset({
                preferences: {
                    contentInformation: {
                        creatorType:
                            editCreatorForm.preferences.contentInformation
                                .creatorType,
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
                            neighborhood:
                                editCreatorForm.preferences.contentInformation
                                    ?.addressDetails?.neighborhood || "",
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
                                followers: "",
                                username: "",
                            },
                            TikTok: editCreatorForm.preferences
                                .socialInformation?.platforms?.TikTok || {
                                followers: "",
                                username: "",
                            },
                            Facebook: editCreatorForm.preferences
                                .socialInformation?.platforms?.Facebook || {
                                followers: "",
                                username: "",
                            },
                            Youtube: editCreatorForm.preferences
                                .socialInformation?.platforms?.Youtube || {
                                followers: "",
                                username: "",
                            },
                            X: editCreatorForm.preferences.socialInformation
                                ?.platforms?.X || {
                                followers: "",
                                username: "",
                            },
                            Linkedin: editCreatorForm.preferences
                                .socialInformation?.platforms?.Linkedin || {
                                followers: "",
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
        console.log("🚀 ~ onSubmit ~ formData:", formData);
        if (!editCreatorForm?._id) {
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
                preferences: {
                    contentInformation: {
                        addressDetails: {
                            country:
                                editCreatorForm.preferences.contentInformation
                                    .addressDetails.country,
                            state: editCreatorForm.preferences
                                .contentInformation.addressDetails.state,
                            district:
                                editCreatorForm.preferences.contentInformation
                                    .addressDetails.district,
                            neighborhood:
                                editCreatorForm.preferences.contentInformation
                                    .addressDetails.neighborhood,
                            fullAddress:
                                editCreatorForm.preferences.contentInformation
                                    .addressDetails.fullAddress,
                        },
                        creatorType:
                            formData.preferences.contentInformation.creatorType,
                        contentType:
                            formData.preferences.contentInformation
                                .contentType || [],
                        contentFormats:
                            formData.preferences.contentInformation
                                .contentFormats || [],
                        areaOfInterest:
                            formData.preferences.contentInformation
                                .areaOfInterest || [],
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

            const checkingContentType = (transformedData: any) => {
                if (
                    transformedData.preferences.contentInformation.contentType
                        .length > 0
                ) {
                    return true;
                }
                return false;
            };

            const isValidContentType = checkingContentType(transformedData);
            if (!isValidContentType) {
                toast.error("Please select at least one content type.");
                return;
            }

            const checkingPlatformsIfEmptyWhenSocialInformationContentTypeIsYes =
                (transformedData: any) => {
                    if (
                        transformedData.preferences.socialInformation
                            .contentType === "yes"
                    ) {
                        const platforms =
                            transformedData.preferences.socialInformation
                                .platforms;

                        const isValid = Object.keys(platforms).some(
                            (platformKey) => {
                                const platform = platforms[platformKey];
                                return (
                                    (platform.username &&
                                        platform.username.trim() !== "" &&
                                        platform.followers) ||
                                    (platform.followers &&
                                        platform.followers.trim() !== "")
                                );
                            }
                        );

                        return isValid;
                    }
                    return true;
                };

            const isValidPlatforms =
                checkingPlatformsIfEmptyWhenSocialInformationContentTypeIsYes(
                    transformedData
                );

            if (!isValidPlatforms) {
                toast.error(
                    "At least one platform should have both username and followers."
                );
                return;
            }

            const resultAction = await dispatch(
                updateAdminCreator({
                    creatorId: editCreatorForm._id,
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

                        <div className='mb-4 w-full sm:w-1/2'>
                            <label className='block text-sm font-semibold text-gray-700'>
                                Creator Type:
                            </label>
                            <select
                                {...register(
                                    "preferences.contentInformation.creatorType"
                                )}
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
                                "Instagram Reels",
                                "Instagram Story",
                                "TikTok video",
                                "Instagram Post",
                                "Youtube Video",
                                "Linkedin Post",
                                "X-Flood",
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
                                "Mühendislik",
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
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ThirdTab;
