"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import BrandNames from "./sub-navbar/BrandNames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/features/auth/loginSlice";
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
} from "@heroicons/react/24/solid";
import { IoLogOut } from "react-icons/io5";
import clsx from "clsx";
import { useTokenContext } from "@/context/TokenCheckingContext";

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const user = useSelector(selectProfileUser);
    const { setToken } = useTokenContext();

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setToken(null);

            toast.success("Logout successful");
            router.push("/giris-yap");
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
                        legacyBehavior
                    >
                        <a
                            onClick={onClick}
                            className={clsx(
                                "block p-2 rounded-lg transition-all",
                                pathname === href
                                    ? "BlueBg dark:bg-gray-800 text-white font-semibold"
                                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            )}
                        >
                            {label}
                        </a>
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <>
            <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 px-2 sm:px-4 md:px-6 lg:px-10'>
                <div className='px-3 py-3 lg:px-5 lg:pl-3'>
                    <a
                        href='/'
                        className='flex lg:ms-4 md:me-0 mb-3'
                    >
                        <Image
                            src='/contentiaLogo.png'
                            height={44}
                            width={151}
                            alt='logo'
                            className='h-[33px] w-[173px]'
                        />
                    </a>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <button
                                type='button'
                                onClick={toggleSidebar}
                                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                                aria-controls='sidebar'
                                aria-expanded={isSidebarOpen}
                            >
                                <span className='sr-only'>
                                    {t("open_sidebar")}
                                </span>
                                <svg
                                    className='w-6 h-6'
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

                            <div className='flex items-center space-x-8 ms-1'>
                                <div className='flex items-center space-x-2'>
                                    <BrandNames />
                                </div>
                                <ul className='hidden lg:flex space-x-4 font-medium'>
                                    <NavLinks />
                                </ul>
                            </div>
                        </div>

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
                                            <Image
                                                className='w-10 h-10 rounded-full border-2 border-gray-600'
                                                src={
                                                    user?.profilePic ||
                                                    "/defaultProfile.png"
                                                }
                                                alt='Profile'
                                                width={100}
                                                height={100}
                                            />
                                        }
                                    >
                                        <ul className='p-2 text-sm'>
                                            <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                <Image
                                                    className='w-8 h-8 rounded-full border-2 border-gray-600'
                                                    src={
                                                        user?.profilePic ||
                                                        "/defaultProfile.png"
                                                    }
                                                    alt='Profile'
                                                    width={100}
                                                    height={100}
                                                />
                                                {user?.fullName || "John Doe"}
                                            </li>
                                            <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                <UserIcon className='w-4 h-4' />
                                                Profil
                                            </li>
                                            <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                <ShoppingCartIcon className='w-4 h-4' />
                                                Siparisler
                                            </li>
                                            <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                <PaperClipIcon className='w-4 h-4' />
                                                Paketler
                                            </li>
                                            <li className='p-2 BlueText hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                                                <BriefcaseIcon className='w-4 h-4' />
                                                Markalarim
                                            </li>
                                            <li
                                                className='p-2 BlueText hover:bg-red-100 cursor-pointer text-red-600 flex items-center gap-2'
                                                onClick={handleLogout}
                                            >
                                                <IoLogOut className='w-4 h-4' />
                                                Çıkış Yap
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar for small screens */}
            <aside
                id='sidebar'
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:hidden`}
                aria-label='Sidebar'
            >
                <div className='h-full px-3 pb-4 overflow-y-auto'>
                    <ul className='space-y-2 font-medium'>
                        <NavLinks onClick={() => setSidebarOpen(false)} />
                    </ul>
                </div>
            </aside>
        </>
    );
}
