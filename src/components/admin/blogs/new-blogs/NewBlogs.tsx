"use client";
import React, { useState } from 'react';
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor CSS

// Dynamically import the Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewBlogs() {

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  return (
    <>
      <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
        <h1 className="text-lg font-semibold">Add a new blog</h1>

        {/* Title */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">Category</label>
          <select className="w-full py-2 border border-gray-400 rounded-md focus:outline-none">
            <option value="">Select a category</option>
            <option value="tech">Tech</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            {/* Add other categories as needed */}
          </select>
        </div>

        {/* Keywords */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">Keywords</label>
          <input
            type="text"
            placeholder="Click the enter button after writing your keyword"
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">Description</label>
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write something..."
            theme="snow"
            className="w-full border border-gray-400 rounded-lg focus:outline-none"
          />
        </div>

        {/* Blog Banner */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">Blog Banner</label>
          <div className="relative border border-gray-400 rounded-md p-4 text-center bg-gray-200" style={{ width: '100%', maxWidth: '500px', height: '125px' }}>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
            />
            <div className="flex flex-col justify-center items-center h-full pointer-events-none">
              <span className="text-gray-500 font-medium text-lg">2000 x 500</span>
            </div>
          </div>
        </div>


        {/* Meta Description */}
        <div className="mt-4">
          <label className="block text-sm font-semibold">Meta Description</label>
          <input
            type="text"
            placeholder="Enter meta description"
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
          />
        </div>

        <div className="flex justify-end my-6">
          <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
