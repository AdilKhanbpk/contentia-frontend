import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createAdminClaim } from "@/store/features/admin/claimSlice";
import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/checkToken";

interface ClaimFormData {
    status: string;
    customerId: string;
    orderId: string;
    claimDate: string;
    claimContent: string;
}

export default function Modal() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ClaimFormData>({
        defaultValues: {
            status: "pending",
            customerId: "",
            orderId: "",
            claimDate: new Date().toISOString().split("T")[0],
            claimContent: "",
        },
    });

    const onSubmit: SubmitHandler<ClaimFormData> = (data) => {
        const token = getAccessToken();
        if (!token) return;
        setLoading(true); // Start loading
        dispatch(
            createAdminClaim({
                data: {
                    status: "pending",
                    customer: { id: data.customerId },
                    order: { id: data.orderId },
                    claimDate: data.claimDate,
                    claimContent: data.claimContent,
                },
                token,
            })
        )
            .unwrap()
            .then(() => {
                reset();
                toast.success("Claim created successfully!");
            })
            .catch((error) => {
                toast.error(
                    `Failed to create claim: ${
                        error.message || "Unknown error"
                    }`
                );
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
            <h1 className='text-lg font-semibold'>Add Order Claim</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6'>
                    <div>
                        <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            Customer ID
                        </label>
                        <input
                            type='text'
                            {...register("customerId", {
                                required: "Customer ID is required",
                            })}
                            placeholder=''
                            className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none overflow-auto'
                        />
                        {errors.customerId && (
                            <p className='text-red-500 text-sm mt-1'>
                                {errors.customerId.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            Claim Date
                        </label>
                        <input
                            type='date'
                            {...register("claimDate", {
                                required: "Claim Date is required",
                            })}
                            className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none overflow-auto'
                        />
                        {errors.claimDate && (
                            <p className='text-red-500 text-sm mt-1'>
                                {errors.claimDate.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6'>
                    <div>
                        <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            Order ID
                        </label>
                        <input
                            type='text'
                            {...register("orderId", {
                                required: "Order ID is required",
                            })}
                            placeholder=''
                            className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none overflow-auto'
                        />
                        {errors.orderId && (
                            <p className='text-red-500 text-sm mt-1'>
                                {errors.orderId.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className='bg-white'>
                    <div className='bg-white py-4 sm:py-5 md:py-6 lg:py-6 rounded-md'>
                        <h2 className='text-base font-semibold mb-1'>
                            Claim Content
                        </h2>
                        <div className='mb-2 sm:mb-3 md:mb-3 lg:mb-4'>
                            <textarea
                                {...register("claimContent", {
                                    required: "Claim content is required",
                                })}
                                className='w-full p-2 sm:p-3 md:p-4 lg:p-4 border border-gray-400 rounded-lg focus:outline-none'
                                rows={3}
                                placeholder=''
                            />
                            {errors.claimContent && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.claimContent.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='Button text-white px-8 py-1 rounded-lg font-semibold'
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}
