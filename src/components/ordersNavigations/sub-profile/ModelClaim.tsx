import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createClaim } from "@/store/features/profile/orderSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { OrderInterface } from "@/types/interfaces";

interface RevisionFormData {
    claimContent: string;
}

interface ModelClaimProps {
    orderData: OrderInterface;
}

export default function ModelClaim({ orderData }: ModelClaimProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RevisionFormData>();

    const onSubmit = async (data: RevisionFormData) => {
        if (!orderData._id) {
            console.error("No order found");
            return;
        }

        setIsSubmitting(true);
        try {
            const resultAction = await dispatch(
                createClaim({
                    orderId: orderData._id,
                    data: {
                        claimContent: data.claimContent,
                    },
                })
            );

            if (createClaim.fulfilled.match(resultAction)) {
                reset();
                toast.success("Claim created successfully");
            } else if (createClaim.rejected.match(resultAction)) {
                throw new Error(resultAction.error.message);
            }
        } catch (error) {
            console.error("Failed to submit revision request:", error);
            toast.error("Claim creation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Revision Request */}
            <div className='flex justify-center items-center bg-white'>
                <div className='bg-white p-4 sm:p-5 md:p-6 lg:p-6 rounded-md'>
                    <h2 className='text-base font-semibold mb-1'>
                        Şikayet Bildirimi
                    </h2>
                    <p className='text-gray-600 mb-2'>
                        Lütfen şikayet bildirmek istediğiniz İçerik Üreticisi No
                        ve ilgili içerik bağlantı linki ile birlikte,
                        yaşadığınız problemi ve detaylarını belirtin.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='relative mb-2 sm:mb-3 md:mb-3 lg:mb-4'>
                            <textarea
                                {...register("claimContent", {
                                    required: "Revizyon detayları gereklidir",
                                    minLength: {
                                        value: 10,
                                        message:
                                            "Lütfen en az 10 karakter girin",
                                    },
                                })}
                                className='w-full p-2 sm:p-3 md:p-4 lg:p-4 border rounded-lg focus:outline-none'
                                rows={6}
                                placeholder=''
                            />
                            {errors.claimContent && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.claimContent.message}
                                </p>
                            )}
                        </div>

                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='Button text-white px-8 py-1 rounded-lg font-semibold'
                            >
                                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
