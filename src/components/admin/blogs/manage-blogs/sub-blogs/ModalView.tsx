import { BlogInterface } from "@/types/interfaces";
import React from "react";

interface BlogViewModelProps {
    blogData: BlogInterface;
    onClose: () => void;
}

export function ModalView({ blogData, onClose }: BlogViewModelProps) {
    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
            <h1 className='text-lg font-semibold'>View Blog</h1>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>Title</label>
                <div className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'>
                    {blogData.title || "No title provided"}
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>Category</label>
                <div className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'>
                    {blogData.category || "No category selected"}
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>Keywords</label>
                <div className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'>
                    {blogData.metaKeywords?.length
                        ? blogData.metaKeywords.join(", ")
                        : "No keywords added"}
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Description
                </label>
                <div
                    className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 prose max-w-none'
                    dangerouslySetInnerHTML={{
                        __html:
                            blogData.metaDescription ||
                            "No description provided",
                    }}
                />
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Blog Banner
                </label>
                {blogData.bannerImage ? (
                    <div className='w-full max-w-[500px] h-[125px] relative'>
                        <img
                            src={
                                typeof blogData.bannerImage === "string"
                                    ? blogData.bannerImage
                                    : undefined
                            }
                            alt='Blog banner'
                            className='w-full h-full object-cover rounded-md'
                        />
                    </div>
                ) : (
                    <div className='w-full max-w-[500px] h-[125px] flex items-center justify-center border border-gray-200 rounded-md bg-gray-50'>
                        No banner uploaded
                    </div>
                )}
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Meta Description
                </label>
                <div className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'>
                    {blogData.metaDescription || "No meta description provided"}
                </div>
            </div>

            <div className='flex justify-end mt-6'>
                <button
                    onClick={onClose}
                    className='px-8 py-1 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors'
                >
                    Close
                </button>
            </div>
        </div>
    );
}
