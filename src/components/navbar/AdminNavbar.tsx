"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Link from "next/link";
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineEmail } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';

export default function AdminNavbar() {
    const { t } = useTranslation(); // Initialize the translation hook
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 pr-6">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={toggleSidebar} // Click handler for toggling sidebar
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">{t('open_sidebar')}</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>

                            {/* Brand and Menu Links */}
                            <div className="flex justify-between">
                                <a href="" className="flex lg:ms-4 md:me-0 mb-3">
                                    <Image
                                        src="/contentiaLogo.png"
                                        height={44}
                                        width={151}
                                        alt="logo"
                                        className="h-[33px] w-[173px]"
                                    />
                                </a>

                                {/* Search Bar */}
                                <div className="relative ml-[52px]">
                                    <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Ctrl + K"
                                        className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <ul className="flex items-center space-x-4 font-medium">
                           
                            <button className="relative text-gray-600 hover:text-gray-800">
                                <IoNotificationsOutline size={24} />
                                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                                <MdOutlineEmail size={24} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                                <AiOutlineSetting size={24} />
                            </button>
                            
                            

                            {/* User Profile */}
                            <div className="flex items-center space-x-2">
                                <BiUserCircle size={32} className="text-gray-600" />
                                <span className="text-sm text-gray-700 font-semibold">JWT User</span>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">

                        <li className="mt-10">
                            <Link legacyBehavior href="/admin/services/packages">
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Packages</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/admin/services/pricing">
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Pricing</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/admin/services/additional-services">
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Additional Services</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/admin/services/add-coupons">
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Coupons</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/admin/user-management/customers">
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Customers</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/admin/user-management/creators">
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Creators</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/admin/user-management/admin">
                                <a
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">Admin</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
