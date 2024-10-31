"use client";
import React, { useState, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor CSS

// Dynamically import the Quill editor to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Abouts() {
  const [aboutSection1, setAboutSection1] = useState<string>("");
  const [aboutTitle1, setAboutTitle1] = useState<string>("");
  const [aboutTitle2, setAboutTitle2] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [buttonUrl, setButtonUrl] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleAboutSection1Change = (value: string) => {
    setAboutSection1(value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28">
      <h1 className="text-lg font-semibold mb-6">About</h1>

      {/* About Section Title - 1 */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">About Section Title - 1</label>
        <input
          type="text"
          placeholder="Hakkımda"
          value={aboutTitle1}
          onChange={(e) => setAboutTitle1(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* About Section - 1 */}
      <div className="mt-4">
        <label className="block text-sm font-semibold">About Section - 1</label>
        <ReactQuill
          value={aboutSection1}
          onChange={handleAboutSection1Change}
          placeholder="Write something..."
          theme="snow"
          className="w-full border border-gray-400 rounded-lg focus:outline-none"
        />
      </div>

      {/* Picture - 1 */}
      <div className="mt-4 w-1/2">
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
          <div className="flex flex-col justify-center items-center h-full pointer-events-none">
            {image ? (
              <span className="text-gray-500 font-medium text-lg">{image.name}</span>
            ) : (
              <span className="text-gray-500 font-medium text-lg">2000 x 500</span>
            )}
          </div>
        </div>
      </div>

      {/* About Section Title - 2 */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">About Section Title - 2</label>
        <input
          type="text"
          placeholder="İletişim"
          value={aboutTitle2}
          onChange={(e) => setAboutTitle2(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* Email */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          placeholder="info@contentia.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* Phone */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">Phone</label>
        <input
          type="text"
          placeholder="0850 302 71 32"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* Address */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">Address</label>
        <input
          type="text"
          placeholder="Maslak Mah. Maslak Meydan SK. Baby Giz Plaza..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* Button URL - 1 */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">Button URL - 1</label>
        <input
          type="url"
          placeholder="www.calendly.com/contentia.io"
          value={buttonUrl}
          onChange={(e) => setButtonUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end my-6">
        <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
          Save
        </button>
      </div>
    </div>
  );
}
