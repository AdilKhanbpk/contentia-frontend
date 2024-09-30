"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Link from "next/link";

export default function Navbar() {
  const { t } = useTranslation(); // Initialize the translation hook
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200  dark:bg-gray-800 dark:border-gray-700 px-2 sm:px-4 md:px-6 lg:px-10">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <a href="" className="flex lg:ms-4 md:me-0 mb-3">
            <Image
              src="/contentiaLogo.png"
              height={44}
              width={151}
              alt="logo"
              className="h-[33px] w-[173px]"
            />
          </a>
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
              <div className="flex items-center space-x-8 ms-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/brand-logo.png" // Placeholder for the logo next to "Brand Name"
                    alt="brand logo"
                    height={32}
                    width={32}
                    className="rounded-full"
                  />
                  <span className="text-lg font-semibold text-black">
                    Brand Name
                  </span>
                  <Image
                    src="/dropDownIcon.png" // Placeholder for the logo next to "Brand Name"
                    alt="brand logo"
                    height={20}
                    width={20}
                    className="rounded-full"
                  />
                </div>

                {/* Navigation Links */}
                <ul className="hidden lg:flex space-x-4 font-medium">
                  <li>
                    <a
                      href="#"
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                    >
                      {t('home')}
                    </a>
                  </li>
                  <li>
                    <Link legacyBehavior href="/orders/profile">
                      <a
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                      >
                        {t('profile')}
                      </a>
                    </Link>

                  </li>
                  <li>
                    <Link legacyBehavior href="/orders/orders">
                      <a
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                      >
                        {t('orders')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/orders/packages">
                      <a
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                      >
                        {t('packages')}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/orders/my-brands">
                      <a
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                      >
                        {t('my_brands')}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Section with User Avatar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center text-sm rounded-full focus:outline-none"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 text-white mr-2">
                    SK {/* Initials */}
                  </span>
                  <Image
                    src="/dropDownIcon.png" // Placeholder for the logo next to "Brand Name"
                    alt="brand logo"
                    height={20}
                    width={20}
                    className="rounded-full"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:hidden`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">{t('home')}</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">{t('profile')}</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">{t('orders')}</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">{t('packages')}</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">{t('my_brands')}</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
