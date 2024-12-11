import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateAdminCreator, fetchAdminCreators, } from '@/store/features/admin/creatorsSlice';
import { AppDispatch } from '@/store/store';
import { toast } from 'react-toastify';

interface Creator {
    id: number;
    fullName: string;
    creatorType: "individual" | "company";
    userType: "customer" | "creator";
    role: "user" | "admin";
    password: string;
    identityNo: number;
    email: string;
    dateOfBirth: string; // Format: "YYYY-MM-DD"
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
    },
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
            creatorType: "nano" | "micro"; // Updated
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
            contentType: "product" | "service";
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

interface FirstTabProps {
    editCreatorForm: Creator | null;
    onSubmit: (data: Creator) => void;
}

export default function FirstTab({ editCreatorForm }: FirstTabProps) {
    console.log("edit creator form : ", editCreatorForm);
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (editCreatorForm) {
            reset({
                name: editCreatorForm.fullName,
                identityNo: editCreatorForm.identityNo?.toString() || '',
                email: editCreatorForm.email,
                dateOfBirth: editCreatorForm.dateOfBirth.split('T')[0],
                contact: editCreatorForm.phoneNumber,
                gender: editCreatorForm.gender,
                isVerified: editCreatorForm.isVerified,
                addressDetails: {
                    addressOne: editCreatorForm.addressDetails?.addressOne || '',
                    addressTwo: editCreatorForm.addressDetails?.addressTwo || '',
                    country: editCreatorForm.addressDetails?.country || '',
                    zipCode: editCreatorForm.addressDetails?.zipCode?.toString() || ''
                }
            });
        }
    }, [editCreatorForm, reset]);

    useEffect(() => {
        if (editCreatorForm) {
            reset({
                name: editCreatorForm.fullName,
                identityNo: editCreatorForm.identityNo?.toString() || '',
                email: editCreatorForm.email,
                dateOfBirth: editCreatorForm.dateOfBirth.split('T')[0],
                contact: editCreatorForm.phoneNumber,
                gender: editCreatorForm.gender,
                isVerified: editCreatorForm.isVerified,
                addressDetails: {
                    addressOne: editCreatorForm.addressDetails?.addressOne || '',
                    addressTwo: editCreatorForm.addressDetails?.addressTwo || '',
                    country: editCreatorForm.addressDetails?.country || '',
                    zipCode: editCreatorForm.addressDetails?.zipCode?.toString() || ''
                }
            });
        }
    }, [editCreatorForm, reset]);

    const onSubmit: SubmitHandler<any> = async (formData) => {
        if (!editCreatorForm?.id) {
            console.error('No creator ID found');
            toast.error("Creator ID not found!"); // Error toast for missing creator ID
            return;
        }

        // Get token from localStorage
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            toast.error("No access token found!"); // Error toast for missing token
            return;
        }

        // Transform form data to match API expectations
        const updateData = {
            fullName: formData.name,
            identityNo: Number(formData.identityNo),
            email: formData.email,
            dateOfBirth: formData.dateOfBirth,
            phoneNumber: formData.contact,
            gender: formData.gender,
            isVerified: formData.isVerified,
            addressDetails: {
                addressOne: formData.addressDetails.addressOne,
                addressTwo: formData.addressDetails.addressTwo,
                country: formData.addressDetails.country,
                zipCode: Number(formData.addressDetails.zipCode)
            },
            preferences: {
                ...editCreatorForm.preferences,
                contentInformation: {
                    ...editCreatorForm.preferences.contentInformation,
                    addressDetails: {
                        ...editCreatorForm.preferences.contentInformation.addressDetails,
                        country: formData.country,
                        district: formData.zipCode,
                    },
                },
            },
        };

        try {
            // Dispatch update action with token
            const resultAction = await dispatch(
                updateAdminCreator({
                    customerId: editCreatorForm.id.toString(),
                    data: updateData,
                    token,
                })
            );

            if (updateAdminCreator.fulfilled.match(resultAction)) {
                // Handle success (e.g., show success message)
                console.log('Update successful');
                toast.success("Creator updated successfully!"); // Success toast
                await dispatch(fetchAdminCreators(token));
            } else {
                // Handle error
                console.error('Update failed:', resultAction.error);
                toast.error("Failed to update creator. Please try again!"); // Error toast
            }
        } catch (error: any) {
            console.error('Error updating creator:', error);
            toast.error(`Error updating creator: ${error.message || "Unknown error"}`); // Error toast
        }
    };

    return (
        <>
            <div className="w-full sm:w-2/3 bg-white p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.name && typeof errors.name.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Identity No</label>
                            <input
                                type="text"
                                {...register('identityNo')}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.email && typeof errors.email.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input
                                type="date"
                                {...register('dateOfBirth')}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                {...register('contact', { required: 'Contact is required' })}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.contact && typeof errors.contact.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Gender</label>
                            <div className="mt-3 flex space-x-4">
                                <label>
                                    <input type="radio" value="female" {...register('gender')} className="mr-1" />
                                    Female
                                </label>
                                <label>
                                    <input type="radio" value="male" {...register('gender')} className="mr-1" />
                                    Male
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                {...register('isVerified', { required: 'Status is required' })}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mt-6 mb-4">Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Address 01</label>
                            <input
                                type="text"
                                {...register('addressDetails.addressOne')}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address 02</label>
                            <input
                                type="text"
                                {...register('addressDetails.addressTwo')}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Country</label>
                            <input
                                type="text"
                                {...register('addressDetails.country', { required: 'Country is required' })}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.country && typeof errors.country.message === 'string' && (
                                <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Zip Code</label>
                            <input
                                type="text"
                                {...register('addressDetails.zipCode')}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type="submit" className="ButtonBlue text-white px-4 py-2 rounded-md">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
