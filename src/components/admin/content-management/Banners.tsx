"use client";
import React, { useState } from 'react';

export default function Banners() {

  return (
    <>
      <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
        <h1 className="text-lg font-semibold mb-4">Banners</h1>

        <div className='flex flex-col sm:flex-row sm:space-x-8'>
          {/* Blog Banner */}
          <div className="mt-4 w-full sm:w-1/3">
            <label className="block text-sm font-semibold">Mobile App Banner 1</label>
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

          {/* Blog Banner */}
          <div className="mt-4 w-full sm:w-1/3">
            <label className="block text-sm font-semibold">Mobile App Banner 2</label>
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

          {/* Blog Banner */}
          <div className="mt-4 w-full sm:w-1/3">
            <label className="block text-sm font-semibold">Mobile App Banner 3</label>
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
        </div>


        <div className='flex flex-col sm:flex-row sm:space-x-8 my-4'>
          {/* Meta Description */}
          <div className="mt-4 w-full sm:w-1/3">
            <label className="block text-sm font-semibold">Mobile App Banner 1 URL</label>
            <input
              type="text"
              placeholder=""
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>

          {/* Meta Description */}
          <div className="mt-4 w-full sm:w-1/3">
            <label className="block text-sm font-semibold">Mobile App Banner 2 URL</label>
            <input
              type="text"
              placeholder=""
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>

          {/* Meta Description */}
          <div className="mt-4 w-full sm:w-1/3">
            <label className="block text-sm font-semibold">Mobile App Banner 3 URL</label>
            <input
              type="text"
              placeholder=""
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end my-12">
          <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
