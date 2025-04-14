"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { RootState } from "@/store/store";
import {
    createAbout,
    fetchAbout,
    updateAbout,
} from "@/store/features/admin/aboutSlice";
import ImageUploader from "./AboutImageUploader";
import { toast } from "react-toastify";
import { useTokenContext } from "@/context/TokenCheckingContext";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface AboutFormData {
    title: string;
    content: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    buttonUrl: string;
    aboutImage?: string;
}

export default function Abouts() {
    const dispatch = useDispatch();
    const { sections, loading, error } = useSelector(
        (state: RootState) => state.about
    );
    const { token } = useTokenContext();
    if (!token) return null;
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<AboutFormData>({
        defaultValues: {
            title: "",
            content: "",
            contactTitle: "",
            contactEmail: "",
            contactPhone: "",
            contactAddress: "",
            buttonUrl: "",
            aboutImage: "",
        },
    });

    useEffect(() => {
        dispatch(fetchAbout(token) as any)
            .then((action: any) => {
                toast.success("Data fetched successfully!");
            })
            .catch((error: any) => {
                toast.error("Failed to fetch data!");
            });
    }, [dispatch]);

    useEffect(() => {
        if (sections && sections._id) {
            const {
                title,
                content,
                contactTitle,
                contactEmail,
                contactPhone,
                contactAddress,
                buttonUrl,
            } = sections;
            reset({
                title,
                content,
                contactTitle,
                contactEmail,
                contactPhone,
                contactAddress,
                buttonUrl,
            });
        } else {
            console.log("No Sections Found to Populate Form", { sections });
        }
    }, [sections, reset]);

    const onSubmit = (data: AboutFormData) => {
        if (sections) {
            const sectionId = sections._id;

            dispatch(
                updateAbout({
                    aboutId: sectionId!,
                    data,
                    token,
                }) as any
            )
                .then(() => {
                    toast.success("Section updated successfully!");
                })
                .catch((error: any) => {
                    toast.error("Failed to update section!");
                });
        } else {
            dispatch(
                createAbout({
                    data,
                    token,
                }) as any
            )
                .then(() => {
                    toast.success("Section created successfully!");
                })
                .catch((error: any) => {
                    toast.error("Failed to create section!");
                });
        }
    };

    return (
        <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
            <h1 className='text-lg font-semibold mb-6'>About</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* About Section Title - 1 */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>
                        About Section Title - 1
                    </label>
                    <input
                        type='text'
                        placeholder='Hakkımda'
                        {...register("title", {
                            required: "Title is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.title && (
                        <span className='text-red-500 text-sm'>
                            {errors.title.message}
                        </span>
                    )}
                </div>

                {/* About Section - 1 */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        About Section - 1
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
                        <span className='text-red-500 text-sm'>
                            {errors.content.message}
                        </span>
                    )}
                </div>

                {/* Image Uploader Component */}
                {sections && (
                    <ImageUploader
                        aboutId={sections._id!}
                        currentImage={sections.aboutImage}
                    />
                )}

                {/* About Section Title - 2 */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>
                        About Section Title - 2
                    </label>
                    <input
                        type='text'
                        placeholder='İletişim'
                        {...register("contactTitle", {
                            required: "Contact Title is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.contactTitle && (
                        <span className='text-red-500 text-sm'>
                            {errors.contactTitle.message}
                        </span>
                    )}
                </div>

                {/* Email */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>Email</label>
                    <input
                        type='email'
                        placeholder='info@contentia.io'
                        {...register("contactEmail", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.contactEmail && (
                        <span className='text-red-500 text-sm'>
                            {errors.contactEmail.message}
                        </span>
                    )}
                </div>

                {/* Phone */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>Phone</label>
                    <input
                        type='text'
                        placeholder='0850 302 71 32'
                        {...register("contactPhone", {
                            required: "Phone is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.contactPhone && (
                        <span className='text-red-500 text-sm'>
                            {errors.contactPhone.message}
                        </span>
                    )}
                </div>

                {/* Address */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>
                        Address
                    </label>
                    <input
                        type='text'
                        placeholder='Maslak Mah. Maslak Meydan SK. Baby Giz Plaza...'
                        {...register("contactAddress", {
                            required: "Address is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.contactAddress && (
                        <span className='text-red-500 text-sm'>
                            {errors.contactAddress.message}
                        </span>
                    )}
                </div>

                {/* Button URL - 1 */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>
                        Button URL - 1
                    </label>
                    <input
                        type='url'
                        placeholder='www.calendly.com/contentia.io'
                        {...register("buttonUrl", {
                            required: "Button URL is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.buttonUrl && (
                        <span className='text-red-500 text-sm'>
                            {errors.buttonUrl.message}
                        </span>
                    )}
                </div>

                {/* Save Button */}
                <div className='flex justify-end my-6'>
                    <button
                        type='submit'
                        disabled={loading}
                        className='Button text-white px-8 py-1 rounded-lg font-semibold'
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>

            {error && <div className='text-red-500 mt-2'>{error}</div>}
        </div>
    );
}
