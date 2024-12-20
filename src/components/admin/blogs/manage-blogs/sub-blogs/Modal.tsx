import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface BlogFormData {
    _id?: string;
    title: string;
    category: string;
    bannerImage: FileList | string;
    content: string;
    metaDescription: string;
    metaKeywords: string[];
    status: string;
    author: string;
}

interface ModalProps {
    onSubmit?: (blogData: BlogFormData) => void;
    onClose: () => void;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Modal({ onSubmit, onClose }: ModalProps) {
    const [blogData, setBlogData] = useState<Partial<BlogFormData>>({
        title: "",
        category: "",
        content: "",
        metaDescription: "",
        metaKeywords: [],
        status: "Draft",
        author: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBlogData(prev => ({
            ...prev,
            [name]: name === 'metaKeywords' ? value.split(',').map(k => k.trim()) : value
        }));
    };

    const handleDescriptionChange = (value: string) => {
        setBlogData(prev => ({
            ...prev,
            content: value
        }));
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setBlogData(prev => ({
                ...prev,
                bannerImage: files
            }));
        }
    };

    const handleSubmit = () => {
        if (!blogData.bannerImage) {
            return;
        }

        const dataToSubmit = {
            ...blogData,
            bannerImage: blogData.bannerImage,
        } as BlogFormData;
        
        if (onSubmit) {
            onSubmit(dataToSubmit);
        }
        onClose();
    };

    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
            <h1 className="text-lg font-semibold">Add a new blog</h1>

            <div className="mt-4">
                <label className="block text-sm font-semibold">Title</label>
                <input
                    type="text"
                    name="title"
                    value={blogData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog title"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold">Category</label>
                <select 
                    name="category"
                    value={blogData.category}
                    onChange={handleInputChange}
                    className="w-full py-2 border border-gray-400 rounded-md focus:outline-none"
                >
                    <option value="">Select a category</option>
                    <option value="tech">Tech</option>
                    <option value="health">Health</option>
                    <option value="finance">Finance</option>
                </select>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold">Keywords</label>
                <input
                    type="text"
                    name="metaKeywords"
                    value={blogData.metaKeywords?.join(', ')}
                    onChange={handleInputChange}
                    placeholder="Click the enter button after writing your keyword"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold">Description</label>
                <ReactQuill
                    value={blogData.content}
                    onChange={handleDescriptionChange}
                    placeholder="Write something..."
                    theme="snow"
                    className="w-full border border-gray-400 rounded-lg focus:outline-none"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold">Blog Banner</label>
                <div className="relative border border-gray-400 rounded-md p-4 text-center bg-gray-200" style={{ width: '100%', maxWidth: '500px', height: '125px' }}>
                    <input
                        type="file"
                        onChange={handleBannerChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                    />
                    <div className="flex flex-col justify-center items-center h-full pointer-events-none">
                        <span className="text-gray-500 font-medium text-lg">2000 x 500</span>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold">Meta Description</label>
                <input
                    type="text"
                    name="metaDescription"
                    value={blogData.metaDescription}
                    onChange={handleInputChange}
                    placeholder="Enter meta description"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                />
            </div>

            <div className="flex justify-end mt-6 space-x-4">
                <button 
                    onClick={onClose}
                    className="px-6 py-1 rounded-lg font-semibold border border-gray-300"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSubmit}
                    className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold"
                >
                    Save
                </button>
            </div>
        </div>
    );
}