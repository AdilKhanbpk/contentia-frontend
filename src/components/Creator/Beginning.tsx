import React from 'react';

const Beginning = () => {
  return (
    <div className='p-6 mb-5 shadow-md bg-white w-[90vw] md:w-[80vw] lg:w-[70vw] mx-auto'>
      <div>
        <h1 className='text-xl font-bold'>İçerik Üreticisi Ol</h1>
      </div>
      <div className='mt-3 text-lg'>
        <h3>Contentia’ya Hoşgeldin!</h3>
        <p className='my-4 mt-7'>
          Contentia, müşteri firmaların ve markaların ürün, hizmet ya da mekan tanıtımları için
          içerik üreticileriyle çalışarak UGC, influencer pazarlaması ve çeşitli sosyal medya tanıtımları
          satın alabileceği bir platform.
        </p>
        <p>
          Yalnızca 5 dakikanı ayırarak, İçerik Üreticisi formunu doldurarak içerik üreticileri arasında yer
          alabilir ve ürettiğin içeriklerden gelir elde edebilirsin.
        </p>
      </div>

      <div className='mt-14 mb-7'>
        <h1 className='text-xl font-bold'>Nasıl Çalışır?</h1>
      </div>

      <div className='flex flex-wrap justify-between px-4 lg:px-12'>
        <div className='w-full sm:w-[45%] md:w-[30%] lg:w-[250px] flex flex-col items-center mb-6'>
          <img className='w-full h-auto' src='https://images.unsplash.com/photo-1489110804417-276c3f517515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D' alt='Image' />
          <p className='text-center text-lg mt-2'>
            İçerik Üreticisi formunu doldur ve profilini oluştur
          </p>
        </div>

        <div className='w-full sm:w-[45%] md:w-[30%] lg:w-[250px] flex flex-col items-center mb-6'>
          <img className='w-full h-auto' src='https://images.unsplash.com/photo-1489110804417-276c3f517515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D' alt='Image' />
          <p className='text-center text-lg mt-2'>
            Mobil Uygulama’ya giriş yap, görevleri ve fiyatları incele
          </p>
        </div>

        <div className='w-full sm:w-[45%] md:w-[30%] lg:w-[250px] flex flex-col items-center'>
          <img className='w-full h-auto' src='https://images.unsplash.com/photo-1489110804417-276c3f517515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D' alt='Image' />
          <p className='text-center text-lg mt-2'>
            İstediğin görev için içerik üret ve uygulamaya yükle
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-6">
                    <button className="bg-blue-900 text-white text-lg font-bold rounded-md p-2 px-14">
                      İleri
                    </button>
                  </div>
    </div>
  );
};

export default Beginning;
