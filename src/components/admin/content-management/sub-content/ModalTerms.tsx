import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor CSS

// Dynamically import the Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ModalTerms() {
    const [description, setDescription] = useState("");

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };

    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">

            <div className="flex flex-row space-x-8">
                {/* Title */}
                <div className="mt-4 w-full sm:w-1/2 ">
                    <label className="block text-sm font-semibold">Page Title</label>
                    <input
                        type="text"
                        placeholder="Enter help title"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="mt-4">
                <label className="block text-sm font-semibold">Page Detail</label>
                <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Write something..."
                    theme="snow"
                    className="w-full border border-gray-400 rounded-lg focus:outline-none"
                />
            </div>

            <div className="flex flex-row space-x-8">
                {/* URL */}
                <div className="mt-4 w-full sm:w-1/2 ">
                    <label className="block text-sm font-semibold">URL</label>
                    <input
                        type="text"
                        placeholder="Enter URL"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
                    Save
                </button>
            </div>
        </div>
    );
}
