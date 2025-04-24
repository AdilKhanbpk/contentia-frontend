import {
    markAllAsRead,
    markNotificationAsRead,
    NotificationInterface,
    selectNotificationLoading,
} from "@/store/features/admin/notificationSlice";
import { AppDispatch } from "@/store/store";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";

interface NavbarNotificationProps {
    notifications: NotificationInterface[];
    user: any;
}

function NavbarNotification({ user, notifications }: NavbarNotificationProps) {
    const [tab, setTab] = useState<"all" | "unread">("all");
    const loading = useSelector(selectNotificationLoading);
    const dispatch = useDispatch<AppDispatch>();

    const filteredNotifications = useMemo(() => {
        if (tab === "unread") {
            return notifications.filter((n) => !n.readBy?.includes(user?._id));
        }
        return notifications;
    }, [tab, notifications, user?._id]);

    const handleMarkAsRead = async (notification: NotificationInterface) => {
        const isUnread = !notification.readBy?.includes(user?._id);

        if (isUnread && user?._id) {
            dispatch(
                markNotificationAsRead({
                    notificationId: notification._id,
                })
            );
        }
    };

    const handleMarkAllAsRead = () => {
        dispatch(markAllAsRead());
    };

    return (
        <>
            <div className='p-2 border-b border-gray-200'>
                <div className='flex items-center justify-between mb-2'>
                    <div className='text-gray-700 font-semibold'>
                        Notifications
                    </div>
                    {filteredNotifications.some(
                        (n) => !n.readBy?.includes(user?._id)
                    ) && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className='text-xs text-gray-700 hover:underline'
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
                <div className='flex space-x-2 text-sm font-medium'>
                    <button
                        onClick={() => setTab("all")}
                        className={`px-3 py-1 rounded-full transition ${
                            tab === "all"
                                ? "BlueBg text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setTab("unread")}
                        className={`px-3 py-1 rounded-full transition ${
                            tab === "unread"
                                ? "BlueBg text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Unread
                    </button>
                </div>
            </div>

            <ul className='p-2 text-sm max-h-64 overflow-auto divide-y divide-gray-200'>
                {loading ? (
                    <li className='p-2 text-center'>Loading...</li>
                ) : filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => {
                        const isUnread = !notification.readBy?.includes(
                            user?._id
                        );
                        return (
                            <li
                                key={notification._id}
                                onClick={() => handleMarkAsRead(notification)}
                                className={`p-2 cursor-pointer hover:bg-gray-100 rounded ${
                                    isUnread ? "bg-blue-50 font-semibold" : ""
                                }`}
                            >
                                <span className='block text-sm'>
                                    {notification.title}
                                </span>
                                <div
                                    className='text-sm font-normal'
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            notification.details
                                        ),
                                    }}
                                />
                            </li>
                        );
                    })
                ) : (
                    <li className='p-2 text-center text-gray-500'>
                        No notifications
                    </li>
                )}
            </ul>
        </>
    );
}

export default NavbarNotification;
