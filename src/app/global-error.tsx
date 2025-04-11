"use client";
import React from "react";

function GlobalError() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <html>
            <head>
                <title>Global Error</title>
            </head>
            <body className='h-screen flex items-center justify-center bg-gray-100'>
                <div className='text-center p-8 rounded-2xl shadow-lg bg-white max-w-md w-full'>
                    <h1 className='text-3xl font-bold text-red-600 mb-4'>
                        Something went wrong
                    </h1>
                    <p className='text-gray-700 mb-6'>
                        We encountered an unexpected error. Please try reloading
                        the page.
                    </p>
                    <button
                        onClick={handleReload}
                        className='bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition'
                    >
                        Reload Page
                    </button>
                </div>
            </body>
        </html>
    );
}

export default GlobalError;
