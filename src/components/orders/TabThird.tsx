import { useRef } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";

const TabThird = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            const formData = new FormData();
            if (data.files && data.files.length > 0) {
                formData.append('file', data.files[0]);
            }
            formData.append('brand', data.brand);
            formData.append('brief', data.brief);
            formData.append('productName', data.productName);
            formData.append('scenario', data.scenario);
            formData.append('description', data.description);
            formData.append('sampleWork', data.sampleWork);
            const response = await axios.post('http://localhost:3001/api/v1/ugc/ugcBrief', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('UGC brief submitted successfully!');
        } catch (error) {
            toast.error('Failed to submit UGC brief. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-md">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                 
                    {/* First Row - Brand Selection and Brief */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                        {/* Brand Selection */}
                        <div>
                            <div className='flex flex-row items-center space-x-4 mb-4'>
                                <label className="block text-sm font-semibold ">Marka Seçimi:</label>
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <Image
                                            src="/plusIcon.png"
                                            alt="brand logo"
                                            height={20}
                                            width={20}
                                        />
                                    </div>
                                    <label htmlFor="brand1" className="text-sm">Ekle</label>
                                </div>
                            </div>
                            <select
                                {...register("brand", { required: false })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                defaultValue=""
                            >
                                <option value="" disabled>Brand Name</option>
                            </select>
                            {errors.brand && <span className="text-red-500">Marka Seçimi zorunludur</span>}
                        </div>

                        {/* Brief Section */}
                        <div className=''>
                            <label className="block text-sm font-semibold">Brief:</label>
                            <textarea
                                {...register("brief", { maxLength: 1000 })}
                                placeholder="İçeriğinizde öne çıkarmak istediğiniz özellik, yenilik, kampanya vb. detayları girin (Maksimum 1000 karakter)"
                                className="w-full mt-4 px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Second Row - Product/Service Name and Scenario */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     
                        {/* Product/Service Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Ürün / Hizmet Adı:</label>
                            <input
                                {...register("productName", { required: true })}
                                type="text"
                                placeholder="Ürün / Hizmet Adı"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto"
                            />
                            {errors.productName && <span className="text-red-500">Ürün adı zorunludur</span>}
                        </div>

                        {/* Scenario */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Senaryo (Opsiyonel):</label>
                            <textarea
                                {...register("scenario")}
                                placeholder="Aklınızda bir video kurgusu varsa, çalışılmasını istediğiniz senaryoyu belirtin."
                                className="w-full px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto"
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Third Row - Product/Service Description and Sample Work */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                       
                        {/* Product/Service Description */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Ürün / Hizmet Açıklaması:</label>
                            <textarea
                                {...register("description")}
                                placeholder="Lütfen ürününüzü veya hizmetinizi içerik üreticileri için açıklayın"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto"
                                rows={3}
                            />
                        </div>

                        {/* Sample Work */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Örnek Çalışma (Opsiyonel):</label>
                            <textarea
                                {...register("sampleWork")}
                                placeholder="Beğendiğiniz örnek bir çalışmayı veya beğendiğiniz video linkini buraya ekleyin"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto"
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="mt-6">
                        <label className="block text-sm font-semibold mb-2">Dosya Yükle (Opsiyonel):</label>
                        <p className="text-sm text-gray-500 mb-4">
                            İçerik üreticilerine iletmek istediğiniz marka, logo, ürün veya hizmet görseli, lütfen dosyanızı yükleyin.
                        </p>
                        <div className="sectionBG outline-2 outline-dashed outline-gray-300 rounded-sm p-4" onClick={handleDivClick}>
                            <div className='flex flex-col lg:flex-row justify-center lg:space-x-8'>
                                <div className='w-full lg:w-1/6 flex justify-center items-center'>
                                    <div className='mb-4 lg:mb-0'>
                                        <Image
                                            src="/uploadIcon.png"
                                            alt="brand logo"
                                            height={60}
                                            width={60}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-5/6'>
                                    <p className="text-sm text-gray-500 lg:-ml-8">
                                        Dosyalarınızı sürükleyin ya da Yükle butonuna basarak cihazınızdan seçin.
                                    </p>
                                    <div className='flex justify-center items-center lg:-ml-32'>
                                        <button
                                            type="button"
                                            className="mt-4 py-1 px-16 ButtonBlue font-semibold text-white rounded-xl focus:outline-none"
                                        >
                                            Yükle
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Controller
                                name="files"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={(e) => {
                                            onChange(e.target.files);
                                        }}
                                        accept=".jpg,.png,.gif,.pdf,.mp4,.mov,.wmv"
                                        multiple
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="py-2 px-4 ButtonBlue font-semibold text-white rounded-md focus:outline-none"
                        >
                            İleri
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TabThird;
