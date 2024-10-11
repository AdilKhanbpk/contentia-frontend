"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

type FormValues = {
    name: string;
    email: string;
    phone: string;
    invoiceType: string;
    tcNumber?: string;
    companyTitle?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

// Function to extract user ID from token
const getUserIdFromToken = (token: string): string | null => {
    try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded token:', decoded); // Log the entire decoded token
        return decoded.id || null; // Return the user ID or null
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null; // Return null if decoding fails
    }
};


const OrdersProfile: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
    const [isEditing, setIsEditing] = useState(false);
    const [invoiceType, setInvoiceType] = useState('Bireysel');

    const [ordersProfileId, setOrdersProfileId] = useState<string | null>(null);

    // Fetch user data (including OrdersProfile) on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('your_token_key'); // Replace with your token key
            console.log(token);
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:3001/api/v1/profile/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data.data;
                setOrdersProfileId(user.ordersProfile._id); // Assuming user.ordersProfile contains the OrdersProfile data

                // Set initial form values if necessary
                setValue('email', user.ordersProfile.email || ''); // Set other fields as needed
                setValue('name', user.ordersProfile.name || ''); // Example for name field
                setValue('address', user.ordersProfile.address || '');
                setValue('phone', user.ordersProfile.phone || '');
                setValue('invoiceType', user.ordersProfile.invoiceType || '');
                setValue('tcNumber', user.ordersProfile.tcNumber || '');
                setValue('companyTitle', user.ordersProfile.companyTitle || '');
                setValue('taxNumber', user.ordersProfile.taxNumber || '');
                setValue('taxOffice', user.ordersProfile.taxOffice || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [setValue]);

    const onSubmit = async (data: any) => {
        console.log(data); // Log the data for debugging

        // Retrieve the token from local storage
        const token = localStorage.getItem('your_token_key'); // Replace with your token key

        // Extract user ID from the token
        const userId = token ? getUserIdFromToken(token) : null;
        console.log(userId);

        // Check if userId is available
        if (!userId) {
            console.error('User ID could not be retrieved from token.');
            return; // Exit the function if userId is not found
        }

        try {
            // Construct the payload with ordersProfileData and ordersProfileId
            const payload = {
                // Use the extracted OrdersProfile ID
                ordersProfileData: {
                    _id: ordersProfileId,
                    ...data, // Spread the form data into ordersProfileData
                },
            };

            console.log('payload data: ', payload);

            // Send a PATCH request to the backend
            const response = await axios.patch('http://localhost:3001/api/v1/profile/update', payload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Use the actual token here
                },
            });

            console.log('Response from server:', response.data); // Log response from server
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error updating profile:', error.response?.data); // Accessing data from the Axios error
            } else {
                console.error('Error updating profile:', error);
            }
        } finally {
            console.log('Update attempt complete.'); // Optionally reset form or set loading state
        }
    };

    return (
        <div className="my-14 sm:my-20 md:my-20 lg:my-24 px-4 sm:px-6 md:px-8 lg:px-28 p-4 sm:p-6 md:p-8 lg:p-8 bg-gray-50">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" bg-white rounded-lg shadow-lg px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6">
                    {/* Profil Bilgileri */}
                    <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:p-8  border-2 border-gray-200">
                        <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-36 mb-4">
                            <div className='flex flex-col justify-start items-center'>
                                <h2 className="text-xl font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-6">Profil Bilgileri</h2>
                                <div className="w-28 h-28 ButtonBlue font-semibold text-white rounded-full flex items-center justify-center">SK</div>
                            </div>
                            <div className='w-1/4 flex flex-col mt-2 lg:mt-0'>
                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                    <label>Ad Soyad:</label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        disabled={!isEditing}
                                        className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                    <label>E-Posta:</label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        disabled={!isEditing}
                                        className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                    <label>Telefon Numarası:</label>
                                    <input
                                        type="text"
                                        {...register('phone')}
                                        disabled={!isEditing}
                                        className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className='absolute right-12 sm:right-12 md:right-20 lg:right-48'>
                                <div onClick={() => setIsEditing(!isEditing)}>
                                    <Image width={16} height={16} src='/editIcon.png' alt='edit icon'></Image>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fatura Bilgileri */}
                    <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:p-8 flex flex-col lg:flex-row lg:space-x-32 border-2 border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 whitespace-normal lg:whitespace-nowrap">Fatura Bilgileri</h2>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left side for personal or corporate details */}
                            <div>
                                <label className="block mb-2">Fatura Türü:</label>
                                <select
                                    {...register('invoiceType')}
                                    value={invoiceType}
                                    onChange={(e) => setInvoiceType(e.target.value)}
                                    className="w-1/2 font-semibold px-1 py-0.5 border rounded-md focus:outline-none"
                                    disabled={!isEditing}
                                >
                                    <option value="Bireysel">Bireysel</option>
                                    <option value="Kurumsal">Kurumsal</option>
                                </select>

                                {invoiceType === 'Bireysel' && (
                                    <>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                            <p className="mt-4">Ad Soyad:</p>
                                            <p className='font-semibold'>
                                                <input
                                                    type="text"
                                                    {...register('name')}
                                                    disabled={!isEditing}
                                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                                />

                                            </p>
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                            <p>T.C. Kimlik No:</p>
                                            <p className='font-semibold'>
                                                <input
                                                    type="text"
                                                    {...register('tcNumber')}
                                                    disabled={!isEditing}
                                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                                />
                                            </p>
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                            <p>Fatura Adresi:</p>
                                            <p className='font-semibold whitespace-normal lg:whitespace-nowrap'>

                                                <input
                                                    type="text"
                                                    {...register('address')}
                                                    disabled={!isEditing}
                                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                                />

                                            </p>
                                        </div>
                                    </>
                                )}

                                {invoiceType === 'Kurumsal' && (
                                    <>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                            <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-4">Şirket Ünvanı:</p>
                                            <p className='font-semibold'>

                                                <input
                                                    type="text"
                                                    {...register('companyTitle')}
                                                    disabled={!isEditing}
                                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                                />

                                            </p>
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                            <p>Vergi Numarası / TCKN</p>
                                            <p className='font-semibold'>

                                                <input
                                                    type="text"
                                                    {...register('taxNumber')}
                                                    disabled={!isEditing}
                                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                                />

                                            </p>
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                            <p>Vergi Dairesi:</p>
                                            <p className='font-semibold'>

                                                <input
                                                    type="text"
                                                    {...register('taxOffice')}
                                                    disabled={!isEditing}
                                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                                />

                                            </p>
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                            <p>Fatura Adresi:</p>
                                            <p className='font-semibold whitespace-normal lg:whitespace-nowrap'>

                                                <input
                                                    type="text"
                                                    {...register('address')}
                                                    disabled={!isEditing}
                                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                                />

                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Şifre Değiştir */}
                    <div className='flex flex-col lg:flex-row lg:space-x-36 border-2 border-gray-200 p-8'>
                        <h2 className="text-xl font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4 whitespace-normal lg:whitespace-nowrap">Şifre Değiştir</h2>
                        <div className="flex flex-col w-full lg:w-2/4">
                            <div>
                                <label className="block">Mevcut Şifre</label>
                                <input type="password" {...register('currentPassword')} className="mb-2 w-full lg:w-1/2 px-1 py-0.5 border rounded-md focus:outline-none" />
                            </div>
                            <div>
                                <label className="block">Yeni Şifre</label>
                                <input type="password" {...register('newPassword')} className="mb-2 w-full lg:w-1/2 px-1 py-0.5 border rounded-md focus:outline-none" />
                            </div>
                            <div>
                                <label className="block">Yeni Şifre Tekrar</label>
                                <input type="password" {...register('confirmNewPassword')} className="w-full lg:w-1/2 px-1 py-0.5 border rounded-md focus:outline-none" />
                            </div>
                        </div>
                        <div className=' w-full lg:w-1/4 flex justify-end items-end'>
                            <button type="submit" className="font-semibold px-8 py-0.5 ButtonBlue text-white rounded-lg">Güncelle</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OrdersProfile;
