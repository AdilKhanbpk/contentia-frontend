"use client";
import { useState } from "react";
import Image from "next/image";

const ContentCreatorPreferences: React.FC<{
  register: any;
  watch: any;
  errors: any;
}> = ({ register, watch, errors }) => {
  const [showTooltipTwo, setShowTooltipTwo] = useState(false);
  const [showTooltipThree, setShowTooltipThree] = useState(false);
  // Replace your existing contentType watch with this:
  const contentTypes = watch("content_information.contentType") || [];

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-28">
      <div className="bg-white p-4 sm:p-5 md:p-6 lg:p-6">
        <h1 className="text-xl font-bold">İçerik Üreticisi Tercihleri</h1>

        <section className="mt-12 flex flex-col md:flex-row justify-between">
          <div className="">
            {/* İçerik Türü */}
            <div className="mb-4 w-full ">
              <div className="flex flex-row">
                <h2 className="text-lg font-semibold mb-4">İçerik Türü:</h2>
                {/* Tooltip or Information section */}
                <div className="relative mb-4 flex justify-center">
                  <button
                    className="text-black text-sm px-3 py-1 rounded-full"
                    onMouseEnter={() => setShowTooltipTwo(true)}
                    onMouseLeave={() => setShowTooltipTwo(false)}
                  >
                    <Image
                      src="/tooltipIcon.png"
                      alt="brand logo"
                      height={16}
                      width={16}
                      className="rounded-full"
                    />
                  </button>
                  {showTooltipTwo && (
                    <div className="absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2">
                      İçerik üreticilerine ürün gönderimi sağlayacaksanız ya da
                      üreticilerin bir fiziki lokasyona ulaşması gerekiyorsa, bu
                      alanda içerik türünüzü belirterek lokasyona göre
                      eşleştirme gerçekleştirme yapılması ge
                    </div>
                  )}
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                UGC’lerinizde tanıtım gerektiren, içerik türünüzü seçin
              </label>

              {/* content_type */}
              <div className="flex justify-between space-x-4">
                <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
                  <input
                    type="checkbox"
                    value="product"
                    {...register("content_information.contentType")}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                    <div className="w-full h-full bg-white rounded-full"></div>
                  </div>
                  <span className="ml-1 text-sm">Ürün</span>
                </label>

                <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
                  <input
                    type="checkbox"
                    value="service"
                    {...register("content_information.contentType")}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                    <div className="w-full h-full bg-white rounded-full"></div>
                  </div>
                  <span className="ml-1 text-sm">Hizmet</span>
                </label>

                <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
                  <input
                    type="checkbox"
                    value="space"
                    {...register("content_information.contentType")}
                    className="hidden peer"
                  />
                  <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                    <div className="w-full h-full bg-white rounded-full"></div>
                  </div>
                  <span className="ml-1 text-sm">Mekan</span>
                </label>
              </div>
              {errors.content_information?.contentType && (
                <span className="text-red-500 text-xs">
                  {errors.content_information.contentType.message}
                </span>
              )}
            </div>

            {/* content formatter */}
            <div className="mt-9">
              <h1 className="text-lg font-bold">İçerik Formatları:</h1>
              <p className="mb-2">
                Profiliniz ile eşleşen içerik alanlarını belirleyin
              </p>
              <div className="w-full mt-2 grid-cols-1">
                {[
                  "Instagram / TikTok Videosu (Dikey)",
                  "Instagram Gönderi",
                  "TikTok Videosu",
                  "Linkedin Gönderisi",
                ].map((format, index) => (
                  <label
                    key={index}
                    className="whitespace-nowrap flex items-center cursor-pointer mb-2 lg:mb-6"
                  >
                    <input
                      type="checkbox"
                      {...register("content_information.content_formats")}
                      value={format}
                      className="hidden peer"
                    />
                    <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                      <div className="w-full h-full bg-white rounded-full"></div>
                    </div>
                    <span className="ml-1 text-sm">{format}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            {/* If Mekan (Place) selected */}
            {(contentTypes.includes("space") || contentTypes.includes("product")) && (
              <div className="">
                <div className="flex flex-row">
                  <h2 className="text-lg font-semibold mb-4">Adres:</h2>

                  {/* Tooltip or Information section */}
                  <div className="relative mb-4 flex justify-center">
                    <button
                      className="text-black text-sm px-3 py-1 rounded-full"
                      onMouseEnter={() => setShowTooltipThree(true)}
                      onMouseLeave={() => setShowTooltipThree(false)}
                    >
                      <Image
                        src="/tooltipIcon.png"
                        alt="brand logo"
                        height={16}
                        width={16}
                        className="rounded-full"
                      />
                    </button>
                    {showTooltipThree && (
                      <div className="absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2">
                        Adres bilgileri, tüm içerik üreticileri tarafından İl,
                        İlçe ve Mahalle olarak gösterilecektir. Onaylanan içerik
                        üreticiler, işletme adı ve açık adresi
                        görüntüleyebilecektir.
                      </div>
                    )}
                  </div>
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lütfen tanıtılmasını istediğiniz mekanın adres bilgilerini
                  belirtin
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-8">
                  <div className="">
                    <label className="block text-sm font-semibold mb-2">
                      Ülke
                    </label>

                    <select
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      {...register(
                        "content_information.address_details.country"
                      )}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Turkey">Turkey</option>
                      <option value="USA">USA</option>
                    </select>
                    {errors.content_information?.address_details?.country && (
                      <span className="text-red-500 text-xs">
                        {
                          errors.content_information.address_details.country
                            .message
                        }
                      </span>
                    )}
                  </div>

                  <div className="">
                    <label className="block text-sm font-semibold mb-2">
                      İl
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      {...register(
                        "content_information.address_details.state"
                      )}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Turkey">Turkey</option>
                      <option value="USA">USA</option>
                    </select>
                    {errors.content_information?.address_details?.state && (
                      <span className="text-red-500 text-xs">
                        {
                          errors.content_information.address_details.state
                            .message
                        }
                      </span>
                    )}
                  </div>

                  <div className="">
                    <label className="block text-sm font-semibold mb-2">
                      İlçe
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      {...register(
                        "content_information.address_details.district"
                      )}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Turkey">Turkey</option>
                      <option value="USA">USA</option>
                    </select>
                    {errors.content_information?.address_details?.district && (
                      <span className="text-red-500 text-xs">
                        {
                          errors.content_information.address_details.district
                            .message
                        }
                      </span>
                    )}
                  </div>

                  <div className="">
                    <label className="block text-sm font-semibold mb-2">
                      Mahalle
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-md focus:outline-none"
                      {...register(
                        "content_information.address_details.neighbourhood"
                      )}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Turkey">Turkey</option>
                      <option value="USA">USA</option>
                    </select>
                    {errors.content_information?.address_details
                      ?.neighbourhood && (
                        <span className="text-red-500 text-xs">
                          {
                            errors.content_information.address_details
                              .neighbourhood.message
                          }
                        </span>
                      )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Açık Adres:
                    </label>
                    <textarea
                      placeholder="Lütfen işletme adını ve açık adres bilgilerini girin."
                      className="w-full text-sm px-3 py-2 border rounded-md focus:outline-none"
                      rows={2}
                      {...register(
                        "content_information.address_details.full_address"
                      )}
                    />
                    {errors.content_information?.address_details
                      ?.full_address && (
                        <span className="text-red-500 text-xs">
                          {
                            errors.content_information.address_details
                              .full_address.message
                          }
                        </span>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* area_of_interest */}
        <section className="mt-9">
          <h1 className="text-lg font-bold">İlgi Alanları:</h1>
          <p className="mb-2">
            Profiliniz ile eşleşen içerik alanlarını belirleyin
          </p>
          <div className="w-full lg:w-2/3 mt-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Spor ve Aktivite",
              "Sanal ve El İşleri",
              "Müzik",
              "Eğlence ve Oyun",
              "Yemek ve İçecek",
              "Bilim ve Teknoloji",
              "Seyahat ve Kültür",
              "Kitap ve Edebiyat",
              "Film ve Dizi",
              "Doğa ve Hayvanlar",
              "Gönüllülük",
              "Moda ve Güzellik",
              "E-Ticaret",
              "Üretim ve Mühendislik",
              "Sağlık",
              "Eğitim",
            ].map((item, index) => (
              <label
                key={index}
                className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 inline-flex items-center cursor-pointer mb-2 lg:mb-6"
              >
                <input
                  type="checkbox"
                  value={item}
                  className="hidden peer "
                  {...register("content_information.area_of_interest")}
                />
                <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                  <div className="w-full h-full bg-white rounded-full"></div>
                </div>
                <span className="ml-1 text-sm">{item}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContentCreatorPreferences;
