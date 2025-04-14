import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Brand, updateBrand } from "@/store/features/profile/brandSlice";
import { toast } from "react-toastify";
import { useTokenContext } from "@/context/TokenCheckingContext";
interface BrandFormInputs {
    brandName: string;
    brandCategory: string;
    brandWebsite?: string;
    brandCountry: string;
    brandImage?: FileList;
}

interface EditBrandProps {
    brand: Brand | null;
}

const EditBrand: React.FC<EditBrandProps> = ({ brand }) => {
    if (!brand) return null;

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<BrandFormInputs>();
    const { token } = useTokenContext();
    if (!token) return null;
    useEffect(() => {
        if (brand) {
            setValue("brandName", brand.brandName);
            setValue("brandCategory", brand.brandCategory);
            setValue("brandWebsite", brand.brandWebsite || "");
            setValue("brandCountry", brand.brandCountry);
        }
    }, [brand, setValue]);

    const onSubmit: SubmitHandler<BrandFormInputs> = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("brandName", data.brandName);
        formData.append("brandCategory", data.brandCategory);
        formData.append("brandCountry", data.brandCountry);

        if (data.brandWebsite) {
            formData.append("brandWebsite", data.brandWebsite.toString());
        }

        if (data.brandImage && data.brandImage.length > 0) {
            formData.append("brandImage", data.brandImage[0]);
        }

        try {
            await dispatch(
                updateBrand({ brandId: brand._id, data: formData, token })
            ).unwrap();
            toast.success("Brand updated successfully!");
            reset();
        } catch (error: any) {
            toast.error(
                `Failed to update brand: ${error.message || "Unknown error"}`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col px-4 mt-1 mb-4'
        >
            <h1 className='text-md font-semibold mb-4'>Edit Brand</h1>

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
                {brand.brandImage && (
                    <div className='mt-2'>
                        <p className='text-sm'>Current Image:</p>
                        <img
                            src={brand.brandImage}
                            alt='Brand Logo'
                            className='w-24 h-24 rounded-md'
                        />
                    </div>
                )}
            </div>

            <div className='mt-4'>
                <button
                    type='submit'
                    className='px-4 py-1 Button text-white rounded-xl'
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
};

export default EditBrand;
