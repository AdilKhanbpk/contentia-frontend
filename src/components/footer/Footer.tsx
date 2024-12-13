import Image from 'next/image';
import Link from 'next/link';
import appStoreImage from "../../../public/BecomeCreator/AppStore1.png";
import googlePlayImage from "../../../public/BecomeCreator/google3.png";
import instIcon from '../../../public/BecomeCreator/Instagram_icon.png';
import facebookIcon from "../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../public/BecomeCreator/tiktik_icon.png";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 py-8 border-t">
            <div className=" container mx-auto px-4 sm:px-6 md:px-8 lg:px-[38px] flex flex-col md:flex-row justify-between items-start md:items-start">
                {/* Left Section: Logo and Description */}
                <div className="mb-6 md:mb-0">
                    <div className="flex items-center mb-4">
                        <div className="">
                            <Image
                                src="/contentiaLogo.png"
                                height={44}
                                width={151}
                                alt="logo"
                                className="h-[33px] w-[173px]"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm w-full md:w-1/2 lg:w-1/2">
                        Markaları gerçek kullanıcılar tarafından üretilen içeriklerle tanıştırarak influencer pazarlamasını en üst düzeye çıkaran platform
                    </p>

                    {/* Contact */}
                    <div className="flex items-center mt-4">
                        <Image src="/messageIcon.png" alt="Mail Icon" width={32} height={32} />
                        <a href="mailto:info@contentia.io" className="ml-2 text-sm">info@contentia.io</a>
                    </div>

                    {/* App Store Links */}
                    <p className='mt-4 text-sm text-start md:text-end lg:text-center w-3/5'>İçerik Üretici Ol</p>

                    <div className="flex space-x-4">

                        <Image src={appStoreImage} alt="Download on the App Store" className='w-[150px] mt-3' />
                        <Image src={googlePlayImage} alt="Get it on Google Play" className='w-[150px] mt-3' />
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="sm:w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-x-8 sm:gap-8 md:gap-x-36 lg:gap-x-36">
                    <div>
                        <h3 className="text-sm font-semibold whitespace-nowrap">İşletme Tipleri</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Markalar</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Ajanslar</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Girişimler</a></Link>
                            </li>
                        </ul>
                    </div>

                    {/* Corporate */}
                    <div>
                        <h3 className="text-sm font-semibold ">Kurumsal</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Hakkımızda</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Gizlilik Politikası</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Kullanım Koşulları</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Blog</a></Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold ">Destek</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Destek Merkezi</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Nasıl Çalışır?</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">Sıkça Sorulan Sorular</a></Link>
                            </li>
                            <li>
                                <Link legacyBehavior href="#"><a className="text-sm whitespace-nowrap text-gray-600 hover:underline">İletişim</a></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Social Media */}
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[38px] mt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-600 mb-4 md:mb-0">2024 Contentia. Tüm Hakları Saklıdır</p>
                <div className='flex flex-col items-center  lg:-mt-16'>
                    <div>
                        <p className='mb-2 font-semibold'>Bizi Takip Edin</p>
                    </div>
                    <div>
                        <div className="flex space-x-4">
                            <Link legacyBehavior href="#"><Image src={instIcon} alt="Instagram" width={32} height={32} /></Link>
                            <Link legacyBehavior href="#"><Image src={tiktokIcon} alt="TikTok" width={32} height={32} /></Link>
                            <Link legacyBehavior href="#"><Image src={youtubeIcon} alt="YouTube" width={32} height={32} /></Link>
                            <Link legacyBehavior href="#"><Image src={xIcon} alt="Twitter" width={32} height={32} /></Link>
                            <Link legacyBehavior href="#"><Image src={linkdinIcon} alt="LinkedIn" width={32} height={32} /></Link>
                            <Link legacyBehavior href="#"><Image src={facebookIcon} alt="WhatsApp" width={32} height={32} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
