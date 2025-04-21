import { useState } from "react";
import Image from "next/image";
import instIcon from "../../../../public/BecomeCreator/Instagram_icon.png";
import facebookIcon from "../../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../../public/BecomeCreator/tiktik_icon.png";
import Link from "next/link";

const SocialMediaInformation: React.FC<{ register: any; errors: any }> = ({
    register,
    errors,
}) => {
    const [showTooltipTwo, setShowTooltipTwo] = useState(false);

    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-28'>
            <div className='bg-white py-12 px-4 sm:p-5 md:p-6 lg:p-6'>
                <div>
                    <span className='text-xl font-bold'>
                        Sosyal Medya Bilgileri{" "}
                    </span>
                    <span>(Opsiyonel)</span>
                    <div className='flex gap-2 items-center mt-3'>
                        <h2 className='text-lg font-semibold'>
                            Sosyal Medya Paylaşımı:
                        </h2>

                        {/* Tooltip */}
                        <div className='relative flex justify-center'>
                            <button
                                className='text-black text-sm px-3 py-1 rounded-full'
                                onMouseEnter={() => setShowTooltipTwo(true)}
                                onMouseLeave={() => setShowTooltipTwo(false)}
                            >
                                <Image
                                    src='/tooltipIcon.png'
                                    alt='brand logo'
                                    height={16}
                                    width={16}
                                    className='rounded-full'
                                />
                            </button>
                            {showTooltipTwo && (
                                <div className='absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2'>
                                    Ürettiğin içerikleri, takipçi sayısından
                                    bağımsız sosyal medya hesaplarından
                                    paylaşabilirsin. Takipçi sayısı, İçerik
                                    Üreticisi türünü belirleyecek olup,
                                    UGC’lerden elde edeceğin kazancı
                                    belirleyecektir.
                                </div>
                            )}
                        </div>
                    </div>
                    <p className='mb-3'>
                        Ek ücret karşılığında, hazırladığın içerikleri kendi
                        sosyal medya hesaplarında paylaşmak ister misin?
                    </p>
                    <div className='flex justify-start space-x-4'>
                        {/* Product Radio Button */}
                        <label className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'>
                            <input
                                type='radio'
                                {...register(
                                    "preferences.socialInformation.contentType"
                                )}
                                value='yes'
                                className='hidden peer'
                            />
                            <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                <div className='w-full h-full bg-white rounded-full'></div>
                            </div>
                            <span className='ml-1 text-sm'>Evet</span>
                        </label>

                        {/* Hizmet Radio Button */}
                        <label className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'>
                            <input
                                type='radio'
                                {...register(
                                    "preferences.socialInformation.contentType"
                                )}
                                defaultChecked
                                value='no'
                                className='hidden peer'
                            />
                            <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                <div className='w-full h-full bg-white rounded-full'></div>
                            </div>
                            <span className='ml-1 text-sm'>Hayır</span>
                        </label>
                    </div>
                    {errors.preferences?.socialInformation?.contentType && (
                        <span className='text-red-500 text-sm'>
                            {
                                errors.preferences.socialInformation.contentType
                                    .message
                            }
                        </span>
                    )}
                </div>

                {/* Social media section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {[
                        { icon: instIcon, label: "Instagram" },
                        { icon: tiktokIcon, label: "TikTok" },
                        { icon: facebookIcon, label: "Facebook" },
                        { icon: youtubeIcon, label: "Youtube" },
                        { icon: xIcon, label: "X" },
                        { icon: linkdinIcon, label: "Linkedin" },
                    ].map((platform) => (
                        <div
                            key={platform.label}
                            className='flex flex-col mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4'
                        >
                            <div className='flex items-center mt-4'>
                                <Image
                                    src={platform.icon}
                                    alt={`${platform.label} Icon`}
                                    width={24}
                                    height={24}
                                />
                                <h1 className='text-lg font-bold ml-2'>
                                    {platform.label}:
                                </h1>
                            </div>

                            {/* Username input */}
                            <input
                                type='text'
                                {...register(
                                    `preferences.socialInformation.platforms.${platform.label}.username`
                                )}
                                className='border px-2 py-1 rounded mt-2 sm:w-fit w-full focus:outline-none'
                                placeholder='Kullanıcı Adı'
                            />

                            {/* Follower count input */}
                            <input
                                type='number'
                                {...register(
                                    `preferences.socialInformation.platforms.${platform.label}.followers`,
                                    {
                                        valueAsNumber: true,
                                        min: {
                                            value: 0,
                                            message:
                                                "Takipçi sayısı 0'dan büyük olmalıdır.",
                                        },
                                    }
                                )}
                                className='border px-2 py-1 rounded mt-2 sm:w-fit w-full focus:outline-none'
                                placeholder='Takipçi Sayısı'
                            />
                            {errors.preferences?.socialInformation?.platforms?.[
                                platform.label
                            ]?.followers && (
                                <span className='text-red-500 text-sm'>
                                    {
                                        errors.preferences.socialInformation
                                            .platforms[platform.label].followers
                                            .message
                                    }
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className='mt-2 col-span-3'>
                    <h2 className='text-lg mb-2 font-semibold'>
                        Örnek Çalışma
                    </h2>
                    <p className='mb-4'>
                        Daha önce gerçekleştirdiğiniz çalışmalardan örnek
                        paylaşımlarınızı bizimle paylaşabilirsiniz.
                    </p>
                    <input
                        type='text'
                        {...register(
                            "preferences.socialInformation.portfolioLink",
                            {
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                    message:
                                        "Örnek: https://www.instagram.com/contentia/reel/C5OCG4XBtFX",
                                },
                            }
                        )}
                        className='border focus:outline-none p-4 rounded w-full'
                        placeholder='https://www.instagram.com,https://www.tiktok.com,https://www.x.com'
                    />
                    {errors.preferences?.socialInformation?.portfolioLink && (
                        <span className='text-red-500 text-sm'>
                            {
                                errors.preferences.socialInformation
                                    .portfolioLink.message
                            }
                        </span>
                    )}
                    {/* First Checkbox */}
                    <div className='flex items-start my-4'>
                        <input
                            id='sozlesme'
                            type='checkbox'
                            {...register("userAgreement", {
                                required:
                                    "Kullanıcı Sözleşmesi'ni onaylamak zorunludur.",
                            })}
                            className='mt-1 mr-2'
                        />
                        <label
                            htmlFor='sozlesme'
                            className='text-sm text-gray-500'
                        >
                            <span className='underline'>
                                <Link href='/dummy-url'>
                                    Kullanıcı Sözleşmesi
                                </Link>
                            </span>
                            'ni{" "}
                            <span className='underline'>
                                <Link href='/dummy-url'>Aydınlatma Metni</Link>
                            </span>
                            'ni{" "}
                            <span className='underline'>
                                <Link href='/dummy-url'>Açık Rıza Metni</Link>
                            </span>
                            'ni ve{" "}
                            <span className='underline'>
                                <Link href='/dummy-url'>
                                    Ödeme Platform Kullanım Sözleşmesi
                                </Link>
                            </span>
                            'ni okudum, onaylıyorum.
                        </label>
                    </div>
                    {errors?.userAgreement && (
                        <span className='text-red-500 text-sm'>
                            {
                                errors?.preferences?.socialInformation
                                    ?.userAgreement?.message
                            }
                        </span>
                    )}

                    <div className='flex items-start mb-4'>
                        <input
                            id='iletisim'
                            type='checkbox'
                            {...register(
                                "preferences.socialInformation.approvedCommercial"
                            )}
                            className='mt-1 mr-2'
                        />
                        <label
                            htmlFor='iletisim'
                            className='text-sm text-gray-500'
                        >
                            <span className='underline'>
                                <Link href='/dummy-url'>
                                    Ticari Elektronik İleti ve İletişim İzni
                                </Link>
                            </span>
                            'ni onaylıyorum.
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaInformation;
