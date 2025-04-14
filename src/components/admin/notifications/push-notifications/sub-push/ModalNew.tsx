import { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    createEmailNotification,
    fetchEmailNotifications,
} from "@/store/features/admin/emailNotificationSlice";
import { getAccessToken } from "@/utils/checkToken";
import {
    createNotification,
    fetchNotifications,
} from "@/store/features/admin/notificationSlice";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface CreateModalProps {
    onClose: () => void;
}

export default function ModalNew({ onClose }: CreateModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm();
    const userType = watch("userType", "");

    const onSubmit = async (data: any) => {
        const token = getAccessToken();
        if (!token) return;

        const payload = {
            title: data.title,
            userType: data.userType,
            users: data.users
                ? data.users.split(",").map((id: any) => id.trim())
                : [],
            details: data.details,
        };

        console.log("Submitting Data:", payload);
        await dispatch(createNotification({ data: payload, token }));
        await dispatch(fetchNotifications(token));

        onClose();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'
        >
            <h1 className='text-lg font-semibold'>Push Notification</h1>

            <div className='mt-4 grid grid-cols-1  gap-4'>
                <div>
                    <label className='block text-sm font-semibold'>
                        User Type
                    </label>
                    <select
                        {...register("userType", { required: true })}
                        className='w-full py-2 border border-gray-400 rounded-md'
                    >
                        <option value='all'>All</option>
                        <option value='all-creators'>All Creators</option>
                        <option value='all-customers'>All Customers</option>
                        <option value='some-creators'>Some Creators</option>
                        <option value='some-customers'>Some Customers</option>
                    </select>
                </div>

                {userType?.includes("some") && (
                    <div>
                        <label className='block text-sm font-semibold'>
                            Select Users (comma-separated IDs)
                        </label>
                        <input
                            {...register("users")}
                            type='text'
                            className='w-full px-3 py-2 border border-gray-400 rounded-md'
                            disabled={!userType?.includes("some")}
                        />
                    </div>
                )}
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Notification Title
                </label>
                <input
                    {...register("title", { required: true })}
                    type='text'
                    className='w-full px-3 py-2 border border-gray-400 rounded-md'
                />
            </div>

            <div className='mt-4'>
                <h2 className='text-base font-semibold mb-1'>
                    Notification Details
                </h2>
                <textarea
                    {...register("details", { required: true })}
                    className='w-full px-3 py-2 border border-gray-400 rounded-md'
                />
            </div>

            <div className='flex justify-end mt-4'>
                <button
                    type='submit'
                    className='Button text-white px-8 py-2 rounded-lg font-semibold'
                >
                    {isSubmitting ? "Sending..." : "Send"}
                </button>
            </div>
        </form>
    );
}
