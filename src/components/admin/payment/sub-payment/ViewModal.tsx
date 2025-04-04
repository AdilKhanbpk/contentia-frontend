import { PaymentInterface } from "@/store/features/admin/incomingPaymentSlice";
import React from "react";

interface ViewModalProps {
    onClose: () => void;
    currentInvoice: PaymentInterface | null;
}

const ViewModal: React.FC<ViewModalProps> = ({ onClose, currentInvoice }) => {
    if (!currentInvoice) return null;

    return (
        <div className='flex flex-col justify-start items-start px-4 mt-1 mb-4'>
            <h1 className='text-md font-semibold mb-4'>Invoice Details</h1>

            {/* Invoice ID */}
            <div className='w-full flex flex-col'>
                <p className='mb-1 font-semibold'>Invoice ID:</p>
                <p className='p-2 border rounded w-72 md:w-96'>
                    {currentInvoice._id}
                </p>
            </div>

            {/* Order ID */}
            <div className='w-full flex flex-col mt-2'>
                <p className='mb-1 font-semibold'>Order ID:</p>
                <p className='p-2 border rounded w-72 md:w-96'>
                    {currentInvoice.orderId}
                </p>
            </div>

            {/* Payment Amount */}
            <div className='w-full flex flex-col mt-2'>
                <p className='mb-1 font-semibold'>Payment Amount:</p>
                <p className='p-2 border rounded w-72 md:w-96'>
                    {currentInvoice.paymentAmount}
                </p>
            </div>

            {/* Payment Status */}
            <div className='w-full flex flex-col mt-2'>
                <p className='mb-1 font-semibold'>Payment Status:</p>
                <p className='p-2 border rounded w-72 md:w-96'>
                    {currentInvoice.paymentStatus}
                </p>
            </div>

            {/* Display Invoice Image */}
            {currentInvoice.invoiceImage && (
                <div className='max-w-[400px] flex flex-col mt-4'>
                    <p className='mb-1 font-semibold'>Invoice Image:</p>
                    <img
                        src={currentInvoice.invoiceImage}
                        alt='Invoice Image'
                        className='w-full h-auto rounded-md border'
                    />
                </div>
            )}
        </div>
    );
};

export default ViewModal;
