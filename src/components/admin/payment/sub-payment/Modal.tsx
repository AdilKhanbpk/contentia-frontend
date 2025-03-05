import { useForm } from "react-hook-form";

export default function CreateInvoiceModal() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log("Invoice Created:", data);
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white p-6 rounded-lg w-96 shadow-md'>
                <h2 className='text-xl font-semibold mb-4'>Create Invoice</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-2'>
                        <label className='block text-sm font-medium'>
                            Invoice ID
                        </label>
                        <input
                            type='number'
                            {...register("id", { required: true })}
                            className='w-full p-2 border rounded'
                        />
                        {errors.id && (
                            <p className='text-red-500 text-xs'>
                                Invoice ID is required
                            </p>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label className='block text-sm font-medium'>
                            Payment ID
                        </label>
                        <input
                            type='number'
                            {...register("paymentID", { required: true })}
                            className='w-full p-2 border rounded'
                        />
                        {errors.paymentID && (
                            <p className='text-red-500 text-xs'>
                                Payment ID is required
                            </p>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label className='block text-sm font-medium'>
                            Payment Date
                        </label>
                        <input
                            type='date'
                            {...register("paymentDate", { required: true })}
                            className='w-full p-2 border rounded'
                        />
                        {errors.paymentDate && (
                            <p className='text-red-500 text-xs'>
                                Payment Date is required
                            </p>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label className='block text-sm font-medium'>
                            Amount Paid
                        </label>
                        <input
                            type='text'
                            {...register("amountPaid", { required: true })}
                            className='w-full p-2 border rounded'
                        />
                        {errors.amountPaid && (
                            <p className='text-red-500 text-xs'>
                                Amount Paid is required
                            </p>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label className='block text-sm font-medium'>
                            Payment Status
                        </label>
                        <select
                            {...register("paymentStatus", { required: true })}
                            className='w-full p-2 border rounded'
                        >
                            <option value='Success'>Success</option>
                            <option value='Pending'>Pending</option>
                            <option value='Failed'>Failed</option>
                        </select>
                        {errors.paymentStatus && (
                            <p className='text-red-500 text-xs'>
                                Payment Status is required
                            </p>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label className='block text-sm font-medium'>
                            Cancel / Refund
                        </label>
                        <select
                            {...register("cancelRefund", { required: true })}
                            className='w-full p-2 border rounded'
                        >
                            <option value='Not Refunded'>Not Refunded</option>
                            <option value='Refunded'>Refunded</option>
                        </select>
                        {errors.cancelRefund && (
                            <p className='text-red-500 text-xs'>
                                Cancel / Refund status is required
                            </p>
                        )}
                    </div>

                    <div className='flex justify-end space-x-2 mt-4'>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-blue-500 text-white rounded'
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
