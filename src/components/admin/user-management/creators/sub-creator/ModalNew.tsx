import React, { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";

interface Creator {
    id: number;
    fullName: string;
    creatorType: "individual" | "company";
    userType: "customer" | "creator";
    role: "user" | "admin";
    password: string;
    tckn: string;
    email: string;
    dateOfBirth: string; // Format: "YYYY-MM-DD"
    gender: "male" | "female" | "other";
    phoneNumber: string;
    isVerified: boolean;
    addressOne: string;
    addressTwo?: string;
    accountType: "individual" | "institutional";
    invoiceType: "individual" | "institutional";
    paymentInformation: {
      ibanNumber?: string;
      address: string;
      fullName: string;
      trId?: string;
      companyName?: string;
      taxNumber?: string;
      taxOffice?: string;
    };
    billingInformation: {
      invoiceStatus: boolean;
      address: string;
      fullName: string;
      trId?: string;
      companyName?: string;
      taxNumber?: string;
      taxOffice?: string;
    };
    preferences: {
      contentInformation: {
        contentType: "product" | "service" | "other";
        contentFormats: string[]; // Example: ["video", "image"]
        areaOfInterest: string[]; // Example: ["tech", "gadgets"]
        addressDetails: {
          country: string;
          state: string;
          district: string;
          neighbourhood?: string;
          fullAddress: string;
        };
      };
      socialInformation: {
        contentType: "product" | "service" | "other";
        platforms: {
          Instagram?: {
            followers: number;
            username: string;
          };
          TikTok?: {
            followers: number;
            username: string;
          };
          Youtube?: {
            followers: number;
            username: string;
          };
        };
        portfolioLink?: string;
      };
    };
    userAgreement: boolean;
    approvedCommercial: boolean;
  }

interface ModalNewProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Creator) => void; // This handles form submission
}

export default function ModalNew({ isOpen, onClose, onSubmit }: ModalNewProps) {
    const [invoiceType, setInvoiceType] = useState('Bireysel');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Creator>();

    if (!isOpen) return null;  // If the modal is closed, return null (don't render)

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
