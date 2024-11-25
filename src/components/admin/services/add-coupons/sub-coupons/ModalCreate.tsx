"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createCoupon } from '@/store/features/admin/couponSlice';

interface ModalCreateProps {
    closeModal: () => void;
    token: string;
}

interface CouponForm {
    code: string;
    customer: string;
    discountTL?: number;
    discountPercent?: number;
    useLimit: number;
    endingDate: string;
}

export default function ModalCreate({ closeModal, token }: ModalCreateProps) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<CouponForm>();

    const onSubmit = async (formData: CouponForm) => {
        try {
            const couponData = {
                code: formData.code,
                customer: formData.customer,
                discountTl: formData.discountTL?.toString(),
                discountPercentage: formData.discountPercent,
                usageLimit: formData.useLimit === 0 ? null : formData.useLimit,
                expiryDate: new Date(formData.endingDate).toISOString(),
                isActive: true
            };

            console.log("coupon data in modal create before create", formData);
    
            await dispatch(createCoupon({ data: couponData, token }) as any);
            closeModal();
        } catch (error) {
            console.error('Failed to create coupon:', error);
            // Log the error to see its structure
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Unknown error occurred', error);
            }
        }
    };
    

    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:px-16 lg:py-8">
            <h2 className="text-lg font-semibold mb-4">Create Coupon</h2>
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
                </div>
                <div className="mt-6 text-right">
                    <button type="submit" className="ButtonBlue text-white px-5 py-2 rounded">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}