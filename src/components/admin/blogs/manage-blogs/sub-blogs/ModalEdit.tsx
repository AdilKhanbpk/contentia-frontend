import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface BlogData {
    _id: string;
    status: string;
    author: string;
    title: string;
    category: string;
    bannerImage: FileList | null;
    content: string;
    metaDescription: string;
    metaKeywords: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface BlogEditModelProps {
    blogData: BlogData;
    onClose: () => void;
    onSubmit: (data: BlogData) => void;
}

export function ModalEdit({ blogData, onClose, onSubmit }: BlogEditModelProps) {
    const [formData, setFormData] = useState<BlogData>({
        title: '',
        category: '',
        metaDescription: '',
        metaKeywords: [],
        description: ''
    });

    useEffect(() => {
        if (blogData) {
            setFormData({
                ...blogData,
                keywords: blogData.metaKeywords || []
            });
        }
    }, [blogData]);

    const handleDescriptionChange = (value: string) => {
        setFormData(prev => ({ ...prev, description: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'keywords' ? value.split(',').map(k => k.trim()) : value 
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSubmit: BlogData = {
            ...formData,
            metaKeywords: formData.keywords
        };
        onSubmit(dataToSubmit);
        onClose();
    };

    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
            <h1 className="text-lg font-semibold">Update blog</h1>

            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="block text-sm font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter blog title"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-semibold">Category</label>
                    <select 
                        name="category"
                        value={formData.category}
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
                        name="keywords"
                        value={formData.keywords?.join(', ')}
                        onChange={handleInputChange}
                        placeholder="Click the enter button after writing your keyword"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-semibold">Description</label>
                    <ReactQuill
                        value={formData.description}
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
                            name="banner"
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
                        value={formData.metaDescription}
                        onChange={handleInputChange}
                        placeholder="Enter meta description"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="mr-4 px-8 py-1 rounded-lg font-semibold border border-gray-300"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}