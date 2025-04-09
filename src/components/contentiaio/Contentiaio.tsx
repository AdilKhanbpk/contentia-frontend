"use client";
import { useEffect } from "react";
import Image from "next/image";
import MyCarousel from "@/components/carousel/MyCarousel";
import CustomCard from "@/components/customCard/CustomCard";
import SmallCard from "@/components/customCard/SmallCard";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchLandingPage } from "@/store/features/admin/lanPageSlice";
import { fetchPricePlans } from "@/store/features/admin/pricingSlice";
import DOMPurify from "dompurify";
import Slider from "react-slick";

const CARDS = [
    {
        image: "image1.webp",
        title: "Doğrudan Performans Etkisi",
        description:
            "Dijital pazarlama süreçlerini gerçek ​kullanıcılar tarafından içeriklerle ​kampanyanızı destekleyin",
    },
    {
        image: "image2.webp",
        title: "Birkaç Dakikada Sipariş Oluşturun",
        description:
            "Dijital pazarlama süreçlerini gerçek ​kullanıcılar tarafından içeriklerle ​kampanyanızı destekleyin",
    },
    {
        image: "image3.webp",
        title: "Özel Temsilcinize Danışın",
        description:
            "Aklınıza takılan noktalarda senaryo, brief ve ​konseptler hakkında temsilcinizden destek ​alın",
    },
    {
        image: "image4.webp",
        title: "Zamanında ve Uygun Fiyatlarla",
        description:
            "İçeriklerinizi planlayın, zamanında ve uygun ​fiyatlara UGC’lere sahip olun",
    },
    {
        image: "image5.webp",
        title: "Güvenilir İçerik Üreticilerle Çalışın",
        description:
            "Platformumuz tarafından seçilmiş, içerik ​üreticilerle çalışın",
    },
    {
        image: "image6.webp",
        title: "Kişiselleştirilmiş İçeriklere Sahip",
        description:
            "Marka kimliğinize, ürün detaylarınıza, sosyal ​medyanıza ve hedeflerinize uygun ​kişiselleştirilmiş içeriklere erişin",
    },
];

const METRICS = [
    {
        image: "/roiImage.jpg",
        alt: "ROI Image",
        buttonText: "%50 Etkileşim Artışı",
        description:
            "Gerçek kullanıcılar tarafından ​oluşturulan içeriklerle %50'ye varan ​Etkileşim ve %20'ye varan ROI artışı ​sağlanıyor.",
    },
    {
        image: "/ctrIncrease.jpg",
        alt: "CTR Image",
        buttonText: "%73 Tıklanma Oranı Artışı",
        description:
            "UGC içeren reklam kampanylarında ​%73'e varan Tıklanma Oranı (CTR) ​artışı ve %50'ye varan Tıklanma ​Maliyeti düşüşü gözlemleniyor.",
    },
    {
        image: "/cpiImage.jpg",
        alt: "CPI Image",
        buttonText: "85% Gü​venilirlik Artışı",
        description:
            "Kullanıcıların %85'i Influencer’lar ​tarafından üretilen içerikleri daha ​güvenilir buluyor.",
    },
];

const STEPS = [
    {
        number: 1,
        title: "İhtiyacınızı belirleyin",
        description:
            "Tanıtmak istediğiniz marka, ürün, hizmet, yenilik veya ​kampanya gibi içerik üreticilere neden ihtiyacınız ​olduğunu belirleyin",
    },
    {
        number: 2,
        title: "Paketinizi Seçin",
        description:
            "Amacınızı belirledikten sonra içerik üretimine ihtiyaç ​duyduğunuz içerik sayısına göre seçim yapın ve istediğiniz ​UGC’leri detaylandırın",
    },
    {
        number: 3,
        title: "İçerik Üreticilerle Eşleşin",
        description:
            "İhtiyacınıza yönelik içerik üreticilerle eşleşin ve ​talepleriniz doğrultusunda içeriklerinizi üretelim",
    },
    {
        number: 4,
        title: "Kaliteli ve güvenilir UGC’lere erişin",
        description:
            "Ürün ve hizmetlerinize özel hazırlanmış UGC’lere Contentia ​üzerinden erişin ve dilediğiniz platformda kullanın",
    },
];

