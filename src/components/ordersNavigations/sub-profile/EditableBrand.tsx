"use client";

import Image from "next/image";
import { Brand } from "@/store/features/profile/brandSlice";
import LogoUploader from "./LogoUploader";

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
    setEditingBrandId,
}) => (
    <div className='relative flex flex-col lg:flex-row justify-start items-start lg:space-x-36 p-4 mt-1 mb-4 sm:p-5 sm:mt-2 sm:mb-6 md:p-6 md:mt-2 md:mb-8 lg:p-6 lg:mt-2 lg:mb-8 border-2 border-gray-200'>
        <div className='flex flex-col justify-start items-center'>
            <h2 className='text-base font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-10'>
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
        <div className='w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-col'>
            <FormField
                label='Marka Adı'
                name={`brands.${brandId}.brandName`}
                register={register}
                isEditing={isEditing}
                defaultValue={brand.brandName}
            />
            <FormField
                label='Marka Kategorisi'
                name={`brands.${brandId}.brandCategory`}
                register={register}
                isEditing={isEditing}
                defaultValue={brand.brandCategory}
            />
            <FormField
                label='Marka Websitesi'
                name={`brands.${brandId}.brandWebsite`}
                register={register}
                isEditing={isEditing}
                defaultValue={brand.brandWebsite ?? ""}
            />
            <FormField
                label='Ülke'
                name={`brands.${brandId}.brandCountry`}
                register={register}
                isEditing={isEditing}
                defaultValue={brand.brandCountry}
            />
            {isEditing && (
                <button
                    type='submit'
                    className='mt-4 px-8 py-0.5 Button text-white rounded-lg'
                >
                    Güncelle
                </button>
            )}
        </div>

        {/* Edit Icon */}
        <div className='absolute top-6 right-4 sm:right-6 md:right-10 lg:right-24'>
            <button
                type='button'
                onClick={() => setEditingBrandId(isEditing ? null : brand._id)}
                className={`p-2 rounded-full transition-all duration-300 ease-in-out border shadow-md 
            ${
                isEditing
                    ? "bg-indigo-700 border-white ring-2 ring-indigo-400"
                    : "bg-white hover:bg-indigo-100 border-gray-300"
            }`}
                title={isEditing ? "Düzenlemeyi Bitir" : "Düzenle"}
            >
                <Image
                    width={18}
                    height={18}
                    src='/editIcon.png'
                    alt='edit icon'
                    className={`transition-transform duration-300 ${
                        isEditing
                            ? "filter invert brightness-200 scale-110"
                            : ""
                    }`}
                />
            </button>
        </div>
    </div>
);

// ✅ Reusable field for better DRY and consistent styling
const FormField = ({
    label,
    name,
    register,
    isEditing,
    defaultValue,
}: {
    label: string;
    name: string;
    register: any;
    isEditing: boolean;
    defaultValue: string;
}) => (
    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
        <label className='mb-1'>{label}:</label>
        <input
            type='text'
            {...register(name)}
            defaultValue={defaultValue}
            readOnly={!isEditing}
            className={`font-semibold border px-1 py-0.5 rounded-md focus:outline-none ${
                !isEditing
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-blue-50 border-blue-500"
            }`}
        />
    </div>
);

export default EditableBrand;
