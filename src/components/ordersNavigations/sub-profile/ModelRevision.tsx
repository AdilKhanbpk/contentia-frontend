import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    createRevision,
    fetchOrders,
} from "@/store/features/profile/orderSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTokenContext } from "@/context/TokenCheckingContext";
import { OrderInterface } from "@/types/interfaces";

interface RevisionFormData {
    revisionContent: string;
}

interface ModelRevisionProps {
    orderData: OrderInterface;
}

export default function ModelRevision({ orderData }: ModelRevisionProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token } = useTokenContext();
    if (!token) return null;

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
                createRevision({
                    orderId: orderData._id,
                    data: {
                        revisionContent: data.revisionContent,
                    },
                    token,
                })
            );

            if (createRevision.fulfilled.match(resultAction)) {
                reset();
                await dispatch(fetchOrders(token));
                toast.success("Revision created successfully");
            } else if (createRevision.rejected.match(resultAction)) {
                throw new Error(resultAction.error.message);
            }
        } catch (error) {
            console.error("Failed to submit revision request:", error);
            toast.error("Revision creation failed");
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
                        Revizyon Talebi
                    </h2>
                    <p className='text-gray-600 mb-2'>
                        Lütfen revizyon talebi oluşturmak istediğiniz İçerik
                        Üreticisi No ve İçerik bağlantı linki ile, değişiklik
                        istediğiniz detayları belirtin.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='relative mb-2 sm:mb-3 md:mb-3 lg:mb-4'>
                            <textarea
                                {...register("revisionContent", {
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
                            {errors.revisionContent && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.revisionContent.message}
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
