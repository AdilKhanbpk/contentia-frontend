import { fetchAdditionalServices } from "@/store/features/admin/addPriceSlice";
import { RootState } from "@/store/store";
import { CreatorInterface, OrderInterface } from "@/types/interfaces";
import { checkStatus } from "@/utils/CheckOrderStatus";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ViewModalProps {
    order: OrderInterface | null; 
}

const ViewModal = ({ order }: ViewModalProps) => {
    if (!order) return null;

    const { data: additionalService } = useSelector(
        (state: RootState) => state.addPrice
    );
    const dispatch = useDispatch();
    const quantity = order.noOfUgc;
    const basePrice = order.basePrice;

    useEffect(() => {
        dispatch(fetchAdditionalServices() as any);
    }, [dispatch]);

    return (
        <>
            <div className='flex justify-center items-center'>
                <div className='bg-white rounded-lg p-6 w-full max-w-4xl '>
                    <h2 className='text-lg font-bold mb-4 BlueText'>
                        Order Details
                    </h2>

                    {/* Two-column Layout */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm'>
                        {/* Left Column - Basic & Additional Services */}
                        <div className='space-y-6'>
                            {/* Order Basic Details */}
                            <h3 className='text-lg font-bold mb-3 BlueText'>
                                Basic Details
                            </h3>
                            <div className='grid grid-cols-2 gap-4 mb-4'>
                                <div className='text-gray-700 font-semibold'>
                                    Order ID:
                                </div>
                                <div className='text-right font-bold BlueText break-all'>
                                    {order.orderId || order._id}
                                </div>

                                <div className='text-gray-700 font-semibold'>
                                    Order Owner:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.orderOwner.fullName}
                                </div>

                                <div className='text-gray-700 font-semibold'>
                                    Assigned Creators:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.assignedCreators.length}
                                </div>

                                <div className='text-gray-700 font-semibold'>
                                    Order Status:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {checkStatus(order.orderStatus)}
                                </div>

                                <div className='text-gray-700 font-semibold'>
                                    Payment Status:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.paymentStatus}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className='mt-6'>
                                <div className='bg-white rounded-md w-full'>
                                    <h2 className='BlueText text-lg font-semibold mb-4'>
                                        Markalarım Özeti:
                                    </h2>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='font-semibold'>
                                                {quantity} Videos ({order.additionalServices?.platform || "Platform belirtilmemiş"})
                                            </p>
                                            <p className='text-sm text-gray-500'>
                                                {basePrice
                                                    ? (
                                                          basePrice / quantity
                                                      ).toLocaleString("tr-TR")
                                                    : "0"}{" "}
                                                TL / Video
                                            </p>
                                        </div>
                                        <p className='font-semibold BlueText'>
                                            {basePrice?.toLocaleString(
                                                "tr-TR"
                                            ) ?? "0"}{" "}
                                            TL
                                        </p>
                                    </div>
                                    {/* Additional Services */}
                                    {order?.additionalServices?.duration &&
                                        ["30s", "60s"].includes(
                                            order.additionalServices.duration
                                        ) && (
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <p className='font-semibold'>
                                                        Süre
                                                    </p>
                                                    <p className='text-sm '>
                                                        {order
                                                            .additionalServices
                                                            .duration === "30s"
                                                            ? `${(
                                                                  additionalService?.thirtySecondDurationPrice ??
                                                                  0
                                                              ).toLocaleString(
                                                                  "tr-TR"
                                                              )} TL / Video`
                                                            : order
                                                                  .additionalServices
                                                                  .duration ===
                                                              "60s"
                                                            ? `${(
                                                                  additionalService?.sixtySecondDurationPrice ??
                                                                  0
                                                              ).toLocaleString(
                                                                  "tr-TR"
                                                              )} TL / Video`
                                                            : ""}
                                                    </p>
                                                </div>
                                                <p className='font-semibold BlueText'>
                                                    {order.additionalServices
                                                        .duration === "30s"
                                                        ? `${(
                                                              (additionalService?.thirtySecondDurationPrice ??
                                                                  0) * quantity
                                                          ).toLocaleString(
                                                              "tr-TR"
                                                          )} TL`
                                                        : order
                                                              .additionalServices
                                                              .duration ===
                                                          "60s"
                                                        ? `${(
                                                              (additionalService?.sixtySecondDurationPrice ??
                                                                  0) * quantity
                                                          ).toLocaleString(
                                                              "tr-TR"
                                                          )} TL`
                                                        : ""}
                                                </p>
                                            </div>
                                        )}

                                    {order?.additionalServices?.edit && (
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='font-semibold'>
                                                    Düzenleme
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {(
                                                        additionalService?.editPrice ??
                                                        0
                                                    ).toLocaleString(
                                                        "tr-TR"
                                                    )}{" "}
                                                    TL / Video
                                                </p>
                                            </div>
                                            <p className='font-semibold BlueText'>
                                                {(
                                                    (additionalService?.editPrice ??
                                                        0) * quantity
                                                ).toLocaleString("tr-TR")}{" "}
                                                TL
                                            </p>
                                        </div>
                                    )}

                                    {order?.additionalServices?.share && (
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='font-semibold'>
                                                    Sosyal Medyada Paylaşım
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {(
                                                        additionalService?.sharePrice ??
                                                        0
                                                    ).toLocaleString(
                                                        "tr-TR"
                                                    )}{" "}
                                                    TL / Video
                                                </p>
                                            </div>
                                            <p className='font-semibold BlueText'>
                                                {(
                                                    (additionalService?.sharePrice ??
                                                        0) * quantity
                                                ).toLocaleString("tr-TR")}{" "}
                                                TL
                                            </p>
                                        </div>
                                    )}

                                    {order?.additionalServices
                                        ?.coverPicture && (
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='font-semibold'>
                                                    Kapak Görseli
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {(
                                                        additionalService?.coverPicPrice ??
                                                        0
                                                    ).toLocaleString(
                                                        "tr-TR"
                                                    )}{" "}
                                                    TL / Video
                                                </p>
                                            </div>
                                            <p className='font-semibold BlueText'>
                                                {(
                                                    (additionalService?.coverPicPrice ??
                                                        0) * quantity
                                                ).toLocaleString("tr-TR")}{" "}
                                                TL
                                            </p>
                                        </div>
                                    )}

                                    {order?.additionalServices?.creatorType && (
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='font-semibold'>
                                                    Influencer Paketi
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {(
                                                        additionalService?.creatorTypePrice ??
                                                        0
                                                    ).toLocaleString(
                                                        "tr-TR"
                                                    )}{" "}
                                                    TL / Video
                                                </p>
                                            </div>
                                            <p className='font-semibold BlueText'>
                                                {(
                                                    (additionalService?.creatorTypePrice ??
                                                        0) * quantity
                                                ).toLocaleString("tr-TR")}{" "}
                                                TL
                                            </p>
                                        </div>
                                    )}

                                    {order?.additionalServices
                                        ?.productShipping && (
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='font-semibold'>
                                                    Ürün Gönderimi
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {(
                                                        additionalService?.shippingPrice ??
                                                        0
                                                    ).toLocaleString(
                                                        "tr-TR"
                                                    )}{" "}
                                                    TL / Video
                                                </p>
                                            </div>
                                            <p className='font-semibold BlueText'>
                                                {(
                                                    (additionalService?.shippingPrice ??
                                                        0) * quantity
                                                ).toLocaleString("tr-TR")}{" "}
                                                TL
                                            </p>
                                        </div>
                                    )}

                                    <hr className='my-4 border-gray-200' />
                                    <div className='flex items-center justify-between'>
                                        <div className='text-gray-700 font-semibold text-lg'>
                                            Total Price:
                                        </div>
                                        <div className='text-right font-bold BlueText text-lg'>
                                            {order?.totalPriceForCustomer?.toLocaleString(
                                                "tr-TR"
                                            )}{" "}
                                            TL
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Services Summary */}
                            <h3 className='text-lg font-bold mt-6 mb-3 BlueText'>
                                Additional Services
                            </h3>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-gray-700'>Süre:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.duration ||
                                        "15s (Standart)"}
                                </div>

                                <div className='text-gray-700'>
                                    En Boy Oranı:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.aspectRatio ||
                                        "Not specified"}
                                </div>

                                <div className='text-gray-700'>
                                    Revision Note:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {(order.revisions ?? [])[0]?.revisionContent || "Yok"}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Brief Content & Preferences */}
                        <div className='space-y-6'>
                            {/* Brief Content Details */}
                            <h3 className='text-lg font-bold mb-3 BlueText'>
                                Brief Content
                            </h3>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-gray-700'>Brand Name:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.briefContent?.brandName ||
                                        "Not specified"}
                                </div>
                                <div>
                                    <div className='text-gray-700'>Brief:</div>
                                    <div className='w-[350px]'>
                                        <p className='w-full font-bold BlueText'>
                                            {order.briefContent?.brief ||
                                                "Not specified"}
                                        </p>
                                    </div>
                                </div>
                                <div></div>
                                <div className='text-gray-700'>
                                    Product/Service Name:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.briefContent?.productServiceName ||
                                        "Not specified"}
                                </div>
                                <div>
                                    <div className='text-gray-700'>
                                        Product/Service Description:
                                    </div>
                                    <div className='w-[350px]'>
                                        <p className='w-full font-bold BlueText'>
                                            {order.briefContent
                                                ?.productServiceDesc ||
                                                "Not specified"}
                                        </p>
                                    </div>
                                </div>
                                <div></div>

                                <div>
                                    <div className='text-gray-700'>
                                        Scenario:
                                    </div>
                                    <div className='w-[350px]'>
                                        <p className='w-full font-bold BlueText'>
                                            {order.briefContent?.scenario ||
                                                "Not specified"}
                                        </p>
                                    </div>
                                </div>
                                <div></div>

                                <div className='text-gray-700'>Case Study:</div>
                                <div className='w-[350px]'>
                                    <p className='w-full font-bold BlueText'>
                                        {order.briefContent?.caseStudy ||
                                            "Not specified"}
                                    </p>
                                </div>
                            </div>

                            {/* Preferences */}
                            <h3 className='text-lg font-bold mt-6 mb-3 BlueText'>
                                Preferences
                            </h3>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-gray-700'>
                                    Content Type:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.preferences?.contentType ||
                                        "Not specified"}
                                </div>

                                <div className='text-gray-700'>Gender:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.preferences?.creatorGender ||
                                        "Not specified"}
                                </div>

                                <div className='text-gray-700'>Age Range:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.preferences?.minCreatorAge} -{" "}
                                    {order.preferences?.maxCreatorAge} years
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className='bg-white my-8 px-4 sm:px-6 md:px-12'>
                <h2 className='text-lg font-bold mb-4 BlueText'>
                    Order Files Information
                </h2>
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
                                <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    Sipariş Notu
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.assignedCreators.map((creator, index) => {
                                // Filter files for current creator
                                const creatorFiles = order.uploadFiles?.filter(
                                    file => file.uploadedBy === (creator as CreatorInterface)._id
                                );

                                return creatorFiles && creatorFiles.length > 0 ? (
                                    creatorFiles.map((file, fileIndex) =>
                                        file.fileUrls.map((f, urlIndex) => (
                                            <tr key={`${(creator as CreatorInterface)._id}-${fileIndex}-${urlIndex}`}>
                                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                                    {index + 1}
                                                </td>
                                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                                    {(creator as CreatorInterface)?._id}
                                                </td>
                                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                                    <a
                                                        className='text-xs lg:text-sm BlueText flex items-center gap-2'
                                                        href={f}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        <span className="max-w-[200px] truncate">
                                                            {f.split('/').pop() || f}
                                                        </span>
                                                        <svg 
                                                            className="w-3 h-3 flex-shrink-0" 
                                                            fill="currentColor" 
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                        </svg>
                                                    </a>
                                                </td>
                                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm text-gray-600'>
                                                    {file?.uploadedDate
                                                        ? new Date(file.uploadedDate).toLocaleDateString()
                                                        : "No Date Available"}
                                                </td>
                                                <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                                    {file.creatorNoteOnOrder || "No Notes"}
                                                </td>
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    <tr key={`${(creator as CreatorInterface)._id}-no-files`}>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {index + 1}
                                        </td>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {(creator as CreatorInterface)?._id}
                                        </td>
                                        <td colSpan={3} className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-center'>
                                            No Files Uploaded
                                        </td>
                                    </tr>
                                );
                            })}
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
                                <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                    Sipariş Notu
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    colSpan={5}
                                    className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm text-center'
                                >
                                    <p className='text-xs lg:text-sm'>
                                        Henüz hiçbir Yaratıcı atanmadı{" "}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default ViewModal;
