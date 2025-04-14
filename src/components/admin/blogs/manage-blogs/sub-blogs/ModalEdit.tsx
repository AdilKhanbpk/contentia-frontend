import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { BlogInterface } from "@/types/interfaces";
import { useForm, Controller } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface BlogEditModelProps {
    blogData: BlogInterface;
    onClose: () => void;
    onSubmit: (data: BlogInterface) => void;
}

export function ModalEdit({ blogData, onClose, onSubmit }: BlogEditModelProps) {
    const { register, handleSubmit, setValue, control } =
        useForm<BlogInterface>({
            defaultValues: blogData,
        });
    const [previewImage, setPreviewImage] = useState<string | null>(
        typeof blogData?.bannerImage === "string" ? blogData.bannerImage : null
    );

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file)); // Replace preview with the new image
        }
    };

    useEffect(() => {
        if (blogData) {
            Object.keys(blogData).forEach((key) => {
                setValue(
                    key as keyof BlogInterface,
                    blogData[key as keyof BlogInterface]
                );
            });
        }
    }, [blogData, setValue]);

    const handleDescriptionChange = (value: string) => {
        setValue("content", value);
    };

    const onSubmitForm = (data: BlogInterface) => {
        onSubmit(data);
        onClose();
    };

    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
            <h1 className='text-lg font-semibold'>Update blog</h1>

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
                        control={control}
                        name='content'
                        render={({ field }) => (
                            <ReactQuill
                                {...field}
                                onChange={handleDescriptionChange}
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        {/* Show the preview image (DB image initially, new image if selected) */}
                        {previewImage && (
                            <img
                                src={previewImage}
                                alt='Blog Banner'
                                className='absolute inset-0 w-full h-full object-cover rounded-md'
                            />
                        )}

                        {/* File input */}
                        <input
                            type='file'
                            {...register("bannerImage")}
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                            accept='image/*'
                            onChange={handleImageChange} // Replace preview when new image is selected
                        />

                        {/* Placeholder if no image exists */}
                        {!previewImage && (
                            <div className='flex flex-col justify-center items-center h-full pointer-events-none'>
                                <span className='text-gray-500 font-medium text-lg'>
                                    2000 x 500
                                </span>
                            </div>
                        )}
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

                <div className='flex justify-end mt-6'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='mr-4 px-8 py-1 rounded-lg font-semibold border border-gray-300'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='Button text-white px-8 py-1 rounded-lg font-semibold'
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
