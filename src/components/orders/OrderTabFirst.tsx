"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchAdditionalServices } from "@/store/features/admin/addPriceSlice";
import { setOrderFormData } from "@/store/features/profile/orderSlice";
import { fetchPricePlans } from "@/store/features/admin/pricingSlice";
import Image from "next/image";

export default function TabFirst({
    setActiveTab,
}: {
    setActiveTab: (id: number) => void;
}) {
    const dispatch = useDispatch();

    // State
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedCard, setSelectedCard] = useState<number | string>("");
    const [selectedServices, setSelectedServices] = useState<{
        [key: string]: number;
    }>({});
    const [activeEdit, setActiveEdit] = useState(false);
    const [showTooltipOne, setShowTooltipOne] = useState(false);
    const [activeRatio, setActiveRatio] = useState<string>("9:16");
    const [activeDuration, setActiveDuration] = useState<string>("15s");
    const [selectedPlatform, setSelectedPlatform] =
        useState<string>("instagram");

    const { data: additionalService } = useSelector(
        (state: RootState) => state.addPrice
    );
    const { data: pricing } = useSelector((state: RootState) => state.pricing);

    const [basePrice, setBasePrice] = useState<number>(0);

    const isCustomMode = selectedCard === "";

    const totalAdditionalCharges = useMemo(() => {
        return Object.values(selectedServices).reduce(
            (acc, charge) => acc + charge,
            0
        );
    }, [selectedServices]);

    const getTotalPrice = () => basePrice + totalAdditionalCharges;

    const oneVideoPrice = useMemo(() => {
        if (!isCustomMode) return 0;
        return selectedQuantity > 0
            ? (basePrice + totalAdditionalCharges) / selectedQuantity
            : 0;
    }, [basePrice, totalAdditionalCharges, selectedQuantity, isCustomMode]);

    useEffect(() => {
        dispatch(fetchPricePlans() as any);
        dispatch(fetchAdditionalServices() as any);
    }, [dispatch]);

    useEffect(() => {
        const selectedOption = pricing?.find(
            (option) => option._id === selectedCard
        );
        if (selectedOption && [3, 6, 12].includes(selectedOption.videoCount)) {
            setSelectedQuantity(selectedOption.videoCount);
            setBasePrice(selectedOption.finalPrice);
        }
    }, [selectedCard, pricing]);

    const handleQuantityChange = (change: number) => {
        setSelectedQuantity((prev) => {
            const updated = Math.max(1, prev + change);
            if ([3, 6, 12].includes(updated)) return updated;

            // Custom mode logic
            setSelectedCard("");
            const oneVideo = pricing?.find((option) => option.videoCount === 1);
            const oneVideoPrice = oneVideo?.finalPrice || 0;
            setBasePrice(oneVideoPrice * updated);

            return updated;
        });
    };

    const handleCardSelect = (cardId: string | number) => {
        setSelectedCard(cardId);
        const selectedOption = pricing?.find((option) => option._id === cardId);
        if (selectedOption) {
            if ([3, 6, 12].includes(selectedOption.videoCount)) {
                setSelectedQuantity(selectedOption.videoCount);
                setBasePrice(selectedOption.finalPrice);
            } else {
                setSelectedQuantity(1); // Custom card
            }
        }
    };

    const handleAddService = (key: string, price: number) => {
        setSelectedServices((prev) => {
            const updated = { ...prev };
            if (updated[key]) {
                delete updated[key];
            } else {
                updated[key] = price;
            }
            return updated;
        });

        if (key === "edit") setActiveEdit((prev) => !prev);
    };

    const isServiceSelected = (key: string) =>
        selectedServices.hasOwnProperty(key);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            noOfUgc: selectedQuantity,
            basePrice,
            totalPrice: getTotalPrice(),
            additionalServices: {
                platform: selectedPlatform,
                duration: activeDuration,
                edit: isServiceSelected("edit"),
                aspectRatio: activeRatio,
                share: isServiceSelected("share"),
                coverPicture: isServiceSelected("cover"),
                creatorType: isServiceSelected("influencer"),
                productShipping: isServiceSelected("shipping"),
            },
        };
        dispatch(setOrderFormData(formData));
        toast.success("Order Details Saved Successfully!");
        setActiveTab(1);
    };

    useEffect(() => {
        const updated = { ...selectedServices };
        if (activeDuration === "30s") {
            updated["duration"] =
                additionalService?.thirtySecondDurationPrice || 0;
        } else if (activeDuration === "60s") {
            updated["duration"] =
                additionalService?.sixtySecondDurationPrice || 0;
        } else {
            delete updated["duration"];
        }
        setSelectedServices(updated);
    }, [activeDuration, additionalService]);

    const services = [
        {
            id: 1,
            key: "share",
            image: "/order/orderPic4.svg",
            alt: "Sosyal Medyada Paylaşım",
            title: "Sosyal Medyada Paylaşılsın",
            description:
                "Hazırlanan içerikler onaylandıktan sonra Contentia.io ve içerik üreticilerinin hesaplarından paylaşılır.",
            price: additionalService?.sharePrice || 0,
        },
        {
            id: 2,
            key: "cover",
            image: "/order/orderPic5.svg",
            alt: "Kapak Görseli",
            title: "Kapak Görseli",
            description:
                "Hazırlanacak her video için orijinal resim ve kapak görseli hazırlanır.",
            price: additionalService?.coverPicPrice || 0,
        },
        {
            id: 3,
            key: "influencer",
            image: "/order/orderPic6.svg",
            alt: "Influencer Paketi",
            title: "Influencer Paketi",
            description:
                "Videolarınız Micro Influencerlar tarafından üretilsin.",
            price: additionalService?.creatorTypePrice || 0,
        },
        {
            id: 4,
            key: "shipping",
            image: "/order/orderPic7.svg",
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
                                                        ? "Button text-white"
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
                                                    ? "Button text-white"
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
                                                    ? "Button text-white"
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
                                                activeDuration === "60s"
                                                    ? "Button text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                setActiveDuration("60s")
                                            }
                                        >
                                            60s
                                        </button>
                                    </div>
                                </div>

                                {/* Edit Section */}
                                <div className='sectionBG py-3 px-4 flex items-center justify-between rounded-md'>
                                    <h3 className='text-sm font-semibold w-1/4'>
                                        Edit:
                                    </h3>

                                    <div className='flex gap-2 w-2/4'>
                                        {/* Evet Button */}
                                        <button
                                            type='button'
                                            className={`text-sm px-4 py-1 rounded-md transition ${
                                                activeEdit
                                                    ? "BlueBg text-white"
                                                    : "bg-white border border-gray-300 text-black"
                                            }`}
                                            onClick={() => {
                                                if (!activeEdit) {
                                                    setActiveEdit(true);
                                                    setSelectedServices(
                                                        (prev) => ({
                                                            ...prev,
                                                            edit:
                                                                additionalService?.editPrice ??
                                                                0,
                                                        })
                                                    );
                                                }
                                            }}
                                        >
                                            Evet
                                        </button>

                                        {/* Hayır Button */}
                                        <button
                                            type='button'
                                            className={`text-sm px-4 py-1 rounded-md transition ${
                                                !activeEdit
                                                    ? "BlueBg text-white"
                                                    : "bg-white border border-gray-300 text-black"
                                            }`}
                                            onClick={() => {
                                                if (activeEdit) {
                                                    setActiveEdit(false);
                                                    setSelectedServices(
                                                        (prev) => {
                                                            const updated = {
                                                                ...prev,
                                                            };
                                                            delete updated.edit;
                                                            return updated;
                                                        }
                                                    );
                                                }
                                            }}
                                        >
                                            Hayır
                                        </button>
                                    </div>

                                    {/* Tooltip */}
                                    <div className='relative w-1/4 flex justify-end'>
                                        <button
                                            type='button'
                                            className='text-black text-sm p-1 rounded-full'
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

                                        {showTooltipOne && (
                                            <div className='absolute z-10 top-8 right-0 w-64 bg-gray-800 text-white text-xs p-3 rounded-md shadow-lg'>
                                                İçeriklerinizin orijinal
                                                versiyonu ile birlikte,
                                                seçtiğiniz sosyal medyaya göre
                                                paylaşıma hazır versiyonunu
                                                alın! Başlıklar, altyazılar,
                                                telif hakkı olmayan müzikler,
                                                geçişler ve daha fazlasıyla
                                                desteklenir.
                                            </div>
                                        )}
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
                                                    ? "Button text-white"
                                                    : "bg-white text-black"
                                            }`}
                                            onClick={() =>
                                                setActiveRatio("9:16")
                                            }
                                        >
                                            9:16
                                        </button>
                                        <button
                                            type='button'
                                            className={`text-sm px-3 py-1 rounded ${
                                                activeRatio === "16:9"
                                                    ? "Button text-white"
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
                                    .filter((option) => option.videoCount !== 1)
                                    .map((option) => (
                                        <div
                                            key={option._id}
                                            onClick={() =>
                                                handleCardSelect(option._id)
                                            }
                                            className={`p-4 rounded-lg shadow-xl cursor-pointer ${
                                                selectedCard === option._id
                                                    ? "border-2 BlueBorder sectionBG"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <h3 className='text-sm font-bold'>
                                                {option.videoCount} Farklı Video
                                            </h3>
                                            <p className='text-sm font-bold mb-2'>
                                                {option.videoCount} Farklı
                                                İçerik Üretici
                                            </p>

                                            {option.strikeThroughPrice && (
                                                <div className='mb-2'>
                                                    <p className='Button inline text-white font-medium rounded-md px-1 py-0.5 text-xs'>
                                                        {(
                                                            option.strikeThroughPrice -
                                                            option.finalPrice
                                                        ).toLocaleString(
                                                            "tr-TR"
                                                        )}{" "}
                                                        TL İndirim
                                                    </p>
                                                </div>
                                            )}

                                            {option.strikeThroughPrice && (
                                                <span className='text-sm font-semibold line-through'>
                                                    {option.strikeThroughPrice.toLocaleString(
                                                        "tr-TR"
                                                    )}{" "}
                                                    TL
                                                </span>
                                            )}

                                            <p className='mt-2 text-sm BlueText font-semibold'>
                                                {option.finalPrice.toLocaleString(
                                                    "tr-TR"
                                                )}{" "}
                                                TL
                                                <span className='text-xs text-black font-thin'>
                                                    {" "}
                                                    / {option.videoCount} Video
                                                </span>
                                            </p>
                                        </div>
                                    ))}

                            {/* Custom Card */}
                            <div
                                className={`bg-white rounded-lg p-4 shadow-xl cursor-pointer ${
                                    isCustomMode
                                        ? "border-2 BlueBorder sectionBG"
                                        : "sectionBG"
                                }`}
                                onClick={() => setSelectedCard("")}
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
                                    {isCustomMode
                                        ? oneVideoPrice.toLocaleString("tr-TR")
                                        : "—"}{" "}
                                    TL
                                    <span className='text-xs text-black font-thin'>
                                        {" "}
                                        / Video
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
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
                                            {service.price.toLocaleString(
                                                "tr-TR"
                                            )}{" "}
                                            TL
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
                        <div className='bg-white p-4 flex justify-end items-center border-gray-300'>
                            {/* Left Section */}
                            <div className='mr-4'>
                                <p className='text-lg font-semibold BlueText'>
                                    1 Video x{" "}
                                    {(
                                        getTotalPrice() / selectedQuantity
                                    ).toLocaleString("tr-TR")}{" "}
                                    TL
                                </p>
                                <p className='text-sm BlueText'>
                                    Toplam:{" "}
                                    {getTotalPrice().toLocaleString("tr-TR")} TL
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type='submit'
                                className='Button text-white font-semibold py-2 px-4 rounded-lg'
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
