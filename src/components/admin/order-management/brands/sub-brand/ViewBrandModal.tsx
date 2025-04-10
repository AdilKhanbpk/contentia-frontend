import { Brand } from "@/store/features/profile/brandSlice";
import React from "react";

interface ViewBrandProps {
    brand: Brand | null;
}

const ViewBrand: React.FC<ViewBrandProps> = ({ brand }) => {
    if (!brand) return null;
    return (
        <div className='flex flex-col justify-start items-start px-4 mt-1 mb-4'>
            <h1 className='text-md font-semibold mb-4'>Brand Details</h1>

            <div className='w-full flex flex-col'>
                <p className='mb-1 font-semibold'>Marka Adı:</p>
                <p className='p-2 border rounded w-72 md:w-96'>
                    {brand.brandName}
                </p>
            </div>

            <div className='w-full flex flex-col mt-2'>
                <p className='mb-1 font-semibold'>Marka Kategorisi:</p>
                <p className='p-2 border rounded w-72 md:w-96'>
                    {brand.brandCategory}
                </p>
            </div>

            {brand.brandWebsite && (
                <div className='w-full flex flex-col mt-2'>
                    <p className='mb-1 font-semibold'>Marka Websitesi:</p>
                    <a
                        href={brand.brandWebsite}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='p-2 border rounded w-72 md:w-96 text-blue-500 underline'
                    >
                        {brand.brandWebsite}
                    </a>
                </div>
            )}

            <div className='w-full flex flex-col mt-2'>
                <p className='mb-1 font-semibold'>Ülke:</p>
                <p className='p-2 border rounded w-72 md:w-96'>
                    {brand.brandCountry}
                </p>
            </div>

            {brand.brandImage && (
                <div className='w-full flex flex-col my-2'>
                    <p className='mb-1 font-semibold'>Marka Logosu:</p>
                    <img
                        src={brand.brandImage}
                        alt='Brand Logo'
                        className='w-40 h-24 rounded-md border'
                    />
                </div>
            )}
        </div>
    );
};

export default ViewBrand;
