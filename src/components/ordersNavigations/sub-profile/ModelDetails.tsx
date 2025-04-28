import { fetchAdditionalServices } from "@/store/features/admin/addPriceSlice";
import {
    fetchSingleOrderFiles,
    selectCurrentOrderFiles,
} from "@/store/features/admin/fileSlice";
import { RootState } from "@/store/store";
import { CreatorInterface, OrderInterface } from "@/types/interfaces";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ViewOrderDetailsProps {
    orderData: OrderInterface;
}

export default function ViewOrderDetails({ orderData }: ViewOrderDetailsProps) {
    const { data: additionalService } = useSelector(
        (state: RootState) => state.addPrice
    );

    const files = useSelector(selectCurrentOrderFiles);
    console.log("🚀 ~ ViewOrderDetails ~ files:", files);
    const dispatch = useDispatch();
    const quantity = orderData.noOfUgc;
    const basePrice = orderData.basePrice;

    const checkStatus = (status: string) => {
        switch (status) {
            case "pending":
                return "Beklemede";
            case "active":
                return "Aktif";
            case "completed":
                return "Tamamlandı";
            case "cancelled":
                return "İptal Edildi";
            case "revision":
                return "Revizyon";
            default:
                return status;
        }
    };

    useEffect(() => {
        dispatch(fetchAdditionalServices() as any);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSingleOrderFiles({ orderId: orderData._id }) as any).then(
            (response: any) => {
                console.log("Files Response:", response.payload);
            }
        );
    }, [dispatch, orderData._id]);

    return (
        <div className='bg-white xs:p-8'>
            {/* Creator Content Info */}
            <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                    <div className='col-span-2'>
                        <div className='mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <label className='block text-gray-700 font-semibold'>
                                İçerikleriniz
                            </label>
                            <span className='text-gray-900 xs:text-sm lg:text-base'>
                                İçerik üreticiler içeriklerinizi hazırladığında
                                bu sayfada görünecektir.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Table */}
            <div className='bg-white rounded-md mb-6 sm:mb-7 md:mb-8 lg:mb-8'>
                {orderData?.assignedCreators?.length > 0 ? (
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
                            {orderData?.assignedCreators.map(
                                (creator, index) => {
                                    const hasFiles =
                                        orderData.uploadFiles &&
                                        orderData.uploadFiles.length > 0;
                                    return hasFiles ? (
                                        orderData.uploadFiles &&
                                            orderData.uploadFiles.map(
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
                                                        )
                                                    )
                                            )
                                    ) : (
                                        <tr
                                            key={
                                                (creator as CreatorInterface)
                                                    ._id
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
                                        Henüz hiçbir Yaratıcı atanmadı{" "}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            {/* Order and Brief Info */}
            <div className='flex flex-col lg:flex-row lg:space-x-28'>
                <div className='bg-white rounded-md mb-8'>
                    <h3 className='text-lg font-bold mb-4 BlueText'>
                        Sipariş Bilgileri:
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Sipariş No:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData._id}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Sipariş Tarihi:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.createdAt
                                ? new Date(
                                      orderData.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Sipariş Durumu:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.orderStatus}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Ödeme No:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            Nil
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Ödeme Tarihi:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            Nil
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Fatura:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            <a
                                href='https://we.tl/send/5323'
                                className='underline'
                            >
                                Nil
                            </a>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-md mb-8'>
                    <h3 className='text-lg font-bold mb-4 BlueText'>
                        İçerik Detayı:
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Ürün / Hizmet Adı:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.briefContent?.productServiceName}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Marka:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.briefContent?.brandName}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Platform:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.platform}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Süre:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.duration}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Edit:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.edit ? "Yes" : "No"}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            En Boy Oranı:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.aspectRatio}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Sosyal Medya Paylaşım:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.share ? "Yes" : "No"}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Kapak Görseli:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.coverPicture
                                ? "Yes"
                                : "No"}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Influencer Seçimi:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.creatorType
                                ? "Micro"
                                : "Nano"}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Ürün Gönderimi:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.additionalServices.productShipping
                                ? "Yes"
                                : "No"}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            İçerik Türü:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            Hizmet
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className='flex -mt-0 lg:-mt-44'>
                <div className='bg-white rounded-md w-full lg:w-3/6'>
                    <h2 className='BlueText text-lg font-semibold mb-4'>
                        Sipariş Özeti:
                    </h2>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='font-semibold'>{quantity} Videos</p>
                            <p className='text-sm text-gray-500'>
                                {basePrice
                                    ? (basePrice / quantity).toLocaleString(
                                          "tr-TR"
                                      )
                                    : "0"}{" "}
                                TL / Video
                            </p>
                        </div>
                        <p className='font-semibold BlueText'>
                            {basePrice?.toLocaleString("tr-TR") ?? "0"} TL
                        </p>
                    </div>
                    {/* Additional Services */}
                    {orderData?.additionalServices?.duration &&
                        ["30s", "60s"].includes(
                            orderData.additionalServices.duration
                        ) && (
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='font-semibold'>Süre</p>
                                    <p className='text-sm '>
                                        {orderData.additionalServices
                                            .duration === "30s"
                                            ? `${(
                                                  additionalService?.thirtySecondDurationPrice ??
                                                  0
                                              ).toLocaleString(
                                                  "tr-TR"
                                              )} TL / Video`
                                            : orderData.additionalServices
                                                  .duration === "60s"
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
                                    {orderData.additionalServices.duration ===
                                    "30s"
                                        ? `${(
                                              (additionalService?.thirtySecondDurationPrice ??
                                                  0) * quantity
                                          ).toLocaleString("tr-TR")} TL`
                                        : orderData.additionalServices
                                              .duration === "60s"
                                        ? `${(
                                              (additionalService?.sixtySecondDurationPrice ??
                                                  0) * quantity
                                          ).toLocaleString("tr-TR")} TL`
                                        : ""}
                                </p>
                            </div>
                        )}

                    {orderData?.additionalServices?.edit && (
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold'>Düzenleme</p>
                                <p className='text-sm text-gray-500'>
                                    {(
                                        additionalService?.editPrice ?? 0
                                    ).toLocaleString("tr-TR")}{" "}
                                    TL / Video
                                </p>
                            </div>
                            <p className='font-semibold BlueText'>
                                {(
                                    (additionalService?.editPrice ?? 0) *
                                    quantity
                                ).toLocaleString("tr-TR")}{" "}
                                TL
                            </p>
                        </div>
                    )}

                    {orderData?.additionalServices?.share && (
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold'>
                                    Sosyal Medyada Paylaşım
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {(
                                        additionalService?.sharePrice ?? 0
                                    ).toLocaleString("tr-TR")}{" "}
                                    TL / Video
                                </p>
                            </div>
                            <p className='font-semibold BlueText'>
                                {(
                                    (additionalService?.sharePrice ?? 0) *
                                    quantity
                                ).toLocaleString("tr-TR")}{" "}
                                TL
                            </p>
                        </div>
                    )}

                    {orderData?.additionalServices?.coverPicture && (
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold'>Kapak Görseli</p>
                                <p className='text-sm text-gray-500'>
                                    {(
                                        additionalService?.coverPicPrice ?? 0
                                    ).toLocaleString("tr-TR")}{" "}
                                    TL / Video
                                </p>
                            </div>
                            <p className='font-semibold BlueText'>
                                {(
                                    (additionalService?.coverPicPrice ?? 0) *
                                    quantity
                                ).toLocaleString("tr-TR")}{" "}
                                TL
                            </p>
                        </div>
                    )}

                    {orderData?.additionalServices?.creatorType && (
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold'>
                                    Influencer Paketi
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {(
                                        additionalService?.creatorTypePrice ?? 0
                                    ).toLocaleString("tr-TR")}{" "}
                                    TL / Video
                                </p>
                            </div>
                            <p className='font-semibold BlueText'>
                                {(
                                    (additionalService?.creatorTypePrice ?? 0) *
                                    quantity
                                ).toLocaleString("tr-TR")}{" "}
                                TL
                            </p>
                        </div>
                    )}

                    {orderData?.additionalServices?.productShipping && (
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold'>Ürün Gönderimi</p>
                                <p className='text-sm text-gray-500'>
                                    {(
                                        additionalService?.shippingPrice ?? 0
                                    ).toLocaleString("tr-TR")}{" "}
                                    TL / Video
                                </p>
                            </div>
                            <p className='font-semibold BlueText'>
                                {(
                                    (additionalService?.shippingPrice ?? 0) *
                                    quantity
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
                            {orderData?.totalPriceForCustomer?.toLocaleString(
                                "tr-TR"
                            )}{" "}
                            TL
                        </div>
                    </div>
                </div>
            </div>

            {/* Brief Preview Section */}
            <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                    <label className='block text-sm lg:text-base font-semibold mb-1'>
                        Ürün / Hizmet Adı:
                    </label>
                    <p className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.briefContent?.productServiceName}
                    </p>
                </div>
                <div>
                    <label className='block text-sm lg:text-base font-semibold mb-1'>
                        Senaryo (Opsiyonel):
                    </label>
                    <p className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.briefContent?.scenario}
                    </p>
                </div>
                <div>
                    <label className='block text-sm lg:text-base font-semibold mb-1'>
                        Brief:
                    </label>
                    <p className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.briefContent?.productServiceDesc}
                    </p>
                </div>
                <div>
                    <label className='block text-sm lg:text-base font-semibold mb-1'>
                        Örnek Çalışma (Opsiyonel):
                    </label>
                    <p className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.briefContent?.caseStudy}
                    </p>
                </div>
            </div>
            {orderData.creatorNoteOnOrder && (
                <div className='mt-8'>
                    <div>
                        <label className='block text-sm lg:text-base font-semibold mb-1'>
                            Creator Note:
                        </label>
                    </div>
                    <div className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.creatorNoteOnOrder}
                    </div>
                </div>
            )}
        </div>
    );
}
