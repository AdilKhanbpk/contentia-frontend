import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createBrand } from "@/store/features/profile/brandSlice";
import { toast } from "react-toastify";
import { useTokenContext } from "@/context/TokenCheckingContext";

interface BrandFormInputs {
    brandName: string;
    brandCategory: string;
    brandWebsite?: string;
    brandCountry: string;
    brandImage?: FileList;
}

const ModelBrand: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { token } = useTokenContext();
    if (!token) return null;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BrandFormInputs>();

    const onSubmit: SubmitHandler<BrandFormInputs> = (data) => {
        const formData: any = new FormData();
        formData.append("brandName", data.brandName);
        formData.append("brandCategory", data.brandCategory);
        formData.append("brandCountry", data.brandCountry);
        if (data.brandWebsite)
            formData.append("brandWebsite", data.brandWebsite);
        if (data.brandImage && data.brandImage.length > 0) {
            formData.append("brandImage", data.brandImage[0]);
        }

        dispatch(
            createBrand({
                data: formData,
                token,
            })
        )
            .unwrap()
            .then(() => {
                reset();
                toast.success("Brand created successfully!");
            })
            .catch((error) => {
                toast.error(
                    `Failed to create brand: ${
                        error.message || "Unknown error"
                    }`
                );
            });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-start items-start lg:space-x-0 px-4 mt-1 mb-4 sm:px-5 sm:mt-2 sm:mb-6 md:p-6 md:mt-2 md:mb-8 lg:px-6 lg:mt-2 lg:mb-0'
        >
            <h1 className='text-md font-semibold mb-4'>Add Brand</h1>

            <div className='w-full mt-4 lg:mt-0 flex flex-col'>
                {/* Marka Adı */}
                <div className='flex flex-col mb-2'>
                    <label
                        htmlFor='brandName'
                        className='mb-1'
                    >
                        Marka Adı:
                    </label>
                    <input
                        {...register("brandName", {
                            required: "Marka Adı zorunludur",
                        })}
                        type='text'
                        id='brandName'
                        className='p-2 border rounded focus:outline-none  w-72 md:w-96'
                        placeholder='Marka Adı'
                    />
                    {errors.brandName && (
                        <p className='text-red-500 text-sm'>
                            {errors.brandName.message}
                        </p>
                    )}
                </div>

                {/* Marka Kategorisi */}
                <div className='flex flex-col mb-2'>
                    <label
                        htmlFor='brandCategory'
                        className='mb-1'
                    >
                        Marka Kategorisi:
                    </label>
                    <input
                        {...register("brandCategory", {
                            required: "Marka Kategorisi zorunludur",
                        })}
                        type='text'
                        id='brandCategory'
                        className='p-2 border rounded focus:outline-none  w-72 md:w-96'
                        placeholder='Marka Kategorisi'
                    />
                    {errors.brandCategory && (
                        <p className='text-red-500 text-sm'>
                            {errors.brandCategory.message}
                        </p>
                    )}
                </div>

                {/* Marka Websitesi (Opsiyonel) */}
                <div className='flex flex-col mb-2'>
                    <label
                        htmlFor='brandWebsite'
                        className='mb-1 whitespace-nowrap'
                    >
                        Marka Websitesi: (Opsiyonel)
                    </label>
                    <input
                        {...register("brandWebsite")}
                        type='url'
                        id='brandWebsite'
                        className='p-2 border rounded focus:outline-none  w-72 md:w-96'
                        placeholder='Marka Websitesi'
                    />
                </div>

                {/* Ülke */}
                <div className='flex flex-col mb-2'>
                    <label
                        htmlFor='country'
                        className='mb-1'
                    >
                        Ülke:
                    </label>
                    <input
                        {...register("brandCountry", {
                            required: "Ülke zorunludur",
                        })}
                        type='text'
                        id='country'
                        className='p-2 border rounded focus:outline-none  w-72 md:w-96'
                        placeholder='Ülke'
                    />
                    {errors.brandCountry && (
                        <p className='text-red-500 text-sm'>
                            {errors.brandCountry.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className='mt-4'>
                <button
                    type='submit'
                    className='px-4 py-1 Button text-white rounded-xl'
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ModelBrand;
