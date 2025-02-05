import { CreatorInterface, OrderInterface } from "@/types/interfaces";

interface EditModalProps {
    order: OrderInterface | null;
}

export default function EditModal({ order }: EditModalProps) {
    console.log("order", order);
    if (!order) return null;
    return (
        <>
            <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
                <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                        <div className='col-span-2'>
                            <div className='mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                <label className='block text-gray-700 font-semibold'>
                                    Edit Order
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row '>
                    <div className='flex flex-col lg:flex-row w-full lg:space-x-16'>
                        {/* Order Information */}
                        <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8 w-full lg:w-2/3'>
                            <h3 className='text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                                Order Information:
                            </h3>
                            <div className='grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4 '>
                                <div className='text-gray-700 whitespace-nowrap mr-6'>
                                    Customer Name:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    {order?.orderOwner?.fullName || "No Name"}
                                </div>
                                <div className='text-gray-700'>
                                    Customer ID:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    {order?.orderOwner?._id}
                                </div>
                                <div className='text-gray-700'>Order ID:</div>
                                <div className='text-right BlueText font-bold'>
                                    {order?._id}
                                </div>
                                <div className='text-gray-700'>Order Date:</div>
                                <div className='text-right BlueText font-bold'>
                                    {order?.createdAt &&
                                        new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                </div>
                                <div className='text-gray-700'>
                                    Order Status:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    {order?.orderStatus}
                                </div>
                                <div className='text-gray-700'>Payment ID:</div>
                                <div className='text-right BlueText font-bold'>
                                    Nil
                                </div>
                                <div className='text-gray-700 whitespace-nowrap'>
                                    Payment Date:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    Nil{" "}
                                </div>
                                <div className='text-gray-700'>Invoice:</div>
                                <div className='text-right BlueText font-bold'>
                                    <a
                                        href='https://we.tl/send/5323'
                                        className='underline'
                                    >
                                        Nil
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='bg-white rounded-md w-full lg:w-1/3'>
                            <h2 className='text-indigo-600 text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                Order Summary:
                            </h2>

                            <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3'>
                                <div>
                                    <p className='font-semibold'>
                                        {order?.noOfUgc} Video
                                    </p>
                                    <p className='text-gray-500'>
                                        3.000 TL / Video
                                    </p>
                                </div>
                                <p className='text-indigo-600 font-semibold'>
                                    {(order?.noOfUgc * 3).toPrecision(5)} TL
                                </p>
                            </div>

                            {/* TODO additional Prices will be added */}

                            {/* <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3'>
                                <div>
                                    <p className='font-semibold'>1 Edit</p>
                                    <p className='text-gray-500'>
                                        500 TL / Video
                                    </p>
                                </div>
                                <p className='text-indigo-600 font-semibold'>
                                    500 TL
                                </p>
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
                                <p className='text-indigo-600 font-semibold'>
                                    250 TL
                                </p>
                            </div> */}

                            <div className='flex justify-between text-lg font-bold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                                <p>Total</p>
                                <p className='text-indigo-600'>
                                    {order?.totalPrice} TL
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-4 lg:mt-0 bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8 w-full lg:w-2/3'>
                    <h3 className='text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                        Order Details:
                    </h3>
                    <div className='grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                        {/* Product Name */}
                        <div className='text-gray-700'>Product Name:</div>
                        <div className='text-right BlueText font-bold'>
                            {order?.briefContent?.productServiceName}
                        </div>
                        <div className='text-gray-700'>Brand:</div>
                        <div className='text-right BlueText font-bold'>
                            {order?.briefContent?.brandName}
                        </div>
                        <div className='text-gray-700'>Platform:</div>
                        <div className='text-right BlueText font-bold'>
                            {order?.additionalServices?.platform}
                        </div>
                        <div className='text-gray-700'>Duration:</div>
                        <div className='text-right BlueText font-bold'>
                            {" "}
                            {order?.additionalServices?.duration}
                        </div>
                        <div className='text-gray-700'>Edit:</div>
                        <div className='text-right BlueText font-bold'>
                            {" "}
                            {order?.additionalServices?.edit === true
                                ? "Yes"
                                : "No"}
                        </div>
                        <div className='text-gray-700'>Aspect Ratio:</div>
                        <div className='text-right BlueText font-bold'>
                            {order?.additionalServices?.aspectRatio}
                        </div>
                        <div className='text-gray-700'>Share:</div>
                        <div className='text-right BlueText font-bold'>
                            {" "}
                            {order?.additionalServices?.share === true
                                ? "Yes"
                                : "No"}
                        </div>
                        <div className='text-gray-700'>Cover Picture:</div>
                        <div className='text-right BlueText font-bold'>
                            {" "}
                            {order?.additionalServices?.coverPicture === true
                                ? "Yes"
                                : "No"}
                        </div>
                        <div className='text-gray-700'>Creator Type:</div>
                        <div className='text-right BlueText font-bold'>
                            {order?.additionalServices?.creatorType === true
                                ? "Micro"
                                : "Nano"}
                        </div>
                        <div className='text-gray-700'>Product Shipping:</div>
                        <div className='text-right BlueText font-bold'>
                            {" "}
                            {order?.additionalServices?.productShipping === true
                                ? "Yes"
                                : "No"}
                        </div>
                        <div className='text-gray-700'>Content Type:</div>
                        <div className='text-right BlueText font-bold'>
                            {order?.preferences?.contentType}
                        </div>
                    </div>
                </div>

                <div className='mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6'>
                    {/* Product/Service Description */}
                    <div>
                        <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            Product / Service Description:
                        </label>
                        <input
                            type='text'
                            placeholder='Product A is a cosmetics product which is used for acne'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            value={order?.briefContent?.productServiceDesc}
                        />
                    </div>

                    {/* Scenario */}
                    <div>
                        <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            Scenario:
                        </label>
                        <input
                            type='text'
                            placeholder='I have some skin problems trying to find a solution. I met with Product A and had my skin gradually improved'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            value={order?.briefContent?.scenario}
                        />
                    </div>
                </div>

                {/* Brief and Examples */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6'>
                    <div>
                        <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            Brief:
                        </label>
                        <input
                            type='text'
                            placeholder='Acne treatment, Soft and smells good'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            value={order?.briefContent?.brief}
                        />
                    </div>

                    {/* Examples */}
                    <div>
                        <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            Examples:
                        </label>
                        <input
                            type='text'
                            placeholder='https://www.instagram.com/contentia/reel/CS0CC4XBtFX'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            value={order?.briefContent?.caseStudy}
                        />
                    </div>
                </div>
                <div className=' bg-white'>
                    <div className='bg-white py-4 sm:py-5 md:py-6 lg:py-6 rounded-md'>
                        <h2 className='text-base font-semibold mb-1'>
                            Revision Request
                        </h2>
                        <div className=' mb-2 sm:mb-3 md:mb-3 lg:mb-4'>
                            <textarea
                                className='w-full p-2 sm:p-3 md:p-4 lg:p-4 border rounded-lg focus:outline-none'
                                rows={4}
                                placeholder='If you have any issues regarding the order feel free to ask us'
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='bg-white rounded-md mb-6 sm:mb-7 md:mb-8 lg:mb-8'>
                    {order?.assignedCreators?.length > 0 ? (
                        <table className='text-xs lg:text-sm w-auto lg:min-w-full bg-white'>
                            <thead>
                                <tr>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        No
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Creator ID
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        File URL
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Upload Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.assignedCreators.map(
                                    (creator, index) => {
                                        const hasFiles =
                                            order.uploadFiles &&
                                            order.uploadFiles.length > 0;
                                        return hasFiles ? (
                                            order.uploadFiles &&
                                                order.uploadFiles.map(
                                                    (file, i) =>
                                                        file.fileUrls.map(
                                                            (f, j) => (
                                                                <tr
                                                                    key={`${
                                                                        (
                                                                            creator as CreatorInterface
                                                                        )._id
                                                                    }-${i}-${j}`}
                                                                >
                                                                    {/* Index Column */}
                                                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                                                        {index +
                                                                            1}
                                                                    </td>

                                                                    {/* Creator ID Column */}
                                                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                                                        {
                                                                            (
                                                                                creator as CreatorInterface
                                                                            )
                                                                                ?._id
                                                                        }
                                                                    </td>

                                                                    {/* File URL Column */}
                                                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                                                        <a
                                                                            className='text-xs lg:text-sm BlueText block whitespace-normal lg:whitespace-nowrap'
                                                                            href={
                                                                                f
                                                                            }
                                                                            target='_blank'
                                                                            rel='noopener noreferrer'
                                                                        >
                                                                            {f}
                                                                        </a>
                                                                    </td>

                                                                    {/* Upload Date Column */}
                                                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm text-gray-600'>
                                                                        {file?.uploadedDate
                                                                            ? new Date(
                                                                                  file.uploadedDate
                                                                              ).toLocaleDateString()
                                                                            : "No Date Available"}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                )
                                        ) : (
                                            <tr
                                                key={
                                                    (
                                                        creator as CreatorInterface
                                                    )._id
                                                }
                                            >
                                                {/* Index Column */}
                                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                                    {index + 1}
                                                </td>

                                                {/* Creator ID Column */}
                                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                                    {
                                                        (
                                                            creator as CreatorInterface
                                                        )?._id
                                                    }
                                                </td>

                                                {/* No Files Uploaded Column */}
                                                <td
                                                    className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm text-center'
                                                    colSpan={2}
                                                >
                                                    No Files Uploaded
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table className='text-xs lg:text-sm w-auto lg:min-w-full bg-white'>
                            <thead>
                                <tr>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        No
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Creator ID
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        File URL
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Upload Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={4}
                                        className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm text-center'
                                    >
                                        <p className='text-xs lg:text-sm'>
                                            No Creators assigned yet
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
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
