import { fetchAdditionalServices } from "@/store/features/admin/addPriceSlice";
import { RootState } from "@/store/store";
import { CreatorInterface, OrderInterface } from "@/types/interfaces"; // Import from central file
import { checkStatus } from "@/utils/CheckOrderStatus";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "@/store/axiosInstance";

interface FileInfo {
  fileUrls: string[];
  uploadedBy: string;
  uploadedDate: string;
  creatorNoteOnOrder?: string;
}

interface UploadFile {
  fileUrls: string[];
  uploadedBy: string;
  uploadedDate: string;
  creatorNoteOnOrder?: string;
}

interface AdditionalServices {
  platform: string;
  duration: string;
  edit: boolean;
  aspectRatio: string;
  share: boolean;
  coverPicture: boolean;
  creatorType: boolean;
  productShipping: boolean;
}

interface BriefContent {
  productServiceName: string;
  brandName: string;
  scenario?: string;
  productServiceDesc: string;
  caseStudy?: string;
}

interface ViewOrderDetailsProps {
  orderData: OrderInterface;
}

export default function ViewOrderDetails({ orderData }: ViewOrderDetailsProps) {
  const { data: additionalService } = useSelector((state: RootState) => state.addPrice);
  const dispatch = useDispatch();
  const quantity = orderData.noOfUgc;
  const basePrice = orderData.basePrice;
  const [revisionContent, setRevisionContent] = useState<string | null>(null);
  const [loadingRevision, setLoadingRevision] = useState(false);

  useEffect(() => {
    dispatch(fetchAdditionalServices() as any);
  }, [dispatch]);

  useEffect(() => {
    if (orderData.orderStatus === "revision" && orderData._id) {
      const fetchRevisionContent = async () => {
        setLoadingRevision(true);
        try {
          const response = await axiosInstance.get(`/revisions/${orderData._id}`);
          console.log("Revision content:", response.data.data[0]?.revisionContent);
          if (response.data && response.data.data) {
            setRevisionContent(response.data.data[0]?.revisionContent);
          }
        } catch (error) {
          console.error("Error fetching revision content:", error);
        } finally {
          setLoadingRevision(false);
        }
      };

      fetchRevisionContent();
    }
  }, [orderData._id, orderData.orderStatus]);

  return (
    <div className="bg-white xs:p-8">
      {/* Creator Content Info */}
      <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
          <div className="col-span-2">
            <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-4">
              <label className="block text-gray-700 font-semibold">İçerikleriniz</label>
              <span className="text-gray-900 xs:text-sm lg:text-base">
                İçerik üreticiler içeriklerinizi hazırladığında bu sayfada görünecektir.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-md mb-6 sm:mb-7 md:mb-8 lg:mb-8">
        {orderData?.assignedCreators?.length > 0 ? (
          <table className="text-xs lg:text-sm w-auto lg:min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">No</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Creator ID</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">File URL</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Upload Date</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Sipariş Notu</th>
              </tr>
            </thead>
            <tbody>
              {orderData?.assignedCreators.map((creator, index) => {
                const hasFiles = orderData.uploadFiles && orderData.uploadFiles.length > 0;
                return hasFiles ? (
                  orderData.uploadFiles
                    .filter(file => file.uploadedBy === creator._id) // Match files to creator
                    .map((file, i) =>
                      file.fileUrls.map((f, j) => (
                        <tr key={`${creator._id}-${i}-${j}`}>
                          <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">{index + 1}</td>
                          <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">{creator._id}</td>
                          <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border">
                            <a href={f} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs flex items-center gap-3">
                              <span className="BlueText max-w-[180px]">Folder Link</span>
                              <FaExternalLinkAlt className="BlueText w-3.5 h-3.5" />
                            </a>
                          </td>
                          <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm text-gray-600">
                            {file?.uploadedDate ? new Date(file.uploadedDate).toLocaleDateString() : "No Date Available"}
                          </td>
                          <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm text-gray-600">
                            {file.creatorNoteOnOrder ? file.creatorNoteOnOrder : "No Creator Notes Available"}
                          </td>
                        </tr>
                      ))
                    )
                ) : (
                  <tr key={creator._id}>
                    <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">{index + 1}</td>
                    <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">{creator._id}</td>
                    <td colSpan={3} className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm text-center">No Files Uploaded</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table className="text-xs lg:text-sm w-auto lg:min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">No</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Creator ID</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">File URL</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Upload Date</th>
                <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Sipariş Notu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm text-center">
                  <p className="text-xs lg:text-sm">Henüz hiçbir Yaratıcı atanmadı</p>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Order and Brief Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-md mb-8">
          <h3 className="text-lg font-bold mb-4 BlueText">Sipariş Bilgileri:</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Sipariş No:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData._id}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Sipariş Tarihi:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">
                {orderData.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : "N/A"}
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Sipariş Durumu:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">
                {orderData.orderStatus === "completed" ? "Tamamlandı" :
                  orderData.orderStatus === "pending" ? "Beklemede" :
                  orderData.orderStatus === "active" ? "Aktif" :
                  orderData.orderStatus === "cancelled" || orderData.orderStatus === "rejected" ? "İptal Edildi" :
                  orderData.orderStatus === "revision" ? "Revizyon" :
                  orderData.orderStatus}
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Ödeme No:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">Nil</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Ödeme Tarihi:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">Nil</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Fatura:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">
                <a href="https://we.tl/send/5323" className="underline">Nil</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md mb-8">
          <h3 className="text-lg font-bold mb-4 BlueText">İçerik Detayı:</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Ürün / Hizmet Adı:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.briefContent?.productServiceName}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Marka:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.briefContent?.brandName}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Platform:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.platform}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Süre:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.duration}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Edit:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.edit ? "Evet" : "Hayır"}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">En Boy Oranı:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.aspectRatio}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Sosyal Medya Paylaşım:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.share ? "Evet" : "Hayır"}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Kapak Görseli:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.coverPicture ? "Evet" : "Hayır"}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Influencer Seçimi:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.creatorType ? "Micro" : "Nano"}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">Ürün Gönderimi:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">{orderData.additionalServices.productShipping ? "Evet" : "Hayır"}</div>
            </div>
            <div className="flex flex-row items-start">
              <div className="w-1/2 text-gray-700 text-sm lg:text-base">İçerik Türü:</div>
              <div className="w-1/2 text-right BlueText font-bold text-sm lg:text-base break-words">Hizmet</div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex mt-4 lg:mt-8">
        <div className="bg-white rounded-md w-full lg:w-1/2">
          <h2 className="BlueText text-lg font-semibold mb-4">Sipariş Özeti:</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{quantity} Videos</p>
              <p className="text-sm text-gray-500">
                {basePrice ? (basePrice / quantity).toLocaleString("tr-TR") : "0"} TL / Video
              </p>
            </div>
            <p className="font-semibold BlueText">{basePrice?.toLocaleString("tr-TR") ?? "0"} TL</p>
          </div>
          {/* Additional Services */}
          {orderData?.additionalServices?.duration && ["30s", "60s"].includes(orderData.additionalServices.duration) && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Süre</p>
                <p className="text-sm">
                  {orderData.additionalServices.duration === "30s"
                    ? `${(additionalService?.thirtySecondDurationPrice ?? 0).toLocaleString("tr-TR")} TL / Video`
                    : orderData.additionalServices.duration === "60s"
                    ? `${(additionalService?.sixtySecondDurationPrice ?? 0).toLocaleString("tr-TR")} TL / Video`
                    : ""}
                </p>
              </div>
              <p className="font-semibold BlueText">
                {orderData.additionalServices.duration === "30s"
                  ? `${((additionalService?.thirtySecondDurationPrice ?? 0) * quantity).toLocaleString("tr-TR")} TL`
                  : orderData.additionalServices.duration === "60s"
                  ? `${((additionalService?.sixtySecondDurationPrice ?? 0) * quantity).toLocaleString("tr-TR")} TL`
                  : ""}
              </p>
            </div>
          )}

          {orderData?.additionalServices?.edit && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Düzenleme</p>
                <p className="text-sm text-gray-500">{(additionalService?.editPrice ?? 0).toLocaleString("tr-TR")} TL / Video</p>
              </div>
              <p className="font-semibold BlueText">{((additionalService?.editPrice ?? 0) * quantity).toLocaleString("tr-TR")} TL</p>
            </div>
          )}

          {orderData?.additionalServices?.share && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Sosyal Medyada Paylaşım</p>
                <p className="text-sm text-gray-500">{(additionalService?.sharePrice ?? 0).toLocaleString("tr-TR")} TL / Video</p>
              </div>
              <p className="font-semibold BlueText">{((additionalService?.sharePrice ?? 0) * quantity).toLocaleString("tr-TR")} TL</p>
            </div>
          )}

          {orderData?.additionalServices?.coverPicture && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Kapak Görseli</p>
                <p className="text-sm text-gray-500">{(additionalService?.coverPicPrice ?? 0).toLocaleString("tr-TR")} TL / Video</p>
              </div>
              <p className="font-semibold BlueText">{((additionalService?.coverPicPrice ?? 0) * quantity).toLocaleString("tr-TR")} TL</p>
            </div>
          )}

          {orderData?.additionalServices?.creatorType && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Influencer Paketi</p>
                <p className="text-sm text-gray-500">{(additionalService?.creatorTypePrice ?? 0).toLocaleString("tr-TR")} TL / Video</p>
              </div>
              <p className="font-semibold BlueText">{((additionalService?.creatorTypePrice ?? 0) * quantity).toLocaleString("tr-TR")} TL</p>
            </div>
          )}

          {orderData?.additionalServices?.productShipping && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Ürün Gönderimi</p>
                <p className="text-sm text-gray-500">{(additionalService?.shippingPrice ?? 0).toLocaleString("tr-TR")} TL / Video</p>
              </div>
              <p className="font-semibold BlueText">{((additionalService?.shippingPrice ?? 0) * quantity).toLocaleString("tr-TR")} TL</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <div className="text-gray-700 font-semibold">Total Price:</div>
            <div className="text-right font-bold BlueText">{orderData?.totalPriceForCustomer?.toLocaleString("tr-TR")} TL</div>
          </div>
        </div>
      </div>

      {/* Brief Preview Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm lg:text-base font-semibold mb-1">Ürün / Hizmet Adı:</label>
          <div className="border rounded-md p-2 bg-gray-50 text-sm lg:text-base overflow-auto break-words">{orderData.briefContent?.productServiceName}</div>
        </div>
        <div>
          <label className="block text-sm lg:text-base font-semibold mb-1">Senaryo (Opsiyonel):</label>
          <div className="border rounded-md p-2 bg-gray-50 text-sm lg:text-base overflow-auto break-words min-h-[60px] max-h-[200px]">{orderData.briefContent?.scenario}</div>
        </div>
        <div>
          <label className="block text-sm lg:text-base font-semibold mb-1">Brief:</label>
          <div className="border rounded-md p-2 bg-gray-50 text-sm lg:text-base overflow-auto break-words min-h-[60px] max-h-[200px]">{orderData.briefContent?.productServiceDesc}</div>
        </div>
        <div>
          <label className="block text-sm lg:text-base font-semibold mb-1">Örnek Çalışma (Opsiyonel):</label>
          <div className="border rounded-md p-2 bg-gray-50 text-sm lg:text-base overflow-auto break-words min-h-[60px] max-h-[200px]">{orderData.briefContent?.caseStudy}</div>
        </div>
      </div>
      {orderData.creatorNoteOnOrder && (
        <div className="mt-8">
          <div>
            <label className="block text-sm lg:text-base font-semibold mb-1">Sipariş Notu:</label>
          </div>
          <div className="border rounded-md p-2 bg-gray-50 text-sm lg:text-base overflow-auto break-words min-h-[60px] max-h-[200px]">
            {orderData.creatorNoteOnOrder}
          </div>
        </div>
      )}

      {/* Revision Notes Section - Only show if order is in revision status */}
      {orderData.orderStatus === "revision" && (
        <div className="mt-8">
          <div>
            <label className="block text-sm lg:text-base font-semibold mb-1">Revizyon Notu:</label>
          </div>
          <div className="border rounded-md p-2 bg-gray-50 text-sm lg:text-base overflow-auto break-words min-h-[60px] max-h-[200px]">
            {loadingRevision ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Revizyon detayları yükleniyor...</p>
              </div>
            ) : revisionContent ? (
              revisionContent
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Revizyon detayları bulunamadı.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}