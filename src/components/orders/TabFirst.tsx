"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchAdditionalServices } from "@/store/features/admin/addPriceSlice";
import { setOrderFormData } from "@/store/features/profile/orderSlice";

export default function TabFirst({
    setActiveTab,
}: {
    setActiveTab: (id: number) => void;
}) {
    const [showTooltipOne, setShowTooltipOne] = useState(false);
    const [activeEdit, setActiveEdit] = useState(false);
    const [activeRatio, setActiveRatio] = useState<string>("9:16");
    const [activeDuration, setActiveDuration] = useState<string>("15s");
    const [selectedPlatform, setSelectedPlatform] = useState<string>("tiktok");

    const [token, setToken] = useState<string>("");
    const dispatch = useDispatch();

    const { data: additionalService } = useSelector(
        (state: RootState) => state.addPrice
    );

    const { loading, error } = useSelector((state: RootState) => state.order);

    const [selectedServices, setSelectedServices] = useState<{
        [key: string]: boolean;
    }>({
        share: false,
        cover: false,
        influencer: false,
        shipping: false,
    });

    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [additionalCharges, setAdditionalCharges] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken") || "";
        setToken(storedToken);
        if (storedToken) {
            dispatch(fetchAdditionalServices(storedToken) as any);
        }
    }, [dispatch]);

    const handleEditChange = (edit: boolean) => {
        setActiveEdit(edit);
    };

    const handleRatioChange = (ratio: string) => {
        setActiveRatio(ratio);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDurationChange = (duration: string) => {
        setActiveDuration(duration);
    };

    const handlePlatformChange = (platform: string) => {
        setSelectedPlatform(platform);
    };

    const handleQuantityChange = (change: number) => {
        setSelectedQuantity((prevQuantity) =>
            Math.max(1, prevQuantity + change)
        );
    };

    const handleCardSelect = (cardId: number) => {
        setSelectedCard(cardId);
        switch (cardId) {
            case 3:
                setSelectedQuantity(3);
                break;
            case 6:
                setSelectedQuantity(6);
                break;
            case 12:
                setSelectedQuantity(12);
                break;
            case 4:
                break;
        }
    };

    const handleAddService = (
        serviceType: keyof typeof selectedServices,
        charge: number | undefined
    ) => {
        if (charge !== undefined) {
            setSelectedServices((prev) => ({
                ...prev,
                [serviceType]: !prev[serviceType],
            }));

            setAdditionalCharges((prev) =>
                prev.includes(charge)
                    ? prev.filter((c) => c !== charge)
                    : [...prev, charge]
            );
        }
    };

    const totalAdditionalCharges = additionalCharges.reduce(
        (acc, charge) => acc + charge,
        0
    );

    const getPrice = (
        quantity: number,
        cardId: number | null,
        additionalCharges: number
    ): string => {
        let pricePerVideo = 3000;
        let totalPrice = 0;

        if (cardId === 3) {
            totalPrice = 9000 - 450;
        } else if (cardId === 6) {
            totalPrice = 18000 - 2401;
        } else if (cardId === 12) {
            totalPrice = 36000 - 8401;
        } else {
            totalPrice = quantity * pricePerVideo;
        }

        totalPrice += additionalCharges;
        return totalPrice.toFixed(2);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!token) {
            toast.error("Please login first");
            return;
        }

        // Only dispatch the form data without creating an order
        const formData = {
            noOfUgc: selectedQuantity,
            totalPrice: Number(
                getPrice(selectedQuantity, selectedCard, totalAdditionalCharges)
            ),
            additionalServices: {
                platform: selectedPlatform,
                duration: activeDuration,
                edit: activeEdit,
                aspectRatio: activeRatio,
                share: selectedServices.share,
                coverPicture: selectedServices.cover,
                creatorType: selectedServices.influencer,
                productShipping: selectedServices.shipping,
            },
        };
        dispatch(setOrderFormData(formData));
        // console.log("🚀 ~ handleSubmit ~ formData:", formData);
        toast.success("Order Details Saved Successfully!");
        setActiveTab(2);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className=' px-4 sm:px-6 md:px-12 lg:px-24 '>
                    <div className='bg-white flex flex-col  justify-center lg:flex-row lg:justify-between p-5'>
                        <div className='lg:w-1/3 mb-6 md:mb-0'>
                            <img
                                src='/roiImage.jpg'
                                alt='Content Creator'
                                className='rounded-lg w-full min-h-full h-auto'
                            />
                        </div>

                        <div className='lg:w-2/3 bg-white  lg:px-4 lg:pr-24'>
                            <h2 className='text-xl font-bold mb-2'>
                                Siparişini Özelleştir:
                            </h2>
                            <div className='grid grid-cols-1 gap-4'>
                                {/* Platform Section */}
                                <div className='sectionBG py-2 flex flex-row px-2 items-end rounded-md'>
                                    <h3 className='text-sm font-semibold mb-1 w-1/4'>
                                        Platform:
                                    </h3>
                                    <div className='flex space-x-4'>
                                        {[
                                            {
                                                label: "TikTok",
                                                value: "tiktok",
                                            },
                                            {
                                                label: "Facebook",
                                                value: "facebook",
                                            },
                                            {
                                                label: "Instagram",
                                                value: "instagram",
                                            },
                                            {
                                                label: "Youtube",
                                                value: "youtube",
                                            },
                                            {
                                                label: "X - Twitter",
                                                value: "x",
                                            },
                                            {
                                                label: "Linkedin",
                                                value: "linkedin",
                                            },
                                        ].map((platform) => (
                                            <button
                                                key={platform.value}
                                                type='button'
                                                className={`px-1 py-1 min-w-16 max-w-20 border text-xs rounded-sm ${
                                                    selectedPlatform ===
                                                    platform.value
                                                        ? "ButtonBlue text-white"
                                                        : "bg-gray-100"
                                                }`}
                                                onClick={() => {
                                                    setSelectedPlatform(
                                                        platform.value
                                                    );
                                                }}
                                            >
                                                {platform.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className='sectionBG py-2 flex flex-row px-2 items-end rounded-md'>
                                    <h3 className='text-sm font-semibold mb-1 w-1/4'>
                                        Süre:
                                    </h3>
                                    <div className='flex space-x-2'>
                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeDuration === "15s"
                                                    ? "ButtonBlue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                handleDurationChange("15s")
                                            }
                                        >
                                            15s
                                        </button>

                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeDuration === "30s"
                                                    ? "ButtonBlue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                handleDurationChange("30s")
                                            }
                                        >
                                            30s
                                        </button>

                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeDuration === "Diger"
                                                    ? "ButtonBlue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                handleDurationChange("Diger")
                                            }
                                        >
                                            Diğer
                                        </button>
                                    </div>
                                </div>

                                {/* Edit Section */}
                                <div className='sectionBG py-2 flex flex-row px-2 items-end rounded-md'>
                                    <h3 className='text-sm font-semibold mb-1 w-1/4'>
                                        Edit:
                                    </h3>
                                    <div className='flex space-x-2 w-2/4'>
                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeEdit === true
                                                    ? "ButtonBlue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                handleEditChange(true)
                                            }
                                        >
                                            Evet
                                        </button>

                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeEdit === false
                                                    ? "ButtonBlue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                handleEditChange(false)
                                            }
                                        >
                                            Hayır
                                        </button>

                                        <div className='relative w-1/4 flex justify-end items-end'>
                                            <button
                                                type='button'
                                                className='text-black text-sm px-3 py-1 rounded-full'
                                                onMouseEnter={() =>
                                                    setShowTooltipOne(true)
                                                }
                                                onMouseLeave={() =>
                                                    setShowTooltipOne(false)
                                                }
                                            >
                                                <Image
                                                    src='/tooltipIcon.png'
                                                    alt='tooltip icon'
                                                    height={16}
                                                    width={16}
                                                    className='rounded-full'
                                                />
                                            </button>

                                            {/* Tooltip Content */}
                                            {showTooltipOne && (
                                                <div className='absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2'>
                                                    İçeriklerinizin orjinal
                                                    versiyonu ile birlikte,
                                                    seçtiğiniz sosyal medyaya
                                                    göre paylaşıma hazır
                                                    versiyonunu alın! Başlıklar,
                                                    altyazılar, telif hakkı
                                                    bulunmayan müzikler,
                                                    geçişler ve daha fazlasıyla
                                                    destekleyin.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Aspect Ratio Section */}
                                <div className='sectionBG py-2 flex flex-row px-2 items-end rounded-md'>
                                    <h3 className='text-sm font-semibold mb-1 w-1/4'>
                                        En Boy Oranı:
                                    </h3>
                                    <div className='flex space-x-2'>
                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeRatio === "9:16"
                                                    ? "ButtonBlue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                handleRatioChange("9:16")
                                            }
                                        >
                                            9:16
                                        </button>
                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeRatio === "16:9"
                                                    ? "ButtonBlue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                handleRatioChange("16:9")
                                            }
                                        >
                                            16:9
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='my-2 px-4 py-2 sm:my-3 sm:px-8 sm:py-4 md:my-4 md:px-12 md:py-5 lg:my-4 lg:px-16 lg:py-6 bg-white'>
                        <h2 className='text-lg font-semibold pt-4 mb-8'>
                            UGC Adedini Seç:
                        </h2>
                        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                            {/* 3 Videos */}
                            <div
                                onClick={() => handleCardSelect(3)}
                                className={`p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-xl cursor-pointer ${
                                    selectedCard === 3
                                        ? "border-2 BlueBorder sectionBG"
                                        : "bg-white"
                                }`}
                            >
                                <h3 className='text-sm font-bold'>
                                    3 Farklı Video,
                                </h3>
                                <p className='text-sm font-bold mb-2'>
                                    3 Farklı İçerik Üretici
                                </p>
                                <div className='mb-2'>
                                    <button className='ButtonBlue text-white font-medium rounded-md px-1 py-0.5 text-xs'>
                                        450 TL İndirim
                                    </button>
                                </div>
                                <span className='text-sm font-semibold line-through'>
                                    9.000 TL
                                </span>
                                <p className='mt-2 text-sm BlueText font-semibold'>
                                    8.550 TL
                                    <span className='text-xs text-black font-thin'>
                                        {" "}
                                        / 3 Video
                                    </span>
                                </p>
                            </div>

                            {/* 6 Videos */}
                            <div
                                onClick={() => handleCardSelect(6)}
                                className={`p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-xl cursor-pointer ${
                                    selectedCard === 6
                                        ? "border-2 BlueBorder sectionBG"
                                        : "bg-white"
                                }`}
                            >
                                <h3 className='text-sm font-bold'>
                                    6 Farklı Video,
                                </h3>
                                <p className='text-sm font-bold mb-2'>
                                    6 Farklı İçerik Üretici
                                </p>
                                <div className='mb-2'>
                                    <button className='ButtonBlue text-white font-medium rounded-md px-1 py-0.5 text-xs'>
                                        2.401 TL İndirim
                                    </button>
                                </div>
                                <span className='text-sm font-semibold line-through'>
                                    18.000 TL
                                </span>
                                <p className='mt-2 text-sm BlueText font-semibold'>
                                    15.599 TL
                                    <span className='text-xs text-black font-thin'>
                                        {" "}
                                        / 6 Video
                                    </span>
                                </p>
                            </div>

                            {/* 12 Videos */}
                            <div
                                onClick={() => handleCardSelect(12)}
                                className={`p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-xl cursor-pointer ${
                                    selectedCard === 12
                                        ? "border-2 BlueBorder sectionBG"
                                        : "bg-white"
                                }`}
                            >
                                <h3 className='text-sm font-bold'>
                                    12 Farklı Video,
                                </h3>
                                <p className='text-sm font-bold mb-2'>
                                    12 Farklı İçerik Üretici
                                </p>
                                <div className='mb-2'>
                                    <button className='ButtonBlue text-white font-medium rounded-md px-1 py-0.5 text-xs'>
                                        8.401 TL İndirim
                                    </button>
                                </div>
                                <span className='text-sm font-semibold line-through'>
                                    36.000 TL
                                </span>
                                <p className='mt-2 text-sm BlueText font-semibold'>
                                    27.599 TL
                                    <span className='text-xs text-black font-thin'>
                                        {" "}
                                        / 12 Video
                                    </span>
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            <div
                                onClick={() => handleCardSelect(4)}
                                className={`bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-4 shadow-xl cursor-pointer ${
                                    selectedCard === 4
                                        ? "border-2 BlueBorder sectionBG"
                                        : "sectionBG"
                                }`}
                            >
                                <h3 className='text-base font-bold mb-2'>
                                    İçerik Adedi Seç:
                                </h3>
                                <div className='flex items-center gap-4'>
                                    <button
                                        type='button'
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={selectedQuantity === 1}
                                        className='border-2 BlueBorder text-white font-medium py-2 w-16 rounded-full flex items-center justify-center'
                                    >
                                        <span className='BlueText text-3xl font-extrabold'>
                                            -
                                        </span>
                                    </button>
                                    <span className='text-sm BlueText font-semibold'>
                                        {selectedQuantity} Video
                                    </span>
                                    <button
                                        type='button'
                                        onClick={() => handleQuantityChange(1)}
                                        className='border-2 BlueBorder text-white font-medium py-2 w-16 rounded-full flex items-center justify-center'
                                    >
                                        <span className='BlueText text-3xl font-extrabold'>
                                            +
                                        </span>
                                    </button>
                                </div>
                                <p className='mt-6 text-sm BlueText font-semibold'>
                                    {getPrice(
                                        selectedQuantity,
                                        selectedCard,
                                        totalAdditionalCharges
                                    )}{" "}
                                    TL{" "}
                                    <span className='text-xs text-black font-thin'>
                                        {" "}
                                        / Video
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* //////////////// */}
                    <div className='bg-white px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 lg:px-16 lg:py-6 rounded-lg '>
                        <div onClick={handleToggle}>
                            <div className='flex flex-row justify-between '>
                                {/* Section Header */}
                                <h2 className='text-lg font-semibold mb-4'>
                                    Ek Hizmetlerimiz
                                </h2>
                                <div>
                                    <Image
                                        src='/dropDownIcon.png'
                                        alt='brand logo'
                                        height={20}
                                        width={20}
                                        className={`rounded-full ml-2 ${
                                            !isOpen
                                                ? "rotate-180 rounded-full"
                                                : "rounded-full"
                                        }`}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className='mb-6'>
                                    Ek hizmetlerle UGC'lerinizi ve reklam
                                    kampanyalarınızı güçlendirin
                                </p>
                            </div>
                        </div>

                        {isOpen && (
                            <div className='space-y-4'>
                                {/* Card 1 - Share */}
                                <div className='bg-white p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center'>
                                    <Image
                                        src='/videoCarousal.png'
                                        alt='Sosyal Medyada Paylaşım'
                                        width={250}
                                        height={300}
                                        className='rounded-lg object-cover'
                                    />
                                    <div className='w-2/3 ml-2 sm:ml-3 md:ml-4 lg:ml-4 flex flex-col'>
                                        <h3 className='text-md font-semibold'>
                                            Sosyal Medyada Paylaşılsın
                                        </h3>
                                        <p className='text-gray-600'>
                                            Hazırlanan içerikler onaylandıktan
                                            sonra Contentia.io ve içerik
                                            üreticilerinin hesaplarından
                                            paylaşılır.
                                        </p>
                                        <span className='font-semibold text-black'>
                                            {additionalService?.sharePrice}
                                            <span className='text-sm font-thin'>
                                                {" "}
                                                / Video
                                            </span>
                                        </span>
                                        <button
                                            type='button'
                                            className={`mt-2 px-2 py-1 border-2 rounded-md font-semibold w-20 ${
                                                selectedServices.share
                                                    ? "border-red-500 text-red-500 hover:bg-red-50"
                                                    : "BlueBorder BlueText hover:bg-blue-50"
                                            }`}
                                            onClick={() =>
                                                handleAddService(
                                                    "share",
                                                    additionalService?.sharePrice ||
                                                        0
                                                )
                                            }
                                        >
                                            {selectedServices.share
                                                ? "Kaldır"
                                                : "Ekle"}
                                        </button>
                                    </div>
                                </div>

                                {/* Card 2 - Cover Picture */}
                                <div className='bg-white p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center'>
                                    <Image
                                        src='/videoCarousal.png'
                                        alt='Kapak Görseli'
                                        width={250}
                                        height={300}
                                        className='rounded-lg object-cover'
                                    />
                                    <div className='w-2/3 ml-2 sm:ml-3 md:ml-4 lg:ml-4 flex flex-col'>
                                        <h3 className='text-md font-semibold'>
                                            Kapak Görseli
                                        </h3>
                                        <p className='text-gray-600'>
                                            Hazırlanacak her video için orijinal
                                            resim ve kapak görseli hazırlanır.
                                        </p>
                                        <span className='font-semibold text-black'>
                                            {additionalService?.coverPicPrice}
                                            <span className='text-sm font-thin'>
                                                {" "}
                                                / Video
                                            </span>
                                        </span>
                                        <button
                                            type='button'
                                            className={`mt-2 px-2 py-1 border-2 rounded-md font-semibold w-20 ${
                                                selectedServices.cover
                                                    ? "border-red-500 text-red-500 hover:bg-red-50"
                                                    : "BlueBorder BlueText hover:bg-blue-50"
                                            }`}
                                            onClick={() =>
                                                handleAddService(
                                                    "cover",
                                                    additionalService?.coverPicPrice ||
                                                        0
                                                )
                                            }
                                        >
                                            {selectedServices.cover
                                                ? "Kaldır"
                                                : "Ekle"}
                                        </button>
                                    </div>
                                </div>

                                {/* Card 3 - Influencer */}
                                <div className='bg-white p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center'>
                                    <Image
                                        src='/videoCarousal.png'
                                        alt='Influencer Paketi'
                                        width={250}
                                        height={300}
                                        className='rounded-lg object-cover'
                                    />
                                    <div className='w-2/3 ml-2 sm:ml-3 md:ml-4 lg:ml-4 flex flex-col'>
                                        <h3 className='text-md font-semibold'>
                                            Influencer Paketi
                                        </h3>
                                        <p className='text-gray-600'>
                                            Videolarınız Micro Influencerlar
                                            tarafından üretilsin.
                                        </p>
                                        <span className='font-semibold text-black'>
                                            {
                                                additionalService?.creatorTypePrice
                                            }
                                            <span className='text-sm font-thin'>
                                                {" "}
                                                / Video
                                            </span>
                                        </span>
                                        <button
                                            type='button'
                                            className={`mt-2 px-2 py-1 border-2 rounded-md font-semibold w-20 ${
                                                selectedServices.influencer
                                                    ? "border-red-500 text-red-500 hover:bg-red-50"
                                                    : "BlueBorder BlueText hover:bg-blue-50"
                                            }`}
                                            onClick={() =>
                                                handleAddService(
                                                    "influencer",
                                                    additionalService?.creatorTypePrice ||
                                                        0
                                                )
                                            }
                                        >
                                            {selectedServices.influencer
                                                ? "Kaldır"
                                                : "Ekle"}
                                        </button>
                                    </div>
                                </div>

                                {/* Card 4 - Shipping */}
                                <div className='bg-white p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center'>
                                    <Image
                                        src='/videoCarousal.png'
                                        alt='Ürün Gönderimi Kargo Ücreti'
                                        width={250}
                                        height={300}
                                        className='rounded-lg object-cover'
                                    />
                                    <div className='w-2/3 ml-2 sm:ml-3 md:ml-4 lg:ml-4 flex flex-col'>
                                        <h3 className='text-md font-semibold'>
                                            Ürün Gönderimi Kargo Ücreti
                                        </h3>
                                        <p className='text-gray-600'>
                                            İçeriklerinizde tanıtımını yapmak
                                            istediğiniz ürünü, içerik
                                            üreticilerin adreslerine
                                            kargolamanız gerekir. Kargo kodu ile
                                            gönderimini ek ücret ödemeden
                                            sağlayabilirsiniz
                                        </p>
                                        <span className='font-semibold text-black'>
                                            {additionalService?.shippingPrice}
                                            <span className='text-sm font-thin'>
                                                {" "}
                                                / Video
                                            </span>
                                        </span>
                                        <button
                                            type='button'
                                            className={`mt-2 px-2 py-1 border-2 rounded-md font-semibold w-20 ${
                                                selectedServices.shipping
                                                    ? "border-red-500 text-red-500 hover:bg-red-50"
                                                    : "BlueBorder BlueText hover:bg-blue-50"
                                            }`}
                                            onClick={() =>
                                                handleAddService(
                                                    "shipping",
                                                    additionalService?.shippingPrice ||
                                                        0
                                                )
                                            }
                                        >
                                            {selectedServices.shipping
                                                ? "Kaldır"
                                                : "Ekle"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='bg-white my-2 py-2 px-4 sm:my-3 sm:py-3 sm:px-5 md:my-4 md:py-4 md:px-6 lg:my-4 lg:py-4 lg:px-6 flex justify-end items-center border-gray-300'>
                        {/* Left Section */}
                        <div className='mr-4'>
                            <p className='text-lg font-semibold text-indigo-700'>
                                1 Video x 3.000 TL
                            </p>
                            <p className='text-sm text-indigo-500'>
                                Toplam:{" "}
                                {getPrice(
                                    selectedQuantity,
                                    selectedCard,
                                    totalAdditionalCharges
                                )}{" "}
                                TL
                            </p>
                        </div>
                        <button
                            type='submit'
                            // onClick={() => setActiveTab(1)}
                            className='ButtonBlue text-white font-semibold py-2 px-4 rounded-lg'
                        >
                            İleri
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
