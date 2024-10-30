import React from "react";

export default function ModalTwo() {
    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
            <h1 className="text-lg font-semibold">View Claim</h1>

            {/* three InputFields */}
            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                {/* Product/Service Description */}
                <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Customer Name</label>
                    <p className="mt-3">Saud Khan</p>
                </div>

                {/* Scenario */}
                <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Customer ID</label>
                    <p className="mt-3">901306</p>
                </div>
            </div>

            {/* Third Row - Brief and Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                {/* Brief */}
                <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Order ID</label>
                    <p className="mt-3">2904875686</p>
                </div>

                 {/* Brief */}
                 <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">21/10/2024</label>
                    <p className="mt-3">Saud Khan</p>
                </div>

            </div>

            <div className=" bg-white">
                <div className="bg-white py-4 sm:py-5 md:py-6 lg:py-6 rounded-md">
                    <h2 className="text-base font-semibold mb-1">Claim</h2>


                    <div className=" mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                        <textarea
                            className="w-full p-2 sm:p-3 md:p-4 lg:p-4 border border-gray-400  rounded-lg focus:outline-none"
                            rows={3}
                            cols={60}
                            placeholder=""
                        />
                    </div>


                </div>
            </div>

            <div className="flex justify-end">
                <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
                    Save
                </button>
            </div>

        </div>
    );
}
