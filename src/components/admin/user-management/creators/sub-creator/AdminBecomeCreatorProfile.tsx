import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
    updateAdminCreator,
    fetchAdminCreators,
} from "@/store/features/admin/creatorsSlice";
import { AppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import { CreatorInterface } from "@/types/interfaces";
import { getAccessToken } from "@/utils/checkToken";

interface FirstTabProps {
    editCreatorForm: CreatorInterface | null;
    onSubmit: (data: CreatorInterface) => void;
}

export default function FirstTab({ editCreatorForm }: FirstTabProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (editCreatorForm) {
            reset({
                fullName: editCreatorForm.fullName,
                tckn: editCreatorForm.tckn,
                email: editCreatorForm.email,
                dateOfBirth: editCreatorForm?.dateOfBirth?.split("T")[0],
                phoneNumber: editCreatorForm.phoneNumber,
                gender: editCreatorForm.gender,
                isVerified: editCreatorForm.isVerified,
                preferences: {
                    contentInformation: {
                        addressDetails: {
                            fullAddress:
                                editCreatorForm?.preferences?.contentInformation
                                    ?.addressDetails?.fullAddress || "",
                            state:
                                editCreatorForm?.preferences?.contentInformation
                                    ?.addressDetails?.state || "",
                            country:
                                editCreatorForm?.preferences?.contentInformation
                                    ?.addressDetails?.country || "",
                            district:
                                editCreatorForm?.preferences?.contentInformation
                                    ?.addressDetails?.district || "",
                            neighborhood:
                                editCreatorForm?.preferences?.contentInformation
                                    ?.addressDetails?.neighborhood || "",
                        },
                    },
                },
            });
        }
    }, [editCreatorForm, reset]);

    const onSubmit: SubmitHandler<any> = async (formData) => {
        if (!editCreatorForm?._id) {
            toast.error("Creator ID not found!");
            return;
        }

        const token = getAccessToken();
        if (!token) return;

        const updateData = {
            fullName: formData.fullName,
            tckn: formData.tckn,
            email: formData.email,
            dateOfBirth: formData.dateOfBirth,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
            isVerified: formData.isVerified,
            preferences: {
                ...editCreatorForm.preferences,
                contentInformation: {
                    ...editCreatorForm.preferences.contentInformation,
                    addressDetails: {
                        fullAddress:
                            formData.preferences?.contentInformation
                                ?.addressDetails?.fullAddress,
                        state: formData.preferences.contentInformation
                            ?.addressDetails?.state,
                        country:
                            formData.preferences?.contentInformation
                                ?.addressDetails?.country,
                        district:
                            formData.preferences?.contentInformation
                                ?.addressDetails?.district,
                        neighborhood:
                            formData.preferences?.contentInformation
                                ?.addressDetails?.neighborhood,
                    },
                },
            },
        };

        try {
            const resultAction = await dispatch(
                updateAdminCreator({
                    creatorId: editCreatorForm._id.toString(),
                    data: updateData,
                    token,
                })
            );

            if (updateAdminCreator.fulfilled.match(resultAction)) {
                toast.success("Creator updated successfully!");
                await dispatch(fetchAdminCreators(token));
            } else {
                toast.error("Failed to update creator. Please try again!");
            }
        } catch (error: any) {
            toast.error(
                `Error updating creator: ${error.message || "Unknown error"}`
            );
        }
    };

    return (
        <>
            <div className='w-full sm:w-2/3 bg-white p-6 rounded-lg'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-xl font-semibold mb-4'>
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
                                    required: "FullName is required",
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
                            {errors.tckn &&
                                typeof errors.tckn.message === "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.tckn.message}
                                    </p>
                                )}
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
                                    required: "phoneNumber is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                            {errors.contact &&
                                typeof errors.contact.message === "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.contact.message}
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
                                <option value='approved'>Approved</option>
                                <option value='pending'>Pending</option>
                                <option value='rejected'>Rejected</option>
                            </select>
                        </div>
                    </div>

                    <h2 className='text-xl font-semibold mt-6 mb-4'>Address</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium'>
                                Full Address
                            </label>
                            <input
                                type='text'
                                {...register(
                                    "preferences.contentInformation.addressDetails.fullAddress"
                                )}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>
                                State
                            </label>
                            <input
                                type='text'
                                {...register(
                                    "preferences.contentInformation.addressDetails.state"
                                )}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>
                                Country
                            </label>
                            <input
                                type='text'
                                {...register(
                                    "preferences.contentInformation.addressDetails.country"
                                )}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                            {errors.country &&
                                typeof errors.country.message === "string" && (
                                    <p className='text-red-500 text-xs mt-1'>
                                        {errors.country.message}
                                    </p>
                                )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>
                                Neighborhood
                            </label>
                            <input
                                type='text'
                                {...register(
                                    "preferences.contentInformation.addressDetails.neighborhood"
                                )}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>
                                District
                            </label>
                            <input
                                type='text'
                                {...register(
                                    "preferences.contentInformation.addressDetails.district"
                                )}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='ButtonBlue text-white px-4 py-2 rounded-md'
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
