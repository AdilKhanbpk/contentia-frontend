import React from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { selectNotifications } from '@/store/features/admin/notificationSlice';

export default function NotifiButton() {
    const router = useRouter();
    const notifications = useSelector(selectNotifications);
    const notificationCount = notifications.length;

    const handleRedirect = () => {
        router.push("/admin/all-notifications");
    };

    return (
        <>
            <button
                className="relative text-gray-600 hover:text-gray-800"
                onClick={handleRedirect}
            >
                <IoNotificationsOutline size={24} />
                {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {notificationCount}
                    </span>
                )}
            </button>
        </>
    );
}