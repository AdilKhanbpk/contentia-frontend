import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createBrand } from "@/store/features/profile/brandSlice";
import { toast } from "react-toastify";

interface BrandFormInputs {
    brandName: string;
    brandCategory: string;
    brandWebsite?: string;
    brandCountry: string;
    brandImage?: File;
}

const ModelBrand: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [loading, setLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BrandFormInputs>();

    const onSubmit: SubmitHandler<BrandFormInputs> = (data) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setLoading(true); // Set loading to true before the dispatch
            dispatch(
                createBrand({
                    data: {
                        brandName: data.brandName,
                        brandCategory: data.brandCategory,
                        brandWebsite: data.brandWebsite,
                        brandCountry: data.brandCountry,
                        brandImage: data.brandImage,
                    },
                    token,
                })
            )
                .unwrap()
                .then(() => {
                    reset();
                    toast.success("Brand created successfully!");
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error(
                        `Failed to create brand: ${
                            error.message || "Unknown error"
                        }`
                    );
                    setLoading(false);
                });
        } else {
            toast.error("No access token found! Please log in again.");
        }
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

                <div className='flex flex-col mb-2'>
                    <label
                        htmlFor='brandName'
                        className='mb-1'
                    >
                        Logo yükle:
                    </label>
                    <input
                        {...register("brandImage")}
                        type='file'
                        className='p-2 border rounded focus:outline-none  w-72 md:w-96'
                        placeholder='Marka Adı'
                    />
                </div>
            </div>

            {/* submit Button */}
            <div className='mt-4'>
                <button
                    type='submit'
                    className='px-4 py-1 ButtonBlue text-white rounded-xl'
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default ModelBrand;
