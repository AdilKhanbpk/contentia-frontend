"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
    fetchLandingPage,
    updateLandingPage,
    createLandingPage,
} from "@/store/features/admin/lanPageSlice";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/common/RichTextEditor";
import QuillEditorExample from "@/components/examples/QuillEditorExample";

interface FormData {
    carouselHeroTitle: string;
    staticHeroTitle: string;
    heroSubTitle: string;
    videos?: (File | string)[];
}

export default function LandingPages() {
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data } = useSelector((state: RootState) => state.landingPage);

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { /* errors */ },
    } = useForm<FormData>({
        defaultValues: {
            carouselHeroTitle: "",
            staticHeroTitle: "",
            heroSubTitle: "",
            videos: [],
        },
    });

    const fixedId = data?._id || "";

    useEffect(() => {
        dispatch(fetchLandingPage())
            .unwrap()
            .catch((_error) => {
                toast.error("Failed to fetch landing page data.");
            });
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            reset({
                carouselHeroTitle: data.carouselHeroTitle || "",
                staticHeroTitle: data.staticHeroTitle || "",
                heroSubTitle: data.heroSubTitle || "",
                videos: data.videos || [],
            });
        }
    }, [data, reset]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const file = e.target.files?.[0];
        if (file && file.type.includes("video")) {
            const updatedVideos = [...(watch("videos") || [])];
            updatedVideos[index] = file;
            setValue("videos", updatedVideos, { shouldDirty: true });
        }
    };

    const onSubmit = async (formData: FormData) => {
        setIsSubmitting(true);

        const payload = new FormData();
        payload.append("carouselHeroTitle", formData.carouselHeroTitle);
        payload.append("staticHeroTitle", formData.staticHeroTitle);
        payload.append("heroSubTitle", formData.heroSubTitle);

        if (formData.videos) {
            formData.videos.forEach((file, index) => {
                if (file instanceof File) {
                    payload.append(`video${index + 1}`, file); // Use `video1`, `video2`, etc.
                }
            });
        }

        try {
            // Check if we're creating or updating
            if (fixedId) {
                // Update existing landing page
                const resultAction = await dispatch(updateLandingPage({ id: fixedId, data: payload }));

                if (updateLandingPage.fulfilled.match(resultAction)) {
                    toast.success("Landing page updated successfully!");
                } else if (updateLandingPage.rejected.match(resultAction)) {
                    // Get the error message from the payload
                    const errorData = resultAction.payload as any;
                    const errorMessage = typeof errorData === 'object' && errorData !== null
                        ? errorData.message || "Failed to update landing page"
                        : typeof errorData === 'string'
                            ? errorData
                            : "Failed to update landing page";

                    console.error("Update error:", errorData);
                    toast.error(`Error: ${errorMessage}`);
                }
            } else {
                // Create new landing page
                const resultAction = await dispatch(createLandingPage({ data: payload }));

                if (createLandingPage.fulfilled.match(resultAction)) {
                    toast.success("Landing page created successfully!");
                    // Refresh data
                    dispatch(fetchLandingPage());
                } else if (createLandingPage.rejected.match(resultAction)) {
                    // Get the error message from the payload
                    const errorData = resultAction.payload as any;
                    const errorMessage = typeof errorData === 'object' && errorData !== null
                        ? errorData.message || "Failed to create landing page"
                        : typeof errorData === 'string'
                            ? errorData
                            : "Failed to create landing page";

                    console.error("Create error:", errorData);
                    toast.error(`Error: ${errorMessage}`);
                }
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
            <h1 className='text-lg font-semibold'>Landing Page</h1>

            {!fixedId && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-md">
                    {/* <p className="text-blue-700">
                        <strong>Note:</strong> You are creating a new landing page. Fill in the form and click Save to create it.
                    </p> */}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col md:flex-row md:space-x-8'>
                    <div className='mt-4 w-full md:w-1/2'>
                        <label className='block text-sm font-semibold'>
                            Carousel Hero Title
                        </label>
                        <input
                            {...register("carouselHeroTitle")}
                            type='text'
                            placeholder='Enter Carousel Hero Title'
                            className='w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none'
                        />
                    </div>

                    <div className='mt-4 w-full md:w-1/2'>
                        <label className='block text-sm font-semibold'>
                            Static Hero Title
                        </label>
                        <input
                            {...register("staticHeroTitle")}
                            type='text'
                            placeholder='Enter Static Hero Title'
                            className='w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none'
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Hero Subtitle
                    </label>
                    <Controller
                        name='heroSubTitle'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <QuillEditorExample
                                value={value}
                                onChange={(content) => {
                                    onChange(content);
                                    setValue("heroSubTitle", content, {
                                        shouldDirty: true,
                                    });
                                }}
                                placeholder='Write something...'
                                className='w-full border border-gray-400 rounded-lg focus:outline-none'
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, false] }],
                                        [
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                        ],
                                        [
                                            { list: "ordered" },
                                            { list: "bullet" },
                                        ],
                                        ["link", "image"],
                                        [{ align: [] }],
                                        [{ color: [] }, { background: [] }],
                                        ["clean"],
                                    ],
                                }}
                            />
                        )}
                    />
                </div>

                <div className='mt-8'>
                    <h2 className='text-lg font-semibold mb-4'>
                        Video Uploads
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {Array.from({ length: 10 }, (_, index) => (
                            <div
                                key={index}
                                className='flex flex-col items-center border border-gray-300 p-4 rounded-lg shadow-md bg-gray-50'
                            >
                                <label className='block text-sm font-semibold mb-2'>
                                    Video {index + 1}
                                </label>

                                {/* Preview existing video if available */}
                                {data?.videos?.[index] ? (
                                    <video
                                        src={data.videos[index]}
                                        controls
                                        className='w-full h-48 rounded-lg shadow-md mb-2'
                                    />
                                ) : (
                                    <div className='w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500'>
                                        No Video
                                    </div>
                                )}

                                <input
                                    type='file'
                                    onChange={(e) => handleFileChange(e, index)}
                                    className='mt-2 w-full text-sm px-2 py-1 border border-gray-400 rounded-md cursor-pointer bg-white'
                                    accept='video/*'
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex justify-end my-12'>
                    <button
                        type='submit'
                        className='Button text-white px-10 py-1 rounded-lg font-semibold'
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}
