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
                    <div className='grid grid-cols-2 gap-8 text-sm'>
                        {/* Left Column - Basic & Additional Services */}
                        <div>
                            {/* Order Basic Details */}
                            <h3 className='text-lg font-bold mb-3 BlueText'>
                                Basic Details
                            </h3>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-gray-700 font-semibold'>
                                    Order ID:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order._id}
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
                            <div className='flex -mt-0 lg:-mt-44'>
                                <div className='bg-white rounded-md w-full lg:w-3/6'>
                                    <h2 className='BlueText text-lg font-semibold mb-4'>
                                    Markalarım Özeti:
                                    </h2>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='font-semibold'>
                                                {quantity} Videos
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

                                    <div className='flex items-center justify-between mt-5'>
                                        <div className='text-gray-700 font-semibold'>
                                            Total Price:
                                        </div>
                                        <div className='text-right font-bold BlueText'>
                                            {order?.totalPriceForCustomer?.toLocaleString(
                                                "tr-TR"
                                            )}{" "}
                                            TL
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Services */}
                            <h3 className='text-lg font-bold mt-6 mb-3 BlueText'>
                                Additional Services
                            </h3>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-gray-700'>Platform:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.platform ||
                                        "Not specified"}
                                </div>

                                <div className='text-gray-700'>Süre:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.duration ||
                                        "Not specified"}
                                </div>

                                <div className='text-gray-700'>Editing:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.edit
                                        ? "Evet"
                                        : "Hayır"}
                                </div>

                                <div className='text-gray-700'>
                                    En Boy Oranı
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.aspectRatio ||
                                        "Not specified"}
                                </div>

                                <div className='text-gray-700'>Shareable:</div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.share
                                        ? "Evet"
                                        : "Hayır"}
                                </div>

                                <div className='text-gray-700'>
                                    Cover Picture:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.coverPicture
                                        ? "Evet"
                                        : "Hayır"}
                                </div>

                                <div className='text-gray-700'>
                                    Creator Type:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.creatorType
                                        ? "Evet"
                                        : "Hayır"}
                                </div>

                                <div className='text-gray-700'>
                                    Product Shipping:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {order.additionalServices?.productShipping
                                        ? "Evet"
                                        : "Hayır"}
                                </div>


                                <div className='text-gray-700'>
                                    Revision Note:
                                </div>
                                <div className='text-right font-bold BlueText'>
                                    {(order.revisions ?? [])[0]?.revisionContent || "Hayır"}
                                </div>

                            </div>
                        </div>

                        {/* Right Column - Brief Content & Preferences */}
                        <div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {order?.assignedCreators.map((creator, index) => {
                                const hasFiles =
                                    order.uploadFiles &&
                                    order.uploadFiles.length > 0;
                                return hasFiles ? (
                                    order.uploadFiles &&
                                        order.uploadFiles.map((file, i) =>
                                            file.fileUrls.map((f, j) => (
                                                <tr
                                                    key={`${
                                                        (
                                                            creator as CreatorInterface
                                                        )._id
                                                    }-${i}-${j}`}
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

                                                    {/* File URL Column */}
                                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                                        <a
                                                            className='text-xs lg:text-sm BlueText block whitespace-normal lg:whitespace-nowrap'
                                                            href={f}
                                                            
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
                                            ))
                                        )
                                ) : (
                                    <tr key={(creator as CreatorInterface)._id}>
                                        {/* Index Column */}
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {index + 1}
                                        </td>

                                        {/* Creator ID Column */}
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {(creator as CreatorInterface)?._id}
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    colSpan={4}
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
