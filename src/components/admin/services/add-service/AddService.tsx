"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
    fetchAdditionalServices,
    updateAdditionalService,
} from "@/store/features/admin/addPriceSlice";
import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/checkToken";

type FormData = {
    platform: string;
    aspectRatio: string;
    editPrice: number;
    sharePrice: number;
    coverPicPrice: number;
    creatorTypePrice: number;
    shippingPrice: number;
    thirtySecondDurationPrice: number;
    sixtySecondDurationPrice: number;
};

const platforms = [
    {
        label: "Instagram",
        value: "instagram",
    },
    {
        label: "TikTok",
        value: "tiktok",
    },
    {
        label: "Facebook",
        value: "facebook",
    },
    {
        label: "Youtube",
        value: "youtube",
    },
    {
        label: "X",
        value: "x",
    },
    {
        label: "Linkedin",
        value: "linkedin",
    },
];
const aspectRatios = ["9:16", "16:9"];

const AddService: React.FC = () => {
    const dispatch = useDispatch();
    const { data: additionalService, error } = useSelector(
        (state: RootState) => state.addPrice
    );
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(
        null
    );
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<
        string | null
    >(null);
    const { register, handleSubmit, setValue, reset } = useForm<FormData>();

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;

        dispatch(fetchAdditionalServices(token) as any)
            .then(() => {
                toast.success("Services fetched successfully!");
            })
            .catch((err: Error) => {
                toast.error(err.message || "Failed to fetch services");
            });
    }, [dispatch]);

    useEffect(() => {
        if (additionalService) {
            const backendPlatform = additionalService.platform || "";
            const backendAspectRatio = additionalService.aspectRatio || "";
            setSelectedPlatform(backendPlatform);
            setSelectedAspectRatio(backendAspectRatio);
            reset({
                platform: backendPlatform,
                aspectRatio: backendAspectRatio,
                editPrice: additionalService.editPrice || 1000,
                sharePrice: additionalService.sharePrice || 1000,
                coverPicPrice: additionalService.coverPicPrice || 1000,
                creatorTypePrice: additionalService.creatorTypePrice || 1000,
                shippingPrice: additionalService.shippingPrice || 1000,
                thirtySecondDurationPrice:
                    additionalService.thirtySecondDurationPrice || 1000,
                sixtySecondDurationPrice:
                    additionalService.sixtySecondDurationPrice || 1000,
            });
        }
    }, [additionalService, reset]);

    const handlePlatformSelect = (platform: string) => {
        setSelectedPlatform(platform);
        setValue("platform", platform);
    };

    const handleAspectRatioSelect = (ratio: string) => {
        setSelectedAspectRatio(ratio);
        setValue("aspectRatio", ratio);
    };

    const handleSaveService: SubmitHandler<FormData> = (data) => {
        const token = getAccessToken();
        if (!token) return;
        if (additionalService) {
            const updatedService = {
                platform: data.platform,
                aspectRatio: data.aspectRatio,
                editPrice: data.editPrice,
                sharePrice: data.sharePrice,
                coverPicPrice: data.coverPicPrice,
                creatorTypePrice: data.creatorTypePrice,
                shippingPrice: data.shippingPrice,
                thirtySecondDurationPrice: data.thirtySecondDurationPrice,
                sixtySecondDurationPrice: data.sixtySecondDurationPrice,
            };
            dispatch(
                updateAdditionalService({
                    id: additionalService._id || "",
                    data: updatedService,
                    token,
                }) as any
            )
                .then(() => {
                    toast.success("Service updated successfully!");
                })
                .catch((err: Error) => {
                    toast.error(err.message || "Failed to update service.");
                });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleSaveService)}
            className='space-y-6 p-4'
        >
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <h2 className='text-xl font-semibold mb-4'>
                    Additional Services
                </h2>
                <p className='mb-4 text-lg'>
                    Select the price for additional services (for 1 UGC)
                </p>

                {/* Platform Selection */}
                <div className='mb-4'>
                    <p className='mb-4 text-lg'>Add new additional service</p>
                    <div className='flex flex-row items-center mb-2'>
                        <h3 className='font-semibold mr-4 text-lg'>
                            Platform:
                        </h3>
                        <div className='flex space-x-4'>
                            {platforms.map((platform) => (
                                <button
                                    key={platform.value}
                                    type='button'
                                    onClick={() =>
                                        handlePlatformSelect(platform.value)
                                    }
                                    className={`px-3 py-1 border text-sm rounded-md ${
                                        selectedPlatform === platform.value
                                            ? "ButtonBlue text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {platform.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Aspect Ratio Selection */}
                <div className='mb-4'>
                    <div className='flex flex-row items-center mb-2'>
                        <h3 className='font-semibold mr-4 text-lg'>
                            Aspect Ratio:
                        </h3>
                        <div className='flex space-x-4'>
                            {aspectRatios.map((ratio) => (
                                <button
                                    key={ratio}
                                    type='button'
                                    onClick={() =>
                                        handleAspectRatioSelect(ratio)
                                    }
                                    className={`px-3 py-1 border text-sm rounded-md ${
                                        selectedAspectRatio === ratio
                                            ? "ButtonBlue text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Manually Added Fields */}
                <div className='mt-4'>
                    <h3 className='font-semibold mb-2 text-lg'>
                        Edit Additional Service Price
                    </h3>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                Edit Price:
                            </p>
                            <input
                                {...register("editPrice")}
                                type='number'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                Share Price:
                            </p>
                            <input
                                {...register("sharePrice")}
                                type='number'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                Cover Picture Price:
                            </p>
                            <input
                                {...register("coverPicPrice")}
                                type='number'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                Creator Type Price:
                            </p>
                            <input
                                {...register("creatorTypePrice")}
                                type='number'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                Shipping Price:
                            </p>
                            <input
                                {...register("shippingPrice")}
                                type='number'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                30-Second Duration:
                            </p>
                            <input
                                {...register("thirtySecondDurationPrice")}
                                type='number'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                60-Second Duration:
                            </p>
                            <input
                                {...register("sixtySecondDurationPrice")}
                                type='number'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>
                </div>

                <div className='flex lg:w-1/2 justify-end'>
                    <button
                        type='submit'
                        className='w-32 ButtonBlue text-white px-3 py-2 rounded-md mt-4'
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddService;
