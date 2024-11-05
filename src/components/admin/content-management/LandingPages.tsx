"use client";
import React, { useState } from 'react';
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor CSS

// Dynamically import the Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function LandingPages() {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value: any) => {
    setDescription(value);
  };

  return (
    <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
      <h1 className="text-lg font-semibold">Landing Page</h1>

      <div className='flex flex-col md:flex-row md:space-x-8'>
        {/* Carousel Hero Title */}
        <div className="mt-4 w-full md:w-1/2">
          <label className="block text-sm font-semibold">Carousel Hero Title</label>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Gerçek içeriklerle"
              className="w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Static Hero Title */}
        <div className="mt-4 w-full md:w-1/2">
          <label className="block text-sm font-semibold">Static Hero Title</label>
          <input
            type="text"
            placeholder="sosyal medya gücünüzü katlayın"
            className="w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Hero Subtitle */}
      <div className="mt-4">
        <label className="block text-sm font-semibold">Hero Subtitle</label>
        <ReactQuill
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Write something..."
          theme="snow"
          className="w-full border border-gray-400 rounded-lg focus:outline-none"
          modules={{
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link', 'image'],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['clean']
            ]
          }}
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 1</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 2</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 3</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 4</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 5</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 6</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 7</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 8</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 9</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold">
            Upload
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Video 10</label>
        <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
          <input
            type="file"
            accept="video/*"
             className="flex-1 w-full md:w-1/2  bg-gray-100 px-3 py-1 border-none outline-none focus:outline-none"
            style={{ cursor: "pointer" }} // Style to give a pointer cursor on hover
          />
          <button className="ml-4 rounded-lg  px-4 py-1 md:px-2 md:py-1 sm:px-1 sm:py-0.5 ButtonBlue text-white font-semibold ">
            Upload
          </button>
        </div>
      </div>

      <div className="flex justify-end my-12">
        <button className="ButtonBlue text-white px-10 py-1 rounded-lg font-semibold">
          Save
        </button>
      </div>

    </div>
  );
}
