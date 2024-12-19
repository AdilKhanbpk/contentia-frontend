"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeBrandPic } from "@/store/features/profile/brandSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "@/store/store"; // Make sure to import AppDispatch

interface LogoUploaderProps {
    brandId: string; // Changed from aboutId to match the thunk
    currentImage?: string | null;
}

export default function LogoUploader({ brandId, currentImage }: LogoUploaderProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (currentImage) {
            setPreviewImage(currentImage);
        }
    }, [currentImage]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        
        if (!file) {
            toast.error("No image selected. Please choose an image to upload.");
            return;
        }

        // Set the file and preview
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Handle the upload
        const token = localStorage.getItem("accessToken");
        
        if (!token) {
            toast.error("No token found. Please log in to upload the image.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const result = await dispatch(changeBrandPic({
                brandId,
                data: formData,  // Changed to match the thunk payload
                token
            })).unwrap();
            
            toast.success("Image uploaded successfully!");
        } catch (error) {
            toast.error(typeof error === 'string' ? error : "Error uploading the image. Please try again.");
        }
    };

    return (
        <div className="w-full">
            <div
                className="relative rounded-md p-4 text-center"
                style={{ width: "150px"}}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <div className="w-28 h-28 ButtonBlue text-white rounded-full flex items-center justify-center">
                        Logo
                    </div>
                )}
            </div>
        </div>
    );
}