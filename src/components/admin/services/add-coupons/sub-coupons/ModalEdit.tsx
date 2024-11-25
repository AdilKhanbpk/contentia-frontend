"use client";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCouponById, updateCoupon } from '@/store/features/admin/couponSlice';
import { RootState } from '@/store/store';

interface ModalEditProps {
    closeModal: () => void;
    token: string;
    couponId: string | null;
}

interface CouponForm {
    code: string;
    customer: string;
    discountTL?: number;
    discountPercent?: number;
    useLimit: number;
    endingDate: string;
    isActive: boolean;
}

export default function ModalEdit({ closeModal, token, couponId }: ModalEditProps) {
    const dispatch = useDispatch();
    const { selectedCoupon, loading } = useSelector((state: RootState) => state.coupon);
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CouponForm>();

    // Fetch coupon data when component mounts or couponId changes
    useEffect(() => {
        if (couponId && token) {
            dispatch(getCouponById({ id: couponId, token }) as any);
        }
    }, [couponId, token, dispatch]);

    // Populate form when selectedCoupon changes
    useEffect(() => {
        if (selectedCoupon) {
            setValue('code', selectedCoupon.code);
            setValue('customer', selectedCoupon.customer);
            setValue('discountTL', selectedCoupon.discountTl ? parseFloat(selectedCoupon.discountTl) : undefined);
            setValue('discountPercent', selectedCoupon.discountPercentage);
            setValue('useLimit', selectedCoupon.usageLimit || 0);
            setValue('endingDate', new Date(selectedCoupon.expiryDate).toISOString().split('T')[0]);
            setValue('isActive', selectedCoupon.isActive);
        }
    }, [selectedCoupon, setValue]);

    const onSubmit = async (formData: CouponForm) => {
        if (!couponId) return;

        try {
            const couponData = {
                code: formData.code,
                customer: formData.customer,
                discountTl: formData.discountTL?.toString(),
                discountPercentage: formData.discountPercent,
                usageLimit: formData.useLimit === 0 ? null : formData.useLimit,
                expiryDate: new Date(formData.endingDate).toISOString(),
                isActive: formData.isActive
            };

            console.log("formData in model edit before saving", formData);

            await dispatch(updateCoupon({ id: couponId, data: couponData, token }) as any);
            closeModal();
        } catch (error) {
            console.error('Failed to update coupon:', error);
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:px-16 lg:py-8">
            <h2 className="text-lg font-semibold mb-4">Edit Coupon</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold">Code</label>
                        <input
                            type="text"
                            {...register('code', { required: 'Code is required' })}
                            className="w-full px-6 py-2 focus:outline-none border rounded-md"
                        />
                        {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Select Customer</label>
                        <input
                            type="text"
                            {...register('customer', { required: 'Customer is required' })}
                            className="w-full px-6 py-2 focus:outline-none border rounded-md"
                        />
                        {errors.customer && <span className="text-red-500 text-sm">{errors.customer.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Discount (TL)</label>
                        <input
                            type="number"
                            {...register('discountTL', {
                                validate: (value, formValues) => 
                                    (value === undefined && formValues.discountPercent === undefined) ? 
                                    'Either TL or Percentage discount is required' : true
                            })}
                            className="w-full px-6 py-2 focus:outline-none border rounded-md"
                        />
                        {errors.discountTL && <span className="text-red-500 text-sm">{errors.discountTL.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Discount (%)</label>
                        <input
                            type="number"
                            {...register('discountPercent')}
                            className="w-full px-6 py-2 focus:outline-none border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Use Limit</label>
                        <input
                            type="number"
                            {...register('useLimit', { required: 'Use limit is required' })}
                            className="w-full px-6 py-2 focus:outline-none border rounded-md"
                        />
                        {errors.useLimit && <span className="text-red-500 text-sm">{errors.useLimit.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Ending Date</label>
                        <input
                            type="date"
                            {...register('endingDate', { required: 'Ending date is required' })}
                            className="w-full px-6 py-2 focus:outline-none border rounded-md"
                        />
                        {errors.endingDate && <span className="text-red-500 text-sm">{errors.endingDate.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">
                            <input
                                type="checkbox"
                                {...register('isActive')}
                                className="mr-2"
                            />
                            Active
                        </label>
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button type="submit" className="ButtonBlue text-white px-5 py-2 rounded">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}