

import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

export default function FirstTab() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
    };

    return (
        <>
            {/* Personal Information and Address section */}
            <div className="w-2/3 bg-white p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Personal Information */}
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
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
                                {...register("identityNo")} // Added registration
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"  // Updated border class
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
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
                                {...register("dateOfBirth")} // Added registration
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"  // Updated border class
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                {...register("contact", { required: "Contact is required" })}
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
                                    <input type="radio" value="female" {...register("gender")} className="mr-1" /> {/* Registered gender */}
                                    Female
                                </label>
                                <label>
                                    <input type="radio" value="male" {...register("gender")} className="mr-1" /> {/* Registered gender */}
                                    Male
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                {...register("status", { required: "Status is required" })}
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"  // Updated border class
                            >
                                <option value="Verified">Verified</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    {/* Address Section */}
                    <h2 className="text-xl font-semibold mt-6 mb-4">Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Address 01</label>
                            <input
                                type="text"
                                {...register("address1")} // Added registration
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"  // Updated border class
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address 02</label>
                            <input
                                type="text"
                                {...register("address2")} // Added registration
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"  // Updated border class
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Country</label>
                            <input
                                type="text"
                                {...register("country", { required: "Country is required" })}
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
                                {...register("zipCode")} // Added registration
                                className="mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm"  // Updated border class
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="ButtonBlue text-white px-4 py-2 rounded-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
