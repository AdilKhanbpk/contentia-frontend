import { type Order } from "@/store/features/profile/orderSlice";

interface ViewOrderDetailsProps {
    orderData: Order;
}

export default function ViewOrderDetails({ orderData }: ViewOrderDetailsProps) {
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
                {orderData.assignedCreators.length > 0 ? (
                    <table className='text-xs lg:text-sm w-auto lg:min-w-full bg-white'>
                        <thead>
                            <tr>
                                <th className='py-2 px-4 text-start border'>
                                    No
                                </th>
                                <th className='py-2 px-4 text-start border'>
                                    İçerik Üretici No
                                </th>
                                <th className='py-2 px-4 text-start border'>
                                    Bağlantı
                                </th>
                                <th className='py-2 px-4 text-start border'>
                                    Yükleme Tarihi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-2 px-4 border'>1</td>
                                <td className='py-2 px-4 border'>128510</td>
                                <td className='py-2 px-4 border'>
                                    <a
                                        className='BlueText'
                                        href='#'
                                    >
                                        http://we.tl/send/
                                    </a>
                                </td>
                                <td className='py-2 px-4 border'>23/09/2024</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <table className='text-xs lg:text-sm w-auto lg:min-w-full bg-white'>
                        <thead>
                            <tr>
                                <th className='py-2 px-4 text-start border'>
                                    No
                                </th>
                                <th className='py-2 px-4 text-start border'>
                                    İçerik Üretici No
                                </th>
                                <th className='py-2 px-4 text-start border'>
                                    Bağlantı
                                </th>
                                <th className='py-2 px-4 text-start border'>
                                    Yükleme Tarihi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    colSpan={4}
                                    className='text-center py-2 px-4 border'
                                >
                                    We Have Not assigned any creator to your
                                    Order yet.
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
                            {orderData.createdAt}
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
                            {orderData.briefContent.productServiceName}
                        </div>
                        <div className='text-gray-700 text-sm lg:text-base'>
                            Marka:
                        </div>
                        <div className='text-right BlueText font-bold text-sm lg:text-base'>
                            {orderData.briefContent.brandName}
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
                <div className='bg-white rounded-md w-full lg:w-1/3'>
                    <h2 className='BlueText text-lg font-semibold mb-4'>
                        Sipariş Özeti:
                    </h2>
                    <div className='flex justify-between text-sm lg:text-base mb-3'>
                        <div>
                            <p className='font-semibold'>
                                {orderData.noOfUgc} Video
                            </p>
                            <p className='text-gray-500'>3.000 TL / Video</p>
                        </div>
                        <p className='BlueText font-semibold'>
                            {orderData.noOfUgc * 3.0} TL
                        </p>
                    </div>
                    <div className='flex justify-between text-lg font-bold mt-4'>
                        <p>Toplam</p>
                        <p className='BlueText'>
                            {orderData.totalPrice.toLocaleString("tr-TR")} TL
                        </p>
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
                        {orderData.briefContent.productServiceName}
                    </p>
                </div>
                <div>
                    <label className='block text-sm lg:text-base font-semibold mb-1'>
                        Senaryo (Opsiyonel):
                    </label>
                    <p className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.briefContent.scenario}
                    </p>
                </div>
                <div>
                    <label className='block text-sm lg:text-base font-semibold mb-1'>
                        Brief:
                    </label>
                    <p className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.briefContent.productServiceDesc}
                    </p>
                </div>
                <div>
                    <label className='block text-sm lg:text-base font-semibold mb-1'>
                        Örnek Çalışma (Opsiyonel):
                    </label>
                    <p className='border rounded-md p-2 bg-gray-50 text-sm lg:text-base'>
                        {orderData.briefContent.caseStudy}
                    </p>
                </div>
            </div>
        </div>
    );
}
