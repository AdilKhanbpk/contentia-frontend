"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logoutUser, resetLoginState } from "@/store/features/auth/loginSlice";
import { useTokenContext } from "@/context/TokenCheckingContext";
import {
    BriefcaseIcon,
    PaperClipIcon,
    ShoppingCartIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { IoLogOut } from "react-icons/io5";
import { Dropdown } from "./AdminNavbar";
import {
    fetchProfile,
    selectProfileUser,
} from "@/store/features/profile/profileSlice";

// Function to generate initials from user's name
const generateInitials = (fullName: string | undefined): string => {
    if (!fullName) return "";

    const names = fullName.trim().split(" ");
    if (names.length === 1) {
        // If only one name, return the first letter
        return names[0].charAt(0).toUpperCase();
    } else {
        // If multiple names, return first letter of first name and first letter of last name
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
};

export default function Navbar() {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = useSelector(selectProfileUser);

    const { isAuthenticated, setToken, token, loading } = useTokenContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Generate user initials if name exists
    const userInitials = useMemo(() => generateInitials(user?.fullName), [user?.fullName]);

    useEffect(() => {
        if (!loading) {
            setIsLoggedIn(!!token);
        }
    }, [token, loading]);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());

            // Clear all auth data
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setToken(null);

            // Clear Redux persist store
            dispatch(resetLoginState());

            // Clear any cookies (if your backend uses them)
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

            toast.success("Logout successful");

            // Force a page reload to clear any in-memory state
            window.location.href = "/giris-yap";
        } catch (error) {
            toast.error("Logout failed");
        }
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
                                        href='#fiyatlandırma'
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'
                                    >
                                        Fiyatlandırma
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/hakkimizda'
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'
                                    >
                                        Hakkımızda
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/nasil-calisir'
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'
                                    >
                                        Nasıl Çalışır?
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {!isAuthenticated ? (
                            <ul className='hidden lg:flex lg:justify-center lg:items-center space-x-4 ms-10 font-medium'>
                                <li>
                                    <Link
                                        legacyBehavior
                                        href='/icerik-uretici-ol'
                                    >
                                        <a className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'>
                                            İçerik Üretici Ol
                                        </a>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href='/giris-yap'
                                        className='text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg'
                                    >
                                        Giriş Yap
                                    </Link>
                                </li>

                                <li>
                                    <div>
                                        <button className='Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                            {t("getStarted")}
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <div className='flex items-center space-x-4'>
                                <div className='relative'>
                                    <button
                                        type='button'
                                        className='flex items-center text-sm rounded-full focus:outline-none'
                                        id='user-menu-button'
                                    >
                                        <span className='sr-only'>
                                            Open user menu
                                        </span>
                                        <Dropdown
                                            isOpen={isProfileOpen}
                                            setIsOpen={setIsProfileOpen}
                                            icon={
                                                user?.fullName ? (
                                                    <div className='w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold'>
                                                        {userInitials}
                                                    </div>
                                                ) : (
                                                    <div className='w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold'>
                                                        UN
                                                    </div>
                                                )
                                            }
                                        >
                                            <ul className='p-2 text-sm'>
                                                <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                    {user?.fullName ? (
                                                        <div className='w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold'>
                                                            {userInitials}
                                                        </div>
                                                    ) : (
                                                        <div className='w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold'>
                                                            UN
                                                        </div>
                                                    )}
                                                    {user?.fullName || "John Doe"}
                                                </li>
                                                <Link href='/profil'>
                                                    <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                        <UserIcon className='w-4 h-4' />
                                                        Profil
                                                    </li>
                                                </Link>
                                                <Link href='/siparislerim'>
                                                    <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                        <ShoppingCartIcon className='w-4 h-4' />
                                                        Siparişler
                                                    </li>
                                                </Link>
                                                <Link href='/paketler'>
                                                    <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                        <PaperClipIcon className='w-4 h-4' />
                                                        Paketler
                                                    </li>
                                                </Link>
                                                <Link href='/markalarim'>
                                                    <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                        <BriefcaseIcon className='w-4 h-4' />
                                                        Markalarım
                                                    </li>
                                                </Link>
                                                <li
                                                    className='p-2 BlueText hover:bg-red-100 cursor-pointer text-red-600 flex items-center gap-2'
                                                    onClick={handleLogout}
                                                >
                                                    <IoLogOut className='w-4 h-4' />
                                                    Cikis Yap
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </button>
                                </div>
                            </div>
                        )}
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
                            <button
                                className='flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className='ms-3'>{t("services")}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
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
                            {isOpen && (
                                <ul className='ml-6 space-y-1 mt-1'>
                                    <li>
                                        <a
                                            href='/'
                                            className='block p-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                                        >
                                            Markalar
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='/'
                                            className='block p-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                                        >
                                            Ajanslar
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='/'
                                            className='block p-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                                        >
                                            Girişimler
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a
                                href='#fiyatlandırma'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='ms-3'>{t("pricing")}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href='/hakkimizda'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='ms-3'>Hakkımızda</span>
                            </a>
                        </li>
                        <li>
                            <Link
                                href='/nasil-calisir'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='ms-3'>Nasıl Çalışır?</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/icerik-uretici-ol'
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                            >
                                <span className='ms-3'>
                                    {t("becomeContentCreator")}
                                </span>
                            </Link>
                        </li>

                        {!isLoggedIn && (
                            <>
                                <li>
                                    <Link
                                        href='/giris-yap'
                                        className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                    >
                                        <span className='ms-3'>
                                            {t("login")}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <div className='px-2'>
                                        <Link href='/'>
                                            <button className='w-full Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                                {t("getStarted")}
                                            </button>
                                        </Link>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </aside>
        </>
    );
}
