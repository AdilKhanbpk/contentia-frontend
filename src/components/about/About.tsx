import React from "react";
import aboutImage from "../../../public/AboutImages/About.svg";
import vectorImage from "../../../public/AboutImages/Vector.svg";
import aboutcontact from "../../../public/AboutImages/aboutcontact.jpg";
import Image from "next/image";
import { SiGooglemessages } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocation } from "react-icons/io5";


const About = () => {

    return (
        <>
            <div className="px-4 sm:px-6 md:px-8 lg:px-[38px] pt-24 sm:pt-24 md:pt-24 lg:pt-[100px]">
                {/* Main Content Section */}
                <div className="flex flex-col lg:flex-row gap-10 justify-between items-center">
                    <div className="flex justify-center">
                        <Image className="" src={aboutImage} alt="" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-2xl font-bold text-[#4D4EC9]">
                            Hakkımızda
                        </h1>

                        <h2 className="font-semibold mt-8">
                            İçerik Üretiminin Geleceği: Contentia
                        </h2>
                        <div className="w-full">

                            <p className="text-sm mt-2">
                                Dijital dünyada öne çıkmanın en etkili yolu, özgün ve etkileyici
                                içeriklerden geçer. Contentia olarak, işletmelerin sosyal medya
                                platformlarında ürünlerini, hizmetlerini veya mekanlarını
                                tanıtmaları için içerik üreticilerinden video içerik ve UGC
                                (Kullanıcı Tarafından Üretilen İçerik) alma imkanı sunuyoruz.
                                Amacımız, markaların hikayelerini en etkileyici şekilde
                                anlatmalarına yardımcı olmaktır.
                                <br /><br />
                                Dijital dünyada öne çıkmanın en etkili yolu, özgün ve etkileyici
                                içeriklerden geçer. Contentia olarak, işletmelerin sosyal medya
                                platformlarında ürünlerini, hizmetlerini veya mekanlarını
                                tanıtmaları için içerik üreticilerinden video içerik ve UGC
                                (Kullanıcı Tarafından Üretilen İçerik) alma imkanı sunuyoruz.
                                Amacımız, markaların hikayelerini en etkileyici şekilde
                                anlatmalarına yardımcı olmaktır. Contentia işletmenizi,
                                ürünlerinizi ve hizmetlerinizi tanıtmak amacıyla sosyal medyada ve
                                reklam kampanyalarında kullanabileceğiniz viral içerikler
                                oluşturabileceğiniz bir platformdur.
                                <br /><br />
                                Influencer pazarlaması ve reklam süreçlerinizi gerçek kullanıcılar
                                tarafından oluşturulmuş içeriklerle destekleyerek tanıtımlarınızı
                                daha güvenilir ve doğal şekilde gerçekleştirebilirsiniz.
                                Contentia, sizi binlerce profesyonel içerik üreticisi arasından
                                hedef kitlenize ve marka amaçlarınıza uygun kullanıcılarla
                                buluşturur.
                                <br /><br />
                                İçeriklerinizi dilerseniz UGC olarak kendi hesaplarınızda
                                paylaşabilir, dilerseniz nano ve mikro influencerlar aracılığıyla
                                kampanya haline getirerek sosyal medyada ses getirebilirsiniz.
                                <br /><br />
                                İhtiyacınızı belirlemekte güçlük çekiyorsanız, kampanyanızı
                                oluşturmanız için size yardım edelim. Birlikte, bütçenize uygun ve
                                hızlı çözümler geliştirerek nano, mikro ve mega influencer ve
                                içerik üreticileriyle sizi bir araya getirelim.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Contact Section */}
                <div className="flex flex-col justify-center mt-24">
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='headingText BlueText mb-3'>İletişim</h1>
                        <div className='imageRotate'>
                            <Image
                                src="/borderImage.svg"
                                height={300}
                                width={270}
                                alt="border image"
                                className="object-contain" // Use object-contain to maintain aspect ratio
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center mx-auto mt-6 mb-5">
                        <div className="flex items-center gap-2 mt-6">
                            <Image
                                width={30}
                                height={30}
                                className=''
                                src="/messageIcon.png"
                                alt='message icon'
                            />
                            <span>info@contentia.io</span>
                        </div>
                        <div className="flex items-center gap-2 my-6">
                            <Image
                                width={30}
                                height={30}
                                className=''
                                src="/whatsappIcon.svg"
                                alt='message icon'
                            />
                            <span>0850 309 11 22</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image
                                width={30}
                                height={30}
                                className=''
                                src="/locationIcon.png"
                                alt='message icon'
                            />
                            <span>
                                Maslak Mah. Maslak Meydan SK.Baby Giz Plaza A blok No:1 Ic
                                Kapi No: 55 Sariyar/Istanbul
                            </span>
                        </div>
                    </div>

                    <div className="pt-24 sm:pt-24 md:pt-24 lg:pt-[100px]">
                        <div className="bg-gradient-to-r from-[#FFE2B2] to-[#F8A1B8] p-4 px-6 md:px-12 rounded-lg flex flex-col md:flex-row justify-between items-center gap-10 sm:gap-12 lg:gap-28  w-full  relative mb-6">
                            <div className='flex-shrink-0'>
                                <Image
                                    height={50}
                                    width={200}
                                    className='rounded-3xl'
                                    src="/phonePic.png"
                                    alt='phone'
                                />
                            </div>
                            <div className="w-full ">
                                <h1 className="text-xl font-bold mb-5">İhtiyacınızı Belirleyelim</h1>
                                <div className="flex flex-col items-center">
                                    <p>
                                        Sorularınız ve ihtiyaçlarınız için yardıma mı ihtiyacınız var?
                                        Hizmetlerimiz için bilgi almak adına temsilcimizle görüşme
                                        gerçekleştirin!
                                    </p>
                                    <button className="ButtonBlue text-white w-fit px-6 py-2 rounded-full font-bold mt-6">
                                        İletişime Geç
                                    </button>
                                </div>
                            </div>
                            <div className=" absolute bottom-3  left-0 w-full md:w-[280px] bg-purple-700 md:block hidden text-white p-6">
                                <h1 className="text-center">Will be provided later</h1>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default About;
