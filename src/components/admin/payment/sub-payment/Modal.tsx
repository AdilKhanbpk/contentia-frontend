
export default function Modal() {
    return (
        <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">

            <div className="grid grid-cols-1 gap-8">

                {/* Customer Information */}
                <div className="flex flex-col sm:flex-row space-x-9">
                    <h3 className="text-sm whitespace-nowrap font-semibold mb-4">Customer Information:</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between space-x-4">
                            <span className="text-sm whitespace-nowrap  text-gray-600">Creator Name:</span>
                            <span className="text-sm whitespace-nowrap  font-semibold">Saud</span>
                        </div>
                        <div className="flex justify-between space-x-4">
                            <span className="text-sm whitespace-nowrap  text-gray-600">Creator Surname:</span>
                            <span className="text-sm whitespace-nowrap  font-semibold">Khan</span>
                        </div>
                        <div className="flex justify-between space-x-4">
                            <span className="text-sm whitespace-nowrap  text-gray-600">Customer ID:</span>
                            <span className="text-sm whitespace-nowrap  font-semibold">12411591</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-12">

                    {/* Payment Information */}
                    <div className="flex flex-col sm:flex-row  w-full lg:w-1/2 space-x-9 lg:space-x-4">
                        <h3 className="text-sm whitespace-nowrap font-semibold mb-4">Payment Information:</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Payment Type:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">Credit Card</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Order ID:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">201240184112</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Payment ID:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">9080124</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Payment Date:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">19/09/2024</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Amount Paid:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">25.000 TL</span>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Information */}
                    <div className="mt-4 lg:mt-0 flex-col sm:flex-row  w-full lg:w-1/2  space-x-9 lg:space-x-4">
                        <h3 className="text-sm whitespace-nowrap font-semibold mb-4">Invoice Information:</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Invoice Type:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">Individual</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Name</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">Saud Khan</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Identity No:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">4902189275</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-sm whitespace-nowrap  text-gray-600">Invoice Address:</span>
                                <span className="text-sm whitespace-nowrap  font-semibold">Istanbul</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
