"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeBrandPic } from "@/store/features/profile/brandSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "@/store/store";

interface LogoUploaderProps {
    brandId: string;
    currentImage?: string | null;
}

export default function LogoUploader({
    brandId,
    currentImage,
}: LogoUploaderProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [previewImage, setPreviewImage] = useState<string | null>(
        currentImage || null
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (currentImage) {
            setPreviewImage(currentImage);
        }
    }, [currentImage]);

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) {
            toast.error("No image selected. Please choose an image to upload.");
            return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        try {
            const formData = new FormData();
            formData.append("brandImage", file);
            const result = await dispatch(
                changeBrandPic({
                    brandId,
                    data: formData,
                })
            ).unwrap();
            toast.success("Image uploaded successfully!");
        } catch (error) {
            const errorMessage =
                typeof error === "string"
                    ? error
                    : "Error uploading the image. Please try again.";
            console.error("Toast error message:", errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className='w-full'>
            <div
                className='relative rounded-md p-4 text-center'
                style={{ width: "150px" }}
            >
                <input
                    type='file'
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    accept='image/*'
                    onChange={handleImageChange}
                />
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt='Preview'
                        className='w-full h-full object-cover rounded-md'
                    />
                ) : (
                    <div className='w-28 h-28 Button text-white rounded-full flex items-center justify-center'>
                        Logo
                    </div>
                )}
            </div>
        </div>
    );
}
