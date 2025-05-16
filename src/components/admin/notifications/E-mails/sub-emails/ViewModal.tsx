import React from "react";
import { EmailNotificationInterface } from "@/types/interfaces";
import RichTextEditor from "@/components/common/RichTextEditor";

interface ViewModalProps {
    emailNotification: EmailNotificationInterface | null;
    onClose: () => void;
}

export default function ViewModal({
    emailNotification,
    onClose,
}: ViewModalProps) {
    if (!emailNotification)
        return <p className='p-4'>Email Notification not found.</p>;

    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6 rounded-lg shadow-lg'>
            <h1 className='text-lg font-semibold'>
                Email Notification Details
            </h1>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
                <div>
                    <label className='block text-sm font-semibold'>
                        User Type
                    </label>
                    <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-100'
                        value={emailNotification.userType}
                        disabled
                    />
                </div>
                <div>
                    <label className='block text-sm font-semibold'>Users</label>
                    <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-100'
                        value={emailNotification.users?.join(", ") || "N/A"}
                        disabled
                    />
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Email Title
                </label>
                <input
                    type='text'
                    className='w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-100'
                    value={emailNotification.emailTitle}
                    disabled
                />
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Email Content
                </label>
                <RichTextEditor
                    value={emailNotification.emailContent}
                    onChange={() => {}} // No-op since it's read-only
                    className='w-full border border-gray-400 rounded-lg bg-gray-100'
                />
            </div>

            <div className='flex justify-end mt-4'>
                <button
                    onClick={onClose}
                    className='bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600'
                >
                    Close
                </button>
            </div>
        </div>
    );
}
