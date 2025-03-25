import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { TermsInterface } from "@/types/interfaces";
import { useForm, Controller } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TermEditModelProps {
    termData: TermsInterface;
    onClose: () => void;
    onSubmit: (data: TermsInterface) => void;
}

export function EditTerms({ termData, onClose, onSubmit }: TermEditModelProps) {
    const { register, handleSubmit, setValue, control } =
        useForm<TermsInterface>({
            defaultValues: termData,
        });

    useEffect(() => {
        if (termData) {
            Object.keys(termData).forEach((key) => {
                setValue(
                    key as keyof TermsInterface,
                    termData[key as keyof TermsInterface]
                );
            });
        }
    }, [termData, setValue]);

    const handleDescriptionChange = (value: string) => {
        setValue("pageContent", value);
    };

    const onSubmitForm = (data: TermsInterface) => {
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
                        {...register("pageTitle")}
                        placeholder='Enter blog title'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Category
                    </label>
                    <select
                        {...register("pageCategory")}
                        className='w-full py-2 border border-gray-400 rounded-md focus:outline-none'
                    >
                        <option value=''>Select a category</option>
                        <option value='creator'>Creator</option>
                        <option value='customer'>Customer</option>
                    </select>
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Content
                    </label>
                    <Controller
                        control={control}
                        name='pageContent'
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
                        className='ButtonBlue text-white px-8 py-1 rounded-lg font-semibold'
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
