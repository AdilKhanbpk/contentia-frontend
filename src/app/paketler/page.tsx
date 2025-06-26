"use client"
import React from 'react';
import { FaHardHat, FaTools } from 'react-icons/fa';
import { BiBuilding } from 'react-icons/bi';

const UnderConstruction = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-2xl mx-4">
                <div className="flex justify-center gap-4 mb-6">
                    <FaHardHat className="text-yellow-500 text-5xl animate-bounce" />
                    <BiBuilding className="text-blue-600 text-5xl" />
                    <FaTools className="text-gray-700 text-5xl animate-pulse" />
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Yapım halinde
                </h1>

                <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>

                <p className="text-gray-600 text-lg mb-8">
                    Size muhteşem bir şey sunmak için çok çalışıyoruz. Lütfen kısa süre sonra tekrar kontrol edin!
                </p>

                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-8">
                    <div className="absolute top-0 left-0 h-full bg-yellow-500 animate-progress"
                        style={{ width: '70%' }}></div>
                </div>

                <p className="text-sm text-gray-500">
                    Beklenen tamamlanma: Çok Yakında
                </p>
            </div>

            <style jsx>{`
        @keyframes progress {
          0% { width: 0% }
          100% { width: 70% }
        }
        .animate-progress {
          animation: progress 2s ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default UnderConstruction;