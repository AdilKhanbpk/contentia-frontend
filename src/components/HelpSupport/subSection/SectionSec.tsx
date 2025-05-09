import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const SectionSec = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-32 ">
      <div className=" py-24 sm:py-24 md:py-24 lg:py-[100px]">
        <div className=" p-2 sm:p-4 md:p-8 lg:px-12 lg:py-8">
          <div>
            <h4 className="text-gray-600">Merhaba</h4>
            <h1 className="mt-2 text-3xl font-bold text-gray-800">Sipariş Oluşturma</h1>
            <div className="flex gap-3 p-2 items-center rounded-md mt-9 mb-4 bg-gray-200">
              <CiSearch size={20} />
              <input
                type="text"
                placeholder="Destek almak istediğiniz konu nedir?"
                className="outline-none w-full py-1 bg-gray-200"
                aria-label="Search"
              />
            </div>
          </div> 

          <div className="flex text-sm mt-6 space-x-3 flex-wrap pb-2">
            <div className="flex items-center">
              <span>All Collections</span>
              <span className="text-xl">
                <MdOutlineKeyboardArrowRight />
              </span>
            </div>
            <div className="flex items-center">
              <span>Sipariş Oluşturma</span>
              <span className="text-xl">
                <MdOutlineKeyboardArrowRight />
              </span>
            </div>
            <div className="flex items-center">
              <span>Order A Video</span>
              <span className="text-xl">
                <MdOutlineKeyboardArrowRight />
              </span>
            </div>
            <span className="text-gray-500">Getting Started Guide for Brands</span>
          </div>

          <div className="flex md:flex-row flex-col items-start justify-start mt-6 ">
            <div className="">
              <div className=" w-full">
                <h1 className="text-3xl font-bold">UGC Siparişi</h1>
                <p className="text-gray-500 my-3">Contentia’da sipariş oluşturmayı keşfedin</p>
                <p>Sipariş oluşturmak için, Hemen Başla butonuna basın</p>
                <div className="w-full border-b-2 mt-4">
                  It all starts by creating your first task ✍️
                </div>
              </div>

              <div className="mt-8 mb-2">
                <h1 className="text-2xl font-bold">Nasıl Sipariş Oluşturulur?</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="mt-8 mb-2">
                <h1 className="text-2xl font-bold">Siparişimi Nasıl Takip Ederim?</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-l-2 pl-5 md:ml-9 mt-8 md:mt-0">
              <p className="whitespace-nowrap">UGC Siparişi</p>
              <p className="whitespace-nowrap">Paket Seçimi</p>
              <p className="whitespace-nowrap">Marka Ekleme</p>
              <p className="whitespace-nowrap">İçerik Türleri</p>
              <p className="whitespace-nowrap">İçerik Üreticileri Tercihi</p>
              <p className="whitespace-nowrap">Ek Hizmetler</p>
              <p className="whitespace-nowrap">Ödeme ve Faturalandırma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSec;
