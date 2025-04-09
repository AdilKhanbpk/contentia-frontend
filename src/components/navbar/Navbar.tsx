"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken } from "@/utils/checkToken";
import { logoutUser } from "@/store/features/auth/loginSlice";

export default function Navbar() {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const asPath = usePathname();

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;
        setIsLoggedIn(!!token);
    }, [asPath]);

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                toast.success("Logout successful");
                router.push("/contentiaio/authentication");
            })
            .catch(() => {
                toast.error("Logout failed");
            });
        setIsLoggedIn(false);
    };

    return (
        <>
            <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 lg:border-none dark:bg-gray-800 dark:border-gray-700'>
                <div className='px-3 py-3 lg:px-5 lg:pl-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center justify-start rtl:justify-end'>
                            <button
                                data-drawer-target='logo-sidebar'
                                data-drawer-toggle='logo-sidebar'
                                aria-controls='logo-sidebar'
                                type='button'
                                onClick={toggleSidebar}
                                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                            >
                                <span className='sr-only'>
                                    {t("open_sidebar")}
                                </span>
                                <svg
                                    className='w-6 h-6'
                                    aria-hidden='true'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        clipRule='evenodd'
                                        fillRule='evenodd'
                                        d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                                    ></path>
                                </svg>
                            </button>
                            <ul className=''>
                                <li>
                                    <Link
                                        legacyBehavior
                                        href='/'
                                    >
                                        <a className='flex ms-2 md:me-0'>
                                            <div className=''>
                                                <Image
                                                    src='/contentiaLogo.png'
                                                    height={44}
                                                    width={151}
                                                    alt='logo'
                                                    className='h-[33px] w-[173px]'
                                                />
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            </ul>

                            {/* Sidebar links aligned with the logo on large screens */}

                            <ul className='hidden lg:flex items-center space-x-4 ms-10 font-medium'>
                                <li className='relative'>
                                    <button
                                        onClick={toggleDropdown}
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg flex items-center'
                                    >
                                        Hizmetlerimiz
                                        <svg
                                            className='ml-1 w-4 h-4'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M19 9l-7 7-7-7'
                                            />
                                        </svg>
                                    </button>
                                    {/* Show the menu only when isOpen is true */}
                                    <ul
                                        className={`absolute left-0 mt-2 w-40 rounded-lg shadow-lg bg-white dark:bg-gray-800 z-50 ${
                                            isOpen ? "block" : "hidden"
                                        }`}
                                    >
                                        <li>
                                            <Link
                                                href='#'
                                                className='block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            >
                                                Markalar
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href='#'
                                                className='block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            >
                                                Ajanslar
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href='#'
                                                className='block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            >
                                                Girişimler
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link
                                        href='#'
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'
                                    >
                                        Hakkımızda
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/contentiaio/how-it-works'
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'
                                    >
                                        Nasıl Çalışır?
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Sidebar links aligned with the logo on large screens */}
                        <ul className='hidden lg:flex lg:justify-center lg:items-center space-x-4 ms-10 font-medium'>
                            <li>
                                <Link
                                    legacyBehavior
                                    href='/contentiaio/become-creator'
                                >
                                    <a className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'>
                                        İçerik Üretici Ol
                                    </a>
                                </Link>
                            </li>
                            {!isLoggedIn ? (
                                <>
                                    <li>
                                        <Link
                                            legacyBehavior
                                            href='/contentiaio/authentication'
                                        >
                                            <a className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'>
                                                Giriş Yap
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'
                                    >
                                        Oturumu kapat
                                    </button>
                                </li>
                            )}
                            <li>
                                <div>
                                    <button className='Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                        {t("getStarted")}
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                id='logo-sidebar'
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:hidden`}
                aria-label='Sidebar'
            >
                <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
                    <ul className='space-y-2 font-medium'>
                        <li>
                            <a
                                href='#'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='ms-3'>{t("services")}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='flex-1 ms-3 whitespace-nowrap'>
                                    {t("pricing")}
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='flex-1 ms-3 whitespace-nowrap'>
                                    {t("successStories")}
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='flex-1 ms-3 whitespace-nowrap'>
                                    {t("faq")}
                                </span>
                            </a>
                        </li>
                        <li>
                            <Link
                                legacyBehavior
                                href='/contentiaio/become-creator'
                            >
                                <a className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                    <span className='flex-1 ms-3 whitespace-nowrap'>
                                        {t("becomeContentCreator")}
                                    </span>
                                </a>
                            </Link>
                        </li>
                        {!isLoggedIn ? (
                            <>
                                <li>
                                    <Link
                                        legacyBehavior
                                        href='/contentiaio/authentication'
                                    >
                                        <a className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                                            <span className='flex-1 ms-3 whitespace-nowrap'>
                                                {t("login")}
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                >
                                    <span className='flex-1 ms-3 whitespace-nowrap'>
                                        {t("logout")}
                                    </span>
                                </button>
                            </li>
                        )}
                        <li>
                            <a
                                href='#'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='flex-1 ms-3 whitespace-nowrap'>
                                    <button className='Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                        {t("getStarted")}
                                    </button>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
