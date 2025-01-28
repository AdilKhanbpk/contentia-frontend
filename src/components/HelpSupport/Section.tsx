"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import img7 from "../../../public/helpcenter/img7.svg";
import img1 from "../../../public/helpcenter/img1.svg";
import img2 from "../../../public/helpcenter/img2.svg";
import img3 from "../../../public/helpcenter/img3.svg";
import img4 from "../../../public/helpcenter/img4.svg";
import img5 from "../../../public/helpcenter/img5.svg";
import img6 from "../../../public/helpcenter/img6.svg";
import card from "../../../public/helpcenter/card.svg"
import card1 from "../../../public/helpcenter/card1.svg"
import card2 from "../../../public/helpcenter/card2.png"
import card3 from "../../../public/helpcenter/card3.svg"

interface Subtitle {
  text: string;
  icon: JSX.Element;
}

interface HelpCategory {
  title: string;
  icon: JSX.Element;
  subtitles: Subtitle[];
}

const helpCategories: HelpCategory[] = [
  {
    title: "Sipariş Oluşturma",
    icon: <Image src={card} alt="" width={25} height={25} />,
    subtitles: [
      { text: "UGC Siparişi", icon: <Image src={img7} alt="UGC Siparişi" width={20} height={20} /> },
      { text: "Paket Seçimi", icon: <Image src={img1} alt="Paket Seçimi" width={20} height={20} /> },
      { text: "Marka Yönetimi", icon: <Image src={img2} alt="Marka Yönetimi" width={20} height={20} /> },
      { text: "İçerik Türleri", icon: <Image src={img3} alt="İçerik Türleri" width={20} height={20} /> },
      { text: "İçerik Üretici Tercihleri", icon: <Image src={img4} alt="İçerik Üretici Tercihleri" width={20} height={20} /> },
      { text: "Ek Hizmetler", icon: <Image src={img5} alt="Ek Hizmetler" width={20} height={20} /> },
      { text: "Ödeme ve Faturalandırma", icon: <Image src={img6} alt="Ödeme ve Faturalandırma" width={20} height={20} /> },
    ],
  },
  {
    title: "Content’iniz Nasıl Çalışır?",
    icon: <Image src={card1} alt="" width={25} height={25} />,
    subtitles: [
      { text: "İçerik Türleri", icon: <Image src={img3} alt="İçerik Türleri" width={20} height={20} /> },
      { text: "İçerik Üretici Tercihleri", icon: <Image src={img4} alt="İçerik Üretici Tercihleri" width={20} height={20} /> },
      { text: "Ek Hizmetler", icon: <Image src={img5} alt="Ek Hizmetler" width={20} height={20} /> },
      { text: "Ödeme ve Faturalandırma", icon: <Image src={img6} alt="Ödeme ve Faturalandırma" width={20} height={20} /> },
    ],
  },
  {
    title: "Kullanım Koşulları",
    icon: <Image src={card2} alt="" width={25} height={25} />,
    subtitles: [
      { text: "UGC Siparişi", icon: <Image src={img7} alt="UGC Siparişi" width={20} height={20} /> },
      { text: "Paket Seçimi", icon: <Image src={img1} alt="Paket Seçimi" width={20} height={20} /> },
      { text: "Marka Yönetimi", icon: <Image src={img2} alt="Marka Yönetimi" width={20} height={20} /> },
      { text: "İçerik Türleri", icon: <Image src={img3} alt="İçerik Türleri" width={20} height={20} /> },
    ],
  },
  {
    title: "İçerik Üreticiler",
    icon: <Image src={card3} alt="" width={25} height={25} />,
    subtitles: [
      { text: "Marka Yönetimi", icon: <Image src={img2} alt="Marka Yönetimi" width={20} height={20} /> },
      { text: "İçerik Türleri", icon: <Image src={img3} alt="İçerik Türleri" width={20} height={20} /> },
      { text: "İçerik Üretici Tercihleri", icon: <Image src={img4} alt="İçerik Üretici Tercihleri" width={20} height={20} /> },
    ],
  },
];

const Section: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-32 ">
      <div className=" py-24 sm:py-24 md:py-24 lg:py-[100px]">
        <div className=" border border-gray-400 rounded-md p-2 sm:p-4 md:p-8 lg:px-12 lg:py-8">
          <div>
            <h4 className="text-gray-600">Merhaba</h4>
            <h1 className="w-full mt-1 text-xl md:text-3xl font-semibold text-gray-800 whitespace-nowrap">
              Hangi konuda desteğe <br /> ihtiyacınız var?
            </h1>
            <div
              className="flex gap-3 p-2 items-center rounded-md mt-4 mb-4 bg-gray-200"
              style={{ color: "#6C757D" }}
            >
              <CiSearch size={20} />
              <input
                type="text"
                placeholder="Destek almak istediğiniz konu nedir?"
                className="outline-none w-full bg-transparent py-1"
              />
            </div>
          </div>

          <div className="flex justify-between md:justify-between  gap-1 mt-4">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className={`px-1 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 lg:px-8 lg:py-4 rounded-md text-white flex flex-col items-center cursor-pointer ${selectedCategory === index ? "" : ""
                  }`}
                style={{ backgroundColor: "#4D4EC9" }}
                onClick={() => setSelectedCategory(index)}
              >
                <div className="flex flex-col items-center">
                  {category.icon}
                  <h2 className="text-xs md:text-sm text-center mt-0.5 md:mt-2">{category.title}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Render subtitles for the selected category with unique icons */}
          <div className="flex flex-col gap-4 mt-8 font-medium">
            {helpCategories[selectedCategory].subtitles.map((subtitle, i) => (
              <div className="flex gap-3 items-center" key={i}  >
                <span>{subtitle.icon}</span>
                <Link href="/contentiaio/help-support/detail" ><span className="cursor-pointer">{subtitle.text}</span> </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
