import React from "react";
import aboutImage from "../../../public/AboutImages/About .svg";
import vectorImage from "../../../public/AboutImages/Vector.svg";
import aboutcontact from "../../../public/AboutImages/aboutcontect.webp";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { SiGooglemessages } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocation } from "react-icons/io5";


const About = () => {
 
  return (
    <>
      <Navbar />

      <div className="pt-28 px-4 lg:px-28">
        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
          <div className="flex justify-center">
            <Image className="w-full max-w-[400px]" src={aboutImage} alt="" />
          </div>
          <div className="w-full lg:w-[500px]">
            <h1 className="text-2xl font-bold text-[#4D4EC9]">
              Hakkımızda
            </h1>

            <h2 className="font-semibold mt-4">
              İçerik Üretiminin Geleceği: Contentia
            </h2>
            <p className="text-xs mt-2">
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

        {/* Contact Section */}
        <div className="flex flex-col justify-center mt-24">
          <div className="flex flex-col items-center">
            <h1 className="text-[#4D4EC9] font-bold text-2xl">İletişim</h1>
            <Image className="w-[140px]" src={vectorImage} alt="vectorImage" />
          </div>
          
          <div className="flex flex-col justify-center mx-auto mt-6 mb-5">
            <div className="flex items-center gap-2">
              <SiGooglemessages size={30} />
              <span>info@contentia.io</span>
            </div>
            <div className="flex items-center gap-2 my-1">
              <IoLogoWhatsapp size={30} />
              <span>0850 309 11 22</span>
            </div>
            <div className="flex items-center gap-2">
              <IoLocation size={30} />
              <span>
                Maslak Mah. Maslak Meydan SK.Baby Giz Plaza A blok No:1 Ic
                Kapi No: 55 Sariyar/Istanbul
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FFE2B2] to-[#F8A1B8] p-4 px-6 md:px-12 rounded-lg flex flex-col md:flex-row items-center gap-9 mx-auto w-full lg:w-[80vw] xl:w-[61vw] relative mb-6">
  <div className="flex justify-center">
    <Image className="w-[200px] h-auto" src={aboutcontact} alt="contectImage" />
  </div>
  <div className="w-full md:w-[700px]">
    <h1 className="text-xl font-bold mb-5">İhtiyacınızı Belirleyelim</h1>
    <div className="flex flex-col items-center">
      <p>
        Sorularınız ve ihtiyaçlarınız için yardıma mı ihtiyacınız var?
        Hizmetlerimiz için bilgi almak adına temsilcimizle görüşme
        gerçekleştirin!
      </p>
      <button className="bg-[#4D4EC9] text-white w-fit px-6 py-2 rounded-full font-bold mt-6">
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
    </>
  );
};

export default About;
