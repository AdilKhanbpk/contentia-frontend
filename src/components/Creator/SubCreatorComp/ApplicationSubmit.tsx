import React from 'react';
import Image from 'next/image';
import scannerImage1 from "../../../../public/BecomeCreator/scanner1png.png";
import appStoreImage from "../../../../public/BecomeCreator/AppStore1.png";
import googlePlayImage from "../../../../public/BecomeCreator/google3.png"

const ApplicationSubmit: React.FC = () => {
  return (
    <div className='shadow-md bg-white w-full md:w-[80vw] lg:w-[70vw] mx-auto p-4 md:p-6 lg:p-8'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold '>Başvurun İletildi!</h1>
        <div className='flex flex-col gap-4 mt-8'>
          <p>İçerik Üreticisi başvurun iletildi.</p>
          <p>Mobil uygulamamızı indir ve UGC siparişlerine göz at!</p>
          <p>Mobil uygulama üzerinden, profilini güncelleyebilir, markaların oluşturduğu siparişleri inceleyerek talepte bulunabilirsin.</p>
          <p>Detaylı bilgi almak için Mobil Uygulamada bulunan Destek bölümünü ve Sıkça Sorulan Soruları inceleyebilirsin.</p>
        </div>
      </div>

      <div className='bg-pink-100 p-4 mt-6'>
        <h1 className='text-xl font-semibold text-center mb-9'>Mobil Uygulamayı Hemen İndir!</h1>
        <div className='flex justify-center gap-5 items-center mt-6'>
          <div className='flex flex-col items-center '>
            <Image src={scannerImage1} alt="Scanner for mobile app download" className='w-[100px]' /> {/* Adjusted width */}
            <Image src={appStoreImage} alt="Download on the App Store" className='w-[150px] mt-3' />
          </div>
          <div className='flex flex-col items-center '>
            <Image src={scannerImage1} alt="Scanner for mobile app download" className='w-[100px]' /> {/* Adjusted width */}
            <Image src={googlePlayImage} alt="Get it on Google Play" className='w-[150px] mt-3' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSubmit;
