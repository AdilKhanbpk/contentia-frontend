import React from "react";

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

export default function FourStep() {
    return (
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
    );
}
