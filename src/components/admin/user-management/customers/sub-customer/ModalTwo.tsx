"use client";
import React,{useState} from 'react';
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

export default function Home() {

    const [invoiceType, setInvoiceType] = useState('Bireysel');


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Customer>();

    
    return (
        <>
            <div className="text-lg font-semibold px-4 py-2 border-b-2 border-gray-200">New Customer</div>
            <form>
                <div className="flex flex-col md:flex-row justify-end ">
                    <div className="mt-2 ml-2 md:mt-20 md:ml-16"><Image width={30} height={30} src="/icons/avatar.png" alt="avatar" className="w-24 h-w-24 rounded-full" /></div>
                    <div className="p-2 md:p-16">
                        <div>
                            <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                <div className='flex flex-col mb-2 sm:mb-3 lg:mb-4 w-full md:w-1/2 pr-2'> {/* Add width and padding */}
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        {...register('name')}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className='flex flex-col sm:mb-3 w-full md:w-1/2 pl-2'> {/* Add width and padding */}
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        {...register('email')}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                <div className='flex flex-col w-full md:w-1/2 md:pr-2'> {/* Add width and padding */}
                                    <label>Contact</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        {...register('contact')}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2 pl-2'> {/* Add width and padding */}
                                    <label>Age</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your age"
                                        {...register('age')}
                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                    />
                                </div>
                            </div>

                        </div>
                        {/* Fatura Bilgileri */}
                        <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:px-4 lg:py-2 flex flex-col lg:flex-row lg:space-x-16 border-2 border-gray-200">
                            <h2 className="text-lg font-semibold mb-4 whitespace-normal lg:whitespace-nowrap">Fatura Bilgileri</h2>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Left side for personal or corporate details */}
                                <div>
                                    <label className="block mb-2">Fatura Türü:</label>
                                    <select
                                        {...register('invoiceType')}
                                        value={invoiceType}
                                        onChange={(e) => setInvoiceType(e.target.value)}
                                        className=" font-medium px-1 py-0.5 border rounded-md focus:outline-none"
                                    >
                                        <option value="Bireysel">Bireysel</option>
                                        <option value="Kurumsal">Kurumsal</option>
                                    </select>

                                    {invoiceType === 'Bireysel' && (
                                        <>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p className="mt-4">Ad Soyad:</p>
                                                <p className='font-medium'>
                                                    <input
                                                        type="text"
                                                        {...register('name')}
                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                    />

                                                </p>
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p>T.C. Kimlik No:</p>
                                                <p className='font-medium'>
                                                    <input
                                                        type="text"
                                                        {...register('tcNumber')}
                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                    />
                                                </p>
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p>Fatura Adresi:</p>
                                                <p className='font-medium whitespace-normal lg:whitespace-nowrap'>

                                                    <input
                                                        type="text"
                                                        {...register('address')}
                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                    />

                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {invoiceType === 'Kurumsal' && (
                                        <>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-4">Şirket Ünvanı:</p>
                                                <p className='font-medium'>

                                                    <input
                                                        type="text"
                                                        {...register('companyTitle')}
                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                    />

                                                </p>
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p>Vergi Numarası / TCKN</p>
                                                <p className='font-medium'>

                                                    <input
                                                        type="text"
                                                        {...register('taxNumber')}
                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                    />

                                                </p>
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p>Vergi Dairesi:</p>
                                                <p className='font-medium'>

                                                    <input
                                                        type="text"
                                                        {...register('taxOffice')}
                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                    />

                                                </p>
                                            </div>
                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p>Fatura Adresi:</p>
                                                <p className='font-medium whitespace-normal lg:whitespace-nowrap'>

                                                    <input
                                                        type="text"
                                                        {...register('address')}
                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                    />

                                                </p>
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
                    </div>
                </div>
            </form>
        </>
    );
}
