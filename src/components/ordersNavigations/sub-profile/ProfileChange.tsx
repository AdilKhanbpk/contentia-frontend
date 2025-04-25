"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface LogoUploaderProps {
    currentImage?: string | null;
}

export default function LogoUploader({ currentImage }: LogoUploaderProps) {
    const { register, setValue } = useForm();
    const [previewImage, setPreviewImage] = useState<string | null>(
        currentImage || null
    );

    useEffect(() => {
        if (currentImage) {
            setPreviewImage(currentImage);
        }
    }, [currentImage]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ""; // reset the input value after file is selected

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Optionally, if you want to set the file in the form:
            setValue("profilePic", file); // set form field value for profilePic
        }
    };

    return (
        <div className='w-full'>
            <div
                className='relative rounded-md p-4 text-center'
                style={{ width: "150px" }}
            >
                <label
                    htmlFor='profilePic'
                    className='cursor-pointer block w-full h-full'
                >
                    <input
                        id='profilePic'
                        type='file'
                        accept='image/*'
                        className='hidden'
                        {...register("profilePic")}
                        onChange={handleImageChange}
                    />
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt='Preview'
                            className='w-full h-full object-cover rounded-md'
                        />
                    ) : (
                        <div className='w-28 h-28 bg-gray-300 text-white rounded-full flex items-center justify-center mx-auto'>
                            Profile
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
}
