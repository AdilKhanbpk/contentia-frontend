import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import instIcon from "../../../../../../public/BecomeCreator/Instagram_icon.png";
import facebookIcon from "../../../../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../../../../public/BecomeCreator/tiktik_icon.png";

const ThirdTab = () => {
    const { register, handleSubmit, watch } = useForm();

    const onSubmit = async (data: any) => {
        console.log(data); // Logs the selected preferences
        try {
            const response = await axios.post('http://localhost:3001/api/v1/preferences/preferencesRoute', data);
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div className="w-2/3 p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        Creator Preferences
                    </h2>

                    <div className='flex flex-row justify-between space-x-8'>
                        {/* Content Type */}
                        <div className="mb-4 w-1/2">
                            <label className="block mb-3 text-sm font-semibold text-gray-700">Content Type:</label>
                            <div className="flex space-x-4 mt-2">
                                {['Product', 'Service', 'Location'].map((type) => (
                                    <label key={type} className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            {...register('contentType')}
                                            value={type}
                                            className="hidden peer"
                                        />
                                        <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                            <div className="w-full h-full bg-white rounded-full"></div>
                                        </div>
                                        <span className="ml-1 text-sm">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Creator Type (Decided by the Platform) */}
                        <div className="mb-4 w-1/2">
                            <label className="block text-sm font-semibold text-gray-700">Creator Type:</label>
                            <select
                                {...register('creatorType')}
                                className="border px-2 py-1 rounded mt-2 w-full focus:outline-none"
                            >
                                <option value="Nano">Nano</option>
                                <option value="Nano">Micro</option>
                            </select>
                        </div>

                    </div>
                    {/* Content Formats */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Content Formats:</label>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            {['Instagram Reels', 'Instagram Post', 'TikTok Video', 'LinkedIn Post'].map((format) => (
                                <label key={format} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('contentFormats')}
                                        value={format}
                                        className="hidden peer"
                                    />
                                    <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                        <div className="w-full h-full bg-white rounded-full"></div>
                                    </div>
                                    <span className="ml-1 text-sm">{format}</span>
                                </label>
                            ))}
                        </div>
                    </div>



                    {/* Interests */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Interests:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
                            {[
                                'Spor ve Aktivite',
                                'Sanal ve El İşleri',
                                'Müzik',
                                'Eğlence ve Oyun',
                                'Yemek ve İçecek',
                                'Bilim ve Teknoloji',
                                'Seyahat ve Kültür',
                                'Kitap ve Edebiyat',
                                'Film ve Dizi',
                                'Doğa ve Hayvanlar',
                                'Gönüllülük',
                                'Moda ve Güzellik',
                                'E-Ticaret',
                                'Üretim ve Mühendislik',
                                'Sağlık',
                                'Eğitim',
                            ].map((interest, index) => (
                                <label key={index} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('interests')}
                                        value={interest}
                                        className="hidden peer"
                                    />
                                    <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                        <div className="w-full h-full bg-white rounded-full"></div>
                                    </div>
                                    <span className="ml-1 text-sm">{interest}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='mb-4'>
                        <div className="">
                            <div className="bg-white">
                                <div>
                                    <span className="text-lg font-semibold">Social Media Information</span>
                                    <div className="flex gap-2 items-center mt-3">
                                        <h2 className="text-sm font-semibold mb-2 text-gray-700">Social Media Share</h2>

                                    </div>

                                    <div className="flex justify-start space-x-4">
                                        {/* Product Radio Button */}
                                        <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
                                            <input
                                                type="radio"
                                                {...register("social_information.contentType")}
                                                value="product"
                                                className="hidden peer"
                                            />
                                            <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                                <div className="w-full h-full bg-white rounded-full"></div>
                                            </div>
                                            <span className="ml-1 text-sm">Yes</span>
                                        </label>

                                        {/* Hizmet Radio Button */}
                                        <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
                                            <input
                                                type="radio"
                                                {...register("social_information.contentType")}
                                                value="hizmat"
                                                className="hidden peer"
                                            />
                                            <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                                                <div className="w-full h-full bg-white rounded-full"></div>
                                            </div>
                                            <span className="ml-1 text-sm">No</span>
                                        </label>
                                    </div>

                                </div>

                                {/* Social media section */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                                    {[
                                        { icon: instIcon, label: "Instagram" },
                                        { icon: tiktokIcon, label: "TikTok" },
                                        { icon: facebookIcon, label: "Facebook" },
                                        { icon: youtubeIcon, label: "Youtube" },
                                        { icon: xIcon, label: "X" },
                                        { icon: linkdinIcon, label: "Linkedin" },
                                    ].map((platform) => (
                                        <div key={platform.label} className="flex flex-col mb-4">
                                            <div className="flex items-center mt-4">
                                                <Image
                                                    src={platform.icon}
                                                    alt={`${platform.label} Icon`}
                                                    width={24}
                                                    height={24}
                                                />
                                                <h1 className="text-sm font-bold ml-2 text-gray-700">{platform.label}:</h1>
                                            </div>

                                            {/* Username input */}
                                            <input
                                                type="text"
                                                {...register(`social_information.platforms.${platform.label}.username`)}
                                                className="border px-2 py-1 rounded mt-2 w-full focus:outline-none"
                                                placeholder="Username"
                                            />

                                            {/* Follower count input */}
                                            <input
                                                type="number"
                                                {...register(`social_information.platforms.${platform.label}.followerCount`, {
                                                    valueAsNumber: true,
                                                    min: {
                                                        value: 0,
                                                        message: "Takipçi sayısı 0'dan büyük olmalıdır.",
                                                    },
                                                })}
                                                className="border px-2 py-1 rounded mt-2 w-full focus:outline-none"
                                                placeholder="Followers"
                                            />
                                        </div>
                                    ))}

                                    <div className="mt-2 col-span-full">
                                        <h2 className="text-sm mb-2 font-semibold text-gray-700">Portfolio : </h2>

                                        <input
                                            type="url"
                                            {...register("social_information.instagramLink", {
                                                required: "Instagram linki gereklidir.",
                                                pattern: {
                                                    value: /https?:\/\/.+/,
                                                    message: "Geçerli bir URL girin.",
                                                },
                                            })}
                                            className="border focus:outline-none p-4 rounded w-full text-sm"
                                            placeholder="Ör: https://www.instagram.com/contentia/reel/C5OCG4XBtFX"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 ButtonBlue text-white rounded-md "
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ThirdTab;
