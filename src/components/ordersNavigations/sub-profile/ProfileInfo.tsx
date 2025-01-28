"use client";

import Image from 'next/image';
import ProfileChange from './ProfileChange';

interface ProfileInfoProps {
    register: any;
    setIsEditing: (isEditing: boolean) => void;
    isEditing: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ register, setIsEditing, isEditing }) => (
    <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-36 mb-4">
        <div className='flex flex-col justify-start items-center'>
            <h2 className="text-xl font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-6">Profil Bilgileri</h2>
            <ProfileChange></ProfileChange>
        </div>
        <div className='w-1/4 flex flex-col mt-2 lg:mt-0'>
            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                <label>Ad Soyad:</label>
                <input
                    type="text"
                    {...register('fullName')}
                    disabled={!isEditing}
                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                <label>E-Posta:</label>
                <input
                    type="email"
                    {...register('email')}
                    disabled={!isEditing}
                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                <label>Telefon Numarası:</label>
                <input
                    type="text"
                    {...register('phoneNumber')}
                    disabled={!isEditing}
                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
        </div>
        <div className='absolute right-12 sm:right-12 md:right-20 lg:right-48'>
            <div onClick={() => setIsEditing(!isEditing)}>
                <Image width={16} height={16} src='/editIcon.png' alt='edit icon'></Image>
            </div>
        </div>
    </div>
);
