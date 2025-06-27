"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import BrandNames from "./sub-navbar/BrandNames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetLoginState } from "@/store/features/auth/loginSlice";
import {
    fetchProfile,
    selectProfileUser,
} from "@/store/features/profile/profileSlice";
import { AppDispatch } from "@/store/store";
import { Dropdown } from "./AdminNavbar";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import {
    BriefcaseIcon,
    PaperClipIcon,
    ShoppingCartIcon,
    UserIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { IoLogOut } from "react-icons/io5";
import clsx from "clsx";
import { useTokenContext } from "@/context/TokenCheckingContext";

// Function to generate initials from user's name
const generateInitials = (fullName: string | undefined): string => {
    if (!fullName) return "";

    const names = fullName.trim().split(" ");
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    } else {
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
};

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const user = useSelector(selectProfileUser);
    const { setToken } = useTokenContext();

    // Generate user initials if name exists
    const userInitials = useMemo(() => generateInitials(user?.fullName), [user?.fullName]);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    // Close sidebar when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarButton = document.getElementById('sidebar-toggle');

            if (isSidebarOpen && sidebar && !sidebar.contains(event.target as Node) &&
                !sidebarButton?.contains(event.target as Node)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

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

            toast.success("Çıkış başarılı");

            // Force a page reload to clear any in-memory state
            window.location.href = "/giris-yap";
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const navItems = useMemo(
        () => [
            { href: "/", label: "Ana Sayfa" },
            { href: "/profil", label: "Profil" },
            { href: "/siparislerim", label: "Siparişler" },
            { href: "/markalarim", label: "Markalarım" },
        ],
        []
    );

    const NavLinks = ({ onClick }: { onClick?: () => void }) => (
        <>
            {navItems.map(({ href, label }) => (
                <li key={href}>
                    <Link
                        href={href}
                        onClick={onClick}
                        className={clsx(
                            "block px-3 py-2 text-sm md:text-base rounded-lg transition-all",
                            pathname === href
                                ? "BlueBg dark:bg-gray-800 text-white font-semibold"
                                : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        )}
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </>
    );

    const ProfileMenuItem = ({ href, icon: Icon, label, onClick, className = "" }: {
        href?: string;
        icon: React.ElementType;
        label: string;
        onClick?: () => void;
        className?: string;
    }) => {
        const content = (
            <li
                className={clsx(
                    'px-3 py-2 text-sm BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-3 rounded-md transition-colors',
                    className
                )}
                onClick={onClick}
            >
                <Icon className='w-4 h-4 flex-shrink-0' />
                <span className="truncate">{label}</span>
            </li>
        );

        return href ? <Link href={href}>{content}</Link> : content;
    };

    return (
        <>
            {/* Main Navbar */}
            <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                <div className='px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3'>
                    <div className='flex items-center justify-between'>
                        {/* Left Section: Logo and Navigation */}
                        <div className='flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8'>
                            {/* Mobile Menu Button */}
                            <button
                                id='sidebar-toggle'
                                type='button'
                                onClick={toggleSidebar}
                                className='inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                                aria-controls='sidebar'
                                aria-expanded={isSidebarOpen}
                            >
                                <span className='sr-only'>{t("open_sidebar")}</span>
                                <svg
                                    className='w-5 h-5'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        clipRule='evenodd'
                                        fillRule='evenodd'
                                        d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                                    />
                                </svg>
                            </button>

                            {/* Logo */}
                            <Link href='/' className='flex items-center'>
                                <Image
                                    src='/contentiaLogo.png'
                                    height={44}
                                    width={173}
                                    alt='logo'
                                    className='h-7 w-auto sm:h-8 md:h-9 lg:h-11'
                                    priority
                                />
                            </Link>

                            {/* Desktop Navigation */}
                            <div className='hidden lg:flex items-center gap-6 xl:gap-8'>
                                <BrandNames />
                                <ul className='flex items-center gap-2 xl:gap-4 font-medium'>
                                    <NavLinks />
                                </ul>
                            </div>
                        </div>

                        {/* Right Section: Profile */}
                        <div className='relative'>
                            <Dropdown
                                isOpen={isProfileOpen}
                                setIsOpen={setIsProfileOpen}
                                icon={
                                    <button
                                        type='button'
                                        className='flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-blue-600 text-white font-semibold text-sm sm:text-base hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                        aria-label='Open user menu'
                                    >
                                        {user?.fullName ? userInitials : "UN"}
                                    </button>
                                }
                            >
                                <div className='py-2 w-56 max-w-[calc(100vw-2rem)]'>
                                    {/* User Info */}
                                    <div className='px-3 py-2 mb-2 border-b border-gray-200 dark:border-gray-700'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold text-sm flex-shrink-0'>
                                                {user?.fullName ? userInitials : "UN"}
                                            </div>
                                            <span className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                                                {user?.fullName || "John Doe"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <ul className='space-y-1'>
                                        <ProfileMenuItem
                                            href='/profil'
                                            icon={UserIcon}
                                            label='Profil'
                                        />
                                        <ProfileMenuItem
                                            href='/siparislerim'
                                            icon={ShoppingCartIcon}
                                            label='Siparişler'
                                        />
                                        <ProfileMenuItem
                                            href='/paketler'
                                            icon={PaperClipIcon}
                                            label='Paketler'
                                        />
                                        <ProfileMenuItem
                                            href='/markalarim'
                                            icon={BriefcaseIcon}
                                            label='Markalarım'
                                        />
                                        <div className='my-1 border-t border-gray-200 dark:border-gray-700' />
                                        <ProfileMenuItem
                                            icon={IoLogOut}
                                            label='Çıkış Yap'
                                            onClick={handleLogout}
                                            className='text-red-600 hover:bg-red-50'
                                        />
                                    </ul>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                id='sidebar'
                className={clsx(
                    'fixed top-0 left-0 z-50 w-64 sm:w-72 h-screen transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:hidden',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                aria-label='Sidebar'
            >
                {/* Sidebar Header */}
                <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
                    <Link href='/' onClick={() => setSidebarOpen(false)}>
                        <Image
                            src='/contentiaLogo.png'
                            height={36}
                            width={140}
                            alt='logo'
                            className='h-8 w-auto'
                        />
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className='p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                        aria-label='Close sidebar'
                    >
                        <XMarkIcon className='w-5 h-5' />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className='h-[calc(100%-73px)] overflow-y-auto'>
                    <div className='px-3 py-4'>
                        {/* BrandNames for mobile */}
                        <div className='mb-6'>
                            <BrandNames />
                        </div>

                        {/* Navigation Links */}
                        <ul className='space-y-2 font-medium'>
                            <NavLinks onClick={() => setSidebarOpen(false)} />
                        </ul>

                        {/* User Section */}
                        <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
                            <div className='flex items-center gap-3 px-3 py-2 mb-4'>
                                <div className='w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold'>
                                    {user?.fullName ? userInitials : "UN"}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                                        {user?.fullName || "John Doe"}
                                    </p>
                                    <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                                        {user?.email || "user@example.com"}
                                    </p>
                                </div>
                            </div>

                            <ul className='space-y-1'>
                                <ProfileMenuItem
                                    href='/paketler'
                                    icon={PaperClipIcon}
                                    label='Paketler'
                                    onClick={() => setSidebarOpen(false)}
                                />
                                <ProfileMenuItem
                                    icon={IoLogOut}
                                    label='Çıkış Yap'
                                    onClick={handleLogout}
                                    className='text-red-600 hover:bg-red-50'
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}