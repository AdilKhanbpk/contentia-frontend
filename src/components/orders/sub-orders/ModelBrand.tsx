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
    brandImage?: FileList;
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
            setLoading(true);
            const formData: any = new FormData();
            formData.append("brandName", data.brandName);
            formData.append("brandCategory", data.brandCategory);
            formData.append("brandCountry", data.brandCountry);
            if (data.brandWebsite)
                formData.append("brandWebsite", data.brandWebsite);
            if (data.brandImage && data.brandImage.length > 0) {
                formData.append("brandImage", data.brandImage[0]);
            }

            dispatch(createBrand({ data: formData, token }))
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
            className='flex flex-col justify-start items-start px-4 mt-1 mb-4'
        >
            <h1 className='text-md font-semibold mb-4'>Add Brand</h1>

            <div className='w-full flex flex-col'>
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
                    className='p-2 border rounded w-72 md:w-96'
                    placeholder='Marka Adı'
                />
                {errors.brandName && (
                    <p className='text-red-500 text-sm'>
                        {errors.brandName.message}
                    </p>
                )}
            </div>

            <div className='w-full flex flex-col'>
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
                    className='p-2 border rounded w-72 md:w-96'
                    placeholder='Marka Kategorisi'
                />
                {errors.brandCategory && (
                    <p className='text-red-500 text-sm'>
                        {errors.brandCategory.message}
                    </p>
                )}
            </div>

            <div className='w-full flex flex-col'>
                <label
                    htmlFor='brandWebsite'
                    className='mb-1'
                >
                    Marka Websitesi (Opsiyonel):
                </label>
                <input
                    {...register("brandWebsite")}
                    type='url'
                    id='brandWebsite'
                    className='p-2 border rounded w-72 md:w-96'
                    placeholder='Marka Websitesi'
                />
            </div>

            <div className='w-full flex flex-col'>
                <label
                    htmlFor='brandCountry'
                    className='mb-1'
                >
                    Ülke:
                </label>
                <input
                    {...register("brandCountry", {
                        required: "Ülke zorunludur",
                    })}
                    type='text'
                    id='brandCountry'
                    className='p-2 border rounded w-72 md:w-96'
                    placeholder='Ülke'
                />
                {errors.brandCountry && (
                    <p className='text-red-500 text-sm'>
                        {errors.brandCountry.message}
                    </p>
                )}
            </div>

            <div className='w-full flex flex-col'>
                <label
                    htmlFor='brandImage'
                    className='mb-1'
                >
                    Logo Yükle:
                </label>
                <input
                    {...register("brandImage")}
                    type='file'
                    id='brandImage'
                    className='p-2 border rounded w-72 md:w-96'
                />
            </div>

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
