"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
    fetchAdditionalServices,
    updateAdditionalService,
    createAdditionalService,
} from "@/store/features/admin/addPriceSlice";
import { toast } from "react-toastify";

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

    useEffect(() => {
        dispatch(fetchAdditionalServices() as any)
            .then(() => {
                toast.success("Services fetched successfully!");
            })
            .catch((err: Error) => {
                toast.error(err.message || "Failed to fetch services");
            });
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

    const handleSaveService: SubmitHandler<FormData> = async (data) => {
        console.log("Form submitted with data:", data);

        try {
            // Create the service object from form data
            const serviceData = {
                editPrice: Number(data.editPrice),
                sharePrice: Number(data.sharePrice),
                coverPicPrice: Number(data.coverPicPrice),
                creatorTypePrice: Number(data.creatorTypePrice),
                shippingPrice: Number(data.shippingPrice),
                thirtySecondDurationPrice: Number(data.thirtySecondDurationPrice),
                sixtySecondDurationPrice: Number(data.sixtySecondDurationPrice),
            };

            console.log("Service data:", serviceData);

            // Check if we have a valid MongoDB ObjectId (24 hex characters)
            const isValidMongoId = additionalService?._id &&
                /^[0-9a-fA-F]{24}$/.test(additionalService._id);

            if (isValidMongoId) {
                // If we have a valid ID, update the existing service
                console.log("Updating existing service with ID:", additionalService?._id);

                const result = await dispatch(
                    updateAdditionalService({
                        id: additionalService!._id!,
                        data: serviceData,
                    }) as any
                ).unwrap();

                console.log("Update result:", result);
                toast.success("Service updated successfully!");
            } else {
                // If we don't have a valid ID, create a new service
                console.log("Creating new service");

                const result = await dispatch(
                    createAdditionalService({
                        data: serviceData,
                    }) as any
                ).unwrap();

                console.log("Create result:", result);
                toast.success("Service created successfully!");
            }

            // Force a refresh of the data
            dispatch(fetchAdditionalServices() as any);
        } catch (err: any) {
            console.error("Error saving service:", err);

            // Check if the error is about an invalid ID
            if (err.message && err.message.includes("Invalid Id")) {
                toast.error("Invalid ID format. Creating a new service instead.");

                try {
                    // Try to create a new service instead
                    const serviceData = {
                        editPrice: Number(data.editPrice),
                        sharePrice: Number(data.sharePrice),
                        coverPicPrice: Number(data.coverPicPrice),
                        creatorTypePrice: Number(data.creatorTypePrice),
                        shippingPrice: Number(data.shippingPrice),
                        thirtySecondDurationPrice: Number(data.thirtySecondDurationPrice),
                        sixtySecondDurationPrice: Number(data.sixtySecondDurationPrice),
                    };

                    const result = await dispatch(
                        createAdditionalService({
                            data: serviceData,
                        }) as any
                    ).unwrap();

                    console.log("Create result after ID error:", result);
                    toast.success("Service created successfully!");

                    // Force a refresh of the data
                    dispatch(fetchAdditionalServices() as any);
                } catch (createErr: any) {
                    console.error("Error creating service after ID error:", createErr);
                    toast.error(createErr.message || "Failed to create service.");
                }
            } else {
                toast.error(err.message || "Failed to save service.");
            }
        }
    };

    const onSubmit = (data: FormData) => {
        console.log("Form onSubmit triggered with data:", data);
        handleSaveService(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
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
                        onClick={() => console.log("Save button clicked")}
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddService;
