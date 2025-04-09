"use client";

import SmallCard from "@/components/customCard/SmallCard";
import React from "react";
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
};

const CARDS = [
    {
        image: "/image1.webp",
        title: "Doğrudan Performans Etkisi",
        description:
            "Dijital pazarlama süreçlerini gerçek ​kullanıcılar tarafından içeriklerle ​kampanyanızı destekleyin",
    },
    {
        image: "/image2.webp",
        title: "Birkaç Dakikada Sipariş Oluşturun",
        description:
            "Dijital pazarlama süreçlerini gerçek ​kullanıcılar tarafından içeriklerle ​kampanyanızı destekleyin",
    },
    {
        image: "/image3.webp",
        title: "Özel Temsilcinize Danışın",
        description:
            "Aklınıza takılan noktalarda senaryo, brief ve ​konseptler hakkında temsilcinizden destek ​alın",
    },
    {
        image: "/image4.webp",
        title: "Zamanında ve Uygun Fiyatlarla",
        description:
            "İçeriklerinizi planlayın, zamanında ve uygun ​fiyatlara UGC’lere sahip olun",
    },
    {
        image: "/image5.webp",
        title: "Güvenilir İçerik Üreticilerle Çalışın",
        description:
            "Platformumuz tarafından seçilmiş, içerik ​üreticilerle çalışın",
    },
    {
        image: "/image6.webp",
        title: "Kişiselleştirilmiş İçeriklere Sahip",
        description:
            "Marka kimliğinize, ürün detaylarınıza, sosyal ​medyanıza ve hedeflerinize uygun ​kişiselleştirilmiş içeriklere erişin",
    },
];

export default function SmallCards() {
    return (
        <div className='w-full ml-2 mt-10 sm:mt-10 md:mt-16 lg:mt-20'>
            <div>
                <p className='paraText text-center mb-8'>
                    Yaratıcı videoları talep üzerine almak için daha iyi bir yol
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
    );
}
