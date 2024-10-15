import React, { useState } from "react";
import Image from "next/image";
import instIcon from "../../../../public/BecomeCreator/Instagram_icon.png";
import facebookIcon from "../../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../../public/BecomeCreator/tiktik_icon.png";

const SocialMediaInformation: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  const [showTooltipTwo, setShowTooltipTwo] = useState(false);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-28">
      <div className="bg-white p-4 sm:p-5 md:p-6 lg:p-6">
        <div>
          <span className="text-xl font-bold">Sosyal Medya Bilgileri </span>
          <span>(Opsiyonel)</span>
          <div className="flex gap-2 items-center mt-3">
            <h2 className="text-lg font-semibold">Sosyal Medya Paylaşımı:</h2>
            {/* Tooltip */}
            <div className="relative flex justify-center">
              <button
                className="text-black text-sm px-3 py-1 rounded-full"
                onMouseEnter={() => setShowTooltipTwo(true)}
                onMouseLeave={() => setShowTooltipTwo(false)}
              >
                <Image
                  src="/tooltipIcon.png"
                  alt="brand logo"
                  height={16}
                  width={16}
                  className="rounded-full"
                />
              </button>
              {showTooltipTwo && (
                <div className="absolute left-0 top-full mb-1 w-48 bg-gray-700 text-white text-sm rounded p-2">
                  İçerik üreticilerine ürün gönderimi sağlayacaksanız ya da
                  üreticilerin bir fiziki lokasyona ulaşması gerekiyorsa, bu
                  alanda içerik türünüzü belirterek lokasyona göre eşleştirme
                  gerçekleştirme yapılması gerekir.
                </div>
              )}
            </div>
          </div>
          <p>
            Ek ücret karşılığında, hazırladığın içerikleri kendi sosyal medya
            hesaplarında paylaşma ister misin?
          </p>
          <div className="flex justify-start space-x-4">
            {/* Product Radio Button */}
            <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
              <input
                type="radio"
                {...register("social_information.contentType", {
                  required: "Bu alan zorunludur.",
                })}
                value="product"
                className="hidden peer"
              />
              <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>
              <span className="ml-1 text-sm">Ürün</span>
            </label>

            {/* Hizmet Radio Button */}
            <label className="inline-flex items-center cursor-pointer mb-2 lg:mb-6">
              <input
                type="radio"
                {...register("social_information.contentType", {
                  required: "Bu alan zorunludur.",
                })}
                value="hizmat"
                className="hidden peer"
              />
              <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>
              <span className="ml-1 text-sm">Hizmet</span>
            </label>
          </div>
          {errors.social_information?.contentType && (
            <span className="text-red-500 text-sm">
              {errors.social_information.contentType.message}
            </span>
          )}
        </div>

        {/* Social media section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
          {[
            { icon: instIcon, label: "Instagram" },
            { icon: tiktokIcon, label: "TikTok" },
            { icon: facebookIcon, label: "Facebook" },
            { icon: youtubeIcon, label: "Youtube" },
            { icon: xIcon, label: "X" },
            { icon: linkdinIcon, label: "Linkedin" },
          ].map((platform) => (
            <div
              key={platform.label}
              className="flex flex-col mb-4"
            >
              <div className="flex items-center mt-4">
                <Image
                  src={platform.icon}
                  alt={`${platform.label} Icon`}
                  width={24}
                  height={24}
                />
                <h1 className="text-lg font-bold ml-2">{platform.label}:</h1>
              </div>

              {/* Username input */}
              <input
                type="text"
                {...register(
                  `social_information.platforms.${platform.label}.username`,
                  {
                    required: `${platform.label} için kullanıcı adı gereklidir.`,
                  }
                )}
                className="border px-2 py-1 rounded mt-2 sm:w-fit w-full focus:outline-none"
                placeholder="Kullanıcı Adı"
              />
              {errors.social_information?.platforms?.[platform.label]
                ?.username && (
                <span className="text-red-500 text-sm">
                  {
                    errors.social_information.platforms[platform.label].username
                      .message
                  }
                </span>
              )}

              {/* Follower count input */}
              <input
                type="number"
                {...register(
                  `social_information.platforms.${platform.label}.followerCount`,
                  {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Takipçi sayısı 0'dan büyük olmalıdır.",
                    },
                  }
                )}
                className="border px-2 py-1 rounded mt-2 sm:w-fit w-full focus:outline-none"
                placeholder="Takipçi Sayısı"
              />
              {errors.social_information?.platforms?.[platform.label]
                ?.followerCount && (
                <span className="text-red-500 text-sm">
                  {
                    errors.social_information.platforms[platform.label]
                      .followerCount.message
                  }
                </span>
              )}
            </div>
          ))}

          <div className="mt-2 col-span-3">
            <h2 className="text-lg mb-2 font-semibold">Örnek Çalışma</h2>
            <p className="mb-4">
              Daha önce gerçekleştirdiğiniz çalışmalardan örnek paylaşımlarınızı
              bizimle paylaşabilirsiniz.
            </p>
            <input
              type="url"
              {...register("social_information.instagramLink", {
                required: "Instagram linki gereklidir.",
                pattern: {
                  value: /https?:\/\/.+/,
                  message: "Geçerli bir URL girin.",
                },
              })}
              className="border focus:outline-none p-4 rounded w-full"
              placeholder="Ör: https://www.instagram.com/contentia/reel/C5OCG4XBtFX"
            />
            {errors.social_information?.instagramLink && (
              <span className="text-red-500 text-sm">
                {errors.social_information.instagramLink.message}
              </span>
            )}

            {/* First Checkbox */}
            <div className="flex items-start my-4">
              <input
                id="sozlesme"
                type="checkbox"
                {...register("social_information.user_agreement", {
                  required: "Kullanıcı Sözleşmesi'ni onaylamak zorunludur.",
                })}
                className="mt-1 mr-2"
              />
              <label
                htmlFor="sozlesme"
                className="text-sm text-gray-500"
              >
                Kullanıcı Sözleşmesi'ni okudum, onaylıyorum.
              </label>
            </div>
            {errors.social_information?.user_agreement && (
              <span className="text-red-500 text-sm">
                {errors.social_information.user_agreement.message}
              </span>
            )}

            {/* Second Checkbox */}
            <div className="flex items-start mb-4">
              <input
                id="iletisim"
                type="checkbox"
                {...register("social_information.approved_commercial", {
                  required:
                    "Ticari Elektronik İleti ve İletişim İzni'ni onaylamak zorunludur.",
                })}
                className="mt-1 mr-2"
              />
              <label
                htmlFor="iletisim"
                className="text-sm text-gray-500"
              >
                Ticari Elektronik İleti ve İletişim İzni'ni onaylıyorum.
              </label>
            </div>
            {errors.social_information?.approved_commercial && (
              <span className="text-red-500 text-sm">
                {errors.social_information.approved_commercial.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaInformation;
