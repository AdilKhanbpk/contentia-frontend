// PasswordChange.tsx
import React from 'react';

interface PasswordChangeProps {
    register: any;
    isEditing: boolean;
}

export const PasswordChange: React.FC<PasswordChangeProps> = ({ register, isEditing }) => (
    <div className='flex flex-col lg:flex-row lg:space-x-32 mb-4'>
        <h2 className="text-xl whitespace-nowrap font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-6">Şifre Değiştirme</h2>
        <div className='w-full'>
            <div className='flex flex-col'>
                <label>Mevcut Şifre</label>
                <input
                    type="password"
                    {...register('currentPassword')}
                    disabled={!isEditing}
                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            <div className='flex flex-col'>
                <label>Yeni Şifre</label>
                <input
                    type="password"
                    {...register('newPassword')}
                    disabled={!isEditing}
                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>
            <div className='flex flex-col'>
                <label>Yeni Şifre Tekrar</label>
                <input
                    type="password"
                    {...register('confirmNewPassword')}
                    disabled={!isEditing}
                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                />
            </div>

        </div>
        
    </div>
);
