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
import { useTokenContext } from "@/context/TokenCheckingContext";

type FormData = {
    editPrice: number;
    sharePrice: number;
    coverPicPrice: number;
    creatorTypePrice: number;
    shippingPrice: number;
    thirtySecondDurationPrice: number;
    sixtySecondDurationPrice: number;
};

const AddService: React.FC = () => {
    const dispatch = useDispatch();
    const { data: additionalService, error } = useSelector(
        (state: RootState) => state.addPrice
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<FormData>();
    const { token } = useTokenContext();
    if (!token) return null;

    useEffect(() => {
        if (token) {
            dispatch(fetchAdditionalServices(token) as any)
                .then(() => {
                    toast.success("Services fetched successfully!");
                })
                .catch((err: Error) => {
                    toast.error(err.message || "Failed to fetch services");
                });
        }
    }, [dispatch]);

    useEffect(() => {
        if (additionalService) {
            reset({
                editPrice: additionalService.editPrice || 0,
                sharePrice: additionalService.sharePrice || 0,
                coverPicPrice: additionalService.coverPicPrice || 0,
                creatorTypePrice: additionalService.creatorTypePrice || 0,
                shippingPrice: additionalService.shippingPrice || 0,
                thirtySecondDurationPrice:
                    additionalService.thirtySecondDurationPrice || 0,
                sixtySecondDurationPrice:
                    additionalService.sixtySecondDurationPrice || 0,
            });
        }
    }, [additionalService, reset]);

    const handleSaveService: SubmitHandler<FormData> = (data) => {
        if (!token) return;
        if (additionalService) {
            const updatedService = {
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

                <div className='mt-4'>
                    <h3 className='font-semibold mb-4 text-lg'>
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
                                step='any'
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
                                step='any'
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
                                step='any'
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
                                step='any'
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
                                step='any'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                30-Second Süre:
                            </p>
                            <input
                                {...register("thirtySecondDurationPrice")}
                                type='number'
                                step='any'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>

                    <div className='flex items-center space-x-4 mb-2'>
                        <div className='flex items-center'>
                            <p className='mr-8 whitespace-nowrap md:w-40 font-semibold text-sm'>
                                60-Second Süre:
                            </p>
                            <input
                                {...register("sixtySecondDurationPrice")}
                                type='number'
                                step='any'
                                className='focus:outline-none border rounded-md w-20 md:w-48 px-3 text-lg'
                            />
                        </div>
                    </div>
                </div>

                <div className='flex lg:w-1/2 justify-end'>
                    <button
                        type='submit'
                        className='w-32 Button text-white px-3 py-2 rounded-md mt-4'
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddService;
