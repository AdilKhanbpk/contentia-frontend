import React, { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";

export interface Customer {
    id: number;
    name: string;
    email: string;
    contact: string;
    age: number;
    country: string;
    status: "Verified" | "Pending" | "Rejected";
    invoiceType: string;
    tcNumber?: string;
    companyTitle?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
}

interface ModalNewProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Customer) => void; // This handles form submission
}

export default function ModalNew({ isOpen, onClose, onSubmit }: ModalNewProps) {
    const [invoiceType, setInvoiceType] = useState('Bireysel');
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Customer>();

    if (!isOpen) return null;  // If the modal is closed, return null (don't render)

    return (
        <>
            <div className="text-lg font-semibold px-4 py-2 border-b-2 border-gray-200">New Customer</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row justify-end ">
                    <div className="mt-2 ml-2 md:mt-20 md:ml-16"><Image width={30} height={30} src="/icons/avatar.png" alt="avatar" className="w-24 h-w-24 rounded-full" /></div>
                    <div className="p-2 md:p-16">
                        <div>
                            <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                <div className='flex flex-col mb-2 sm:mb-3 lg:mb-4 w-full md:w-1/2 pr-2'>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        {...register('name', { required: true })}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                                </div>
                                <div className='flex flex-col sm:mb-3 w-full md:w-1/2 pl-2'>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        {...register('email', { required: true })}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                <div className='flex flex-col w-full md:w-1/2 md:pr-2'>
                                    <label>Contact</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        {...register('contact', { required: true })}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                    {errors.contact && <p className="text-red-500 text-sm">Contact is required</p>}
                                </div>
                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2 pl-2'>
                                    <label>Age</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your age"
                                        {...register('age', { required: true })}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                    {errors.age && <p className="text-red-500 text-sm">Age is required</p>}
                                </div>
                            </div>
                        </div>

                        {/* Invoice Information */}
                        <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:px-4 lg:py-2 flex flex-col lg:flex-row lg:space-x-16 border-2 border-gray-200">
                            <h2 className="text-lg font-semibold mb-4 whitespace-normal lg:whitespace-nowrap">Invoice Information</h2>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Personal or corporate details */}
                                <div>
                                    <label className="block mb-2">Invoice Type:</label>
                                    <select
                                        {...register('invoiceType', { required: true })}
                                        value={invoiceType}
                                        onChange={(e) => setInvoiceType(e.target.value)}
                                        className=" font-medium px-1 py-0.5 border rounded-md focus:outline-none"
                                    >
                                        <option value="Bireysel">Bireysel</option>
                                        <option value="Kurumsal">Kurumsal</option>
                                    </select>
                                    {errors.invoiceType && <p className="text-red-500 text-sm">Invoice Type is required</p>}

                                    {invoiceType === 'Bireysel' && (
                                        <>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Full Name:</label>
                                                <input
                                                    type="text"
                                                    {...register('name')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>TC Number:</label>
                                                <input
                                                    type="text"
                                                    {...register('tcNumber')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Invoice Address:</label>
                                                <input
                                                    type="text"
                                                    {...register('address')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {invoiceType === 'Kurumsal' && (
                                        <>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Company Title:</label>
                                                <input
                                                    type="text"
                                                    {...register('companyTitle')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Tax Number / TCKN:</label>
                                                <input
                                                    type="text"
                                                    {...register('taxNumber')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Tax Office:</label>
                                                <input
                                                    type="text"
                                                    {...register('taxOffice')}
                                                    className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <label>Invoice Address:</label>
                                                <input
                                                    type="text"
                                                    {...register('address')}
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
