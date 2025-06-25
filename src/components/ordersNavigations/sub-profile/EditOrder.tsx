import {
    selectOrderIsLoading,
    updateOrder,
} from "@/store/features/profile/orderSlice";
import { AppDispatch } from "@/store/store";
import { OrderInterface } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaExternalLinkAlt , FaRecycle } from "react-icons/fa";

interface EditOrderProps {
    orderData: OrderInterface;
}

export default function EditOrder({ orderData }: EditOrderProps) {
    const loading = useSelector(selectOrderIsLoading);
    const dispatch = useDispatch<AppDispatch>();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            "briefContent.productServiceName":
                orderData.briefContent?.productServiceName || "",
            "briefContent.scenario": orderData.briefContent?.scenario || "",
            "briefContent.productServiceDesc":
                orderData.briefContent?.productServiceDesc || "",
            "briefContent.caseStudy": orderData.briefContent?.caseStudy || "",
        },
    });

    const onSubmit = async (data: any) => {
        const updatedData = {
            ...orderData,
            briefContent: {
                ...orderData.briefContent,
                ...data.briefContent,
            },
        };

        const res = await dispatch(
            updateOrder({
                orderId: orderData._id,
                data: updatedData,
            })
        ).unwrap();
        toast.success(res.message);
    };

    return (
        <>
            {/* model */}
            <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
                {/* Creator Content Info */}
                <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                        <div className='col-span-2'>
                            <div className='mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                <label className='block text-gray-700 font-semibold'>
                                    İçerikleriniz
                                </label>
                                <span className='text-gray-900 xs:text-sm lg:text-base'>
                                    İçerik üreticiler içeriklerinizi hazırladığında bu
                                    sayfada görünecektir.
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
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Sipariş Notu
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Revision
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData?.uploadFiles?.map((file, index) => (
                                    <tr key={index}>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {index + 1}
                                        </td>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {file.uploadedBy}
                                        </td>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                            {file.fileUrls.map((url, idx) => (
                                                <a
                                                    key={idx}
                                                    href={url}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='text-blue-500 hover:underline text-xs flex items-center gap-3'
                                                >
                                                    <span className='BlueText max-w-[180px]'>
                                                        Folder Link
                                                    </span>
                                                    <FaExternalLinkAlt className='BlueText w-3.5 h-3.5' />
                                                </a>
                                            ))}
                                        </td>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {file.uploadedDate
                                                ? new Date(
                                                      file.uploadedDate
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            {file.creatorNoteOnOrder || "No notes"}
                                        </td>
                                        <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                            <FaRecycle/>
                                        </td>
                                    </tr>
                                ))}
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
                                        İçerik Üretici No
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Bağlantı
                                    </th>
                                    <th className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border'>
                                        Yükleme Tarihi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=''>
                                    <td
                                        colSpan={4}
                                        className='text-center py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm'
                                    >
                                        <p>
                                            Henüz içerik üreticileri tarafından
                                            yüklenmiş bir içerik bulunmamaktadır
                                            .
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Order Information */}
                        <div className='bg-white rounded-md mb-8'>
                            <h3 className='text-lg font-bold mb-4 BlueText'>
                                Sipariş Bilgileri:
                            </h3>
                            <div className='grid grid-cols-2 gap-4'>
                                {/* Order details */}
                                <div className='text-gray-700'>Sipariş No:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData._id}
                                </div>

                                <div className='text-gray-700'>Sipariş Tarihi:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.createdAt
                                        ? new Date(
                                              orderData.createdAt
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </div>

                                <div className='text-gray-700'>Sipariş Durumu:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.orderStatus === "completed"
                                        ? "Tamamlandı"
                                        : orderData.orderStatus === "pending"
                                        ? "Beklemede"
                                        : orderData.orderStatus === "active"
                                        ? "Aktif"
                                        : orderData.orderStatus === "cancelled" ||
                                          orderData.orderStatus === "rejected"
                                        ? "İptal Edildi"
                                        : orderData.orderStatus === "revision"
                                        ? "Revizyon"
                                        : orderData.orderStatus}
                                </div>
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className='bg-white rounded-md mb-8'>
                            <h3 className='text-lg font-bold mb-4 BlueText'>
                                İçerik Detayı:
                            </h3>
                            <div className='grid grid-cols-2 gap-4'>
                                {/* Content details */}
                                <div className='text-gray-700'>Platform:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices.platform}
                                </div>

                                <div className='text-gray-700'>Süre:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices.duration}
                                </div>

                                <div className='text-gray-700'>Edit:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices.edit
                                        ? "Evet"
                                        : "Hayır"}
                                </div>

                                <div className='text-gray-700'>En Boy Oranı:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices.aspectRatio}
                                </div>
                                <div className='text-gray-700'>
                                    Sosyal Medya Paylaşım:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices.share === true
                                        ? "Evet"
                                        : "Hayır"}{" "}
                                </div>
                                <div className='text-gray-700'>Kapak Görseli:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices.coverPicture ===
                                    true
                                        ? "Evet"
                                        : "Hayır"}
                                </div>
                                <div className='text-gray-700'>
                                    Influencer Seçimi:
                                </div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices.creatorType ===
                                    true
                                        ? "Micro"
                                        : "Nano"}
                                </div>
                                <div className='text-gray-700'>Ürün Gönderimi:</div>
                                <div className='text-right BlueText font-bold'>
                                    {orderData.additionalServices
                                        .productShipping === true
                                        ? "Evet"
                                        : "Hayır"}
                                </div>
                                <div className='text-gray-700'>İçerik Türü:</div>
                                <div className='text-right BlueText font-bold'>
                                    Hizmet
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Brief Content Form */}
                    <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-sm font-semibold mb-2'>
                                Ürün / Hizmet Adı:
                            </label>
                            <input
                                type='text'
                                {...register("briefContent.productServiceName")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-semibold mb-2'>
                                Senaryo (Opsiyonel):
                            </label>
                            <input
                                type='text'
                                {...register("briefContent.scenario")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-semibold mb-2'>
                                Brief:
                            </label>
                            <input
                                type='text'
                                {...register("briefContent.productServiceDesc")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-semibold mb-2'>
                                Örnek Çalışma (Opsiyonel):
                            </label>
                            <input
                                type='text'
                                {...register("briefContent.caseStudy")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='px-6 py-2 text-sm font-semibold text-white rounded-lg Button'
                        >
                            {loading ? "Güncelleniyor..." : "Güncelleme"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
