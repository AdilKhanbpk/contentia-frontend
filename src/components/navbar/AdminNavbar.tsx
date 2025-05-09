import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    AiOutlineBell,
    AiOutlineSearch,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    fetchProfile,
    selectProfileUser,
} from "@/store/features/profile/profileSlice";
import {
    fetchNotifications,
    selectNotifications,
} from "@/store/features/admin/notificationSlice";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/store/features/auth/loginSlice";
import NavbarNotification from "../notifications/NavbarNotification";
import { useTokenContext } from "@/context/TokenCheckingContext";

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

const menuItems = [
    {
        title: "Dashboard",
        links: [{ name: "Dashboard", href: "/admin" }],
    },
    {
        title: "Services",
        links: [
            // { name: "Packages", href: "/admin/services/packages" },
            { name: "Pricing", href: "/admin/services/pricing" },
            {
                name: "Additional Services",
                href: "/admin/services/additional-services",
            },
            { name: "Coupons", href: "/admin/services/add-coupons" },
        ],
    },
    {
        title: "User Management",
        links: [
            { name: "Customers", href: "/admin/user-management/customers" },
            { name: "Creators", href: "/admin/user-management/creators" },
            { name: "Admin", href: "/admin/user-management/admins" },
        ],
    },
    {
        title: "Order Management",
        links: [
            { name: "Orders", href: "/admin/order-management/orders" },
            { name: "Packages", href: "/admin/order-management/packages" },
            { name: "Brands", href: "/admin/order-management/brands" },
        ],
    },
    {
        title: "File Management",
        links: [{ name: "Files", href: "/admin/file-management/files" }],
    },
    {
        title: "Payment",
        links: [
            { name: "Incoming Payment", href: "/admin/payments/in-payments" },
            { name: "Outgoing Payment", href: "/admin/payments/out-payments" },
        ],
    },
    {
        title: "Support",
        links: [{ name: "Order Claims", href: "/admin/support/order-claims" }],
    },
    {
        title: "Notifications",
        links: [
            {
                name: "Push Notifications",
                href: "/admin/notifications/push-notifications",
            },
            { name: "E-mail", href: "/admin/notifications/emails" },
        ],
    },
    {
        title: "Blog",
        links: [
            { name: "New Blog", href: "/admin/blogs/new-blogs" },
            { name: "Manage Blogs", href: "/admin/blogs/manage-blogs" },
        ],
    },
    {
        title: "Content Management",
        links: [
            {
                name: "Landing Page",
                href: "/admin/content-management/landing-page",
            },
            {
                name: "Help Center",
                href: "/admin/content-management/help-center",
            },
            { name: "Banners", href: "/admin/content-management/banners" },
            { name: "FAQ", href: "/admin/content-management/FAQ" },
            { name: "About", href: "/admin/content-management/About" },
            {
                name: "How it Works",
                href: "/admin/content-management/how-it-works",
            },
            {
                name: "Terms and Conditions",
                href: "/admin/content-management/terms-and-conditions",
            },
        ],
    },
];

export const Dropdown = ({ isOpen, setIsOpen, icon, children }: any) => {
    return (
        <div className='relative dropdown'>
            <div
                role='button'
                tabIndex={0}
                className='text-gray-600 hover:text-gray-800 cursor-pointer'
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev: boolean) => !prev);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        setIsOpen((prev: boolean) => !prev);
                    }
                }}
            >
                {icon}
            </div>

            {isOpen && (
                <div className='absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200'>
                    {children}
                </div>
            )}
        </div>
    );
};

const normalizePath = (path: string) => path?.replace(/\/+$/, "") || "/";

