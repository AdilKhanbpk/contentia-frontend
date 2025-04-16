import { TermsInterface } from "@/types/interfaces";
import React from "react";

interface TermViewModelProps {
    termData: TermsInterface;
    onClose: () => void;
}

export function ViewTerms({ termData, onClose }: TermViewModelProps) {
    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
            <h1 className='text-lg font-semibold'>View Blog</h1>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>Title</label>
                <div className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'>
                    {termData.pageTitle || "No title provided"}
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>Category</label>
                <div className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'>
                    {termData.pageCategory || "No category selected"}
                </div>
            </div>

            <div className='mt-4'>
                <label className='block text-sm font-semibold'>
                    Description
                </label>
                <div
                    className='prose prose-sm sm:prose lg:prose-lg max-w-none mt-6 text-gray-700'
                    dangerouslySetInnerHTML={{
                        __html:
                            termData.pageContent || "No description provided",
                    }}
                />
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
