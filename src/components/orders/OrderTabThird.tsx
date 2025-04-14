import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchMyBrands } from "@/store/features/profile/brandSlice";
import { setOrderFormData } from "@/store/features/profile/orderSlice";
import CustomModelAdmin from "../modal/CustomModelAdmin";
import ModelBrand from "./sub-orders/ModelBrand";
import { useFileContext } from "@/context/FileContext";
import { useTokenContext } from "@/context/TokenCheckingContext";

const TabThird: React.FC<{ setActiveTab: (id: number) => void }> = ({
    setActiveTab,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const brandRecords = useSelector(
        (state: RootState) => state.brand.myBrands
    );
    const [selectedBrand, setSelectedBrand] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { selectedFiles, setSelectedFiles } = useFileContext();
    const { token } = useTokenContext();
    if (!token) return null;

    useEffect(() => {
        if (token) {
            dispatch(fetchMyBrands(token));
        }
    }, [dispatch]);

    const brands = brandRecords.map((record) => record.brandName);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSubmit = async (data: any) => {
        // Prepare brief content data
        const briefContentData = {
            brandName: selectedBrand,
            brief: data.brief,
            productServiceName: data.productName,
            productServiceDesc: data.description,
            scenario: data.scenario || "",
            caseStudy: data.sampleWork || "",
            uploadFiles: selectedFiles
                ? Array.from(selectedFiles).map((file) => file.name)
                : [],
        };

        // Dispatch to Redux store
        const formData = {
            briefContent: briefContentData,
        };

        await dispatch(setOrderFormData(formData));
        toast.success("Order Brief Saved Successfully!");
        setActiveTab(3);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleFileChange = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='w-full max-w-4xl bg-white p-8 shadow-lg rounded-md'>
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* First Row - Brand Selection and Brief */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Brand Selection */}
                        <div>
                            <div className='flex flex-row items-center space-x-4 mb-4'>
                                <label className='block text-sm font-semibold '>
                                    Marka Seçimi:
                                </label>
                                <button
                                    type='button'
                                    onClick={openModal}
                                    className='flex flex-row items-center space-x-2'
                                >
                                    <div>
                                        <Image
                                            width={16}
                                            height={16}
                                            src='/plusIcon.png'
                                            alt='plus icon'
                                        />
                                    </div>
                                    <div>
                                        <p className='BlueText text-sm '>
                                            Marka Ekle
                                        </p>
                                    </div>
                                </button>
                            </div>

                            <CustomModelAdmin
                                isOpen={isModalOpen}
                                closeModal={closeModal}
                                title=''
                            >
                                <ModelBrand />
                            </CustomModelAdmin>

                            <select
                                {...register("brand", { required: false })}
                                value={selectedBrand}
                                onChange={(e) =>
                                    setSelectedBrand(e.target.value)
                                }
                                className='w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:border-none bg-white text-gray-900'
                            >
                                <option
                                    value=''
                                    disabled
                                >
                                    Brand Names
                                </option>
                                {brands.map((brand, index) => (
                                    <option
                                        key={index}
                                        value={brand}
                                    >
                                        {brand}
                                    </option>
                                ))}
                            </select>
                            {errors.brand && (
                                <span className='text-red-500'>
                                    Marka Seçimi zorunludur
                                </span>
                            )}
                        </div>

                        {/* Brief Section */}
                        <div className=''>
                            <label className='block text-sm font-semibold'>
                                Brief:
                            </label>
                            <textarea
                                {...register("brief", { maxLength: 1000 })}
                                placeholder='İçeriğinizde öne çıkarmak istediğiniz özellik, yenilik, kampanya vb. detayları girin (Maksimum 1000 karakter)'
                                className='w-full mt-4 px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto'
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Second Row - Product/Service Name and Scenario */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Product/Service Name */}
                        <div>
                            <label className='block text-sm font-semibold mb-1'>
                                Ürün / Hizmet Adı:
                            </label>
                            <input
                                {...register("productName", { required: true })}
                                type='text'
                                placeholder='Ürün / Hizmet Adı'
                                className='w-full px-3 py-2 border rounded-md focus:outline-none overflow-auto'
                            />
                            {errors.productName && (
                                <span className='text-red-500'>
                                    Ürün adı zorunludur
                                </span>
                            )}
                        </div>

                        {/* Scenario */}
                        <div>
                            <label className='block text-sm font-semibold mb-1'>
                                Senaryo (Opsiyonel):
                            </label>
                            <textarea
                                {...register("scenario")}
                                placeholder='Aklınızda bir video kurgusu varsa, çalışılmasını istediğiniz senaryoyu belirtin.'
                                className='w-full px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto'
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Third Row - Product/Service Description and Sample Work */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Product/Service Description */}
                        <div>
                            <label className='block text-sm font-semibold mb-1'>
                                Ürün / Hizmet Açıklaması:
                            </label>
                            <textarea
                                {...register("description")}
                                placeholder='Lütfen ürününüzü veya hizmetinizi içerik üreticileri için açıklayın'
                                className='w-full px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto'
                                rows={3}
                            />
                        </div>

                        {/* Sample Work */}
                        <div>
                            <label className='block text-sm font-semibold mb-1'>
                                Örnek Çalışma (Opsiyonel):
                            </label>
                            <textarea
                                {...register("sampleWork")}
                                placeholder='Beğendiğiniz örnek bir çalışmayı veya beğendiğiniz video linkini buraya ekleyin'
                                className='w-full px-3 py-2 border rounded-md focus:outline-none resize-none overflow-auto'
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className='mt-6'>
                        <label className='block text-sm font-semibold mb-2'>
                            Dosya Yükle (Opsiyonel):
                        </label>
                        <p className='text-sm text-gray-500 mb-4'>
                            İçerik üreticilerine iletmek istediğiniz marka,
                            logo, ürün veya hizmet görseli, lütfen dosyanızı
                            yükleyin.
                        </p>
                        <div
                            className='sectionBG outline-2 outline-dashed outline-gray-300 rounded-sm p-4'
                            onClick={handleDivClick}
                        >
                            <div className='flex flex-col lg:flex-row justify-center lg:space-x-8'>
                                <div className='w-full lg:w-1/6 flex justify-center items-center'>
                                    <div className='mb-4 lg:mb-0'>
                                        <Image
                                            src='/uploadIcon.png'
                                            alt='brand logo'
                                            height={60}
                                            width={60}
                                        />
                                    </div>
                                </div>
                                <div className='w-full lg:w-5/6'>
                                    <p className='text-sm text-gray-500 lg:-ml-8'>
                                        Dosyalarınızı sürükleyin ya da Yükle
                                        butonuna basarak cihazınızdan seçin.
                                    </p>
                                    <div className='flex justify-center items-center lg:-ml-32'>
                                        <button
                                            type='button'
                                            className='mt-4 py-1 px-16 Button font-semibold text-white rounded-xl focus:outline-none'
                                        >
                                            Yükle
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Controller
                                name='uploadFiles'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <input
                                        type='file'
                                        ref={fileInputRef}
                                        multiple
                                        className='hidden'
                                        onChange={(e) => {
                                            onChange(e.target.files);
                                            handleFileChange(e.target.files);
                                        }}
                                        accept='.jpg,.png,.gif,.pdf,.mp4,.mov,.wmv'
                                    />
                                )}
                            />
                        </div>
                        {/* Display selected file names */}
                        {selectedFiles.length > 0 && (
                            <div className='mt-4'>
                                <h3 className='text-sm font-semibold mb-2'>
                                    Seçilen Dosyalar:
                                </h3>
                                <ul className='flex flex-row list-disc list-inside text-sm text-gray-700'>
                                    {selectedFiles.map((file, index) => (
                                        <p
                                            className='mr-2'
                                            key={index}
                                        >
                                            {file.name}
                                        </p>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className='text-right'>
                        <button
                            type='submit'
                            // onClick={() => setActiveTab(3)}
                            className='py-2 px-4 Button font-semibold text-white rounded-md focus:outline-none'
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
