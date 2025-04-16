"use client";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import img1 from "../../../public/helpcenter/img1.svg";
import img2 from "../../../public/helpcenter/img2.svg";
import img3 from "../../../public/helpcenter/img3.svg";
import img4 from "../../../public/helpcenter/img4.svg";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    fetchHelpSupports,
    HelpSupport,
} from "@/store/features/admin/helpSlice";
import { useTokenContext } from "@/context/TokenCheckingContext";

const helpCategories = [
    {
        title: "Sipariş Oluşturma",
        value: "orders",
        icon: (
            <Image
                src={img1}
                alt='img1'
            />
        ),
    },
    {
        title: "Contentia Nasıl Çalışır?",
        value: "contents",
        icon: (
            <Image
                src={img2}
                alt='img2'
            />
        ),
    },
    {
        title: "Kullanım Koşulları",
        value: "terms",
        icon: (
            <Image
                src={img3}
                alt='img3'
            />
        ),
    },
    {
        title: "İçerik Üreticileri",
        value: "creators",
        icon: (
            <Image
                src={img4}
                alt='img4'
            />
        ),
    },
];

const Section: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const { helpSupports: helpSupportData } = useSelector(
        (state: any) => state.helpSupport
    );
    console.log("🚀 ~ helpSupportData:", helpSupportData);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHelpSupports());
    }, [dispatch]);

    const selectedCategoryValue = helpCategories[selectedCategory].value;

    const filteredHelpSupports = helpSupportData.filter(
        (support: HelpSupport) => support.category === selectedCategoryValue
    );
    console.log("🚀 ~ helpSupportData:", helpSupportData);

    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-32'>
            <div className='py-24 sm:py-24 md:py-24 lg:py-[100px]'>
                <div className='border border-gray-400 rounded-md p-2 sm:p-4 md:p-8 lg:px-12 lg:py-8'>
                    <div>
                        <h4 className='text-gray-600'>Merhaba</h4>
                        <h1 className='w-full mt-1 text-xl md:text-3xl font-semibold text-gray-800 whitespace-nowrap'>
                            Hangi konuda desteğe <br /> ihtiyacınız var?
                        </h1>
                        <div
                            className='flex gap-3 p-2 items-center rounded-md mt-4 mb-4 bg-gray-200'
                            style={{ color: "#6C757D" }}
                        >
                            <CiSearch size={20} />
                            <input
                                type='text'
                                placeholder='Destek almak istediğiniz konu nedir?'
                                className='outline-none w-full bg-transparent py-1'
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className='flex flex-wrap justify-between gap-1 mt-4'>
                        {helpCategories.map((category, index) => (
                            <div
                                key={index}
                                className={`px-1 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-8 lg:py-4 rounded-md text-white flex flex-col items-center cursor-pointer transition-all ${
                                    selectedCategory === index
                                        ? "ring-2 ring-offset-2 ring-blue-500"
                                        : ""
                                }`}
                                style={{ backgroundColor: "#4D4EC9" }}
                                onClick={() => setSelectedCategory(index)}
                            >
                                <div className='flex flex-col items-center'>
                                    {category.icon}
                                    <h2 className='text-xs md:text-sm text-center mt-0.5 md:mt-2'>
                                        {category.title}
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filtered Help Supports */}
                    <div className='flex flex-col gap-4 mt-8 font-medium'>
                        {filteredHelpSupports.length > 0 ? (
                            filteredHelpSupports.map(
                                (helpSupport: HelpSupport) => (
                                    <div
                                        className='flex gap-3 items-center'
                                        key={helpSupport._id}
                                    >
                                        <Image
                                            src={helpSupport.icon}
                                            width={30}
                                            height={30}
                                            alt={helpSupport.title}
                                        />
                                        <Link
                                            href={`/help-support/detail/${helpSupport._id}`}
                                        >
                                            <span className='cursor-pointer hover:underline'>
                                                {helpSupport.title}
                                            </span>
                                        </Link>
                                    </div>
                                )
                            )
                        ) : (
                            <p className='text-gray-500'>
                                Bu kategoride içerik bulunamadı.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section;
