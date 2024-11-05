import React from "react";

export default function ModalTwo() {
    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
            <div className="grid grid-cols-1 lg:gap-8">
                {/* Creator Information */}
                <div className="flex flex-col sm:flex-row sm:space-x-7">
                    <h3 className="text-sm sm:whitespace-nowrap font-semibold mb-4">Creator Information:</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between space-x-[140px]">
                            <span className="text-sm sm:sm:whitespace-nowrap text-gray-600">Creator Name:</span>
                            <span className="text-sm sm:whitespace-nowrap font-semibold">Mehmed</span>
                        </div>
                        <div className="flex justify-between space-x-[140px]">
                            <span className="text-sm sm:sm:whitespace-nowrap text-gray-600">Creator Surname:</span>
                            <span className="text-sm sm:whitespace-nowrap font-semibold">Celebi</span>
                        </div>
                        <div className="flex justify-between space-x-[140px]">
                            <span className="text-sm sm:whitespace-nowrap text-gray-600">Creator ID:</span>
                            <span className="text-sm sm:whitespace-nowrap font-semibold">12411591</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row xl:space-x-12">
                    {/* Payment Information */}
                    <div className="flex flex-col sm:flex-row  w-full lg:w-1/2 sm:space-x-4">
                        <h3 className="text-sm sm:whitespace-nowrap font-semibold mb-4">Payment Information:</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Bank Account Type:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">Individual</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Name and Surname:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">Mehmed Celebi</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Identity Number:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">5059118275</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">IBAN Number:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">TR 1300 5000 6000 3921 12</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Address:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">Istanbul</span>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Information */}
                    <div className="mt-4 xl:mt-0 flex flex-col sm:flex-row  w-full lg:w-1/2 sm:space-x-4">
                        <h3 className="text-sm sm:whitespace-nowrap font-semibold mb-4">Invoice Information:</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Invoice Status:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">Yes</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Invoice Type:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">Individual</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Name and Surname:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">Mehmed Celebi</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Identity No:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">5059118275</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm sm:whitespace-nowrap text-gray-600">Invoice Address:</span>
                                <span className="text-sm sm:whitespace-nowrap font-semibold">Istanbul</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
