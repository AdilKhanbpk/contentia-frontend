import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
    createNotification,
    selectNotificationLoading
} from '@/store/features/admin/notificationSlice';
import { toast } from "react-toastify"

interface FormInputs {
    userType: string;
    title: string;
    details: string;
    users: string;
}

interface NotificationPayload {
    userType: string;
    title: string;
    details: string;
    users: string[];
}

export default function Modal() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(selectNotificationLoading);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            userType: '',
            title: '',
            details: '',
            users: ''
        }
    });

    const selectedUserType = watch('userType');
    const isUsersInputEnabled = selectedUserType === 'some-creators' || selectedUserType === 'some-customers';

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        // Transform userType if necessary
        let finalUserType = data.userType;
        if (data.userType === 'all-creators') finalUserType = 'creator';
        if (data.userType === 'all-customers') finalUserType = 'customer';

        const notificationData: NotificationPayload = {
            userType: finalUserType,
            title: data.title,
            details: data.details,
            users: isUsersInputEnabled ? data.users.split(',').map(id => id.trim()) : []
        };

        const token = localStorage.getItem('accessToken');

        if (token) {
            try {
                await dispatch(createNotification({ data: notificationData, token })).unwrap();
                toast.success("Push notification sent successfully");
                reset();
            } catch (error) {
                console.error('Failed to send notification:', error);
            }
        }
    };

    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
            <h1 className="text-lg font-semibold">Push Notification</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                    <div>
                        <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">User Type</label>
                        <select 
                            className="w-full py-2 border border-gray-400 rounded-md focus:outline-none"
                            {...register("userType", { required: "User type is required" })}
                        >
                            <option value="">Select User Type</option>
                            <option value="all">All Users</option>
                            <option value="all-creators">All Creators</option>
                            <option value="all-customers">All Customers</option>
                            <option value="some-creators">Some Creators</option>
                            <option value="some-customers">Some Customers</option>
                        </select>
                        {errors.userType && (
                            <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Select Users</label>
                        <input
                            type="text"
                            placeholder={isUsersInputEnabled ? "Enter user IDs separated by commas" : "Select Some-Creators or Some-Customers to enable"}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none overflow-auto"
                            disabled={!isUsersInputEnabled}
                            {...register("users", {
                                required: isUsersInputEnabled ? "Users are required for selected user type" : false
                            })}
                        />
                        {errors.users && (
                            <p className="text-red-500 text-sm mt-1">{errors.users.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                    <div>
                        <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Notification Title</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none overflow-auto"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>
                </div>

                <div className="bg-white">
                    <div className="bg-white py-4 sm:py-5 md:py-6 lg:py-6 rounded-md">
                        <h2 className="text-base font-semibold mb-1">Notification Details</h2>
                        <div className="mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                            <textarea
                                className="w-full p-2 sm:p-3 md:p-4 lg:p-4 border border-gray-400 rounded-lg focus:outline-none"
                                rows={3}
                                {...register("details", { required: "Details are required" })}
                            />
                            {errors.details && (
                                <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button 
                        type="submit"
                        className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold"
                        disabled={!!loading}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
}