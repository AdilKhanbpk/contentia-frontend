"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
    fetchHowItWorks,
    updateHowItWorks,
    createHowItWorks,
} from "@/store/features/admin/howWorkSlice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

interface FormData {
    howItWorksTitle1: string;
    howItWorksSubtitle1: string;
    steps: {
        title: string;
        description: string;
    }[];
}

export default function HowItWorks() {
    const dispatch = useDispatch();
    const { sections, loading, error } = useSelector(
        (state: RootState) => state.howWork
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            howItWorksTitle1: "",
            howItWorksSubtitle1: "",
            steps: Array(4).fill({ title: "", description: "" }),
        },
    });

    useEffect(() => {
        dispatch(fetchHowItWorks() as any);
    }, [dispatch]);

    useEffect(() => {
        if (sections?.length > 0) {
            const firstSection = sections[0];
            const formattedData = {
                howItWorksTitle1: firstSection.sectionTitle,
                howItWorksSubtitle1: firstSection.sectionDescription,
                steps: firstSection.steps.slice(0, 4).map((step) => ({
                    title: step.title,
                    description: step.description,
                })),
            };
            reset(formattedData);
        } else {
            console.log("No Sections to Populate Form", { sections });
        }
    }, [sections, reset]);

    const onSubmit = (data: FormData) => {
        console.log("Form Data:", data);
        console.log("Sections:", sections);

        // Set submitting state to show loading indicator
        setIsSubmitting(true);

        const formattedData = {
            sectionTitle: data.howItWorksTitle1,
            sectionDescription: data.howItWorksSubtitle1,
            steps: data.steps,
        };

        if (sections?.length > 0) {
            const sectionId = sections[0]._id;
            console.log("Updating section with ID:", sectionId);

            dispatch(
                updateHowItWorks({
                    sectionId,
                    data: formattedData,
                }) as any
            )
            .then((result: any) => {
                console.log("Update result:", result);
                if (result.error) {
                    toast.error(`Update failed: ${result.error.message || 'Unknown error'}`);
                } else {
                    toast.success("How It Works section updated successfully!");
                    // Refresh data
                    dispatch(fetchHowItWorks() as any);
                }
                setIsSubmitting(false);
            })
            .catch((error: any) => {
                console.error("Update error:", error);
                toast.error(`Update failed: ${error.message || 'Unknown error'}`);
                setIsSubmitting(false);
            });
        } else {
            // If no sections exist, create a new one
            console.log("No sections found, creating a new one");
            dispatch(
                createHowItWorks({
                    data: formattedData,
                }) as any
            )
            .then((result: any) => {
                console.log("Create result:", result);
                if (result.error) {
                    toast.error(`Create failed: ${result.error.message || 'Unknown error'}`);
                } else {
                    toast.success("How It Works section created successfully!");
                    // Refresh data
                    dispatch(fetchHowItWorks() as any);
                }
                setIsSubmitting(false);
            })
            .catch((error: any) => {
                console.error("Create error:", error);
                toast.error(`Create failed: ${error.message || 'Unknown error'}`);
                setIsSubmitting(false);
            });
        }
    };

    return (
        <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
            <h2 className='text-lg font-semibold mb-6'>How It Works</h2>

            <form
                onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                })}
            >
                {/* Section Title */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>
                        How It Works Section Title - 1
                    </label>
                    <input
                        type='text'
                        placeholder='Nasıl Çalışır?'
                        {...register("howItWorksTitle1", {
                            required: "Title is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.howItWorksTitle1 && (
                        <span className='text-red-500 text-sm'>
                            {errors.howItWorksTitle1.message}
                        </span>
                    )}
                </div>

                {/* Section Subtitle */}
                <div className='mt-4 w-full md:w-1/2'>
                    <label className='block text-sm font-semibold'>
                        How It Works Section Subtitle - 1
                    </label>
                    <input
                        type='text'
                        placeholder='Tek bir platformda, UGC içeriklerine kolayca erişin'
                        {...register("howItWorksSubtitle1", {
                            required: "Subtitle is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.howItWorksSubtitle1 && (
                        <span className='text-red-500 text-sm'>
                            {errors.howItWorksSubtitle1.message}
                        </span>
                    )}
                </div>

                {/* Steps */}
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className='mt-4 w-full md:w-1/2'
                    >
                        <label className='block text-sm font-semibold'>
                            How It Works Step Title - {index + 1}
                        </label>
                        <input
                            type='text'
                            placeholder={`Step ${index + 1} Title`}
                            {...register(`steps.${index}.title`, {
                                required: "Step title is required",
                            })}
                            className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                        />
                        {errors.steps?.[index]?.title && (
                            <span className='text-red-500 text-sm'>
                                {errors.steps[index].title?.message}
                            </span>
                        )}

                        <label className='block text-sm font-semibold mt-2'>
                            How It Works Step Description - {index + 1}
                        </label>
                        <input
                            type='text'
                            placeholder={`Step ${index + 1} Description`}
                            {...register(`steps.${index}.description`, {
                                required: "Step description is required",
                            })}
                            className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                        />
                        {errors.steps?.[index]?.description && (
                            <span className='text-red-500 text-sm'>
                                {errors.steps[index].description?.message}
                            </span>
                        )}
                    </div>
                ))}

                {/* Save Button */}
                <div className='flex justify-end my-6'>
                    <button
                        type='submit'
                        disabled={isSubmitting || loading}
                        className='Button text-white px-8 py-1 rounded-lg font-semibold'
                    >
                        {isSubmitting || loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>

            {error && <div className='text-red-500 mt-2'>{error}</div>}
        </div>
    );
}
