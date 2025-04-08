import {
    selectOrderIsLoading,
    updateOrder,
    type Order,
} from "@/store/features/profile/orderSlice";
import { AppDispatch } from "@/store/store";
import { getAccessToken } from "@/utils/checkToken";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface ModelRevisionProps {
    orderData: Order;
}

export default function ModelDetails({ orderData }: ModelRevisionProps) {
    const loading = useSelector(selectOrderIsLoading);
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            "briefContent.productServiceName":
                orderData.briefContent.productServiceName || "",
            "briefContent.scenario": orderData.briefContent.scenario || "",
            "briefContent.productServiceDesc":
                orderData.briefContent.productServiceDesc || "",
            "briefContent.caseStudy": orderData.briefContent.caseStudy || "",
        },
    });

    const onSubmit = async (data: any) => {
        const token = getAccessToken();
        if (!token) return;
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
                token,
            })
        ).unwrap();
        toast.success(res.message);
    };

    return (
        <>
            {/* model */}
            <div className='bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6'>
                {/* First Box: Fields and Profile Section */}
                <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                        <div className='col-span-2'>
                            <div className='mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                <label className='block text-gray-700 font-semibold'>
                                    İçerikleriniz
                                </label>
                                <span className='text-gray-900'>
                                    İçerik üreticiler içeriklerinizi
                                    hazırladığında bu sayfada görünecektir.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='bg-white rounded-md mb-6 sm:mb-7 md:mb-8 lg:mb-8'>
                    {orderData.assignedCreators.length > 0 ? (
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
                                <tr>
                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm'>
                                        1
                                    </td>
                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm'>
                                        128510
                                    </td>
                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border'>
                                        <a
                                            className='text-xs lg:text-sm BlueText whitespace-normal lg:whitespace-nowrap'
                                            href='#'
                                        >
                                            http://we.tl/send/
                                        </a>
                                    </td>
                                    <td className='py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm'>
                                        23/09/2024
                                    </td>
                                </tr>
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
                                            We Have Not assigned any creator to
                                            your Order yet.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                <div className='flex flex-col lg:flex-row lg:space-x-28'>
                    <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                        <h3 className='text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                            Sipariş Bilgileri:
                        </h3>
                        <div className='grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                            <div className='text-gray-700'>Sipariş No:</div>
                            <div className='text-right BlueText font-bold'>
                                {orderData._id}
                            </div>
                            <div className='text-gray-700'>Sipariş Tarihi:</div>
                            <div className='text-right BlueText font-bold'>
                                {orderData.createdAt}
                            </div>
                            <div className='text-gray-700'>Sipariş Durumu:</div>
                            <div className='text-right BlueText font-bold'>
                                {orderData.orderStatus}
                            </div>
                            <div className='text-gray-700'>Ödeme No:</div>
                            <div className='text-right BlueText font-bold'>
                                Nil
                            </div>
                            <div className='text-gray-700'>Ödeme Tarihi:</div>
                            <div className='text-right BlueText font-bold'>
                                Nil
                            </div>
                            <div className='text-gray-700'>Fatura:</div>
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

                    <div className='bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8'>
                        <h3 className='text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText'>
                            İçerik Detayı:
                        </h3>
                        <div className='grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4'>
                            <div className='text-gray-700'>
                                Ürün / Hizmet Adı:
                            </div>
                            <div className='text-right BlueText font-bold'>
                                {orderData.briefContent.productServiceName}
                            </div>
                            <div className='text-gray-700'>Marka:</div>
                            <div className='text-right BlueText font-bold'>
                                {orderData.briefContent.brandName}{" "}
                            </div>
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
                                {orderData.additionalServices.edit === true
                                    ? "Yes"
                                    : "No"}
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
                                    ? "Yes"
                                    : "No"}{" "}
                            </div>
                            <div className='text-gray-700'>Kapak Görseli:</div>
                            <div className='text-right BlueText font-bold'>
                                {orderData.additionalServices.coverPicture ===
                                true
                                    ? "Yes"
                                    : "No"}
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
                                    ? "Yes"
                                    : "No"}
                            </div>
                            <div className='text-gray-700'>İçerik Türü:</div>
                            <div className='text-right BlueText font-bold'>
                                Hizmet
                            </div>
                        </div>
                    </div>
                </div>

                {/* video sections */}
                <div className='flex -mt-0 lg:-mt-44'>
                    <div className='bg-white rounded-md w-full lg:w-1/3'>
                        <h2 className='BlueText text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            Sipariş Özeti:
                        </h2>
                        <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3'>
                            <div>
                                <p className='font-semibold'>
                                    {orderData.noOfUgc} Video
                                </p>
                                <p className='text-gray-500'>
                                    3.000 TL / Video
                                </p>
                            </div>
                            <p className='BlueText font-semibold'>
                                {orderData.noOfUgc * 3.0} TL
                            </p>
                        </div>
                        {/* <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3'>
                            <div>
                                <p className='font-semibold'>1 Edit</p>
                                <p className='text-gray-500'>500 TL / Video</p>
                            </div>
                            <p className='BlueText font-semibold'>
                                500 TL
                            </p>
                        </div>
                        <div className='flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-4'>
                            <div>
                                <p className='font-semibold'>1 Kapak Görsel</p>
                                <p className='text-gray-500'>250 TL / Video</p>
                            </div>
                            <p className='BlueText font-semibold'>
                                250 TL
                            </p>
                        </div> */}
                        <div className='flex justify-between text-lg font-bold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                            <p>Toplam</p>
                            <p className='BlueText'>
                                {orderData.totalPrice} TL
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Four InputFields */}
                    <div className='mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6'>
                        {/* Product/Service Name */}
                        <div>
                            <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                                Ürün / Hizmet Adı:
                            </label>
                            <input
                                type='text'
                                placeholder='Ürün / Hizmet Adı'
                                {...register("briefContent.productServiceName")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            />
                        </div>

                        {/* Scenario */}
                        <div>
                            <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                                Senaryo (Opsiyonel):
                            </label>
                            <input
                                type='text'
                                placeholder='Aklınızda bir video kurgusu varsa, çalışılmasını istediğiniz senaryoyu belirtin.'
                                {...register("briefContent.scenario")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            />
                        </div>
                    </div>

                    {/* Third Row - Product/Service Description and Sample Work */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6'>
                        {/* Product/Service Description */}
                        <div>
                            <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                                Brief:
                            </label>
                            <input
                                type='text'
                                placeholder='İçeriğinizde öne çıkarmak istediğiniz özellik, yenilik, kampanya vb. detaylar gibi markayı, ürünü veya hizmeti belirtin.'
                                {...register("briefContent.productServiceDesc")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            />
                        </div>

                        {/* Sample Work */}
                        <div>
                            <label className='block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4'>
                                Örnek Çalışma (Opsiyonel):
                            </label>
                            <input
                                type='text'
                                placeholder='Beğendiğiniz örnek bir çalışmayı veya beğendiğiniz video linkini buraya ekleyin (Örn: https://www.youtube.com/watch?v=5CODGzTDFX8)'
                                {...register("briefContent.caseStudy")}
                                className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            />
                        </div>
                    </div>
                    <div className='flex justify-end mt-5'>
                        <button
                            type='submit'
                            className='px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-1 lg:px-8 lg:py-1 text-sm font-semibold ButtonBlue text-white rounded-lg'
                        >
                            {loading ? "Güncelleniyor..." : "Güncelleme"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
