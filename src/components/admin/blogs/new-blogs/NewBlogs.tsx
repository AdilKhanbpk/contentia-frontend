"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store"; // Adjust import path as needed
import { createBlog } from "@/store/features/admin/blogSlice"; // Adjust import path as needed
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { BlogInterface } from "@/types/interfaces";
import { useTokenContext } from "@/context/TokenCheckingContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewBlogs() {
    const dispatch = useDispatch<AppDispatch>();
    const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
        null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token } = useTokenContext();
    if (!token) return null;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<BlogInterface>();

    const onSubmit = async (data: BlogInterface) => {
        try {
            setIsSubmitting(true);

            // Create FormData for file upload
            const formData = new FormData();

            // Explicitly append each field
            formData.append("title", data.title);
            formData.append("category", data.category);
            if (Array.isArray(data.metaKeywords)) {
                formData.append(
                    "metaKeywords",
                    JSON.stringify(data.metaKeywords)
                );
            } else {
                formData.append(
                    "metaKeywords",
                    JSON.stringify([data.metaKeywords])
                );
            }
            formData.append("content", data.content);
            formData.append("metaDescription", data.metaDescription);

            // Handle banner image specifically
            if (data.bannerImage && data.bannerImage.length > 0) {
                formData.append("bannerImage", data.bannerImage[0]);
            }

            // Dispatch create blog action
            const result = await dispatch(
                createBlog({ blog: formData, token })
            );

            if (createBlog.fulfilled.match(result)) {
                toast.success("Blog created successfully!");
                reset();
                setBannerImagePreview(null);
            } else {
                console.error("createBlog rejected:", result);
                toast.error("Failed to create blog");
            }
        } catch (error) {
            console.error("Blog creation error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <h1 className='text-lg font-semibold'>Add a new blog</h1>

                {/* Title */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>Title</label>
                    <input
                        type='text'
                        placeholder='Enter blog title'
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Title must be at least 3 characters",
                            },
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.title && (
                        <p className='text-red-500 text-sm'>
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Category
                    </label>
                    <select
                        {...register("category", {
                            required: "Category is required",
                        })}
                        className='w-full py-2 border border-gray-400 rounded-md focus:outline-none'
                    >
                        <option value=''>Select a category</option>
                        <option value='tech'>Tech</option>
                        <option value='health'>Health</option>
                        <option value='finance'>Finance</option>
                        {/* Add other categories as needed */}
                    </select>
                    {errors.category && (
                        <p className='text-red-500 text-sm'>
                            {errors.category.message}
                        </p>
                    )}
                </div>

                {/* Keywords */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Keywords
                    </label>
                    <input
                        type='text'
                        placeholder='Click the enter button after writing your keyword'
                        {...register("metaKeywords", {
                            required: "Keywords are required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.metaKeywords && (
                        <p className='text-red-500 text-sm'>
                            {errors.metaKeywords.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Content
                    </label>
                    <Controller
                        name='content'
                        control={control}
                        rules={{ required: "Content is required" }}
                        render={({ field: { onChange, value } }) => (
                            <ReactQuill
                                value={value}
                                onChange={onChange}
                                placeholder='Write something...'
                                theme='snow'
                                className='w-full border border-gray-400 rounded-lg focus:outline-none'
                            />
                        )}
                    />
                    {errors.content && (
                        <p className='text-red-500 text-sm'>
                            {errors.content.message}
                        </p>
                    )}
                </div>

                {/* Blog Banner */}
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
                            {...register("bannerImage", {
                                required: "Banner image is required",
                                validate: (value) => {
                                    if (!value || value.length === 0) {
                                        return "Please select an image";
                                    }
                                    return true;
                                },
                            })}
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                            accept='image/*'
                        />
                        <div className='flex flex-col justify-center items-center h-full pointer-events-none'>
                            {bannerImagePreview ? (
                                <img
                                    src={bannerImagePreview}
                                    alt='Banner Preview'
                                    className='max-h-full max-w-full object-cover'
                                />
                            ) : (
                                <span className='text-gray-500 font-medium text-lg'>
                                    2000 x 500
                                </span>
                            )}
                        </div>
                    </div>
                    {errors.bannerImage && (
                        <p className='text-red-500 text-sm'>
                            {errors.bannerImage.message}
                        </p>
                    )}
                </div>

                {/* Meta Description */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Meta Description
                    </label>
                    <input
                        type='text'
                        placeholder='Enter meta description'
                        {...register("metaDescription", {
                            required: "Meta description is required",
                            minLength: {
                                value: 10,
                                message:
                                    "Meta description must be at least 10 characters",
                            },
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.metaDescription && (
                        <p className='text-red-500 text-sm'>
                            {errors.metaDescription.message}
                        </p>
                    )}
                </div>

                <div className='flex justify-end my-6'>
                    <button
                        type='submit'
                        className='Button text-white px-8 py-1 rounded-lg font-semibold'
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </form>
    );
}
