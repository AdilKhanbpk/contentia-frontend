"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import { TermsInterface } from "@/types/interfaces";
import { createTerm } from "@/store/features/admin/termsSlice";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function CreateTerms({ onClose }: { onClose: () => void }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TermsInterface>();

    const onSubmit = async (data: TermsInterface) => {
        try {
            setIsSubmitting(true);

            // Dispatch create term action
            const result = await dispatch(createTerm({ term: data }));

            if (createTerm.fulfilled.match(result)) {
                toast.success("Term created successfully!");
                reset();
            } else {
                console.error("createTerm rejected:", result);
                toast.error("Failed to create term");
            }
        } catch (error) {
            console.error("Term creation error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col py-10 lg:my-0 px-4 sm:px-6 md:px-12'>
                <h1 className='text-lg font-semibold'>Add a new term</h1>

                {/* Title */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>Title</label>
                    <input
                        type='text'
                        placeholder='Enter term title'
                        {...register("pageTitle", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Title must be at least 3 characters",
                            },
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.pageTitle && (
                        <p className='text-red-500 text-sm'>
                            {errors.pageTitle.message}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Category
                    </label>
                    <select
                        {...register("pageCategory", {
                            required: "Category is required",
                        })}
                        className='w-full py-2 border border-gray-400 rounded-md focus:outline-none'
                    >
                        <option value=''>Select a category</option>
                        <option value='creator'>Creator</option>
                        <option value='customer'>Customer</option>
                    </select>
                    {errors.pageCategory && (
                        <p className='text-red-500 text-sm'>
                            {errors.pageCategory.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Content
                    </label>
                    <Controller
                        name='pageContent'
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
                    {errors.pageContent && (
                        <p className='text-red-500 text-sm'>
                            {errors.pageContent.message}
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
