"use client";

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createOrder } from '@/store/features/admin/ordersSlice';
import { AppDispatch } from '@/store/store';
import { toast } from "react-toastify";

// Update the Order interface to include the full Creator type
interface Creator {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profilePic?: string;
    isVerified: string;
    preferences?: {
        contentInformation?: {
            contentType?: string;
            contentFormats?: string[];
            areaOfInterest?: string[];
        };
        socialInformation?: {
            platforms?: {
                [key: string]: {
                    followers: number;
                    username: string;
                };
            };
        };
    };
}

interface Order {
    _id: string;
    coupon?: string;
    orderOwner: {
        _id: string;
        fullName: string;
        email: string;
    };
    assignedCreators: string[];
    appliedCreators: Creator[];
    noOfUgc: number;
    totalPrice: number;
    orderStatus: 'pending' | 'active' | 'completed' | 'cancelled' | 'revision';
    paymentStatus: 'paid' | 'pending' | 'refunded' | 'cancelled';
    contentsDelivered?: number;
    additionalServices: {
        platform: string;
        duration: string;
        edit: boolean;
        aspectRatio: string;
        share?: boolean;
        coverPicture?: boolean;
        creatorType?: string;
        productShipping?: boolean;
    };
    preferences?: {
        creatorGender?: string;
        minCreatorAge?: number;
        maxCreatorAge?: number;
        interests?: string[];
        contentType?: string;
        locationAddress?: {
            country?: string;
            city?: string;
            district?: string;
            street?: string;
            fullAddress?: string;
        };
    };
    briefContent?: {
        brandName?: string;
        brief?: string;
        productServiceName?: string;
        productServiceDesc?: string;
        scenario?: string;
        caseStudy?: string;
        uploadFiles?: string;
        uploadFileDate?: string;
    };
    numberOfRequests?: number;
    orderQuota?: number;
    quotaLeft?: number;
    uploadFiles?: Array<{
        uploadedBy: string;
        fileUrls: string[];
        uploadedDate: Date;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}

export default function NewModal() {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedPlatform, setSelectedPlatform] = useState<string>('TikTok');
    const [duration, setDuration] = useState<string>('15s');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [aspectRatio, setAspectRatio] = useState<string>('9:16');
    const [isShare, setIsShare] = useState<boolean>(false);
    const [isCoverPicture, setIsCoverPicture] = useState<boolean>(false);
    const [creatorType, setCreatorType] = useState<string>('Nano');
    const [isShipping, setIsShipping] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, reset, control } = useForm<Order>({
        defaultValues: {
            additionalServices: {
                platform: 'TikTok',
                duration: '15s',
                edit: false,
                aspectRatio: '9:16',
                share: false,
                coverPicture: false,
                creatorType: 'Nano',
                productShipping: false
            }
        }
    });

    const formatAssignedCreators = (creators: string): string[] => {
        if (!creators) return [];

        return creators
            .split(",")
            .filter(id => id.trim() !== '')
            .map(id => id.trim());
    };

    const onSubmitForm: SubmitHandler<Order> = async (data) => {
        setIsSubmitting(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("No token found. Please log in again.");
            return;
        }

        const orderData = {
            orderOwner: data.orderOwner,
            assignedCreators: formatAssignedCreators(data.assignedCreators as unknown as string), // Add formatting here
            noOfUgc: data.noOfUgc,
            totalPrice: data.totalPrice,
            additionalServices: {
                platform: selectedPlatform.toLowerCase(),
                duration: duration,
                edit: isEdit,
                aspectRatio: aspectRatio,
                share: isShare,
                coverPicture: isCoverPicture,
                creatorType: creatorType,
                productShipping: isShipping,
            },
        };

        console.log ("order data ", orderData)

        try {
            const result = await dispatch(
                createOrder({
                    data: orderData,
                    token: token,
                })
            ).unwrap();

            toast.success("Order created successfully!");

        } catch (error) {
            toast.error("Error creating order.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
                    <h2 className="text-lg mb-6 font-semibold">Create Custom Order</h2>
                    <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-28">
                        {/* Left Side Fields */}
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1 space-y-3">
                            {/* Select Customer */}
                            <div>
                                <label className="block text-sm font-semibold mt-2">Select Customer:</label>
                                <input
                                    type="text"
                                    placeholder="Enter customer id"
                                    className="w-full px-3 py-1 border rounded-md focus:outline-none"
                                    {...register("orderOwner", { required: "Customer id is required" })}
                                />
                            </div>

                            {/* No of UGC */}
                            <div>
                                <label className="block text-sm font-semibold mt-2">No of UGC:</label>
                                <input
                                    type="number"
                                    placeholder="Enter number of UGC"
                                    className="w-full px-3 py-1 border rounded-md focus:outline-none"
                                    {...register("noOfUgc", { required: "Number of UGC is required" })}
                                />
                            </div>

                            {/* Select Price */}
                            <div>
                                <label className="block text-sm font-semibold mt-2">Select Price:</label>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    className="w-full px-3 py-1 border rounded-md focus:outline-none"
                                    {...register("totalPrice", { required: "Price is required" })}
                                />
                            </div>

                            {/* Assign Creators */}
                            <div>
                                <label className="block text-sm font-semibold mt-2">Assign Creators:</label>
                                <input
                                    type="text"
                                    placeholder="Enter creator IDs"
                                    className="w-full px-3 py-1 border rounded-md focus:outline-none"
                                    {...register("assignedCreators")}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                            <h3 className="mt-4 lg:mt-0 font-semibold mb-4 BlueText">Select Additional Services</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                {/* Platform Radio Buttons */}
                                <div className="text-gray-700 font-semibold">Platform:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.platform"
                                        control={control}
                                        defaultValue="TikTok"
                                        render={({ field }) => (
                                            <>
                                                {['TikTok', 'Meta', 'Diğer'].map((platform) => (
                                                    <button
                                                        key={platform}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${selectedPlatform === platform ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setSelectedPlatform(platform);
                                                            field.onChange(platform);
                                                        }}
                                                    >
                                                        {platform}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Duration Radio Buttons */}
                                <div className="text-gray-700 font-semibold">Duration:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.duration"
                                        control={control}
                                        defaultValue="15s"
                                        render={({ field }) => (
                                            <>
                                                {['15s', '30s', '60s'].map((dur) => (
                                                    <button
                                                        key={dur}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${duration === dur ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setDuration(dur);
                                                            field.onChange(dur);
                                                        }}
                                                    >
                                                        {dur}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Edit Option */}
                                <div className="text-gray-700 font-semibold">Edit:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.edit"
                                        control={control}

                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${(isEdit && option === 'Yes') || (!isEdit && option === 'No') ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            const newValue = option === 'Yes';
                                                            setIsEdit(newValue);
                                                            field.onChange(newValue);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Aspect Ratio */}
                                <div className="text-gray-700 font-semibold">Aspect Ratio:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.aspectRatio"
                                        control={control}
                                        defaultValue="9:16"
                                        render={({ field }) => (
                                            <>
                                                {['9:16', '16:9'].map((ratio) => (
                                                    <button
                                                        key={ratio}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${aspectRatio === ratio ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setAspectRatio(ratio);
                                                            field.onChange(ratio);
                                                        }}
                                                    >
                                                        {ratio}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Share Option */}
                                <div className="text-gray-700 font-semibold">Share:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.share"
                                        control={control}

                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${(isShare && option === 'Yes') || (!isShare && option === 'No') ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            const newValue = option === 'Yes';
                                                            setIsShare(newValue);
                                                            field.onChange(newValue);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Cover Picture Option */}
                                <div className="text-gray-700 font-semibold">Cover Picture:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.coverPicture"
                                        control={control}

                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${(isCoverPicture && option === 'Yes') || (!isCoverPicture && option === 'No') ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            const newValue = option === 'Yes';
                                                            setIsCoverPicture(newValue);
                                                            field.onChange(newValue);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Creator Type */}
                                <div className="text-gray-700 font-semibold">Creator Type:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.creatorType"
                                        control={control}
                                        defaultValue="Nano"
                                        render={({ field }) => (
                                            <>
                                                {['Nano', 'Micro'].map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${creatorType === type ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setCreatorType(type);
                                                            field.onChange(type);
                                                        }}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Shipping Option */}
                                <div className="text-gray-700 font-semibold">Shipping:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="additionalServices.productShipping"
                                        control={control}

                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${(isShipping && option === 'Yes') || (!isShipping && option === 'No') ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            const newValue = option === 'Yes';
                                                            setIsShipping(newValue);
                                                            field.onChange(newValue);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Save Button */}
                    <div className="mt-6 text-right">
                        <button type="submit" className="ButtonBlue text-white px-6 py-0.5 rounded">{isSubmitting ? "Saving..." : "Save"}</button>
                    </div>
                </div>
            </form>
        </>
    );
}
