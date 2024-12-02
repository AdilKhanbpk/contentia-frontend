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
  customerId: string;
  customerName: string;
  discountTL?: number;
  discountPercent?: number;
  useLimit: number;
  endingDate: string;
  isActive: boolean;
}

export default function ModalEdit({ closeModal, token, couponId }: ModalEditProps) {
  const dispatch = useDispatch();
  const { selectedCoupon, loading } = useSelector((state: RootState) => state.coupon);

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<CouponForm>();

  const discountTL = watch("discountTL");
  const discountPercent = watch("discountPercent");

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
      // Use customer's ID if available, otherwise use an empty string
      setValue('customerId', selectedCoupon.customer?._id || '');
      // Set customer name, fallback to 'Unknown' if not available
      setValue('customerName', selectedCoupon.customer?.fullName || 'Unknown');
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
      // Validate that only one discount type is provided
      if ((formData.discountTL && formData.discountPercent) || 
          (!formData.discountTL && !formData.discountPercent)) {
        throw new Error(
          "You must provide either a discount in TL or a discount percentage, but not both."
        );
      }

      // Prepare data to send
      const couponData: Record<string, any> = {
        code: formData.code,
        customerId: formData.customerId, // Use the actual customer ID
        usageLimit: formData.useLimit === 0 ? null : formData.useLimit,
        expiryDate: new Date(formData.endingDate).toISOString(),
        isActive: formData.isActive,
      };

      if (formData.discountTL) {
        couponData.discountTl = formData.discountTL.toString();
      } else if (formData.discountPercent) {
        couponData.discountPercentage = formData.discountPercent;
      }

      console.log("Coupon data in modal edit before update", couponData);

      await dispatch(updateCoupon({ id: couponId, data: couponData, token }) as any);
      closeModal();
    } catch (error) {
      console.error('Failed to update coupon:', error);
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error occurred", error);
      }
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
              {...register("code", { required: "Code is required" })}
              className="w-full px-6 py-2 focus:outline-none border rounded-md"
            />
            {errors.code && (
              <span className="text-red-500 text-sm">{errors.code.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Customer Name</label>
            <input
              type="text"
              {...register("customerName", { required: "Customer name is required" })}
              readOnly
              className="w-full px-6 py-2 focus:outline-none border rounded-md bg-gray-100"
            />
            <input
              type="hidden"
              {...register("customerId", { required: "Customer ID is required" })}
            />
            {errors.customerName && (
              <span className="text-red-500 text-sm">{errors.customerName.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Discount (TL)</label>
            <input
              type="number"
              {...register("discountTL", {
                validate: () => {
                  if (discountTL && discountPercent) {
                    return "You can only provide one type of discount";
                  }
                  return true;
                },
              })}
              className="w-full px-6 py-2 focus:outline-none border rounded-md"
            />
            {errors.discountTL && (
              <span className="text-red-500 text-sm">
                {errors.discountTL.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Discount (%)</label>
            <input
              type="number"
              {...register("discountPercent", {
                validate: () => {
                  if (discountPercent && discountTL) {
                    return "You can only provide one type of discount";
                  }
                  return true;
                },
              })}
              className="w-full px-6 py-2 focus:outline-none border rounded-md"
            />
            {errors.discountPercent && (
              <span className="text-red-500 text-sm">
                {errors.discountPercent.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Use Limit</label>
            <input
              type="number"
              {...register("useLimit", { required: "Use limit is required" })}
              className="w-full px-6 py-2 focus:outline-none border rounded-md"
            />
            {errors.useLimit && (
              <span className="text-red-500 text-sm">{errors.useLimit.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Ending Date</label>
            <input
              type="date"
              {...register("endingDate", { required: "Ending date is required" })}
              className="w-full px-6 py-2 focus:outline-none border rounded-md"
            />
            {errors.endingDate && (
              <span className="text-red-500 text-sm">{errors.endingDate.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">
              <input
                type="checkbox"
                {...register("isActive")}
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