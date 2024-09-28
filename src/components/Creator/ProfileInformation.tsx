import React from 'react';

const ProfileInformation = () => {
  return (
    <>
      {/* div one */}
      <div className=''>
        <div className='shadow-md bg-white w-[90vw] md:w-[80vw] lg:w-[70vw] mx-auto py-6 lg:p-2 p-4'>
          <div className='flex flex-col lg:flex-row justify-around items-start lg:items-center'>
            <div className='flex flex-col items-center mb-6 lg:mb-0'>
              <h1 className='text-2xl font-bold'>Profil Bilgileri</h1>
              <img className='w-28 mt-4' src='https://avatar.iran.liara.run/public/24' alt='ProfileImage' />
            </div>
            <div className='w-full lg:w-auto'>
              <form>
                <div className='flex flex-col lg:flex-row gap-6'>
                  <div className='flex flex-col gap-4 w-full lg:w-1/2'>
                    <div>
                      <p className='text-lg'>Ad Soyad:</p>
                      <input className='outline-none border w-full p-2 rounded' type='text' />
                    </div>
                    <div>
                      <p className='text-lg'>E-Posta:</p>
                      <input className='outline-none border w-full p-2 rounded' type='text' />
                    </div>
                    <div>
                      <p className='text-lg'>Telefon Numarası:</p>
                      <input className='outline-none border w-full p-2 rounded' type='text' />
                    </div>
                  </div>

                  <div className='flex flex-col gap-4 w-full lg:w-1/2'>
                    <div>
                      <p className='text-lg'>TCKN:</p>
                      <input className='outline-none border w-full p-2 rounded' type='text' />
                    </div>
                    <div>
                      <p className='text-lg'>Doğum Tarihi:</p>
                      <input className='outline-none border w-full p-2 rounded' type='text' />
                    </div>
                    <div>
                      <h1 className='text-lg'>Cinsiyet:</h1>
                      <div className='mt-2 flex gap-4'>
                        <label className='flex items-center'>
                          <input type='checkbox' className='mr-1' /><span>Kadın</span>
                        </label>
                        <label className='flex items-center'>
                          <input type='checkbox' className='mr-1' /><span>Erkek</span>
                        </label>
                        <label className='flex items-center'>
                          <input type='checkbox' className='mr-1' /><span>Diğer</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='flex justify-end  mt-6'>
            <button className='bg-blue-900 text-white text-lg font-bold rounded-md p-2 px-14'>İleri</button>
          </div>
        </div>
      </div>

      {/* div two */}
      <div className='shadow-md bg-white w-[90vw] md:w-[80vw] lg:w-[70vw] mx-auto py-3 mt-14 p-3'>
        <h1 className='text-2xl font-bold'>Telefon Numarası Doğrulama</h1>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='mb-4 mt-6 text-lg'>SMS Doğrulama Kodu:</h2>
          <div className='flex flex-wrap item-center justify-center gap-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                className='w-12 p-2 py-5 text-black text-center outline-none bg-gray-200 rounded'
                type='text'
                maxLength={1}
              />
            ))}
          </div>
          <button className='bg-blue-900 text-white text-lg font-bold rounded-md p-2 mt-5 px-8'>Doğrula</button>
          <p className='mt-3'>Tekrar Gönder (02:00)</p>
          <p className='text-lg font-bold text-blue-900 mt-3'>Numara Değiştir</p>
        </div>
      </div>
    </>
  );
}

export default ProfileInformation;
