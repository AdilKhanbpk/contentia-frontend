"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAboutImage } from "@/store/features/admin/aboutSlice";

interface ImageUploaderProps {
    aboutId: string;
    currentImage?: string | null;
}

export default function ImageUploader({ aboutId, currentImage }: ImageUploaderProps) {
    console.log("aboutId", aboutId);
    console.log("currentImage", currentImage);

    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Log to track state updates
    useEffect(() => {
        console.log("Preview Image updated:", previewImage);
    }, [previewImage]);

    useEffect(() => {
        // If currentImage prop changes, update previewImage
        if (currentImage) {
            setPreviewImage(currentImage);
        }
    }, [currentImage]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                // Type assertion to ensure it's a string
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            console.log("Image Selected:", { fileName: file.name });
        } else {
            console.log("No file selected.");
        }
    };

    const handleImageUpload = () => {
        if (!imageFile) {
            console.log("No image to upload.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.log("No token found.");
            return;
        }

        console.log("Uploading image:", { aboutId, imageFileName: imageFile.name });

        dispatch(updateAboutImage({
            aboutId,
            imageFile,
            token
        }) as any);
    };

    return (
        <div className="mt-4 w-full md:w-1/2">
            <label className="block text-sm font-semibold">Picture - 1</label>
            <div
                className="relative border border-gray-400 rounded-md p-4 text-center bg-gray-200"
                style={{ width: "100%", maxWidth: "500px", height: "300px" }}
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
                    <div className="flex flex-col justify-center items-center h-full pointer-events-none">
                        <span className="text-gray-500 font-medium text-lg">2000 x 500</span>
                    </div>
                )}
            </div>
            {imageFile && (
                <button
                    type="button"
                    onClick={handleImageUpload}
                    className="ButtonBlue text-white px-4 py-1 rounded-lg font-semibold mt-2"
                >
                    Upload Image
                </button>
            )}
        </div>
    );
}
