"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    getCouponById,
    updateCoupon,
} from "@/store/features/admin/couponSlice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

interface ModalEditProps {
    closeModal: () => void;
    token: string;
    couponId: string | null;
}

interface CouponForm {
    code: string;
    customerId: string;
    discountTL?: number;
    discountPercent?: number;
    useLimit: number;
    endingDate: string;
    isActive: boolean;
}

export default function ModalEdit({
    closeModal,
    token,
    couponId,
}: ModalEditProps) {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchingCoupon, setFetchingCoupon] = useState(false);
    const { selectedCoupon } = useSelector((state: RootState) => state.coupon);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm<CouponForm>();

    const discountTL = watch("discountTL");
    const discountPercent = watch("discountPercent");

    useEffect(() => {
        const fetchCouponData = async () => {
            if (!couponId || !token) return;

            setFetchingCoupon(true);
            try {
                await dispatch(getCouponById({ id: couponId, token }) as any);
            } catch (error: any) {
                toast.error(error?.message || "Failed to fetch coupon data");
            } finally {
                setFetchingCoupon(false);
            }
        };

        fetchCouponData();
    }, [couponId, token, dispatch]);

    useEffect(() => {
        if (selectedCoupon) {
            setValue("code", selectedCoupon.code);
            setValue("customerId", selectedCoupon.customer?._id || "");
            setValue(
                "discountTL",
                selectedCoupon.discountTl
                    ? parseFloat(selectedCoupon.discountTl)
                    : undefined
            );
            setValue("discountPercent", selectedCoupon.discountPercentage);
            setValue("useLimit", selectedCoupon.usageLimit || 0);
            setValue(
                "endingDate",
                new Date(selectedCoupon.expiryDate).toISOString().split("T")[0]
            );
            setValue("isActive", selectedCoupon.isActive);
        }
    }, [selectedCoupon, setValue]);

    const onSubmit = async (formData: CouponForm) => {
        if (!couponId) return;

        try {
            setIsSubmitting(true);
            if (
                (formData.discountTL && formData.discountPercent) ||
                (!formData.discountTL && !formData.discountPercent)
            ) {
                throw new Error(
                    "You must provide either a discount in TL or a discount percentage, but not both."
                );
            }

            const couponData: Record<string, any> = {
                code: formData.code,
                customerId: formData.customerId,
                usageLimit: formData.useLimit === 0 ? null : formData.useLimit,
                expiryDate: new Date(formData.endingDate).toISOString(),
                isActive: formData.isActive,
            };

            if (formData.discountTL) {
                couponData.discountTl = formData.discountTL.toString();
            } else if (formData.discountPercent) {
                couponData.discountPercentage = formData.discountPercent;
            }

            await dispatch(
                updateCoupon({ id: couponId, data: couponData, token }) as any
            );
            toast.success("Coupon updated successfully!");
            closeModal();
        } catch (error: any) {
            toast.error(error?.message || "Failed to update coupon");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:px-16 lg:py-8'>
            <h2 className='text-lg font-semibold mb-4'>Edit Coupon</h2>

            {fetchingCoupon ? (
                <p className='text-center text-gray-500'>
                    Loading coupon data...
                </p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-semibold'>
                                Code
                            </label>
                            <input
                                type='text'
                                {...register("code", {
                                    required: "Code is required",
                                })}
                                className='w-full px-6 py-2 focus:outline-none border rounded-md'
                            />
                            {errors.code && (
                                <span className='text-red-500 text-sm'>
                                    {errors.code.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-semibold'>
                                Customer Id
                            </label>
                            <input
                                type='text'
                                {...register("customerId")}
                                className='w-full px-6 py-2 focus:outline-none border rounded-md'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-semibold'>
                                Discount (TL)
                            </label>
                            <input
                                type='number'
                                {...register("discountTL", {
                                    validate: () => {
                                        if (discountTL && discountPercent) {
                                            return "You can only provide one type of discount";
                                        }
                                        return true;
                                    },
                                })}
                                className='w-full px-6 py-2 focus:outline-none border rounded-md'
                            />
                            {errors.discountTL && (
                                <span className='text-red-500 text-sm'>
                                    {errors.discountTL.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-semibold'>
                                Discount (%)
                            </label>
                            <input
                                type='number'
                                {...register("discountPercent", {
                                    validate: () => {
                                        if (discountPercent && discountTL) {
                                            return "You can only provide one type of discount";
                                        }
                                        return true;
                                    },
                                })}
                                className='w-full px-6 py-2 focus:outline-none border rounded-md'
                            />
                            {errors.discountPercent && (
                                <span className='text-red-500 text-sm'>
                                    {errors.discountPercent.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-semibold'>
                                Use Limit
                            </label>
                            <input
                                type='number'
                                {...register("useLimit", {
                                    required: "Use limit is required",
                                })}
                                className='w-full px-6 py-2 focus:outline-none border rounded-md'
                            />
                            {errors.useLimit && (
                                <span className='text-red-500 text-sm'>
                                    {errors.useLimit.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-semibold'>
                                Ending Date
                            </label>
                            <input
                                type='date'
                                {...register("endingDate", {
                                    required: "Ending date is required",
                                })}
                                className='w-full px-6 py-2 focus:outline-none border rounded-md'
                            />
                            {errors.endingDate && (
                                <span className='text-red-500 text-sm'>
                                    {errors.endingDate.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-semibold'>
                                <input
                                    type='checkbox'
                                    {...register("isActive")}
                                    className='mr-2'
                                />
                                Active
                            </label>
                        </div>
                    </div>
                    <div className='mt-6 text-right'>
                        <button
                            type='submit'
                            className='Button text-white px-5 py-2 rounded'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
