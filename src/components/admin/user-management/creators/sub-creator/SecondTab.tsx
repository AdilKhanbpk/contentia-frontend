

import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

export default function FirstTab() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
    };

    return (
        <>
            <div className='w-2/3 p-6'>   <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Bank Account Type</label>
                            <select
                                {...register("bankAccountType", { required: "Bank Account Type is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            >
                                <option value="">Select Account Type</option>
                                <option value="Bireysel">Bireysel</option>
                                <option value="Ticari">Ticari</option>
                            </select>
                            {errors.bankAccountType && typeof errors.bankAccountType.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.bankAccountType.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Name and Surname</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            />
                            {errors.name && typeof errors.name.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Identity Number</label>
                            <input
                                type="text"
                                {...register("identityNumber", { required: "Identity Number is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            />
                            {errors.identityNumber && typeof errors.identityNumber.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.identityNumber.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">IBAN Number</label>
                            <input
                                type="text"
                                {...register("iban", { required: "IBAN is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            />
                            {errors.iban && typeof errors.iban.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.iban.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                {...register("address", { required: "Address is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            />
                            {errors.address && typeof errors.address.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                            )}
                        </div>

                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Invoice Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Invoice Status</label>
                            <div className="mt-1">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        value="yes"
                                        {...register("invoiceStatus", { required: "Invoice Status is required" })}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register("invoiceStatus", { required: "Invoice Status is required" })}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                            </div>
                            {errors.invoiceStatus && typeof errors.invoiceStatus.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.invoiceStatus.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Invoice Type</label>
                            <select
                                {...register("invoiceType", { required: "Invoice Type is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                            >
                                <option value="">Select Invoice Type</option>
                                <option value="Bireysel">Bireysel</option>
                                <option value="Ticari">Ticari</option>
                            </select>
                            {errors.invoiceType && typeof errors.invoiceType.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.invoiceType.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Name and Surname</label>
                            <input
                                type="text"
                                {...register("invoiceName", { required: "Invoice Name is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                                required
                            />
                            {errors.invoiceName && typeof errors.invoiceName.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.invoiceName.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="invoiceIdentityNumber" className="block text-sm font-medium">Identity No</label>
                            <input
                                id="invoiceIdentityNumber"
                                type="text"
                                {...register("invoiceIdentityNumber", { required: "Invoice Identity Number is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                                required
                            />
                            {errors.invoiceIdentityNumber && typeof errors.invoiceIdentityNumber.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.invoiceIdentityNumber.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="invoiceAddress" className="block text-sm font-medium">Invoice Address</label>
                            <input
                                id="invoiceAddress"
                                type="text"
                                {...register("invoiceAddress", { required: "Invoice Address is required" })}
                                className="mt-1 block w-full border border-gray-300 px-2 py-1 rounded-md shadow-sm"
                                required
                            />
                            {errors.invoiceAddress && typeof errors.invoiceAddress.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.invoiceAddress.message}</p>
                            )}
                        </div>

                    </div>
                </div>

                <div className='w-full flex justify-end'>
                    <button type="submit" className="px-4  mt-6 py-2 ButtonBlue text-white font-semibold rounded-md">
                        Save
                    </button>
                </div>
            </form></div>
        </>
    );
}
