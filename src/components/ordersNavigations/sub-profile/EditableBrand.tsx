"use client";

import Image from 'next/image';
import {
    Brand
} from "@/store/features/profile/brandSlice";
import LogoUploader from './LogoUploader';

interface EditableBrandProps {
    brand: Brand;
    register: any;
    isEditing: boolean;
    brandId: string;
    setEditingBrandId: (id: string | null) => void;
}

const EditableBrand: React.FC<EditableBrandProps> = ({
    brand,
    register,
    isEditing,
    brandId,
    setEditingBrandId
}) => (
    <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-36 p-4 mt-1 mb-4 sm:p-5 sm:mt-2 sm:mb-6 md:p-6 md:mt-2 md:mb-8 lg:p-6 lg:mt-2 lg:mb-8 border-2 border-gray-200">
        <div className="flex flex-col justify-start items-center">
            <h2 className="text-base font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-10">
                {brand.brandName}
            </h2>
            {/* Image Uploader Component */}
            {brand && (
                <LogoUploader
                    brandId={brand._id!}
                    currentImage={brand.brandImage}
                />
            )}
        </div>
        <div className="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-col">
            <div className="flex flex-col mb-2">
                <label>Marka Adı:</label>
                <input
                    type="text"
                    {...register(`brands.${brandId}.brandName`)}
                    defaultValue={brand.brandName}
                    disabled={!isEditing}
                    className=" border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            <div className="flex flex-col mb-2">
                <label>Marka Kategorisi:</label>
                <input
                    type="text"
                    {...register(`brands.${brandId}.brandCategory`)}
                    defaultValue={brand.brandCategory}
                    disabled={!isEditing}
                    className=" border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            <div className="flex flex-col mb-2">
                <label className='whitespace-nowrap'>Marka Websitesi:</label>
                <input
                    type="text"
                    {...register(`brands.${brandId}.brandWebsite`)}
                    defaultValue={brand.brandWebsite}
                    disabled={!isEditing}
                    className=" border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            <div className="flex flex-col mb-2">
                <label>Ülke:</label>
                <input
                    type="text"
                    {...register(`brands.${brandId}.brandCountry`)}
                    defaultValue={brand.brandCountry}
                    disabled={!isEditing}
                    className=" border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            {isEditing && (
                <button
                    type="submit"
                    className="mt-4  px-8 py-0.5 ButtonBlue text-white rounded-lg"
                >
                    Güncelle
                </button>
            )}
        </div>
        <div className='absolute right-16 sm:right-20 md:right-28 lg:right-48'>
            <div onClick={() => setEditingBrandId(isEditing ? null : brand._id)} className="cursor-pointer">
                <Image width={16} height={16} src='/editIcon.png' alt='edit icon' />
            </div>
        </div>
    </div>
);

export default EditableBrand;