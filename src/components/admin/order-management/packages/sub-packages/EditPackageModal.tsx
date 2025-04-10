export default function EditPackage({ currentPackage }: any) {
    console.log(currentPackage);
    return (
        <>
            <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
                {/* Fields and Profile Section */}
                <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                        <div className='col-span-2'>
                            <div className='mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                <label className='block text-gray-700 font-semibold'>
                                    Edit Package
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row '>
                    <div className='flex flex-col lg:flex-row w-full lg:space-x-16'>
                        {/* Order Information */}
                        <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8 w-full lg:w-1/2'>
                            <h3 className='text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                                Package Information:
                            </h3>
                            <div className='grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 '>
                                <div className='text-gray-700 whitespace-nowrap mr-6'>
                                    Customer Name:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    Saud Khan
                                </div>
                                <div className='text-gray-700'>
                                    Customer ID:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    149124019
                                </div>
                                <div className='text-gray-700'>Package ID:</div>
                                <div className='text-right BlueText font-bold'>
                                    201240184112
                                </div>
                                <div className='text-gray-700'>
                                    Package Date:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    19/09/2024
                                </div>
                                <div className='text-gray-700'>
                                    Package Status:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    Active
                                </div>
                                <div className='text-gray-700'>Payment ID:</div>
                                <div className='text-right BlueText font-bold'>
                                    9080124
                                </div>
                                <div className='text-gray-700 whitespace-nowrap'>
                                    Payment Date:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    19/09/2024
                                </div>
                                <div className='text-gray-700'>Invoice:</div>
                                <div className='text-right BlueText font-bold'>
                                    <a
                                        href='https://we.tl/send/5323'
                                        className='underline'
                                    >
                                        https://we.tl
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='bg-white rounded-md w-full lg:w-1/2'>
                            <h2 className='BlueText text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                Order Summary:
                            </h2>

                            <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3'>
                                <div>
                                    <p className='font-semibold'>1 Video</p>
                                    <p className='text-gray-500'>
                                        3.000 TL / Video
                                    </p>
                                </div>
                                <p className='BlueText font-semibold'>
                                    3.000 TL
                                </p>
                            </div>

                            <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3'>
                                <div>
                                    <p className='font-semibold'>1 Edit</p>
                                    <p className='text-gray-500'>
                                        500 TL / Video
                                    </p>
                                </div>
                                <p className='BlueText font-semibold'>500 TL</p>
                            </div>

                            <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-4'>
                                <div>
                                    <p className='font-semibold'>
                                        1 Cover Picture
                                    </p>
                                    <p className='text-gray-500'>
                                        250 TL / Video
                                    </p>
                                </div>
                                <p className='BlueText font-semibold'>250 TL</p>
                            </div>

                            <div className='flex justify-between text-lg font-bold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                                <p>Total</p>
                                <p className='BlueText'>3.750 TL</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-4 lg:mt-0 bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8 w-full lg:w-1/2'>
                    <h3 className='text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                        Package Details:
                    </h3>
                    <div className='grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                        <div className='text-gray-700'>Product Name:</div>
                        <div className='text-right BlueText font-bold'>
                            Product A
                        </div>
                        <div className='text-gray-700'>Brand:</div>
                        <div className='text-right BlueText font-bold'>
                            Brand Name
                        </div>
                        <div className='text-gray-700'>Platform:</div>
                        <div className='text-right BlueText font-bold'>
                            Meta
                        </div>
                        <div className='text-gray-700'>Duration:</div>
                        <div className='text-right BlueText font-bold'>15s</div>
                        <div className='text-gray-700'>Edit:</div>
                        <div className='text-right BlueText font-bold'>Yes</div>
                        <div className='text-gray-700'>Aspect Ratio:</div>
                        <div className='text-right BlueText font-bold'>
                            9:16
                        </div>
                        <div className='text-gray-700'>Share:</div>
                        <div className='text-right BlueText font-bold'>No</div>
                        <div className='text-gray-700'>Cover Picture:</div>
                        <div className='text-right BlueText font-bold'>No</div>
                        <div className='text-gray-700'>Creator Type:</div>
                        <div className='text-right BlueText font-bold'>
                            Nano
                        </div>
                        <div className='text-gray-700'>Product Shipping:</div>
                        <div className='text-right BlueText font-bold'>No</div>
                        <div className='text-gray-700'>Content Type:</div>
                        <div className='text-right BlueText font-bold'>
                            Service
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='bg-white rounded-md mb-6 sm:mb-7 md:mb-8 lg:mb-8'>
                    <h3 className='text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                        Package Orders Created:
                    </h3>
                    <table className='text-xs lg:text-sm w-auto lg:min-w-full bg-white'>
                        <thead>
                            <tr>
                                <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    No
                                </th>
                                <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    Order ID
                                </th>
                                <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    Package Contents Delivered
                                </th>
                                <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    Order Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm'>
                                    1
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                    125810
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    1
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm'>
                                    23/09/2024
                                </td>
                            </tr>
                            <tr>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm'>
                                    2
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                    67284
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    4
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm'>
                                    28/09/2024
                                </td>
                            </tr>
                            <tr>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm'>
                                    3
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                    95378
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                    6
                                </td>
                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm'>
                                    30/09/2024
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-end'>
                    <button className='ButtonBlue text-white px-8 py-1 rounded-lg font-semibold'>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
