import { useState } from 'react';
import Image from 'next/image';
import { useForm } from "react-hook-form";

export interface Customer {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    age: number;
    country: string;
    status: "Verified" | "Pending" | "Rejected";
    invoiceType: string;
    tcNumber?: string;
    companyTitle?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
    billingInformation?: {
        invoiceStatus: boolean;
        trId: string;
        address: string;
        fullName: string;
        companyName: string;
        taxNumber: string;
        taxOffice: string;
    };
    rememberMe?: boolean;
    termsAndConditionsApproved?: boolean;
}

interface ModalNewProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Customer) => void;
}

export default function ModalNew({ isOpen, onClose, onSubmit }: ModalNewProps) {
    const [invoiceType, setInvoiceType] = useState('Bireysel');

    const {
        register,
        handleSubmit,
    } = useForm<Customer>();

    if (!isOpen) return null;

    return (
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
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className='flex flex-col sm:mb-3 w-full md:w-1/2 pl-2'>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        {...register('email', { required: false })}
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
                                        {...register('phoneNumber', { required: false })}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2 pl-2'>
                                    <label>Age</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your age"
                                        {...register('age', { required: false })}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                </div>

                            </div>
                            <div className='flex flex-col md:flex-row col-span-1 md:col-span-2'>
                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2'>
                                    <label>Password</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your age"
                                        {...register('password', { required: false })}
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
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>TC Number:</label>
                                                <input
                                                    type="text"
                                                    {...register('billingInformation.trId')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Invoice Address:</label>
                                                <input
                                                    type="text"
                                                    {...register('billingInformation.address')}
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
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Tax Number / TCKN:</label>
                                                <input
                                                    type="text"
                                                    {...register('billingInformation.taxNumber')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Tax Office:</label>
                                                <input
                                                    type="text"
                                                    {...register('billingInformation.taxOffice')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Invoice Address:</label>
                                                <input
                                                    type="text"
                                                    {...register('billingInformation.address')}
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
    );
}
