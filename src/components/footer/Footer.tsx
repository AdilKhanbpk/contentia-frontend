import Image from "next/image";
import Link from "next/link";

const socialLinks = [
    {
        href: "https://www.instagram.com/contentia.io/",
        icon: "/BecomeCreator/Instagram_icon.png",
        alt: "Instagram",
    },
    {
        href: "https://www.tiktok.com/contentia.io",
        icon: "/BecomeCreator/tiktik_icon.png",
        alt: "TikTok",
    },
    {
        href: "https://www.youtube.com/@contentiaio",
        icon: "/youtube.svg",
        alt: "YouTube",
    },
    {
        href: "https://twitter.com/contentia_io",
        icon: "/BecomeCreator/x_icon.png",
        alt: "Twitter",
    },
    {
        href: "https://www.linkedin.com/company/contentiaio",
        icon: "/BecomeCreator/linkedin_icon.png",
        alt: "LinkedIn",
    },
    {
        href: "https://www.facebook.com/contentia.io",
        icon: "/BecomeCreator/facebook_icon..png",
        alt: "Facebook",
    },
];

const Footer = () => {
    return (
        <footer className='bg-white text-gray-700 py-8 lg:px-12 border-t'>
            <div className=' container mx-auto px-4 sm:px-6 md:px-8 lg:px-[38px] flex flex-col md:flex-row justify-between items-start md:items-start'>
                {/* Left Section: Logo and Description */}
                <div className='mb-6 md:mb-0'>
                    <div className='flex items-center mb-4'>
                        <div className=''>
                            <a href='/'>
                                <Image
                                    src='/contentiaLogo.png'
                                    height={100}
                                    width={100}
                                    alt='logo'
                                    className='h-[33px] w-[173px]'
                                />
                            </a>
                        </div>
                    </div>

                    {/* Description */}
                    <p className='text-sm w-full md:w-1/2 lg:w-1/2'>
                        Markaları gerçek kullanıcılar tarafından üretilen
                        içeriklerle tanıştırarak influencer pazarlamasını en üst
                        düzeye çıkaran platform
                    </p>
                    {/* Contact */}
                    <div className='flex items-center mt-4'>
                        <Image
                            src='/messageIcon.png'
                            alt='Mail Icon'
                            width={32}
                            height={32}
                        />
                        <a
                            href='mailto:info@contentia.io'
                            className='ml-2 text-sm'
                        >
                            info@contentia.io
                        </a>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className='sm:w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-8 sm:gap-8 md:gap-x-36 lg:gap-x-36'>
                    <div>
                        <h3 className='text-sm font-semibold whitespace-nowrap'>
                            İşletme Tipleri
                        </h3>
                        <ul className='mt-4 space-y-2'>
                            <li>
                                <Link
                                    href='/'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Markalar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Ajanslar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Girişimler
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Corporate */}
                    <div>
                        <h3 className='text-sm font-semibold '>Kurumsal</h3>
                        <ul className='mt-4 space-y-2'>
                            <li>
                                <Link
                                    href='/hakkimizda'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/sozlesmeler/gizlilik-politikasi'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Gizlilik Politikası
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/sozlesmeler/kullanim-sartlari'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Kullanım Koşulları
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/blog'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className='text-sm font-semibold '>Destek</h3>
                        <ul className='mt-4 space-y-2'>
                            <li>
                                <a
                                    href="https://calendly.com/contentia-info"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm whitespace-nowrap text-gray-600 hover:underline"
                                >
                                    İletişime Geç
                                </a>
                            </li>

                            <li>
                                <Link
                                    href='/destek-merkezi'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Destek Merkezi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/nasil-calisir'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Nasıl Çalışır?
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/nasil-calisir'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    Sıkça Sorulan Sorular
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/hakkimizda'
                                    className='text-sm whitespace-nowrap text-gray-600 hover:underline'
                                >
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Social Media */}
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-[38px] mt-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8'>
                {/* Left Section */}
                <div className='w-full md:w-1/2 flex flex-col '>
                    <div className='w-1/2 flex justify-center'>
                        {/* Become a Creator */}
                        <p className='font-semibold'>İçerik Üretici Ol</p>
                    </div>
                    {/* App Store Links */}
                    <div className='flex flex-wrap gap-4 mt-3'>
                        <div className='w-[160px] h-[50px] flex items-center justify-center bg-white rounded-md shadow-md'>
                            <Link
                                href='https://apps.apple.com/app/idXXXXXXXXX'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center justify-center w-full h-full'
                            >
                                <Image
                                    src='/BecomeCreator/AppStore1.png'
                                    alt='Download on the App Store'
                                    width={140}
                                    height={40}
                                    className='object-contain'
                                />
                            </Link>
                        </div>

                        <div className='w-[160px] h-[50px] flex items-center justify-center bg-white rounded-md shadow-md'>
                            <Link
                                href='https://play.google.com/store/apps/details?id=XXXXXXXXX'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center justify-center w-full h-full'
                            >
                                <Image
                                    src='/BecomeCreator/googleplay2.svg'
                                    alt='Get it on Google Play'
                                    width={140}
                                    height={40}
                                    className='object-contain'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Copyright */}
                    <p className='text-sm text-gray-600 mt-4'>
                        2024 Contentia. Tüm Hakları Saklıdır
                    </p>
                </div>

                {/* Right Section */}
                <div className='w-full md:w-1/2 flex flex-col items-center md:items-end'>
                    <div className='w-1/2 flex justify-center'>
                        <p className='mb-2 font-semibold'>Bizi Takip Edin</p>
                    </div>
                    <div className='flex flex-wrap gap-4 justify-center md:justify-end'>
                        {socialLinks.map((item, index) => (
                            <Link
                                href={item.href}
                                key={index}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition transform hover:scale-110 hover:opacity-80 duration-300'
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.alt}
                                    width={50}
                                    height={50}
                                    className='rounded-md shadow-sm'
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;