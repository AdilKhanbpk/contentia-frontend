import React, { useState } from "react";
import {
    fetchPayments,
    PaymentInterface,
    updatePayment,
    uploadInvoiceImage,
} from "@/store/features/admin/incomingPaymentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTokenContext } from "@/context/TokenCheckingContext";

interface EditInvoiceModalProps {
    currentInvoice: PaymentInterface | null;
    onClose: () => void;
}

const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({
    currentInvoice,
    onClose,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { token } = useTokenContext();
    if (!token) return null;
    if (!currentInvoice) return null;

    const onSubmit = async (data: any) => {
        if (!currentInvoice._id) return;

        try {
            const formData = new FormData();
            formData.append("paymentStatus", data.paymentStatus);
            if (data.invoiceImage && data.invoiceImage.length > 0) {
                formData.append("invoiceImage", data.invoiceImage[0]);
            }

            await dispatch(
                updatePayment({
                    paymentId: currentInvoice._id,
                    data: formData,
                    token,
                })
            );

            await dispatch(fetchPayments(token));
            toast.success("Payment updated successfully!");
            onClose();
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error);
            toast.error("Failed to update Payment. Please try again.");
        }
    };

    return (
        <div className='flex flex-col justify-start items-start px-4 mt-1 mb-4'>
            <h1 className='text-md font-semibold mb-4'>Edit Invoice</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full max-w-md'
            >
                {/* Order ID (Read-only) */}
                <div className='mb-3'>
                    <p className='mb-1 font-semibold'>Order ID:</p>
                    <input
                        type='text'
                        value={currentInvoice.orderId}
                        readOnly
                        className='p-2 border rounded w-full bg-gray-100'
                    />
                </div>

                {/* Payment Status */}
                <div className='mb-3'>
                    <p className='mb-1 font-semibold'>Payment Status:</p>
                    <select
                        defaultValue={currentInvoice.paymentStatus}
                        {...register("paymentStatus", { required: true })}
                        className='p-2 border rounded w-full'
                    >
                        <option value='paid'>Paid</option>
                        <option value='unpaid'>Unpaid</option>
                        <option value='refund'>Refund</option>
                    </select>
                </div>

                {/* Invoice Image */}
                <div className='mb-3'>
                    <p className='mb-1 font-semibold'>
                        Upload New Invoice Image:
                    </p>
                    <input
                        type='file'
                        accept='image/*'
                        {...register("invoiceImage")}
                        className='p-2 border rounded w-full'
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setSelectedImage(file);
                            }
                        }}
                    />
                </div>

                {/* Existing Invoice Image Preview */}
                {currentInvoice.invoiceImage && (
                    <div className='mt-3'>
                        <p className='mb-1 font-semibold'>
                            Current Invoice Image:
                        </p>
                        <img
                            src={currentInvoice.invoiceImage}
                            alt='Invoice'
                            className='w-full max-w-sm rounded border'
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className='flex justify-end space-x-3 mt-6'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-blue-500 text-white rounded'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Updating..." : "Update Invoice"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInvoiceModal;
