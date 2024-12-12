"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCoupon } from "@/store/features/admin/couponSlice";
import { toast } from 'react-toastify';

interface ModalCreateProps {
  closeModal: () => void;
  token: string;
}

interface CouponForm {
  code: string;
  customerId: string;
  discountTL?: number;
  discountPercent?: number;
  useLimit: number;
  endingDate: string;
}

export default function ModalCreate({ closeModal, token }: ModalCreateProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CouponForm>();

  const discountTL = watch("discountTL");
  const discountPercent = watch("discountPercent");

  const onSubmit = async (formData: CouponForm) => {
    try {
      if ((formData.discountTL && formData.discountPercent) ||
        (!formData.discountTL && !formData.discountPercent)) {
        throw new Error(
          "You must provide either a discount in TL or a discount percentage, but not both."
        );
      }

      const couponData: Record<string, any> = {
        code: formData.code,
        customerId: formData.customerId,
        usageLimit: formData.useLimit === 0 ? null : formData.useLimit,
        expiryDate: new Date(formData.endingDate).toISOString(),
        isActive: true,
      };

      if (formData.discountTL) {
        couponData.discountTl = formData.discountTL.toString();
      } else if (formData.discountPercent) {
        couponData.discountPercentage = formData.discountPercent;
      }

      await dispatch(createCoupon({ data: couponData, token }) as any);
      toast.success("Coupon created successfully!");
      closeModal();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(errorMessage);
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
              {...register("code", { required: "Code is required" })}
              className="w-full px-6 py-2 focus:outline-none border rounded-md"
            />
            {errors.code && (
              <span className="text-red-500 text-sm">{errors.code.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Select Customer</label>
            <input
              type="text"
              {...register("customerId", { required: "Customer is required" })}
              className="w-full px-6 py-2 focus:outline-none border rounded-md"
            />
            {errors.customerId && (
              <span className="text-red-500 text-sm">{errors.customerId.message}</span>
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