const HowContentiaTable = () => {
    return (
        <div className='overflow-x-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
            <table className='min-w-full table-auto'>
                <thead>
                    <tr className=''>
                        <th className='px-4 py-3'></th>
                        <th className='xs:w-[150px] sm:w-[300px] px-4 py-3 flex justify-center border-x-2 border-t-2 rounded-tl-md rounded-tr-md border-[#4d4ec9]'>
                            {" "}
                            <Image
                                src='/contentiaLogo.png'
                                height={44}
                                width={151}
                                alt='logo'
                                className='h-[33px] w-[173px]'
                            />
                        </th>
                        <th className='px-4 py-3 text-gray-500 text-center'>
                            Influencer
                        </th>
                        <th className='px-4 py-3 text-gray-500 text-center'>
                            Raklam Ajansi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-white'>
                        <td className='px-4 py-3 font-bold text-gray-500'>
                            Uygun Fiyat
                        </td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                    </tr>
                    <tr className='bg-gray-50'>
                        <td className='px-4 py-3 font-bold text-gray-500'>
                            Hızlı Çözüm
                        </td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 bg-white text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='px-4 py-3 font-bold text-gray-500'>
                            Erişim Kolaylığı
                        </td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                    </tr>
                    <tr className='bg-gray-50  text-gray-500'>
                        <td className='px-4 py-3 font-bold'>Kişiselleştirme</td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 bg-white text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>{" "}
                        </td>
                    </tr>
                    <tr className='bg-white text-gray-500'>
                        <td className='px-4 py-3 font-bold'>
                            Ölçeklenebilirlik
                        </td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>{" "}
                        </td>
                    </tr>
                    <tr className='bg-gray-50 text-gray-500'>
                        <td className='px-4 py-3 font-bold'>Orjinallik</td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 bg-white text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>{" "}
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                    </tr>
                    <tr className='bg-white'>
                        <td className='px-4 py-3 font-bold text-gray-500'>
                            Paylaşıma Hazırlık
                        </td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-l-2 border-r-2 border-[#4d4ec9]'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-xl text-gray-500'>x</span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                            <span className='text-white BlueBg rounded-full px-3 py-1 text-xl'>
                                ✓
                            </span>{" "}
                        </td>
                    </tr>

                    <tr className='bg-white'>
                        <td className='px-4 py-3'></td>
                        <td className='xs:w[150px] sm:w-[300px] px-4 py-3 text-center border-x-2 border-b-2 rounded-bl-lg rounded-br-lg border-[#4d4ec9]'>
                            <button className='Button xs:text-xs sm:text-base text-white font-bold py-3 px-4 !rounded-full focus:outline-none focus:shadow-outline'>
                                UGC Siparişini Oluştur{" "}
                            </button>
                        </td>

                        <td className='px-4 py-3'></td>
                        <td className='px-4 py-3'></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default function Contentiaio() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: landingPage,
        loading: landingPageLoading,
        error: landingPageError,
    } = useSelector((state: RootState) => state.landingPage);

    const {
        data: packages,
        loading: packagesLoading,
        error: packagesError,
    } = useSelector((state: RootState) => state.pricing);

    const router = useRouter();

    useEffect(() => {
        dispatch(fetchLandingPage());
        dispatch(fetchPricePlans());
    }, [dispatch]);

    const handleOrderClick = () => {
        router.push("/orders");
    };

    // Loading skeleton component for reuse
    const LoadingSkeleton = () => (
        <div className='flex flex-col lg:flex-row w-full'>
            {/* First Half */}
            <div className='flex flex-col w-full lg:w-1/2'>
                <div className='bg-gray-200 animate-pulse w-full h-8 mb-3 rounded-md'></div>
                <div className='bg-gray-200 animate-pulse w-3/4 h-8 mb-5 rounded-md'></div>
                <div className='bg-gray-200 animate-pulse w-4/5 h-8 mb-5 rounded-md'></div>
                <div className='bg-gray-200 animate-pulse w-1/4 h-10 mb-6 rounded-md'></div>
            </div>
            {/* Second Half */}
            <div className='flex justify-center lg:w-1/2 w-full space-x-4'>
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className='w-36 h-36 bg-gray-300 animate-pulse rounded-xl'
                    ></div>
                ))}
            </div>
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    // Section header with rotating border image component
    const SectionHeader = ({ title }: { title: string }) => (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='headingText text-center mb-3'>{title}</h1>
            <div className='imageRotate'>
                <Image
                    src='/borderImage.svg'
                    height={300}
                    width={270}
                    alt='border image'
                    className='h-100 w-100'
                />
            </div>
        </div>
    );

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-24 '>
                {/* Hero Section */}
                <div className='flex flex-col lg:flex-row w-full pt-24  md:pt-24 lg:pt-[180px] lg:justify-between'>
                    {landingPageLoading ? (
                        <LoadingSkeleton />
                    ) : landingPageError ? (
                        <p className='text-red-500'>
                            Error: {landingPageError}
                        </p>
                    ) : (
                        <>
                            <div className='flex flex-col'>
                                <h1 className='headingText mb-5'>
                                    <span className='headingTextBlue'>
                                        {landingPage?.carouselHeroTitle}
                                    </span>
                                    <span className='ml-2'>
                                        {landingPage?.staticHeroTitle}
                                    </span>
                                </h1>

                                <div className='mx-3'>
                                    {landingPage?.heroSubTitle && (
                                        <p
                                            className='paraText mb-5'
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    landingPage.heroSubTitle
                                                ),
                                            }}
                                        />
                                    )}
                                </div>

                                {landingPage && (
                                    <div>
                                        <button className='Button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                            UGC Siparisini Olustur{" "}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className='lg:w-1/2 w-full lg:ml-2 mx-auto'>
                                <MyCarousel
                                    videos={landingPage?.videos || []}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Discover Content Section */}
                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
                    <SectionHeader title={"İçeriklerimizi Keşfet"} />

                    <div className='flex flex-col lg:flex-row lg:justify-between lg:mx-0 mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-10'>
                        <div className='w-full mb-8 sm:mb-8 md:mb-0 lg:mb-0 lg:w-1/2 mx-auto lg:ml-2'>
                            {landingPageLoading ? (
                                <div className='flex justify-center space-x-4'>
                                    {[...Array(3)].map((_, index) => (
                                        <div
                                            key={index}
                                            className='w-36 h-36 bg-gray-300 animate-pulse rounded-xl'
                                        />
                                    ))}
                                </div>
                            ) : landingPageError ? (
                                <p className='text-red-500'>
                                    Error: {landingPageError}
                                </p>
                            ) : (
                                <MyCarousel
                                    videos={landingPage?.videos || []}
                                />
                            )}
                        </div>

                        <div className='flex flex-col w-full lg:w-1/2 sm:mt-28 md:mt-28 lg:mt-9 lg:ml-8 mx-auto'>
                            <h1 className='headingTextTwo mb-3'>
                                Gerçek içeriklerin gücünü keşfedin!
                            </h1>
                            <div className=''>
                                <p className='paraText mb-5'>
                                    Influencer ve dijital içerik
                                    üreticilerimizle birlikte markanızı tanıtın,
                                    yenilikleri ve kampanyaları duyurun{" "}
                                </p>
                            </div>
                            <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row lg:justify-between lg:mt-[94px]'>
                                <div className='flex items-center justify-center mx-auto px-10'>
                                    <Image
                                        src='/starIcon.svg'
                                        height={100}
                                        width={100}
                                        alt='star icon'
                                        className='xs:h-[40px] lg:h-[60px] px-4'
                                    />
                                    <div>
                                        <h1 className='headingTextTwo text-center mb-1'>
                                            4.5/5
                                        </h1>
                                        <p className='paraTextTwo mb-5 text-nowrap'>
                                            Memnuniyet Oranı
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center justify-center mx-auto px-10'>
                                    <Image
                                        src='/usersIcon.svg'
                                        height={100}
                                        width={100}
                                        alt='users icon'
                                        className='xs:h-[35px] lg:h-[55px] pr-2'
                                    />
                                    <div>
                                        <h1 className='headingTextTwo text-center mb-1'>
                                            18-65
                                        </h1>
                                        <p className='paraTextTwo mb-5 text-nowrap'>
                                            Yaş aralığı içerik üreticiler
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Small Cards Section */}
                <div className='w-full ml-2 mt-10 sm:mt-10 md:mt-16 lg:mt-20'>
                    <div>
                        <p className='paraText text-center mb-8'>
                            Yaratıcı videoları talep üzerine almak için daha iyi
                            bir yol
                        </p>
                        <div className='block lg:hidden'>
                            <Slider {...settings}>
                                {CARDS.map((card, index) => (
                                    <div
                                        key={index}
                                        className='px-2 py-4'
                                    >
                                        {" "}
                                        {/* Adds padding around each card */}
                                        <SmallCard
                                            image={card.image}
                                            title={card.title}
                                            description={card.description}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* Grid on lg screens */}
                        <div className='hidden lg:grid lg:grid-cols-3 gap-6'>
                            {CARDS.map((card, index) => (
                                <SmallCard
                                    key={index}
                                    image={card.image}
                                    title={card.title}
                                    description={card.description}
                                />
                            ))}
                        </div>

                        <div className='flex justify-center items-center mt-8'>
                            <div>
                                <button className='Button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline'>
                                    Fi​yatlar{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Rates Section */}
                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
                    <SectionHeader title='Başarı Oranları' />

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-4 md:mx-10'>
                        {METRICS.map((metric, index) => (
                            <div
                                key={index}
                                className='relative flex flex-col w-full'
                            >
                                <div className='relative w-full h-[450px]'>
                                    <Image
                                        className='object-cover rounded-3xl'
                                        src={metric.image}
                                        alt={metric.alt}
                                        layout='fill'
                                    />
                                    <button className='button absolute bottom-0 left-0 w-full rounded-3xl'>
                                        {metric.buttonText}
                                    </button>
                                </div>
                                <p className='paraTextTwo mt-5'>
                                    {metric.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Contentia Section */}
                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-[100px]'>
                    <SectionHeader title='Neden Contentia.io?' />
                </div>

                <div className='w-full'>
                    <HowContentiaTable />
                </div>

                {/* Packages Section */}
                <div className='w-full ml-2 mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
                    <SectionHeader title='Fiyatlandırma' />
                    <div>
                        <p className='paraText text-center mb-8'>
                            İhtiyaçlarınıza uygun paketleri inceleyin ve
                            avantajlı fiyatlardan yararlanın.
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {packagesLoading ? (
                                <p>Loading Packages...</p>
                            ) : (
                                packages &&
                                packages.map((pkg: any, index: any) => (
                                    <CustomCard
                                        key={index}
                                        title={pkg.title}
                                        description={pkg.description}
                                        videoCount={pkg.videoCount}
                                        durationOptions={["15s", "30s", "60s"]}
                                        editingOptions={["Evet", "Hayir"]}
                                        aspectRatioOptions={["9:16", "16:9"]}
                                        price={pkg.finalPrice}
                                        onOrderClick={handleOrderClick}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* 4-Step Process Section */}
                <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-20'>
                    <div className='flex justify-center items-center'>
                        <h1 className='paraText text-center mb-8'>
                            Tek bir platformda, UGC içeriklerine kolayca erişin
                        </h1>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {STEPS.map((step) => (
                            <div key={step.number}>
                                <div className='flex flex-row items-start gap-4'>
                                    {/* Left: Number */}
                                    <div className='headingTextBlue min-w-[40px]'>
                                        {step.number}
                                    </div>

                                    {/* Right: Title & Description */}
                                    <div>
                                        <div className='headingTextTwo mb-2'>
                                            {step.title}
                                        </div>
                                        <p className='paraTextTwo'>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Special Offers Section */}
                <div className='yellowGradient px-4 md:px-10 lg:px-24 py-6 md:py-8 my-10 rounded-3xl'>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 lg:gap-36'>
                        <div className='flex-shrink-0'>
                            <Image
                                height={100}
                                width={300}
                                className='rounded-3xl'
                                src='/phonePic.png'
                                alt='phone'
                            />
                        </div>
                        <div className='flex flex-col justify-center text-center md:text-left'>
                            <h1 className='headingTextTwo mb-2 text-lg md:text-xl lg:text-2xl'>
                                Özel tekliflerden yararlanın
                            </h1>
                            <p className='paraTextTwo mb-4 text-sm md:text-base lg:text-lg'>
                                Paket seçeneklerimizden fazlasına mı ihtiyacınız
                                var? Ajans olarak birden çok ​marka ve müşteriye
                                mi hizmet veriyorsunuz?
                            </p>
                            <p className='paraTextTwo mb-4 text-sm md:text-base lg:text-lg'>
                                Hemen iletişime geçin, ihtiyacınıza özel
                                tekliflerden faydalanın
                            </p>
                            <div className='flex justify-center'>
                                <div>
                                    <button className='Button text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline'>
                                        İletişime Geç{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
