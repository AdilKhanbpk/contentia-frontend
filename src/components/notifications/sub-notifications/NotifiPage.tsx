"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
    fetchNotifications,
    selectNotifications,
    selectNotificationLoading,
    selectNotificationError
} from '@/store/features/admin/notificationSlice';

export default function NotifiPage() {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector(selectNotifications);
    const loading = useSelector(selectNotificationLoading);
    const error = useSelector(selectNotificationError);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        console.log('Current notifications:', notifications);
        const storedToken = localStorage.getItem('accessToken');
        setToken(storedToken);
        if (storedToken) {
            dispatch(fetchNotifications(storedToken));
        }
    }, [dispatch]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getEventTypeIcon = (eventType: string) => {
        switch (eventType) {
            case 'order':
                return (
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                );
            case 'admin':
                return (
                    <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                );
            case 'creator':
                return (
                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                );
            default:
                return (
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-50 border border-red-200 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    // Ensure notifications is always an array
    const notificationsArray = Array.isArray(notifications) ? notifications : [];

    return (
        <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Notifications</h1>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
                            {notificationsArray.length} New
                        </span>
                    </div>

                    <div className="space-y-4">
                        {notificationsArray.length > 0 ? (
                            notificationsArray.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-4 rounded-lg border ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                                        } hover:bg-gray-100 transition-colors duration-200`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            {getEventTypeIcon(notification.eventType || 'default')}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <h3 className="font-medium truncate">
                                                    {notification.title}
                                                </h3>
                                                <span className="text-sm flex-shrink-0">
                                                    {formatDate(notification.createdAt)}
                                                </span>
                                            </div>

                                            <p className="mt-1 whitespace-pre-line">
                                                {notification.details}
                                            </p>

                                            {notification.metadata && (
                                                <div className="mt-2 text-sm flex flex-wrap gap-2">
                                                    {Object.entries(notification.metadata).map(([key, value]) => (
                                                        <div key={key} className="inline-flex items-center py-1 rounded">
                                                            <span className="font-medium mr-2">{key}:</span>
                                                            <span className="truncate">
                                                                {typeof value === 'object'
                                                                    ? JSON.stringify(value)
                                                                    : String(value)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                </svg>
                                <p className="mt-4 text-gray-500">No notifications found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}