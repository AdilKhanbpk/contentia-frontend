"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchAdditionalServices } from "@/store/features/admin/addPriceSlice";
import { setOrderFormData } from "@/store/features/profile/orderSlice";
import { fetchPricePlans } from "@/store/features/admin/pricingSlice";
import Image from "next/image";
import { getAccessToken } from "@/utils/checkToken";

export default function TabFirst({
    setActiveTab,
}: {
    setActiveTab: (id: number) => void;
}) {
    const dispatch = useDispatch();

    // State Management
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedCard, setSelectedCard] = useState<number | string>("");
    const [additionalCharges, setAdditionalCharges] = useState<number[]>([]);
    const [activeEdit, setActiveEdit] = useState(false);
    const [showTooltipOne, setShowTooltipOne] = useState(false);
    const [activeRatio, setActiveRatio] = useState<string>("9:16");
    const [activeDuration, setActiveDuration] = useState<string>("15s");
    const [selectedPlatform, setSelectedPlatform] =
        useState<string>("instagram");

    const [selectedServices, setSelectedServices] = useState<{
        [key: string]: boolean;
    }>({
        share: false,
        cover: false,
        influencer: false,
        shipping: false,
    });

    // Fetch Redux State
    const { data: additionalService } = useSelector(
        (state: RootState) => state.addPrice
    );
    const { data: pricing } = useSelector((state: RootState) => state.pricing);

    const oneVideoPrice =
        pricing?.find((option: any) => option.videoCount === 1)?.finalPrice ||
        3000;

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchPricePlans() as any);
        const token = getAccessToken();
        if (!token) return;

        dispatch(fetchAdditionalServices(token) as any);
    }, [dispatch]);

    const handleQuantityChange = (change: number) => {
        setSelectedQuantity((prevQuantity) =>
            Math.max(1, prevQuantity + change)
        );

        // Only reset selected plan if it's already selected
        if (selectedCard) {
            setSelectedCard("");
        }
    };

    const handleCardSelect = (cardId: string | number) => {
        setSelectedCard(cardId);
        const selectedOption = pricing?.find(
            (option: any) => option._id === cardId
        );

        if (selectedOption) {
            setSelectedQuantity(selectedOption.videoCount); // Set quantity based on the selected plan
        }
    };

    // Handle additional service selection
    const handleAddService = (
        serviceType: keyof typeof selectedServices,
        charge?: number
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

    // Calculate total additional charges
    const totalAdditionalCharges = additionalCharges.reduce(
        (acc, charge) => acc + charge,
        0
    );

    // Calculate final price
    const getPrice = (
        quantity: number,
        cardId: number | string,
        additionalCharges: number
    ): string => {
        if (cardId) {
            const selectedPackage = pricing?.find(
                (option: any) => option._id === cardId
            );
            if (selectedPackage) {
                return (selectedPackage.finalPrice + additionalCharges).toFixed(
                    2
                );
            }
        }
        return (quantity * oneVideoPrice + additionalCharges).toFixed(2);
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Construct form data
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
        toast.success("Order Details Saved Successfully!");
        setActiveTab(2);
    };

    // Available additional services
    const services = [
        {
            id: 1,
            key: "share",
            image: "/videoCarousal.png",
            alt: "Sosyal Medyada Paylaşım",
            title: "Sosyal Medyada Paylaşılsın",
            description:
                "Hazırlanan içerikler onaylandıktan sonra Contentia.io ve içerik üreticilerinin hesaplarından paylaşılır.",
            price: additionalService?.sharePrice || 0,
        },
        {
            id: 2,
            key: "cover",
            image: "/videoCarousal.png",
            alt: "Kapak Görseli",
            title: "Kapak Görseli",
            description:
                "Hazırlanacak her video için orijinal resim ve kapak görseli hazırlanır.",
            price: additionalService?.coverPicPrice || 0,
        },
        {
            id: 3,
            key: "influencer",
            image: "/videoCarousal.png",
            alt: "Influencer Paketi",
            title: "Influencer Paketi",
            description:
                "Videolarınız Micro Influencerlar tarafından üretilsin.",
            price: additionalService?.creatorTypePrice || 0,
        },
        {
            id: 4,
            key: "shipping",
            image: "/videoCarousal.png",
            alt: "Ürün Gönderimi Kargo Ücreti",
            title: "Ürün Gönderimi Kargo Ücreti",
            description:
                "İçeriklerinizde tanıtımını yapmak istediğiniz ürünü, içerik üreticilerin adreslerine kargolamanız gerekir. Kargo kodu ile gönderimini ek ücret ödemeden sağlayabilirsiniz.",
            price: additionalService?.shippingPrice || 0,
        },
    ];

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
                                                label: "Instagram",
                                                value: "instagram",
                                            },
                                            {
                                                label: "TikTok",
                                                value: "tiktok",
                                            },
                                            {
                                                label: "Facebook",
                                                value: "facebook",
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
                                                setActiveDuration("15s")
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
                                                setActiveDuration("30s")
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
                                                setActiveDuration("60s")
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
                                            onClick={() => setActiveEdit(true)}
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
                                            onClick={() => setActiveEdit(false)}
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
                                                setActiveDuration("9:16")
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
                                                setActiveRatio("16:9")
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
                            {/* Displaying pricing where videoCount is NOT 1 */}
                            {pricing &&
                                pricing
                                    .filter(
                                        (option: any) => option.videoCount !== 1
                                    )
                                    .map((option) => (
                                        <div
                                            key={option._id}
                                            onClick={() =>
                                                handleCardSelect(option._id)
                                            }
                                            className={`p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-xl cursor-pointer ${
                                                selectedCard === option._id
                                                    ? "border-2 BlueBorder sectionBG"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <h3 className='text-sm font-bold'>
                                                {option.videoCount} Farklı
                                                Video,
                                            </h3>
                                            <p className='text-sm font-bold mb-2'>
                                                {option.videoCount} Farklı
                                                İçerik Üretici
                                            </p>
                                            <div className='mb-2'>
                                                <p className='ButtonBlue inline text-white font-medium rounded-md px-1 py-0.5 text-xs'>
                                                    {option.strikeThroughPrice &&
                                                        option.strikeThroughPrice -
                                                            option.finalPrice}{" "}
                                                    TL İndirim
                                                </p>
                                            </div>
                                            <span className='text-sm font-semibold line-through'>
                                                {option.strikeThroughPrice} TL
                                            </span>
                                            <p className='mt-2 text-sm BlueText font-semibold'>
                                                {option.finalPrice} TL
                                                <span className='text-xs text-black font-thin'>
                                                    {" "}
                                                    / {option.videoCount} Video
                                                </span>
                                            </p>
                                        </div>
                                    ))}

                            {/* Pricing Option Where videoCount === 1 */}
                            {pricing &&
                                pricing
                                    .filter(
                                        (option: any) => option.videoCount === 1
                                    )
                                    .map((option: any) => (
                                        <div
                                            key={option._id}
                                            className={`bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-4 shadow-xl cursor-pointer ${
                                                selectedCard === option._id
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
                                                    onClick={() =>
                                                        handleQuantityChange(-1)
                                                    }
                                                    disabled={
                                                        selectedQuantity === 1
                                                    }
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
                                                    onClick={() =>
                                                        handleQuantityChange(1)
                                                    }
                                                    className='border-2 BlueBorder text-white font-medium py-2 w-16 rounded-full flex items-center justify-center'
                                                >
                                                    <span className='BlueText text-3xl font-extrabold'>
                                                        +
                                                    </span>
                                                </button>
                                            </div>
                                            <p className='mt-6 text-sm BlueText font-semibold'>
                                                {oneVideoPrice}
                                                TL
                                                <span className='text-xs text-black font-thin'>
                                                    {" "}
                                                    / Video
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                        </div>
                    </div>

                    {/* //////////////// */}
                    <div className='bg-white px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 lg:px-16 lg:py-6 rounded-lg '>
                        <div>
                            <div className='flex flex-row justify-between '>
                                {/* Section Header */}
                                <h2 className='text-lg font-semibold mb-4'>
                                    Ek Hizmetlerimiz
                                </h2>
                                {/* <div>
                                    <Image
                                        src='/dropDownIcon.png'
                                        alt='brand logo'
                                        height={20}
                                        width={20}
                                        className=' ml-2  rounded-full'
                                    />
                                </div> */}
                            </div>
                            <div>
                                <p className='mb-6'>
                                    Ek hizmetlerle UGC'lerinizi ve reklam
                                    kampanyalarınızı güçlendirin
                                </p>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className='bg-white p-2 sm:p-3 md:p-4 lg:p-4 rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center'
                                >
                                    <Image
                                        src={service.image}
                                        alt={service.alt}
                                        width={250}
                                        height={300}
                                        className='rounded-lg object-cover'
                                    />
                                    <div className='w-2/3 ml-2 sm:ml-3 md:ml-4 lg:ml-4 flex flex-col'>
                                        <h3 className='text-md font-semibold'>
                                            {service.title}
                                        </h3>
                                        <p className='text-gray-600'>
                                            {service.description}
                                        </p>
                                        <span className='font-semibold text-black'>
                                            {service.price}
                                            <span className='text-sm font-thin'>
                                                {" "}
                                                / Video
                                            </span>
                                        </span>
                                        <button
                                            type='button'
                                            className={`mt-2 px-2 py-1 border-2 rounded-md font-semibold w-20 ${
                                                selectedServices[service.key]
                                                    ? "border-red-500 text-red-500 hover:bg-red-50"
                                                    : "BlueBorder BlueText hover:bg-blue-50"
                                            }`}
                                            onClick={() =>
                                                handleAddService(
                                                    service.key,
                                                    service.price || 0
                                                )
                                            }
                                        >
                                            {selectedServices[service.key]
                                                ? "Kaldır"
                                                : "Ekle"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='fixed bottom-0 left-0 w-full mx-auto lg:px-24'>
                        <div className=' bg-white p-4 flex justify-end items-center border-gray-300'>
                            {/* Left Section */}
                            <div className='mr-4'>
                                <p className='text-lg font-semibold BlueText'>
                                    1 Video x {oneVideoPrice} TL
                                </p>
                                <p className='text-sm BlueText'>
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
                </div>
            </form>
        </>
    );
}
