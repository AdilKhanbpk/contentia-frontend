"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";

export interface Customer {
    ID: number;
    FullName: string;
    Email: string;
    Contact: string;
    Age: number;
    Country: string;
    Status: "Verified" | "Pending" | "Rejected";
    InvoiceType: string;  // Capitalized
    TcNumber?: string;  // Capitalized
    CompanyTitle?: string;  // Capitalized
    TaxNumber?: string;  // Capitalized
    TaxOffice?: string;  // Capitalized
    Address?: string;  // Capitalized
    BillingInformation?: {  // Capitalized
        InvoiceStatus: boolean;  // Capitalized
        TrId: string;  // Capitalized
        Address: string;  // Capitalized
        FullName: string;  // Capitalized
        CompanyName: string;  // Capitalized
        TaxNumber: string;  // Capitalized
        TaxOffice: string;  // Capitalized
    };
    RememberMe?: boolean;  // Capitalized
    TermsAndConditionsApproved?: boolean;  // Capitalized
}


interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    customerData: Customer | null;
    onSubmit: (data: Customer) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({ isOpen, onClose, customerData, onSubmit }) => {
    const [invoiceType, setInvoiceType] = useState(customerData?.InvoiceType || 'individual');

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
            setInvoiceType(customerData.InvoiceType);
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
                                                {...register('FullName', { required: false })}
                                                defaultValue={customerData?.FullName || 'N/A'}
                                                className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                            />
                                        </div>
                                        <div className='flex flex-col sm:mb-3 w-full md:w-1/2 pl-2'>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                placeholder="Enter your email address"
                                                {...register('Email', { required: false })}
                                                defaultValue={customerData?.Email || 'N/A'}
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
                                                {...register('Contact', { required: false })}
                                                defaultValue={customerData?.Contact || 'N/A'}
                                                className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                            />
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2 pl-2'>
                                            <label>Age</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your age"
                                                {...register('Age', { required: false })}
                                                defaultValue={customerData?.Age || 'N/A'}
                                                className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Invoice Information */}
                                <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:px-4 lg:py-2 flex flex-col lg:flex-row lg:space-x-16 border-2 border-gray-200">
                                    <h2 className="text-lg font-semibold mb-4 whitespace-normal lg:whitespace-nowrap">Invoice Information</h2>
                                    <div className="w-full grid grid-cols-1  gap-4">
                                        <div>
                                            <label className="block mb-2">Invoice Type:</label>
                                            <select
                                                {...register('BillingInformation.InvoiceStatus', { required: false })}
                                                defaultValue={customerData?.InvoiceType || 'N/A'}
                                                onChange={(e) => setInvoiceType(e.target.value)}
                                                className=" font-medium px-1 py-0.5 border rounded-md focus:outline-none"
                                            >
                                                <option value="false">false</option>
                                                <option value="true">true</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-2">Invoice Type:</label>
                                            <select
                                                {...register('InvoiceType', { required: false })}
                                                defaultValue={customerData?.InvoiceType || 'N/A'}
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
                                                            {...register('BillingInformation.FullName')}
                                                            defaultValue={customerData?.BillingInformation?.FullName || 'N/A'}
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>TC Number:</label>
                                                        <input
                                                            type="text"
                                                            {...register('BillingInformation.TaxNumber')}
                                                            defaultValue={customerData?.BillingInformation?.TaxNumber || 'N/A'}
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Invoice Address:</label>
                                                        <input
                                                            type="text"
                                                            {...register('BillingInformation.Address')}
                                                            defaultValue={customerData?.BillingInformation?.Address || 'N/A'}
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
                                                            {...register('BillingInformation.CompanyName')}
                                                            defaultValue={customerData?.BillingInformation?.CompanyName || 'N/A'}
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Tax Number / TCKN:</label>
                                                        <input
                                                            type="text"
                                                            {...register('BillingInformation.TaxNumber')}
                                                            defaultValue={customerData?.BillingInformation?.TaxNumber || 'N/A'}
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Tax Office:</label>
                                                        <input
                                                            type="text"
                                                            {...register('BillingInformation.TaxOffice')}
                                                            defaultValue={customerData?.BillingInformation?.TaxOffice || 'N/A'}
                                                            className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                        <label>Invoice Address:</label>
                                                        <input
                                                            type="text"
                                                            {...register('BillingInformation.Address')}
                                                            defaultValue={customerData?.BillingInformation?.Address || 'N/A'}
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
