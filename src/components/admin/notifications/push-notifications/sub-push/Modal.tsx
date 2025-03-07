import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Notification } from "@/store/features/admin/notificationSlice";

interface ModalProps {
    notification: Notification | null;
}

export default function Modal({ notification }: ModalProps) {
    if (!notification) return <p className='p-4'>Notification not found.</p>;

    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
            <h1 className='text-lg font-semibold'>Notification Details</h1>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
                <div>
                    <label className='block text-sm font-semibold'>
                        User Type
                    </label>
                    <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none bg-gray-100'
                        value={notification.userType}
                        disabled
                    />
                </div>

                <div>
                    <label className='block text-sm font-semibold'>Users</label>
                    <input
                        type='text'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none bg-gray-100'
                        value={notification.users?.join(", ") || "N/A"}
                        disabled
                    />
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>Title</label>
                <input
                    type='text'
                    className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none bg-gray-100'
                    value={notification.title}
                    disabled
                />
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>Details</label>
                <textarea
                    className='w-full p-2 border border-gray-400 rounded-lg focus:outline-none bg-gray-100'
                    rows={3}
                    value={notification.details}
                    disabled
                />
            </div>
        </div>
    );
}
