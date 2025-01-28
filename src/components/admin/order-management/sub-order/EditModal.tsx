// Update the Order interface to include the full Creator type
interface Creator {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profilePic?: string;
    isVerified: string;
    preferences?: {
      contentInformation?: {
        contentType?: string;
        contentFormats?: string[];
        areaOfInterest?: string[];
      };
      socialInformation?: {
        platforms?: {
          [key: string]: {
            followers: number;
            username: string;
          };
        };
      };
    };
  }

interface Order {
    _id: string;
    coupon?: string;
    orderOwner: {
        _id: string;
        fullName: string;
        email: string;
    };
    assignedCreators: string[];
    appliedCreators: Creator[];
    noOfUgc: number;
    totalPrice: number;
    orderStatus: 'pending' | 'active' | 'completed' | 'cancelled' | 'revision';
    paymentStatus: 'paid' | 'pending' | 'refunded' | 'cancelled';
    contentsDelivered?: number;
    additionalServices: {
        platform: string;
        duration: string;
        edit: boolean;
        aspectRatio: string;
        share?: boolean;
        coverPicture?: boolean;
        creatorType?: string;
        productShipping?: boolean;
    };
    preferences?: {
        creatorGender?: string;
        minCreatorAge?: number;
        maxCreatorAge?: number;
        interests?: string[];
        contentType?: string;
        locationAddress?: {
            country?: string;
            city?: string;
            district?: string;
            street?: string;
            fullAddress?: string;
        };
    };
    briefContent?: {
        brandName?: string;
        brief?: string;
        productServiceName?: string;
        productServiceDesc?: string;
        scenario?: string;
        caseStudy?: string;
        uploadFiles?: string;
        uploadFileDate?: string;
    };
    numberOfRequests?: number;
    orderQuota?: number;
    quotaLeft?: number;
    uploadFiles?: Array<{
        uploadedBy: string;
        fileUrls: string[];
        uploadedDate: Date;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}

interface EditModalProps {
    order: Order | null;
}

export default function EditModal({ order }: EditModalProps) {
    console.log("order", order);
    if (!order) return null;
    return (
        <>
            <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
                <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                        <div className="col-span-2">
                            <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                <label className="block text-gray-700 font-semibold">Edit Order</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row ">
                    <div className="flex flex-col lg:flex-row w-full lg:space-x-16">
                        {/* Order Information */}
                        <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8 w-full lg:w-1/2">
                            <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText">
                                Order Information:
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 ">
                                <div className="text-gray-700 whitespace-nowrap mr-6">Customer Name:</div>
                                <div className="text-right BlueText font-bold">Saud Khan</div>
                                <div className="text-gray-700">Customer ID:</div>
                                <div className="text-right BlueText font-bold">149124019</div>
                                <div className="text-gray-700">Order ID:</div>
                                <div className="text-right BlueText font-bold">201240184112</div>
                                <div className="text-gray-700">Order Date:</div>
                                <div className="text-right BlueText font-bold">19/09/2024</div>
                                <div className="text-gray-700">Order Status:</div>
                                <div className="text-right BlueText font-bold">Active</div>
                                <div className="text-gray-700">Payment ID:</div>
                                <div className="text-right BlueText font-bold">9080124</div>
                                <div className="text-gray-700 whitespace-nowrap">Payment Date:</div>
                                <div className="text-right BlueText font-bold">19/09/2024</div>
                                <div className="text-gray-700">Invoice:</div>
                                <div className="text-right BlueText font-bold">
                                    <a href="https://we.tl/send/5323" className="underline">
                                        https://we.tl
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-md w-full lg:w-1/2">
                            <h2 className="text-indigo-600 text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                                Order Summary:
                            </h2>

                            <div className="flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3">
                                <div>
                                    <p className="font-semibold">1 Video</p>
                                    <p className="text-gray-500">3.000 TL / Video</p>
                                </div>
                                <p className="text-indigo-600 font-semibold">3.000 TL</p>
                            </div>

                            <div className="flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3">
                                <div>
                                    <p className="font-semibold">1 Edit</p>
                                    <p className="text-gray-500">500 TL / Video</p>
                                </div>
                                <p className="text-indigo-600 font-semibold">500 TL</p>
                            </div>

                            <div className="flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                                <div>
                                    <p className="font-semibold">1 Cover Picture</p>
                                    <p className="text-gray-500">250 TL / Video</p>
                                </div>
                                <p className="text-indigo-600 font-semibold">250 TL</p>
                            </div>

                            <div className="flex justify-between text-lg font-bold mt-2 sm:mt-3 md:mt-4 lg:mt-4">
                                <p>Total</p>
                                <p className="text-indigo-600">3.750 TL</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 lg:mt-0 bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8 w-full lg:w-1/2">
                    <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText">
                        Order Details:
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                        {/* Product Name */}
                        <div className="text-gray-700">Product Name:</div>
                        <div className="text-right BlueText font-bold">Product A</div>
                        <div className="text-gray-700">Brand:</div>
                        <div className="text-right BlueText font-bold">Brand Name</div>
                        <div className="text-gray-700">Platform:</div>
                        <div className="text-right BlueText font-bold">Meta</div>
                        <div className="text-gray-700">Duration:</div>
                        <div className="text-right BlueText font-bold">15s</div>
                        <div className="text-gray-700">Edit:</div>
                        <div className="text-right BlueText font-bold">Yes</div>
                        <div className="text-gray-700">Aspect Ratio:</div>
                        <div className="text-right BlueText font-bold">9:16</div>
                        <div className="text-gray-700">Share:</div>
                        <div className="text-right BlueText font-bold">No</div>
                        <div className="text-gray-700">Cover Picture:</div>
                        <div className="text-right BlueText font-bold">No</div>
                        <div className="text-gray-700">Creator Type:</div>
                        <div className="text-right BlueText font-bold">Nano</div>
                        <div className="text-gray-700">Product Shipping:</div>
                        <div className="text-right BlueText font-bold">No</div>
                        <div className="text-gray-700">Content Type:</div>
                        <div className="text-right BlueText font-bold">Service</div>
                    </div>
                </div>

                <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                    {/* Product/Service Description */}
                    <div>
                        <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Product / Service Description:</label>
                        <input
                            type="text"
                            placeholder="Product A is a cosmetics product which is used for acne"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                        />
                    </div>

                    {/* Scenario */}
                    <div>
                        <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Scenario:</label>
                        <input
                            type="text"
                            placeholder="I have some skin problems trying to find a solution. I met with Product A and had my skin gradually improved"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                        />
                    </div>
                </div>

                {/* Brief and Examples */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                    <div>
                        <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Brief:</label>
                        <input
                            type="text"
                            placeholder="Acne treatment, Soft and smells good"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                        />
                    </div>

                    {/* Examples */}
                    <div>
                        <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Examples:</label>
                        <input
                            type="text"
                            placeholder="https://www.instagram.com/contentia/reel/CS0CC4XBtFX"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                        />
                    </div>
                </div>
                <div className=" bg-white">
                    <div className="bg-white py-4 sm:py-5 md:py-6 lg:py-6 rounded-md">
                        <h2 className="text-base font-semibold mb-1">Revision Request</h2>
                        <div className=" mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                            <textarea
                                className="w-full p-2 sm:p-3 md:p-4 lg:p-4 border rounded-lg focus:outline-none"
                                rows={4}
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-md mb-6 sm:mb-7 md:mb-8 lg:mb-8">
                    <table className="text-xs lg:text-sm w-auto lg:min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">No</th>
                                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Creator ID</th>
                                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">File URL</th>
                                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Upload Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm">1</td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">125810</td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='text-xs lg:text-sm BlueText whitespace-normal lg:whitespace-nowrap' href="https://we.tl/send/">https://we.tl/send/</a></td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm">23/09/2024</td>
                            </tr>
                            <tr>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm">2</td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">67284</td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='text-xs lg:text-sm BlueText whitespace-normal lg:whitespace-nowrap' href="https://we.tl/send/1241">https://we.tl/send/1241</a></td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm">28/09/2024</td>
                            </tr>
                            <tr>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm">3</td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">95378</td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='text-xs lg:text-sm BlueText whitespace-normal lg:whitespace-nowrap' href="https://we.tl/send/5323">https://we.tl/send/5323</a></td>
                                <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm">30/09/2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end">
                    <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
