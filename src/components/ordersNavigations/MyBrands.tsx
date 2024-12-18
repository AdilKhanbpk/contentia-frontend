import Image from 'next/image';

export default function MyBrands() {
    return (
        <>
            <div className="px-4 sm:px-6 md:px-8 lg:px-28 py-24 sm:py-24 md:py-24 lg:py-24 bg-gray-50 ">
                <div className="p-4 my-4 sm:p-5 sm:my-6 md:p-6 md:my-8 lg:p-6 lg:my-8">

                    {/* Brand Profiles */}
                    <div className="p-4 mb-4 sm:p-5 sm:mb-5 md:p-6 md:mb-6 lg:p-6 lg:mb-6 bg-white">
                        <div className='flex flex-row items-center  space-x-2'>
                            <div>
                                <Image width={16} height={16} src='/plusIcon.png' alt='plus icon' ></Image>

                            </div>
                            <div>
                                <p className='BlueText text-sm font-semibold'>Marka Ekle</p>

                            </div>
                        </div>

                        {/* First Brand Box */}
                        <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-36 p-4 mt-1 mb-4 sm:p-5 sm:mt-2 sm:mb-6 md:p-6 md:mt-2 md:mb-8 lg:p-6 lg:mt-2 lg:mb-8 border-2 border-gray-200">
                            <div className="flex flex-col justify-start items-center">
                                <h2 className="text-base font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-10">Contentia</h2>
                                <div className="w-28 h-28 font-semibold ButtonBlue text-white rounded-full flex items-center justify-center">
                                    Logo
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-col">
                                <div className="flex flex-col mb-2">
                                    <p>Marka Adı:</p>
                                    <p className="font-semibold">Contentia</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Marka Kategorisi:</p>
                                    <p className="font-semibold">E-Ticaret</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p className='whitespace-nowrap'>Marka Websitesi: (Opsiyonel)</p>
                                    <p className="font-semibold">www.contentia.io</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Ülke:</p>
                                    <p className="font-semibold">Türkiye</p>
                                </div>
                            </div>
                            <div className='absolute right-16 sm:right-20 md:right-28 lg:right-48'>
                                <div className=''>
                                    <Image width={16} height={16} src='/editIcon.png' alt='plus icon' ></Image>
                                </div>
                            </div>
                        </div>

                        {/* Second Brand Box */}
                        <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-36 p-4 my-4 sm:p-5 sm:my-6 md:p-6 md:my-8 lg:p-6 lg:my-8 border-2 border-gray-200">
                            <div className="flex flex-col justify-start items-center">
                                <h2 className="text-base font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-10">Brand 1</h2>
                                <div className="w-28 h-28 ButtonBlue font-semibold text-white rounded-full flex items-center justify-center">
                                    Logo
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-col">
                                <div className="flex flex-col mb-2">
                                    <p>Marka Adı:</p>
                                    <p className="font-semibold">Brand 1</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Marka Kategorisi:</p>
                                    <p className="font-semibold">Seyahat</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p className='whitespace-nowrap'>Marka Websitesi: (Opsiyonel)</p>
                                    <p className="font-semibold">www.contentia.io</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Ülke:</p>
                                    <p className="font-semibold">Türkiye</p>
                                </div>
                            </div>
                        </div>

                        {/* Third Brand Box */}
                        <div className="flex flex-col lg:flex-row justify-start items-start lg:space-x-36 p-4 my-4 sm:p-5 sm:my-6 md:p-6 md:my-8 lg:p-6 lg:my-8 border-2 border-gray-200">
                            <div className="flex flex-col justify-start items-center">
                                <h2 className="text-base font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-10">Brand 2</h2>
                                <div className="w-28 h-28 ButtonBlue font-semibold text-white rounded-full flex items-center justify-center">

                                    Logo
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-col">
                                <div className="flex flex-col mb-2">
                                    <p>Marka Adı:</p>
                                    <p className="font-semibold">Brand 2</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Marka Kategorisi:</p>
                                    <p className="font-semibold">Kozmetik</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p className='whitespace-nowrap'>Marka Websitesi: (Opsiyonel)</p>
                                    <p className="font-semibold">www.contentia.io</p>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <p>Ülke:</p>
                                    <p className="font-semibold">Türkiye</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
