import React, { useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import Image from 'next/image';
import instIcon from '../../../public/BecomeCreator/Instagram_icon.png';
import facebookIcon from "../../../public/BecomeCreator/facebook_icon..png";
import youtubeIcon from "../../../public/BecomeCreator/youtube_iconpng.png";
import linkdinIcon from "../../../public/BecomeCreator/linkedin_icon.png";
import xIcon from "../../../public/BecomeCreator/x_icon.png";
import tiktokIcon from "../../../public/BecomeCreator/tiktik_icon.png";

const SocialMediaInformation: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false)

  const [socialData, setSocialData] = useState({
    Instagram: { followerCount: '', username: '' },
    TikTok: { followerCount: '', username: '' },
    Facebook: { followerCount: '', username: '' },
    Youtube: { followerCount: '', username: '' },
    X: { followerCount: '', username: '' },
    Linkedin: { followerCount: '', username: '' },
  });
  
  const [instagramLink, setInstagramLink] = useState<string>(''); // State for Instagram link


  const showPopupHandler = () => {
    setShowPopup(!showPopup)
  }
  
  // Handler to update follower count and username for a specific platform
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    platform: 'Instagram' | 'TikTok' | 'Facebook' | 'Youtube' | 'X' | 'Linkedin', // ensure correct platform types
    field: 'followerCount' | 'username'
  ) => {
    const value = e.target.value;
    setSocialData((prevData) => ({
      ...prevData,
      [platform]: {
        ...prevData[platform],
        [field]: value
      }
    }));
  };

  const handleInstagramLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstagramLink(e.target.value); // Update state for Instagram link
  };

  return (
    <div className='shadow-md bg-white w-full md:w-[80vw] lg:w-[70vw] mx-auto p-4 md:p-6 lg:p-8'>
      <div className='relative'>
        <span className='text-xl font-bold'>Sosyal Medya Bilgileri </span>
        <span>(Opsiyonel)</span>
        <div className='flex gap-2 items-center mt-3'>
        <h2 className='text-lg font-semibold  '>Sosyal Medya Paylaşımı:</h2>
         <IoMdInformationCircleOutline size={30} className='text-blue-700 cursor-pointer' onClick={showPopupHandler}/>
        </div>
        <p className='px-3'>Ek ücret karşılığında, hazırladığın içerikleri kendi sosyal medya hesaplarında paylaşma ister misin?</p>
        <div className='flex gap-2 px-3'>
          <div>
            <input type="radio" name="socialShare" id="yes" />
            <label htmlFor="yes">Evet</label>
          </div>
          <div>
            <input type="radio" name="socialShare" id="no" />
            <label htmlFor="no">Hayır</label>
          </div>
        </div>

       
      </div>

     

      {/* Social media section */}
      <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3'>
        {[
          { icon: instIcon, label: 'Instagram' },
          { icon: tiktokIcon, label: 'TikTok' },
          { icon: facebookIcon, label: 'Facebook' },
          { icon: youtubeIcon, label: 'Youtube' },
          { icon: xIcon, label: 'X' },
          { icon: linkdinIcon, label: 'Linkedin' },
        ].map((platform) => (
          <div key={platform.label} className='flex flex-col mb-4'>
            <div className="flex items-center mt-4">
              <Image src={platform.icon} alt={`${platform.label} Icon`} width={24} height={24} />
              <h1 className='text-lg font-bold ml-2'>{platform.label}:</h1>
            </div>

            {/* Username input */}
            <input
              type="text"
              id={`username-${platform.label}`}
              value={socialData[platform.label as keyof typeof socialData].username}
              onChange={(e) => handleInputChange(e, platform.label as keyof typeof socialData, 'username')}
              className='border border-gray-300 px-2 py-1 rounded mt-2 sm:w-fit w-full'
              placeholder='Kullanıcı Adı'
            />

            {/* Follower count input */}
            <input
              type="number"
              id={`followerCount-${platform.label}`}
              value={socialData[platform.label as keyof typeof socialData].followerCount}
              onChange={(e) => handleInputChange(e, platform.label as keyof typeof socialData, 'followerCount')}
              className='border border-gray-300 px-2 py-1 rounded mt-2 sm:w-fit w-full'
              placeholder='Takipçi Sayısı'
            />
          </div>
        ))}
      </div>

      <div className='px-3 mt-2'>
        <h2 className='text-lg font-semibold'>Örnek Çalışma</h2>
        <p>Daha önce gerçekleştirdiğiniz çalışmalardan örnek paylaşımlarınızı bizimle paylaşabilirsiniz.</p>
        <input
          type="url"
          id="instagramLink"
          value={instagramLink}
          onChange={handleInstagramLinkChange} // Update state for Instagram link
          className='border border-gray-300 p-4 rounded w-full lg:w-[870px] md:w-[550px] '
          placeholder='Ör: https://www.instagram.com/contentia/reel/C5OCG4XBtFX'
        />
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-blue-900 text-white text-lg font-bold rounded-md p-2 px-9">
          Tamamla
        </button>
      </div>
      {
      showPopup &&  <div className='bg-gray-400 text-white md:w-[450px] w-[300px] text-xs p-1 py-2 absolute md:top-[1100px] top-[1670px] right-2'>
      <p>Ürün tanıtımı gerçekleştiren içerik üreticilerinin belirttiği adrese ürün gönderimi yapılır. Ürün, marka tarafından içerik üreticisine hediye edilmektedir.<br/> <br/>Mekan tanıtımı gerçekleştiren içerik üreticileri, kendine yakın lokasyonda bulunan mekanlara giderek içerik üretecekleri için adres bilgileri alınmaktadır.</p>
    </div>
     }
    </div>
  );
};

export default SocialMediaInformation;
