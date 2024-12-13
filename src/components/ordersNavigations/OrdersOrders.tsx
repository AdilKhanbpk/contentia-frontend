'use client';
import { useState } from 'react';
import CustomModal from '../modal/CustomModel'
import Image from 'next/image';

export default function OrdersOrders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRevModalOpen, setIsRevModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openRevModal = () => setIsRevModalOpen(true);
  const closeRevModal = () => setIsRevModalOpen(false);

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-28 py-14 sm:py-14 md:py-16 lg:py-24 bg-gray-50 ">
        <div className='flex flex-col'>
          <div className="p-4 my-4 sm:p-5 sm:my-6 md:p-6 md:my-8 lg:p-6 lg:my-8">
            <h1 className="text-base font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-6">Sipariş Detayları</h1>
            <div className='bg-white px-4 pt-4 sm:px-5 sm:pt-5 md:px-6 md:pt-6 lg:px-6 lg:pt-6'>

              {/* Sipariş Detay Box 1 */}
              <div className="flex flex-col lg:flex-row justify-between  pb-2 mb-2 sm:pb-3 sm:mb-3 md:pb-4 md:mb-4 lg:pb-4 lg:mb-4">
                <div className="w-full lg:w-3/4 grid grid-cols-1 ">
                  <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                    <p className='w-full lg:w-1/4'>Sipariş No:</p>
                    <p className='font-semibold'>201240184112</p>
                  </div>
                  <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                    <p className='w-full lg:w-1/4'>Sipariş Tarihi:</p>
                    <p className='font-semibold'>19/09/2024</p>
                  </div>
                  <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                    <p className='w-full lg:w-1/4'>Sipariş Durumu:</p>
                    <p className='font-semibold'>Aktif / Tamamlandı / Onay Bekliyor / İptal</p>
                  </div>
                  <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                    <p className='w-full lg:w-1/4'>Marka:</p>
                    <p className='font-semibold'>Brand Name</p>
                  </div>
                  <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                    <p className='w-full lg:w-1/4'>Ürün / Hizmet Adı:</p>
                    <p className='font-semibold'>Ürün / Hizmet Adı</p>
                  </div>
                  <div className='flex flex-col lg:flex-row'>
                    <p className='w-full lg:w-1/4'>Toplam:</p>
                    <p className='font-semibold'>3.250 TL</p>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 flex flex-col justify-between space-x-0 lg:space-x-4">
                  <div className='flex flex-row justify-start lg:justify-end space-x-4'>
                    <div>
                      <Image width={28} height={28} src='/userWarningIcon.png' alt='plus icon' ></Image>
                    </div>
                    <div>
                      <p className='text-base'>Sorun Bildir</p>
                    </div>
                  </div>
                  <div className='flex space-x-2 lg:space-x-4'>
                    <button className="px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-1 lg:px-8 lg:py-1 text-sm font-semibold ButtonBlue text-white rounded-lg">Detaylar</button>
                    <button className="px-3 text-sm font-semibold border BlueBorder text-white rounded-lg"><div><Image width={20} height={20} src="/pencil.png"  alt='pencil icon' ></Image></div></button>
                    <button className="px-3 text-sm font-semibold bg-[#00B836] text-white rounded-lg"><div><Image width={20} height={20} src="/approveButton.png"  alt='pencil icon' ></Image></div></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sipariş Detay Box 2 */}
            <div className="flex flex-col lg:flex-row justify-between pb-2 sm:pb-3 md:pb-4 lg:pb-4 mb-2 sm:mb-3 md:mb-4 lg:mb-4 bg-white p-6 my-8">
              <div className="w-full lg:w-3/4 grid grid-cols-1">
                <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                  <p className='w-full lg:w-1/4'>Sipariş No:</p>
                  <p className='font-semibold'>201240188285</p>
                </div>
                <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                  <p className='w-full lg:w-1/4'>Sipariş Tarihi:</p>
                  <p className='font-semibold'>21/09/2024</p>
                </div>
                <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                  <p className='w-full lg:w-1/4'>Sipariş Durumu:</p>
                  <p className='font-semibold'>Tamamlandı</p>
                </div>
                <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                  <p className='w-full lg:w-1/4'>Marka:</p>
                  <p className='font-semibold'>Contentia</p>
                </div>
                <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                  <p className='w-full lg:w-1/4'>Ürün / Hizmet Adı:</p>
                  <p className='font-semibold'>Content Marketplace</p>
                </div>
                <div className='flex flex-col lg:flex-row'>
                  <p className='w-full lg:w-1/4'>Toplam:</p>
                  <p className='font-semibold'>10.000 TL</p>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 flex flex-col justify-between space-x-0 lg:space-x-4">
                <div className='flex flex-row justify-start lg:justify-end space-x-4'>
                  <div>
                    <Image width={28} height={28} src='/userWarningIcon.png' alt='plus icon' ></Image>
                  </div>
                  <div>
                    <p className='text-base'>Sorun Bildir</p>
                  </div>
                </div>
                <div className='flex space-x-2 lg:space-x-4'>
                  <button onClick={openModal} className="px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-1 lg:px-8 lg:py-1 text-sm font-semibold ButtonBlue text-white rounded-lg">Detaylar</button>
                  <button onClick={openRevModal} className="px-3 text-sm font-semibold border BlueBorder text-white rounded-lg"><div><Image width={20} height={20} src="/revisionButton.png"  alt='pencil icon' ></Image></div></button>
                  <button className="px-3 text-sm font-semibold bg-[#00B836] text-white rounded-lg"><div><Image width={20} height={20} src="/approveButton.png"  alt='pencil icon' ></Image></div></button>
                </div>
              </div>
            </div>

            <CustomModal isOpen={isModalOpen} closeModal={closeModal} title="">
             
              {/* model */}
              <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
              
                {/* First Box: Fields and Profile Section */}
                <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                    <div className="col-span-2">
                      <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-4">
                        <label className="block text-gray-700 font-semibold">İçerikleriniz</label>
                        <span className="text-gray-900">İçerik üreticiler içeriklerinizi hazırladığında bu sayfada görünecektir.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-md mb-6 sm:mb-7 md:mb-8 lg:mb-8">
                  <table className="text-xs lg:text-sm w-auto lg:min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">No</th>
                        <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">İçerik Üretici No</th>
                        <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Bağlantı</th>
                        <th className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 text-start border">Yükleme Tarihi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm" >1</td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">128510</td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='text-xs lg:text-sm BlueText whitespace-normal lg:whitespace-nowrap' href="#">http://we.tl/send/</a></td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm">23/09/2024</td>
                      </tr>
                      <tr>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm">2</td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">67846</td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='text-xs lg:text-sm BlueText whitespace-normal lg:whitespace-nowrap' href="#">http://we.tl/send/7431</a></td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm">23/09/2024</td>
                      </tr>
                      <tr>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4  border text-xs lg:text-sm">3</td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-xs lg:text-sm">95378</td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border"><a className='text-xs lg:text-sm BlueText whitespace-normal lg:whitespace-nowrap' href="#">http://we.tl/send/3523</a></td>
                        <td className="py-0.5 px-0.5 sm:py-0.5 sm:px-0.5 md:py-2 md:px-4 lg:py-2 lg:px-4 border text-sm lg:text-sm">30/09/2024</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='flex flex-col lg:flex-row lg:space-x-28'>
                  <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                    <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText">Sipariş Bilgileri:</h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                      <div className="text-gray-700">Sipariş No:</div>
                      <div className="text-right BlueText font-bold">201240184112</div>
                      <div className="text-gray-700">Sipariş Tarihi:</div>
                      <div className="text-right BlueText font-bold">19/09/2024</div>
                      <div className="text-gray-700">Sipariş Durumu:</div>
                      <div className="text-right BlueText font-bold">Aktif / Tamamlandı / İptal</div>
                      <div className="text-gray-700">Ödeme No:</div>
                      <div className="text-right BlueText font-bold">9080124</div>
                      <div className="text-gray-700">Ödeme Tarihi:</div>
                      <div className="text-right BlueText font-bold">19/09/2024</div>
                      <div className="text-gray-700">Fatura:</div>
                      <div className="text-right BlueText font-bold">
                        <a href="https://we.tl/send/5323" className="underline">https://we.tl/send/5323</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                    <h3 className="text-lg font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-4 BlueText">İçerik Detayı:</h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                      <div className="text-gray-700">Ürün / Hizmet Adı:</div>
                      <div className="text-right BlueText font-bold">Ürün Adı</div>
                      <div className="text-gray-700">Marka:</div>
                      <div className="text-right BlueText font-bold">Brand Name</div>
                      <div className="text-gray-700">Platform:</div>
                      <div className="text-right BlueText font-bold">Meta</div>
                      <div className="text-gray-700">Süre:</div>
                      <div className="text-right BlueText font-bold">15s</div>
                      <div className="text-gray-700">Edit:</div>
                      <div className="text-right BlueText font-bold">Evet</div>
                      <div className="text-gray-700">En Boy Oranı:</div>
                      <div className="text-right BlueText font-bold">9:16</div>
                      <div className="text-gray-700">Sosyal Medya Paylaşım:</div>
                      <div className="text-right BlueText font-bold">Hayır</div>
                      <div className="text-gray-700">Kapak Görseli:</div>
                      <div className="text-right BlueText font-bold">Hayır</div>
                      <div className="text-gray-700">Influencer Seçimi:</div>
                      <div className="text-right BlueText font-bold">Nano</div>
                      <div className="text-gray-700">Ürün Gönderimi:</div>
                      <div className="text-right BlueText font-bold">Hayır</div>
                      <div className="text-gray-700">İçerik Türü:</div>
                      <div className="text-right BlueText font-bold">Hizmet</div>
                    </div>
                  </div>
                </div>

                {/* video sections */}
                <div className="flex -mt-0 lg:-mt-44">
                  <div className="bg-white rounded-md w-full lg:w-1/3">
                    <h2 className="text-indigo-600 text-lg font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-4">Sipariş Özeti:</h2>
                    <div className="flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3">
                      <div>
                        <p className="font-semibold">1 Video</p>
                        <p className="text-gray-500">3.000 TL / Video</p>
                      </div>
                      <p className="text-indigo-600 font-semibold">3.000 TL</p>
                    </div>
                    <div className="flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-3">
                      <div>
                        <p className="font-semibold">1 Edit</p>
                        <p className="text-gray-500">500 TL / Video</p>
                      </div>
                      <p className="text-indigo-600 font-semibold">500 TL</p>
                    </div>
                    <div className="flex justify-between text-sm mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                      <div>
                        <p className="font-semibold">1 Kapak Görsel</p>
                        <p className="text-gray-500">250 TL / Video</p>
                      </div>
                      <p className="text-indigo-600 font-semibold">250 TL</p>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-2 sm:mt-3 md:mt-4 lg:mt-4">
                      <p>Toplam</p>
                      <p className="text-indigo-600">3.750 TL</p>
                    </div>
                  </div>
                </div>

                {/* Four InputFields */}
                <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                 
                  {/* Product/Service Name */}
                  <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Ürün / Hizmet Adı:</label>
                    <input
                      type="text"
                      placeholder="Ürün / Hizmet Adı"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                    />
                  </div>

                  {/* Scenario */}
                  <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Senaryo (Opsiyonel):</label>
                    <input
                      type="text"
                      placeholder="Aklınızda bir video kurgusu varsa, çalışılmasını istediğiniz senaryoyu belirtin."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                    />
                  </div>
                </div>

                {/* Third Row - Product/Service Description and Sample Work */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                 
                  {/* Product/Service Description */}
                  <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Brief:</label>
                    <input
                      type="text"
                      placeholder="İçeriğinizde öne çıkarmak istediğiniz özellik, yenilik, kampanya vb. detaylar gibi markayı, ürünü veya hizmeti belirtin."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                    />
                  </div>

                  {/* Sample Work */}
                  <div>
                    <label className="block text-sm font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-4">Örnek Çalışma (Opsiyonel):</label>
                    <input
                      type="text"
                      placeholder="Beğendiğiniz örnek bir çalışmayı veya beğendiğiniz video linkini buraya ekleyin (Örn: https://www.youtube.com/watch?v=5CODGzTDFX8)"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                    />
                  </div>
                </div>
              </div>
            </CustomModal>

            <CustomModal isOpen={isRevModalOpen} closeModal={closeRevModal} title="">
            
              {/* Revision Request */}
              <div className=" flex justify-center items-center bg-white">
                <div className="bg-white p-4 sm:p-5 md:p-6 lg:p-6 rounded-md">
                  <h2 className="text-base font-semibold mb-1">Revizyon Talebi</h2>
                  <p className="text-gray-600 mb-2">
                    Lütfen revizyon talebi oluşturmak istediğiniz İçerik Üreticisi No ve İçerik bağlantı linki ile, değişiklik istediğiniz detayları belirtin.
                  </p>

                  <div className="relative mb-2 sm:mb-3 md:mb-3 lg:mb-4">
                    <textarea
                      className="w-full p-2 sm:p-3 md:p-4 lg:p-4 border  rounded-lg focus:outline-none"
                      rows={6}
                      placeholder=""
                    />
                  </div>

                  <div className="flex justify-end">
                    <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
                      Gönder
                    </button>
                  </div>
                </div>
              </div>
            </CustomModal>
          </div>
        </div>
      </div>
    </>
  );
}
