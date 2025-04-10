import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    setOrderFormData,
    createOrder,
    selectOrderFormData,
    selectOrderIsLoading,
} from "@/store/features/profile/orderSlice";
import { useFileContext } from "@/context/FileContext";
import { getAccessToken } from "@/utils/checkToken";

const TabFourth: React.FC<{ setActiveTab: (id: number) => void }> = ({
    setActiveTab,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(65);
    const orderLoading = useSelector(selectOrderIsLoading);
    const { selectedFiles, setSelectedFiles } = useFileContext();

    const handleMaxAgeChange = (e: any) => {
        const value = Math.max(Number(e.target.value), minAge + 1);
        setMaxAge(value);
    };

    const [showTooltipOne, setShowTooltipOne] = useState(false);
    const [showTooltipTwo, setShowTooltipTwo] = useState(false);
    const [showTooltipThree, setShowTooltipThree] = useState(false);
    const { register, handleSubmit, watch } = useForm();

    const contentTypes = watch("preferences.contentType") || [];

    const onSubmit = async (data: any) => {
        const token = getAccessToken();
        if (!token) return;

        try {
            const preferencesData = {
                preferences: {
                    creatorGender: data.preferences.creatorGender,
                    minCreatorAge: minAge,
                    maxCreatorAge: maxAge,
                    areaOfInterest: data.preferences.areaOfInterest || [],
                    contentType: data.preferences.contentType || [],
                    addressDetails: data.preferences?.addressDetails
                        ? { ...data.preferences.addressDetails } // Ensure this is an object
                        : {
                              country: "",
                              state: "",
                              district: "",
                              neighborhood: "",
                              fullAddress: "",
                          }, // Default as an object,
                },
            };
            dispatch(setOrderFormData(preferencesData));

            try {
                const res = await dispatch(
                    createOrder({ token, selectedFiles })
                )
                    .unwrap()
                    .then((res) => {
                        setSelectedFiles([]);
                        toast.success(res.message);
                    });
            } catch (error: any) {
                toast.error(error.message);
                setSelectedFiles([]);
            }
        } catch (error: any) {
            console.error("Error submitting form:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='px-4 sm:px-6 md:px-12 lg:px-24'>
                <div className='p-6 bg-white rounded-lg shadow-md w-full '>
                    <div>
                        {/* Existing JSX remains exactly the same */}
                        <div className='flex flex-row'>
                            <h2 className='text-lg font-semibold mb-4'>
                                İçerik Üreticisi Tercihleri{" "}
                                <span className='font-medium'>(Opsiyonel)</span>
                            </h2>

                            <div className='relative mb-4 flex justify-center'>
                                <button
                                    className='text-black text-sm px-3 py-1 rounded-full'
                                    onMouseEnter={() => setShowTooltipOne(true)}
                                    onMouseLeave={() =>
                                        setShowTooltipOne(false)
                                    }
                                >
                                    <Image
                                        src='/tooltipIcon.png'
                                        alt='brand logo'
                                        height={16}
                                        width={16}
                                        className='rounded-full'
                                    />
                                </button>
                                {showTooltipOne && (
                                    <div className='absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2'>
                                        İçerik Üreticileri için yapmış olduğunuz
                                        tercihler, sizi doğru içerik
                                        üreticilerle eşleştirmemize yardımcı
                                        olacaktır. Tercihlerinizi, maksimum
                                        düzeyde karşılamaya çalışacağız.
                                    </div>
                                )}
                            </div>
                        </div>

                        <label className='block text-sm font-medium text-gray-700 mb-4'>
                            UGC'lerinizi hazırlayacak içerik üreticileri için
                            tercih ettiginiz özellikler bulunuyorsa, lütfen
                            seçimlerinizi yapın
                        </label>
                    </div>
                    <div className='xs:flex xs:flex-col-reverse xl:flex-row'>
                        <div className='xl:w-3/5'>
                            <div className='flex flex-col lg:flex-row justify-between items-center lg:space-x-4'>
                                {/* Cinsiyet */}
                                <div className='mb-4 w-full lg:w-1/3 mt-2 grid grid-cols-3'>
                                    <label className='col-span-3 block text-sm font-semibold text-gray-700 mb-2'>
                                        Cinsiyet:{" "}
                                        <span className='font-medium'>
                                            (Opsiyonel)
                                        </span>
                                    </label>

                                    {["Kadın", "Erkek", "Karışık"].map(
                                        (gender, index) => {
                                            // Map Turkish labels to English values
                                            const valueMap: Record<
                                                string,
                                                string
                                            > = {
                                                Kadın: "female",
                                                Erkek: "male",
                                                Karışık: "other",
                                            };

                                            return (
                                                <label
                                                    key={index}
                                                    className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'
                                                >
                                                    <input
                                                        type='radio'
                                                        {...register(
                                                            "preferences.creatorGender"
                                                        )}
                                                        value={valueMap[gender]} // Use the mapped English value
                                                        className='hidden peer'
                                                    />
                                                    <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                                        <div className='w-full h-full bg-white rounded-full'></div>
                                                    </div>
                                                    <span className='ml-1 text-sm'>
                                                        {gender}
                                                    </span>{" "}
                                                    {/* Display Turkish label */}
                                                </label>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            <div className='my-5 flex flex-col'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Yaş Aralığı:{" "}
                                    <span className='font-medium'>
                                        (Opsiyonel)
                                    </span>
                                </label>

                                <div className='w-full lg:w-3/12 relative mt-2'>
                                    {/* Track background and active track */}
                                    <div className='absolute w-full h-2 bg-gray-200 rounded-full' />
                                    <div
                                        className='absolute h-2 bg-blue-600 rounded-full'
                                        style={{
                                            left: `${
                                                ((minAge - 18) / (65 - 18)) *
                                                100
                                            }%`,
                                            right: `${
                                                100 -
                                                ((maxAge - 18) / (65 - 18)) *
                                                    100
                                            }%`,
                                        }}
                                    />

                                    {/* Min age slider */}
                                    <input
                                        type='range'
                                        min='18'
                                        max='65'
                                        value={minAge}
                                        className='absolute w-full pointer-events-none appearance-none bg-transparent'
                                        style={{
                                            height: "2rem",
                                            margin: "-0.8rem 0",
                                            zIndex: 3,
                                        }}
                                        onChange={(e) => {
                                            const value = Math.min(
                                                Number(e.target.value),
                                                maxAge - 1
                                            );
                                            setMinAge(value);
                                        }}
                                    />

                                    {/* Max age slider */}
                                    <input
                                        type='range'
                                        min='18'
                                        max='65'
                                        value={maxAge}
                                        className='absolute w-full pointer-events-none appearance-none bg-transparent'
                                        style={{
                                            height: "2rem",
                                            margin: "-0.8rem 0",
                                            zIndex: 4,
                                        }}
                                        onChange={handleMaxAgeChange}
                                    />

                                    {/* Display age values */}
                                    <div className='flex justify-between text-sm text-gray-500 mt-4'>
                                        <span>{minAge}</span>
                                        <span>{maxAge}</span>
                                    </div>
                                </div>
                            </div>

                            {/* İlgi Alanları */}
                            <div className='mb-4'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    İlgi Alanları:
                                </label>
                                <div className='flex flex-col lg:flex-row justify-between lg:space-x-4'>
                                    <div className=' w-full lg:w-2/3 mt-2  grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4'>
                                        {[
                                            "Moda",
                                            "Giyim",
                                            "Makyaj ve Kozmetik",
                                            "Saç ve Bakım",
                                            "Cilt Bakımı",
                                            "Ayakkabı",
                                            "Evcil Hayvanlar",
                                            "Araba",
                                            "Motorsiklet",
                                            "Gayrimenkul",
                                            "Yemek Tarifi",
                                            "Restoranlar",
                                            "Gastronomi Yeme İçme",
                                            "Seyahat",
                                            "Fitness ve Sağlık",
                                            "Spor",
                                            "Teknoloji",
                                            "Elektronik",
                                            "Eğitim",
                                            "Kişisel Gelişim",
                                            "Fotoğrafçılık",
                                            "Müzik",
                                            "Film ve Dizi",
                                            "Tiyatro",
                                            "Edebiyat",
                                            "E-Ticaret",
                                            "Finans Piyasaları",
                                            "İş / Business",
                                            "Eğlence ve Oyun",
                                            "Sağlık",
                                            "İnşaat ve Tadilat",
                                            "Doğa",
                                        ].map((item, index) => (
                                            <label
                                                key={index}
                                                className=' w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 inline-flex items-center cursor-pointer mb-2 lg:mb-6'
                                            >
                                                <input
                                                    type='checkbox'
                                                    {...register(
                                                        "preferences.areaOfInterest"
                                                    )}
                                                    value={item}
                                                    className='hidden peer '
                                                />
                                                <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9]  transition-all duration-300 ease-in-out'>
                                                    <div className='w-full h-full bg-white rounded-full'></div>
                                                </div>
                                                <span className='ml-1 text-sm'>
                                                    {item}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='xl:w-2/5 xl:ml-10 xl:mt-5'>
                            {/* İçerik Türü */}
                            <div className='mb-4 w-full'>
                                <div className='flex flex-row'>
                                    <h2 className='text-lg font-semibold mb-4'>
                                        İçerik Türü:
                                    </h2>

                                    {/* Tooltip or Information section */}
                                    <div className='relative mb-4 flex justify-center'>
                                        <button
                                            className='text-black text-sm px-3 py-1 rounded-full'
                                            onMouseEnter={() =>
                                                setShowTooltipTwo(true)
                                            }
                                            onMouseLeave={() =>
                                                setShowTooltipTwo(false)
                                            }
                                        >
                                            <Image
                                                src='/tooltipIcon.png'
                                                alt='brand logo'
                                                height={16}
                                                width={16}
                                                className='rounded-full'
                                            />
                                        </button>
                                        {showTooltipTwo && (
                                            <div className='absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2'>
                                                İçerik üreticilerine ürün
                                                gönderimi sağlayacaksanız ya da
                                                üreticilerin bir fiziki
                                                lokasyona ulaşması gerekiyorsa,
                                                bu alanda içerik türünüzü
                                                belirterek lokasyona göre
                                                eşleştirme gerçekleştirme
                                                yapılması ge
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    UGC’lerinizde tanıtım gerektiren, içerik
                                    türünüzü seçin
                                </label>
                                {/* content_type */}
                                <div className='mb-4 w-full mt-2 grid gap-4 xs:grid-cols-3 xl:grid-cols-3'>
                                    <label className='inline-flex items-center cursor-pointer'>
                                        <input
                                            type='radio'
                                            value='product'
                                            {...register(
                                                "preferences.contentType"
                                            )}
                                            className='hidden peer'
                                        />
                                        <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                            <div className='w-full h-full bg-white rounded-full'></div>
                                        </div>
                                        <span className='ml-1 text-sm'>
                                            Ürün
                                        </span>
                                    </label>

                                    <label className='inline-flex items-center cursor-pointer'>
                                        <input
                                            type='radio'
                                            value='service'
                                            {...register(
                                                "preferences.contentType"
                                            )}
                                            className='hidden peer'
                                        />
                                        <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                            <div className='w-full h-full bg-white rounded-full'></div>
                                        </div>
                                        <span className='ml-1 text-sm'>
                                            Hizmet
                                        </span>
                                    </label>

                                    <label className='inline-flex items-center cursor-pointer'>
                                        <input
                                            type='radio'
                                            value='location'
                                            {...register(
                                                "preferences.contentType"
                                            )}
                                            className='hidden peer'
                                        />
                                        <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                            <div className='w-full h-full bg-white rounded-full'></div>
                                        </div>
                                        <span className='ml-1 text-sm'>
                                            Mekan
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className='w-full md:mt-5'>
                                {/* If Mekan (Place) selected */}
                                {(contentTypes.includes("location") ||
                                    contentTypes.includes("product")) && (
                                    <div>
                                        <div className='flex flex-row'>
                                            <h2 className='text-lg font-semibold mb-4'>
                                                Adres:
                                            </h2>

                                            {/* Tooltip or Information section */}
                                            <div className='relative mb-4 flex justify-center'>
                                                <button
                                                    className='text-black text-sm px-3 py-1 rounded-full'
                                                    onMouseEnter={() =>
                                                        setShowTooltipThree(
                                                            true
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setShowTooltipThree(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <Image
                                                        src='/tooltipIcon.png'
                                                        alt='brand logo'
                                                        height={16}
                                                        width={16}
                                                        className='rounded-full'
                                                    />
                                                </button>
                                                {showTooltipThree && (
                                                    <div className='absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2'>
                                                        Adres bilgileri, tüm
                                                        içerik üreticileri
                                                        tarafından İl, İlçe ve
                                                        Mahalle olarak
                                                        gösterilecektir.
                                                        Onaylanan içerik
                                                        üreticiler, işletme adı
                                                        ve açık adresi
                                                        görüntüleyebilecektir.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Lütfen tanıtılmasını istediğiniz
                                            mekanın adres bilgilerini belirtin
                                        </label>
                                        <div className='grid lg:grid-cols-2 gap-x-8 gap-y-8'>
                                            <div>
                                                <label className='block text-sm font-semibold mb-2'>
                                                    Ülke
                                                </label>
                                                <input
                                                    className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                                    {...register(
                                                        "preferences.addressDetails.country"
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold mb-2'>
                                                    İl
                                                </label>
                                                <input
                                                    className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                                    {...register(
                                                        "preferences.addressDetails.state"
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold mb-2'>
                                                    İlçe
                                                </label>
                                                <input
                                                    className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                                    {...register(
                                                        "preferences.addressDetails.district"
                                                    )}
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold mb-2'>
                                                    Mahalle
                                                </label>
                                                <input
                                                    className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                                    {...register(
                                                        "preferences.addressDetails.neighborhood"
                                                    )}
                                                />
                                            </div>

                                            <div className='col-span-2'>
                                                <label className='block text-sm font-semibold mb-2'>
                                                    İşletme Adı & Adres
                                                </label>
                                                <textarea
                                                    placeholder='Lütfen işletme adını ve açık adres bilgilerini girin.'
                                                    className='w-full text-sm px-3 py-2 border rounded-md focus:outline-none'
                                                    rows={2}
                                                    {...register(
                                                        "preferences.addressDetails.fullAddress"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button
                            type='submit'
                            className=' ButtonBlue text-white py-2 px-4 rounded-md'
                        >
                            {orderLoading ? "Tamamlanıyor..." : "Tamamla"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TabFourth;
