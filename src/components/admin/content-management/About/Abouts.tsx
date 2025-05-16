"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { RootState } from "@/store/store";
import {
    createAbout,
    fetchAbout,
    updateAbout,
    updateAboutImage,
} from "@/store/features/admin/aboutSlice";
import ImageUploader from "./AboutImageUploader";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/common/RichTextEditor";

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
    const [localError, setLocalError] = useState<string | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        const fetchData = async () => {
            try {
                const resultAction = await dispatch(fetchAbout() as any);

                if (fetchAbout.fulfilled.match(resultAction)) {
                    // Only show success toast if we actually got data
                    if (resultAction.payload) {
                        console.log("About data fetched:", resultAction.payload);
                    }
                } else if (fetchAbout.rejected.match(resultAction)) {
                    console.error("Error fetching about data:", resultAction.payload);
                    toast.error("Failed to fetch data!");
                }
            } catch (error) {
                console.error("Error in fetchAbout:", error);
                toast.error("Failed to fetch data!");
            }
        };

        fetchData();
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
                aboutImage
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

            // Set image preview if available
            if (aboutImage) {
                setImagePreview(aboutImage);
            }
        } else {
            console.log("No Sections Found to Populate Form", { sections });
        }
    }, [sections, reset]);

    const onSubmit = async (data: AboutFormData) => {
        try {
            if (sections && sections._id) {
                // UPDATING EXISTING SECTION
                const sectionId = sections._id;
                console.log("Updating about section with ID:", sectionId);

                const resultAction = await dispatch(
                    updateAbout({
                        aboutId: sectionId,
                        data,
                    }) as any
                );

                if (updateAbout.fulfilled.match(resultAction)) {
                    toast.success("Section updated successfully!");

                    // If an image was selected, upload it
                    if (selectedFile) {
                        toast.info("Uploading image...");

                        try {
                            const imageResult = await dispatch(
                                updateAboutImage({
                                    aboutId: sectionId,
                                    imageFile: selectedFile,
                                }) as any
                            );

                            if (updateAboutImage.fulfilled.match(imageResult)) {
                                toast.success("Image uploaded successfully!");
                                setSelectedFile(null); // Clear selected file after successful upload
                            } else if (updateAboutImage.rejected.match(imageResult)) {
                                console.error("Image upload error:", imageResult.payload);
                                const errorMessage = typeof imageResult.payload === 'object' && imageResult.payload !== null
                                    ? (imageResult.payload as any).message || "Unknown error"
                                    : typeof imageResult.payload === 'string'
                                        ? imageResult.payload
                                        : "Error uploading the image. Please try again.";
                                toast.error(errorMessage);
                            }
                        } catch (imageError) {
                            console.error("Error uploading image:", imageError);
                            toast.error("Error uploading the image. The section was saved but the image upload failed.");
                        }
                    }

                    // Refresh data
                    dispatch(fetchAbout() as any);
                } else if (updateAbout.rejected.match(resultAction)) {
                    console.error("Update error:", resultAction.payload);
                    toast.error("Failed to update section: " +
                        (typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : "Please try again"));
                }
            } else {
                // CREATING NEW SECTION
                console.log("Creating new about section");

                // Check if an image is selected
                if (!selectedFile) {
                    toast.error("Please select an image. An image is required to create a new About section.");
                    return;
                }

                // Create the section with the image in a single request
                const resultAction = await dispatch(
                    createAbout({
                        data,
                        imageFile: selectedFile
                    }) as any
                );

                if (createAbout.fulfilled.match(resultAction)) {
                    toast.success("Section created successfully with image!");
                    setSelectedFile(null); // Clear selected file after successful creation
                    setImagePreview(null); // Clear preview

                    // Refresh data
                    dispatch(fetchAbout() as any);
                } else if (createAbout.rejected.match(resultAction)) {
                    console.error("Create error:", resultAction.payload);
                    const errorMessage = typeof resultAction.payload === 'object' && resultAction.payload !== null
                        ? (resultAction.payload as any).message || "Unknown error"
                        : typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : "Failed to create section. Please try again.";
                    toast.error(errorMessage);
                }
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    // Handle any errors that might occur during rendering
    if (error || localError) {
        return (
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading About Section</h2>
                    <p className="text-red-700">{localError || error}</p>
                    <p className="text-red-700 mt-2">
                        There is currently an issue with the backend service. The development team has been notified.
                    </p>
                    <button
                        onClick={() => {
                            setLocalError(null);
                            dispatch(fetchAbout() as any);
                        }}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className="animate-pulse">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
                    <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-40 w-full bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 w-full md:w-1/2 bg-gray-200 rounded mb-4"></div>
                </div>
            </div>
        );
    }

    try {
        return (
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <h1 className='text-lg font-semibold mb-6'>About</h1>

                {/* <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
                    <p className="text-blue-700">
                        <strong>Note:</strong> Image upload is currently disabled due to a backend issue.
                        You can still preview images, but they won't be saved to the server.
                    </p>
                </div> */}

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
                                <RichTextEditor
                                    value={value}
                                    onChange={onChange}
                                    placeholder='Write something...'
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
                    <div className='mt-4 w-full md:w-1/2'>
                        <label className='block text-sm font-semibold'>
                            Picture - 1
                            {!sections?._id && <span className="text-red-500 ml-1">*</span>}
                        </label>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mb-2">
                                <img
                                    src={imagePreview}
                                    alt="About Preview"
                                    className='w-full max-w-[500px] max-h-[300px] object-cover rounded-md border border-gray-400'
                                />
                            </div>
                        )}

                        {/* Upload Area */}
                        <div
                            className='relative border border-gray-400 rounded-md p-4 text-center bg-gray-200'
                            style={{ width: "100%", maxWidth: "500px", height: !imagePreview ? "300px" : "100px" }}
                        >
                            <input
                                type='file'
                                id="about-image-file"
                                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                                accept='image/*'
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        // Validate file size
                                        const isLt2M = file.size / 1024 / 1024 < 2;
                                        if (!isLt2M) {
                                            toast.error("Image must be smaller than 2MB!");
                                            return;
                                        }

                                        // Create a preview URL
                                        const previewUrl = URL.createObjectURL(file);
                                        setImagePreview(previewUrl);
                                        setSelectedFile(file);

                                        toast.info("Image selected. It will be uploaded when you save the form.");
                                    }
                                }}
                            />
                            <div className='flex flex-col justify-center items-center h-full pointer-events-none'>
                                <span className='text-gray-700 font-medium'>
                                    {imagePreview ? 'Change Image' : 'Upload Image'}
                                </span>
                                {!imagePreview && (
                                    <>
                                        <span className='text-gray-500 font-medium text-lg mt-2'>
                                            2000 x 500
                                        </span>
                                        <span className='text-gray-500 mt-2'>
                                            Click to select an image
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Help Text */}
                        <div className="mt-1">
                            {!sections?._id && !selectedFile ? (
                                <p className="text-red-500 text-sm">
                                    An image is required to create a new About section
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    {selectedFile
                                        ? `Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
                                        : "Select an image for the About section. The image will be uploaded when you save the form."}
                                </p>
                            )}
                        </div>
                    </div>

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
                            disabled={loading || (!sections?._id && !selectedFile)}
                            className='Button text-white px-8 py-1 rounded-lg font-semibold'
                        >
                            {loading ? "Saving..." : (sections?._id ? "Update" : "Create")}
                        </button>
                    </div>
                </form>
            </div>
        );
    } catch (err) {
        // If an error occurs during rendering, update the local error state
        console.error("Error rendering About component:", err);
        setLocalError(err instanceof Error ? err.message : "An unknown error occurred");

        // Return a simple error message
        return (
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <h2 className="text-red-800 text-lg font-semibold mb-2">Something went wrong</h2>
                    <p className="text-red-700">An error occurred while rendering the About section.</p>
                    <button
                        onClick={() => {
                            setLocalError(null);
                            dispatch(fetchAbout() as any);
                        }}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
}
