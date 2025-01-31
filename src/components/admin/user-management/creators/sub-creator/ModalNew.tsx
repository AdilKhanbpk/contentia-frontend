import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Creator {
    id: number;
    fullName: string;
    creatorType: "individual" | "company";
    userType: "customer" | "creator";
    role: "user" | "admin";
    password: string;
    tckn: string;
    email: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    isVerified: "pending" | "approved" | "rejected";
    accountType: "individual" | "institutional";
    invoiceType: "individual" | "institutional";
    addressDetails: {
        addressOne: string;
        addressTwo: string;
        country: string;
        zipCode: number;
    };
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
            contentType: "product" | "service" | "location";
            creatorType: "nano" | "micro";
            contentFormats: string[];
            areaOfInterest: string[];
            addressDetails: {
                country: string;
                state: string;
                district: string;
                neighbourhood?: string;
                fullAddress: string;
            };
        };
        socialInformation: {
            contentType: "yes" | "no";
            platforms: {
                Instagram?: {
                    followers: number;
                    username: string;
                };
                TikTok?: {
                    followers: number;
                    username: string;
                };
                Facebook?: {
                    followers: number;
                    username: string;
                };
                Youtube?: {
                    followers: number;
                    username: string;
                };
                X?: {
                    followers: number;
                    username: string;
                };
                Linkedin?: {
                    followers: number;
                    username: string;
                };
            };
            portfolioLink?: string[];
        };
    };
    userAgreement: boolean;
    approvedCommercial: boolean;
}

interface ModalNewProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Creator) => void;
}

export default function ModalNew({ isOpen, onSubmit }: ModalNewProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Creator>();

    if (!isOpen) return null;

    return (
        <>
            <div className='w-full bg-white rounded-lg'>
                <div className='text-xl font-semibold px-4 py-2 border-b-2 border-gray-200'>
                    Add Creator
                </div>
                <form
                    className='p-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 className='text-lg font-semibold mb-4'>
                        Personal Information
                    </h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                {...register("fullName", {
                                    required: "Name is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                            {errors.fullName &&
                                typeof errors.fullName.message === "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.fullName.message}
                                    </p>
                                )}
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                Identity No
                            </label>
                            <input
                                type='text'
                                {...register("tckn", {
                                    required: "Identity No is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                            {errors.email &&
                                typeof errors.email.message === "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.email.message}
                                    </p>
                                )}
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                Date of Birth
                            </label>
                            <input
                                type='date'
                                {...register("dateOfBirth")}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                Phone Number
                            </label>
                            <input
                                type='tel'
                                {...register("phoneNumber", {
                                    required: "Contact is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                            {errors.phoneNumber &&
                                typeof errors.phoneNumber.message ===
                                    "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                Gender
                            </label>
                            <div className='mt-3 flex space-x-4'>
                                <label>
                                    <input
                                        type='radio'
                                        value='female'
                                        {...register("gender")}
                                        className='mr-1'
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type='radio'
                                        value='male'
                                        {...register("gender")}
                                        className='mr-1'
                                    />
                                    Male
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                Status
                            </label>
                            <select
                                {...register("isVerified", {
                                    required: "Status is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            >
                                <option value='approved'>approved</option>
                                <option value='pending'>Pending</option>
                                <option value='rejected'>Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>
                                Password
                            </label>
                            <input
                                type='password'
                                {...register("password", {
                                    required: "Contact is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                            {errors.phoneNumber &&
                                typeof errors.phoneNumber.message ===
                                    "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                        </div>
                    </div>

                    <h2 className='text-lg font-semibold mt-6 mb-4'>Address</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium'>
                                Address 01
                            </label>
                            <input
                                type='text'
                                {...register("addressDetails.addressOne")}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>
                                Address 02
                            </label>
                            <input
                                type='text'
                                {...register("addressDetails.addressTwo")}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>
                                Country
                            </label>
                            <input
                                type='text'
                                {...register("addressDetails.country")}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                            {errors.addressDetails?.country &&
                                typeof errors.addressDetails?.country
                                    .message === "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.addressDetails?.country.message}
                                    </p>
                                )}
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                Zip Code
                            </label>
                            <input
                                type='text'
                                {...register("addressDetails.zipCode")}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='ButtonBlue text-white px-4 py-2 rounded-md'
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
