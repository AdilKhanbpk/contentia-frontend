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

// Dynamically import ReactQuill to avoid SSR issues
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
        setValue,
    } = useForm<HelpSupportFormData>({
        defaultValues: {
            title: "",
            category: "",
            content: "",
        },
    });

    const watchedFields = watch();

    useEffect(() => {
        console.log("useEffect triggered");
        if (currentHelpSupport) {
            console.log("Editing existing help support:", currentHelpSupport);
            reset({
                title: currentHelpSupport.title,
                category: currentHelpSupport.category,
                content: currentHelpSupport.content,
            });
        } else {
            console.log("Creating new help support, resetting form fields.");
            reset({
                title: "",
                category: "",
                content: "",
            });
        }
    }, [currentHelpSupport, reset]);

    const onSubmit = async (data: HelpSupportFormData) => {
        console.log("Form data submitted:", data);
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No access token found");
            return;
        }
    
        // Create FormData with all fields
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("content", data.content || '');  
    
        // Append icon if present
        if (data.icon && data.icon.length > 0) {
            formData.append("icon", data.icon[0]);
        }
    
        // Log FormData contents to verify
        const formDataEntries = Array.from(formData.entries());
        formDataEntries.forEach(([key, value]) => {
            console.log(`FormData - ${key}:`, value);
        });
    
        try {
            if (currentHelpSupport) {
                await dispatch(
                    updateHelpSupport({
                        helpSupportId: currentHelpSupport._id,
                        data: formData,
                        token,
                    })
                ).unwrap();
            } else {
                await dispatch(
                    createHelpSupport({
                        data: formData,
                        token,
                    })
                ).unwrap();
            }
            onClose();
        } catch (error) {
            console.error("Operation failed:", error);
        }
    };

    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
            <h1 className="text-lg font-semibold">
                {currentHelpSupport ? "Edit Help Support" : "Create Help Support"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Help Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter help title"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                </div>

                {/* Category */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Select Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full py-2 border border-gray-400 rounded-md focus:outline-none"
                    >
                        <option value="">Select a category</option>
                        <option value="tech">Tech</option>
                        <option value="support">Support</option>
                        <option value="general">General</option>
                    </select>
                </div>

                {/* Content */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Help Details</label>
                    <Controller
                        name="content"
                        control={control}
                        rules={{ required: "Content is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                placeholder="Write something..."
                                theme="snow"
                                className="w-full border border-gray-400 rounded-lg mt-2"
                            />
                        )}
                    />
                </div>

                {/* Icon Upload */}
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Upload Icon</label>
                    <input
                        type="file"
                        {...register("icon")}
                        accept="image/*"
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
