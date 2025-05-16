import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    createEmailNotification,
    fetchEmailNotifications,
} from "@/store/features/admin/emailNotificationSlice";
import RichTextEditor from "@/components/common/RichTextEditor";

interface CreateModalProps {
    onClose: () => void;
}

export default function Modal({ onClose }: CreateModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm();
    const emailBody = watch("emailContent", "");
    const userType = watch("userType", "");

    const onSubmit = async (data: any) => {
        const payload = {
            emailTitle: data.emailTitle,
            emailContent: data.emailContent,
            userType: data.userType,
            users: data.users
                ? data.users.split(",").map((id: any) => id.trim())
                : [],
        };

        console.log("Submitting Data:", payload);
        await dispatch(createEmailNotification({ data: payload }));
        await dispatch(fetchEmailNotifications());

        onClose();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'
        >
            <h1 className='text-lg font-semibold'>Email Notification</h1>

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
                <RichTextEditor
                    value={emailBody}
                    onChange={(value) => setValue("emailContent", value)}
                    placeholder='Write something...'
                    className='w-full border border-gray-400 rounded-lg'
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