export default function AdminNavbar() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectProfileUser);
    const notifications = useSelector(selectNotifications);
    const unreadNotifications = useMemo(() => {
        return notifications.filter((n) => !n.readBy?.includes(user?._id))
            .length;
    }, [notifications, user]);

    // Generate user initials if name exists
    const userInitials = useMemo(() => generateInitials(user?.fullName), [user?.fullName]);

    const router = useRouter();
    const pathname = usePathname();

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { setToken } = useTokenContext();

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchNotifications());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.target.closest(".dropdown")) {
                setIsProfileOpen(false);
                setIsEmailOpen(false);
                setIsSettingsOpen(false);
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                toast.success("Logout successful");
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                setToken(null);
                router.push("/giris-yap");
            })
            .catch(() => {
                toast.error("Logout failed");
            });
    };

    return (
        <>
            <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 pr-6'>
                <div className='px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between'>
                    {/* Left Section */}
                    <div className='flex items-center'>
                        <button
                            type='button'
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className='inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100'
                        >
                            <svg
                                className='w-6 h-6'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    clipRule='evenodd'
                                    fillRule='evenodd'
                                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                                />
                            </svg>
                        </button>

                        <Link
                            href='/'
                            className='hidden lg:flex lg:ms-4'
                        >
                            <Image
                                src='/contentiaLogo.png'
                                height={44}
                                width={151}
                                alt='logo'
                            />
                        </Link>

                        {/* Search Bar */}
                        <div className='relative hidden sm:block ml-4 lg:ml-[52px]'>
                            <AiOutlineSearch className='absolute left-3 top-2.5 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Ctrl + K'
                                className='pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <ul className='flex items-center space-x-2 md:space-x-4 font-medium'>
                        {/* Notifications Dropdown */}
                        <Dropdown
                            isOpen={isNotificationsOpen}
                            setIsOpen={setIsNotificationsOpen}
                            icon={
                                <div className='relative'>
                                    <AiOutlineBell size={24} />
                                    {unreadNotifications > 0 && (
                                        <span className='absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-semibold text-white bg-red-600 rounded-full'>
                                            {unreadNotifications}
                                        </span>
                                    )}
                                </div>
                            }
                        >
                            <NavbarNotification
                                user={user}
                                notifications={notifications}
                            />
                        </Dropdown>

                        {/* Email Dropdown */}
                        <Dropdown
                            isOpen={isEmailOpen}
                            setIsOpen={setIsEmailOpen}
                            icon={<MdOutlineEmail size={24} />}
                        >
                            <div className='p-2 text-gray-700 font-semibold border-b'>
                                Messages
                            </div>
                            <ul className='p-2 text-sm'>
                                <li className='p-2 hover:bg-gray-100 cursor-pointer'>
                                    New message from Alice
                                </li>
                                <li className='p-2 hover:bg-gray-100 cursor-pointer'>
                                    Project update from Bob
                                </li>
                            </ul>
                        </Dropdown>

                        {/* Settings Dropdown */}
                        <Dropdown
                            isOpen={isSettingsOpen}
                            setIsOpen={setIsSettingsOpen}
                            icon={<AiOutlineSetting size={24} />}
                        >
                            <ul className='p-2 text-sm'>
                                <li className='p-2 hover:bg-gray-100 cursor-pointer'>
                                    <Link href='/admin/user-management/admins'>
                                        Admin Management
                                    </Link>
                                </li>
                            </ul>
                        </Dropdown>

                        {/* Profile Dropdown */}
                        <Dropdown
                            isOpen={isProfileOpen}
                            setIsOpen={setIsProfileOpen}
                            icon={
                                user?.fullName ? (
                                    <div className='w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold'>
                                        {userInitials}
                                    </div>
                                ) : (
                                    <div className='w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center bg-blue-600 text-white font-semibold'>
                                        UN
                                    </div>
                                )
                            }
                        >
                            <ul className='p-2 text-sm'>
                                <li className='p-2 hover:bg-gray-100 cursor-pointer'>
                                    Profile Settings
                                </li>
                                <li className='p-2 hover:bg-gray-100 cursor-pointer'>
                                    Preferences
                                </li>
                                <li
                                    className='p-2 hover:bg-red-100 cursor-pointer text-red-600'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </Dropdown>
                    </ul>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                aria-label='Sidebar'
            >
                <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
                    <ul className='space-y-2 font-medium'>
                        {menuItems.map((section, index) => (
                            <div key={index}>
                                <span className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white group flex-1 ms-3 whitespace-nowrap font-semibold'>
                                    {section.title}
                                </span>
                                {section.links.map((link, linkIndex) => {
                                    const currentPath = normalizePath(pathname);
                                    const linkPath = normalizePath(link.href);

                                    const isActive =
                                        linkPath === "/admin"
                                            ? currentPath === "/admin"
                                            : currentPath.startsWith(linkPath);

                                    return (
                                        <li
                                            key={linkIndex}
                                            className='mt-2'
                                        >
                                            <Link
                                                href={link.href}
                                                className={`flex items-center p-2 rounded-lg group ${
                                                    isActive
                                                        ? "BlueBg dark:bg-gray-700 text-white dark:text-white font-semibold"
                                                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`}
                                            >
                                                <span className='flex-1 ms-3 whitespace-nowrap'>
                                                    {link.name}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </div>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}
