import { useEffect } from "react";
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
import { useTokenContext } from "@/context/TokenCheckingContext";

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
    const { currentHelpSupport } = useSelector(
        (state: RootState) => state.help
    );
    const { token } = useTokenContext();
    if (!token) return null;

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors, isSubmitting },
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
    }, [currentHelpSupport, reset]);

    const onSubmit = async (formData: HelpSupportFormData) => {
        try {
            const submitData = new FormData();
            submitData.append("title", formData.title.trim());
            submitData.append("category", formData.category.trim());
            submitData.append("content", formData.content.trim());
            if (
                iconField &&
                iconField instanceof FileList &&
                iconField.length > 0
            ) {
                submitData.append("icon", iconField[0]);
            }
            if (currentHelpSupport) {
                await dispatch(
                    updateHelpSupport({
                        helpSupportId: currentHelpSupport._id,
                        data: submitData,
                        token,
                    })
                ).unwrap();
                toast.success("Help support updated successfully!");
            } else {
                await dispatch(
                    createHelpSupport({
                        data: submitData,
                        token,
                    })
                ).unwrap();
                toast.success("Help support created successfully!");
            }
            onClose();
        } catch (error) {
            toast.error("Failed to submit. Please try again.");
        }
    };

    return (
        <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
            <h1 className='text-lg font-semibold'>
                {currentHelpSupport
                    ? "Edit Help Support"
                    : "Create Help Support"}
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                encType='multipart/form-data'
            >
                {/* Title */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Help Title
                    </label>
                    <input
                        type='text'
                        {...register("title", {
                            required: "Title is required",
                        })}
                        placeholder='Enter help title'
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                    {errors.title && (
                        <span className='text-red-500 text-sm'>
                            {errors.title.message}
                        </span>
                    )}
                </div>

                {/* Category */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Select Category
                    </label>
                    <select
                        {...register("category", {
                            required: "Category is required",
                        })}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    >
                        <option value=''>Select a category</option>
                        <option value='orders'>Sipariş Oluşturma</option>
                        <option value='contents'>
                            Contentia Nasıl Çalışır?
                        </option>
                        <option value='terms'>Kullanım Koşulları</option>
                        <option value='creators'>İçerik Üreticileri</option>
                    </select>
                    {errors.category && (
                        <span className='text-red-500 text-sm'>
                            {errors.category.message}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Help Details
                    </label>
                    <Controller
                        name='content'
                        control={control}
                        rules={{ required: "Content is required" }}
                        render={({ field: { onChange, value } }) => (
                            <ReactQuill
                                value={value || ""}
                                onChange={onChange}
                                theme='snow'
                                className='w-full border border-gray-400 rounded-lg mt-2'
                            />
                        )}
                    />
                    {errors.content && (
                        <span className='text-red-500 text-sm'>
                            {errors.content.message}
                        </span>
                    )}
                </div>

                {/* Icon Upload */}
                <div className='mt-4'>
                    <label className='block text-sm font-semibold'>
                        Upload Icon
                    </label>
                    <input
                        type='file'
                        accept='image/*'
                        {...register("icon")}
                        className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none'
                    />
                </div>

                {/* Buttons */}
                <div className='mt-4 flex justify-end'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-4 py-2 bg-gray-500 text-white rounded-md mr-2'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 Button text-white rounded-md'
                    >
                        {currentHelpSupport
                            ? isSubmitting
                                ? "Updating..."
                                : "Update"
                            : isSubmitting
                            ? "Creating..."
                            : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};
