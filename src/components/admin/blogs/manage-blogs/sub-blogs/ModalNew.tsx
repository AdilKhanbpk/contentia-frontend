import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { BlogInterface } from "@/types/interfaces";

interface ModalProps {
    onSubmit?: (blogData: BlogInterface) => void;
    onClose: () => void;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Modal({ onSubmit, onClose }: ModalProps) {
    const { register, handleSubmit, control, setValue } =
        useForm<BlogInterface>();

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setValue("bannerImage", files);
        }
    };

    const onSubmitForm = (data: BlogInterface) => {
        if (!data.bannerImage) {
            return;
        }
        if (onSubmit) {
            onSubmit(data);
            onClose();
        }
    };

    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
            <h1 className='text-lg font-semibold'>Add a New blog</h1>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>Title</label>
                    <input
                        type='text'
                        {...register("title")}
                        placeholder='Enter blog title'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Category
                    </label>
                    <select
                        {...register("category")}
                        className='w-full py-2 border border-gray-400 rounded-md focus:outline-none'
                    >
                        <option value=''>Select a category</option>
                        <option value='tech'>Tech</option>
                        <option value='health'>Health</option>
                        <option value='finance'>Finance</option>
                    </select>
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Keywords
                    </label>
                    <input
                        type='text'
                        {...register("metaKeywords")}
                        placeholder='Click the enter button after writing your keyword'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Description
                    </label>
                    <Controller
                        name='content'
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                {...field}
                                placeholder='Write something...'
                                theme='snow'
                                className='w-full border border-gray-400 rounded-lg focus:outline-none'
                            />
                        )}
                    />
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Blog Banner
                    </label>
                    <div
                        className='relative border border-gray-400 rounded-md p-4 text-center bg-gray-200'
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            height: "125px",
                        }}
                    >
                        <input
                            type='file'
                            onChange={handleBannerChange}
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                            accept='image/*'
                        />
                        <div className='flex flex-col justify-center items-center h-full pointer-events-none'>
                            <span className='text-gray-500 font-medium text-lg'>
                                2000 x 500
                            </span>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Meta Description
                    </label>
                    <input
                        type='text'
                        {...register("metaDescription")}
                        placeholder='Enter meta description'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                </div>

                <div className='flex justify-end mt-6 space-x-4'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-6 py-1 rounded-lg font-semibold border border-gray-300'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='ButtonBlue text-white px-8 py-1 rounded-lg font-semibold'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
