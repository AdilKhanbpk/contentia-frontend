"use client";

import Image from "next/image";
import ProfileChange from "./ProfileChange";

interface ProfileInfoProps {
    register: any;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
    register,
    setIsEditing,
    isEditing,
}) => (
    <div className='relative flex flex-col lg:flex-row justify-start items-start lg:space-x-36 mb-4'>
        {/* Header + Avatar Section */}
        <div className='flex flex-col justify-start items-center'>
            <div className='flex items-center gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-6'>
                <h2 className='text-xl font-semibold'>Profil Bilgileri</h2>
            </div>
            <ProfileChange />
        </div>

        {/* Input Fields */}
        <div className='w-full lg:w-1/4 flex flex-col mt-2 lg:mt-0'>
            <FormField
                label='Ad Soyad'
                name='fullName'
                register={register}
                isEditing={isEditing}
            />
            <FormField
                label='E-Posta'
                name='email'
                register={register}
                isEditing={isEditing}
                type='email'
            />
            <FormField
                label='Telefon Numarası'
                name='phoneNumber'
                register={register}
                isEditing={isEditing}
            />
        </div>

        {/* Edit Icon */}
        <div className='absolute top-0 right-4 sm:right-6 md:right-10 lg:right-24'>
            <button
                type='button'
                onClick={() => setIsEditing(!isEditing)}
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
    type = "text",
}: {
    label: string;
    name: string;
    register: any;
    isEditing: boolean;
    type?: string;
}) => (
    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
        <label className='mb-1'>{label}:</label>
        <input
            type={type}
            {...register(name)}
            readOnly={!isEditing}
            className={`font-semibold border px-1 py-0.5 rounded-md focus:outline-none ${
                !isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
            }`}
        />
    </div>
);
