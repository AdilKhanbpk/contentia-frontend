"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";

export interface Customer {
    id: number;
    fullName: string;
    email: string;
    contact: string;
    age: number;
    country: string;
    status: "Verified" | "Pending" | "Rejected";
    invoiceType: string;  // Capitalized to camelCase
    tcNumber?: string;  // Capitalized to camelCase
    companyTitle?: string;  // Capitalized to camelCase
    taxNumber?: string;  // Capitalized to camelCase
    taxOffice?: string;  // Capitalized to camelCase
    address?: string;  // Capitalized to camelCase
    billingInformation?: {  // Capitalized to camelCase
        invoiceStatus: boolean;  // Capitalized to camelCase
        trId: string;  // Capitalized to camelCase
        address: string;  // Capitalized to camelCase
        fullName: string;  // Capitalized to camelCase
        companyName: string;  // Capitalized to camelCase
        taxNumber: string;  // Capitalized to camelCase
        taxOffice: string;  // Capitalized to camelCase
    };
    rememberMe?: boolean;  // Capitalized to camelCase
    termsAndConditionsApproved?: boolean;  // Capitalized to camelCase
}



interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    customerData: Customer | null;
    onSubmit: (data: Customer) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({ isOpen, onClose, customerData, onSubmit }) => {
    const [invoiceType, setInvoiceType] = useState(customerData?.invoiceType || 'individual');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Customer>();

    // Reset the form if customerData changes
    useEffect(() => {
        if (customerData) {
            reset(customerData);
            setInvoiceType(customerData.invoiceType);
        }
    }, [customerData, reset]);

    return (
        <>
            {isOpen && (
                <>
                    <div className="text-lg font-semibold px-4 py-2 border-b-2 border-gray-200">New Customer</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row justify-end ">
                            <div className="mt-2 ml-2 md:mt-20 md:ml-16">
                                <Image width={30} height={30} src="/icons/avatar.png" alt="avatar" className="w-24 h-w-24 rounded-full" />
                            </div>
                            <div className="p-2 md:p-16">
                                <div>
                                    <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                        <div className='flex flex-col mb-2 sm:mb-3 lg:mb-4 w-full md:w-1/2 pr-2'>
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Name"
                                                {...register('fullName', { required: false })}
                                                defaultValue={customerData?.fullName }
                                                className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                            />
                                        </div>
                                        <div className='flex flex-col sm:mb-3 w-full md:w-1/2 pl-2'>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...register('email', { required: false })}
                                                defaultValue={customerData?.email}
                                                className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                        <div className='flex flex-col w-full md:w-1/2 md:pr-2'>
                                            <label>Contact</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your phone number"
                                                {...register('contact', { required: false })}
                                                defaultValue={customerData?.contact }
                                                className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                            />
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2 pl-2'>
                                            <label>Age</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your age"
                                                {...register('age', { required: false })}
                                                defaultValue={customerData?.age }
                                                className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Invoice Information */}
                                <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:px-4 lg:py-2 flex flex-col lg:flex-row lg:space-x-16 border-2 border-gray-200">
                                    <h2 className="text-lg font-semibold mb-4 whitespace-normal lg:whitespace-nowrap">Invoice Information</h2>
                                    <div className="w-full grid grid-cols-1  gap-4">
                                        <input
                                            type="radio"
                                            value="true"
                                            defaultChecked={true}
                                            {...register('billingInformation.invoiceStatus', { required: false })}
                                            style={{ display: 'none' }} // Hides the radio button
                                        />

                                        <div>
                                            <label className="block mb-2">Invoice Type:</label>
                                            <select
                                                {...register('invoiceType', { required: false })}
                                                defaultValue={customerData?.invoiceType }
                                                onChange={(e) => setInvoiceType(e.target.value)}
                                                className=" font-medium px-1 py-0.5 border rounded-md focus:outline-none"
                                            >
                                                <option value="individual">Bireysel</option>
                                                <option value="institutional">Kurumsal</option>
                                            </select>

                                            {invoiceType === 'individual' && (
                                                <>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Full Name:</label>
                                                        <input
                                                            type="text"
                                                            {...register('billingInformation.fullName')}
                                                            defaultValue={customerData?.billingInformation?.fullName }
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>TC Number:</label>
                                                        <input
                                                            type="text"
                                                            {...register('billingInformation.trId')}
                                                            defaultValue={customerData?.billingInformation?.trId }
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Invoice Address:</label>
                                                        <input
                                                            type="text"
                                                            {...register('billingInformation.address')}
                                                            defaultValue={customerData?.billingInformation?.address }
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            {invoiceType === 'institutional' && (
                                                <>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Company Title:</label>
                                                        <input
                                                            type="text"
                                                            {...register('billingInformation.companyName')}
                                                            defaultValue={customerData?.billingInformation?.companyName }
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Tax Number / TCKN:</label>
                                                        <input
                                                            type="text"
                                                            {...register('billingInformation.taxNumber')}
                                                            defaultValue={customerData?.billingInformation?.taxNumber }
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Tax Office:</label>
                                                        <input
                                                            type="text"
                                                            {...register('billingInformation.taxOffice')}
                                                            defaultValue={customerData?.billingInformation?.taxOffice }
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Invoice Address:</label>
                                                        <input
                                                            type="text"
                                                            {...register('billingInformation.address')}
                                                            defaultValue={customerData?.billingInformation?.address }
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 ButtonBlue text-white rounded-md mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            )}

        </>
    );
};

export default ModalEdit;
