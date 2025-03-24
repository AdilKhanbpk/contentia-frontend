import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    updateEmailNotification,
    fetchEmailNotifications,
} from "@/store/features/admin/emailNotificationSlice";
import { getAccessToken } from "@/utils/checkToken";
import { EmailNotificationInterface } from "@/types/interfaces";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditEmailModalProps {
    emailNotification: EmailNotificationInterface | null;
    onClose: () => void;
}

export default function EditEmailNotification({
    emailNotification,
    onClose,
}: EditEmailModalProps) {
    if (!emailNotification)
        return <p className='p-4'>Email Notification not found.</p>;

    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: emailNotification,
    });

    const emailBody = watch("emailContent", emailNotification.emailContent);
    const userType = watch("userType", emailNotification.userType);

    useEffect(() => {
        if (emailNotification) {
            reset(emailNotification); // Reset form values when `emailNotification` changes
        }
    }, [emailNotification, reset]);

    const onSubmit = async (data: any) => {
        const token = getAccessToken();
        if (!token) return;

        const usersArray = Array.isArray(data.users)
            ? data.users
            : typeof data.users === "string"
            ? data.users.split(",").map((user: any) => user.trim())
            : [];

        const payload = {
            emailTitle: data.emailTitle,
            emailContent: data.emailContent,
            userType: data.userType,
            users: usersArray,
        };

        if (!emailNotification._id) {
            return;
        }

        await dispatch(
            updateEmailNotification({
                emailNotificationId: emailNotification._id,
                data: payload,
                token,
            })
        );
        await dispatch(fetchEmailNotifications(token));
        onClose();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6 rounded-lg shadow-lg'
        >
            <h1 className='text-lg font-semibold'>
                Edit Email emailNotification
            </h1>

            <div className='mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
                <div>
                    <label className='block text-sm font-semibold'>
                        Select Users (comma-separated IDs)
                    </label>
                    <input
                        {...register("users")}
                        type='text'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md'
                        disabled={!userType.includes("some")}
                    />
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Email Title
                </label>
                <input
                    {...register("emailTitle", { required: true })}
                    type='text'
                    className='w-full px-3 py-2 border border-gray-400 rounded-md'
                />
            </div>

            <div className='mt-4'>
                <h2 className='text-base font-semibold mb-1'>E-Mail Body</h2>
                <ReactQuill
                    value={emailBody}
                    onChange={(value) => setValue("emailContent", value)}
                    placeholder='Write something...'
                    theme='snow'
                    className='w-full border border-gray-400 rounded-lg'
                />
            </div>

            <div className='flex justify-end mt-4'>
                <button
                    type='button'
                    onClick={onClose}
                    className='mr-4 px-6 py-2 rounded-lg font-semibold border border-gray-300'
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className='bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold'
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
}
