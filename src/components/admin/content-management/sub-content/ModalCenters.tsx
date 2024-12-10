import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { RootState, AppDispatch } from "@/store/store";
import {
    createHelpSupport,
    updateHelpSupport,
} from "@/store/features/admin/helpSlice";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface HelpSupportFormData {
    title: string;
    category: string;
    content: string;
    icon?: FileList;
}

interface ModalCentersProps {
    onClose: () => void;
}

export const ModalCenters: React.FC<ModalCentersProps> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentHelpSupport } = useSelector((state: RootState) => state.help);

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<HelpSupportFormData>({
        defaultValues: {
            title: "",
            category: "",
            content: "",
        },
    });

    const iconField = watch("icon");

    useEffect(() => {
        if (currentHelpSupport) {
            reset({
                title: currentHelpSupport.title || "",
                category: currentHelpSupport.category || "",
                content: currentHelpSupport.content || "",
            });
        }
        console.log("currentHelpSupport:", currentHelpSupport);
    }, [currentHelpSupport, reset]);

    const onSubmit = async (formData: HelpSupportFormData) => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.error("No access token found");
                toast.error("No access token found. Please log in.");
                return;
            }

            console.log("Original formData:", formData);

            // Create a new FormData object to handle file uploads and form data
            const submitData = new FormData();
            submitData.append("title", formData.title.trim());
            submitData.append("category", formData.category.trim());
            submitData.append("content", formData.content.trim());

            // Check if an icon file has been selected and append to the FormData
            if (iconField && iconField instanceof FileList && iconField.length > 0) {
                submitData.append("icon", iconField[0]);
            }

            // Log the FormData contents before submission (for debugging purposes)
            console.log("FormData contents before submission:");
            Array.from(submitData.entries()).forEach(([key, value]) => {
                console.log(`FormData - ${key}:`, value);
            });

            // If there's an existing Help Support (to update), perform update
            if (currentHelpSupport) {
                console.log("Attempting to update Help Support...");
                console.log("Help Support ID:", currentHelpSupport._id);
                console.log("Data being sent to update (FormData):", submitData);

                const result = await dispatch(
                    updateHelpSupport({
                        helpSupportId: currentHelpSupport._id,
                        data: submitData,
                        token,
                    })
                ).unwrap();

                console.log("Update successful:", result);
                toast.success("Help support updated successfully!");
            } else {
                // Otherwise, create a new Help Support
                console.log("Attempting to create new Help Support...");
                console.log("Data being sent to create (FormData):", submitData);

                const result = await dispatch(
                    createHelpSupport({
                        data: submitData,
                        token,
                    })
                ).unwrap();

                console.log("Creation successful:", result);
                toast.success("Help support created successfully!");
            }

            // Close the form/modal after successful submission
            onClose();
        } catch (error) {
            console.error("Form submission failed:", error);
            toast.error("Failed to submit. Please try again.");
        }
    };


    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
            <h1 className="text-lg font-semibold">
                {currentHelpSupport ? "Edit Help Support" : "Create Help Support"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* Title */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Help Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter help title"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">{errors.title.message}</span>
                    )}
                </div>

                {/* Category */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Select Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    >
                        <option value="">Select a category</option>
                        <option value="tech">Tech</option>
                        <option value="support">Support</option>
                        <option value="general">General</option>
                    </select>
                    {errors.category && (
                        <span className="text-red-500 text-sm">{errors.category.message}</span>
                    )}
                </div>

                {/* Content */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Help Details</label>
                    <Controller
                        name="content"
                        control={control}
                        rules={{ required: "Content is required" }}
                        render={({ field: { onChange, value } }) => (
                            <ReactQuill
                                value={value || ''}
                                onChange={onChange}
                                theme="snow"
                                className="w-full border border-gray-400 rounded-lg mt-2"
                            />
                        )}
                    />
                    {errors.content && (
                        <span className="text-red-500 text-sm">{errors.content.message}</span>
                    )}
                </div>

                {/* Icon Upload */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Upload Icon</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("icon")}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 ButtonBlue text-white rounded-md"
                    >
                        {currentHelpSupport ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};
