const Beginning: React.FC<{ setActiveTab: (id: number) => void }> = ({
    setActiveTab,
}) => {
    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-28'>
            <div className=' p-4  sm:p-5  md:p-6  lg:p-6   bg-white'>
                <div>
                    <h1 className='text-xl font-bold'>İçerik Üreticisi Ol</h1>
                </div>
                <div className='mt-3 text-lg'>
                    <h3>Contentia’ya Hoşgeldin!</h3>
                    <p className='my-4 mt-7'>
                        Contentia, müşteri firmaların ve markaların ürün, hizmet
                        ya da mekan tanıtımları için içerik üreticileriyle
                        çalışarak UGC, influencer pazarlaması ve çeşitli sosyal
                        medya tanıtımları satın alabileceği bir platform.
                    </p>
                    <p>
                        Yalnızca 5 dakikanı ayırarak, İçerik Üreticisi formunu
                        doldurarak içerik üreticileri arasında yer alabilir ve
                        ürettiğin içeriklerden gelir elde edebilirsin.
                    </p>
                </div>

                <div className='mt-14 mb-7'>
                    <h1 className='text-xl font-bold'>Nasıl Çalışır?</h1>
                </div>

                <div className='flex flex-wrap justify-between px-4 lg:px-12'>
                    <div className='w-full sm:w-[45%] md:w-[30%] lg:w-[250px] flex flex-col items-center mb-6'>
                        <img
                            className='w-full h-auto'
                            src='https://images.unsplash.com/photo-1489110804417-276c3f517515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D'
                            alt='Image'
                        />
                        <p className='text-center text-lg mt-2'>
                            İçerik Üreticisi formunu doldur ve profilini oluştur
                        </p>
                    </div>

                    <div className='w-full sm:w-[45%] md:w-[30%] lg:w-[250px] flex flex-col items-center mb-6'>
                        <img
                            className='w-full h-auto'
                            src='https://images.unsplash.com/photo-1489110804417-276c3f517515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D'
                            alt='Image'
                        />
                        <p className='text-center text-lg mt-2'>
                            Mobil Uygulama’ya giriş yap, görevleri ve fiyatları
                            incele
                        </p>
                    </div>

                    <div className='w-full sm:w-[45%] md:w-[30%] lg:w-[250px] flex flex-col items-center'>
                        <img
                            className='w-full h-auto'
                            src='https://images.unsplash.com/photo-1489110804417-276c3f517515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D'
                            alt='Image'
                        />
                        <p className='text-center text-lg mt-2'>
                            İstediğin görev için içerik üret ve uygulamaya yükle
                        </p>
                    </div>
                </div>
                <div className='flex justify-end '>
                    <button
                        onClick={() => {
                            setActiveTab(1);
                        }}
                        className='Button text-white text-lg font-bold rounded-xl p-1 px-14'
                    >
                        İleri
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Beginning;
