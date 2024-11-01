"use client";
import React from 'react';
import Analytics from './sub-admin/Analytics';

export default function AdminComponent() {
    return (
        <>
            <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28">
                <Analytics></Analytics>
            </div>
        </>
    );
}
