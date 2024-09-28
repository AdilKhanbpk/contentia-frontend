"use client"
import React, {useState} from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";

const ContentCreatorPreferences = () => {
  const [socialMediaShare, setSocialMediaShare] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false)
  const [address, setAddress] = useState({
    country: "",
    district: "",
    city: "",
    neighborhood: "",
    fullAddress: "",
  });

  const showPopupHandler = () => {
    setShowPopup(!showPopup)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialMediaShareChange = (value: string) => {
    if (socialMediaShare === value) {
      setSocialMediaShare(null);
    } else {
      setSocialMediaShare(value);
    }
  };

  const handleContentTypeChange = (value: string) => {
    if (contentType === value) {
      setContentType(null);
    } else {
      setContentType(value);
    }
  };

  const showAddressSection = contentType === "product" || contentType === "place";

  return (
   <div>
    <div className="shadow-md bg-white w-full md:w-[80vw] lg:w-[70vw] mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-xl font-bold">İçerik Üreticisi Tercihleri</h1>
      
      <section className="mt-5 px-5">
        <h2 className="text-lg font-bold">Sosyal Medya Paylaşımı</h2>
        <p>Ek ücret karşılığında, hazırladığın içerikleri kendi sosyal medya hesaplarında paylaşma ister misin?</p>
        <div className="flex flex-col md:flex-row gap-3 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="socialMediaShare"
              value="yes"
              onChange={() => handleSocialMediaShareChange("yes")}
              checked={socialMediaShare === "yes"}
              className="form-radio text-green-500 border-gray-300"
            />
            <span className="ml-2">Evet</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="socialMediaShare"
              value="no"
              onChange={() => handleSocialMediaShareChange("no")}
              checked={socialMediaShare === "no"}
              className="form-radio text-green-500 border-gray-300"
            />
            <span className="ml-2">Hayır</span>
          </label>
        </div>
      </section>

      <section className="mt-12 flex flex-col md:flex-row justify-between gap-6 relative">
        <div className={` p-4 w-full ${showAddressSection ? "md:w-[48%]" : "md:w-full"}`}>
          <div className='flex gap-2 items-center '>
          <h1 className="text-lg font-bold">İçerik Türü:</h1>
          <IoMdInformationCircleOutline size={30} className='text-blue-700 cursor-pointer' onClick={showPopupHandler}/>

          </div>
          <p>UGC’lerinizde tanıtım gerektiren, içerik türünüzü seçin</p>
          <div className="flex flex-col md:flex-row gap-3 mt-2">
            {["product", "service", "place"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="contentType"
                  value={type}
                  onChange={() => handleContentTypeChange(type)}
                  checked={contentType === type}
                  className="form-radio text-green-500 border-gray-300"
                />
                <span className="ml-2">{type === "product" ? "Ürün" : type === "service" ? "Hizmet" : "Mekan"}</span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <h1 className="text-lg font-bold">İçerik Formatları:</h1>
            <p className="mt-1">Profiliniz ile eşleşen içerik alanlarını belirleyin</p>
            <div className="flex flex-col gap-2 mt-2">
              {["Instagram / TikTok Videosu (Dikey)", "Instagram Gönderi", "TikTok Videosu", "Linkedin Gönderisi"].map((format, index) => (
                <label key={index} className="flex items-center">
                  <input type="radio" name="contentFormat" id={`format${index + 1}`} />
                  <span className="ml-2">{format}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Address Section */}
        {showAddressSection && (
          <div className=" p-4 w-full md:w-[48%]">
            <h1 className="text-lg font-bold">Adres:</h1>
            <p>
              Lütfen tanıtılmasını istediğiniz mekanın adres bilgilerini belirtin
            </p>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div>
                    <h1 className="text-lg font-bold mb-2 mt-1">Ülke</h1>
                    <input
                      className="outline-none border p-2 w-full"
                      type="text"
                      name="country"
                      placeholder="Seçiniz"
                      value={address.country}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold mb-2 mt-1">İlçe</h1>
                    <input
                      className="outline-none border p-2 w-full"
                      type="text"
                      name="district"
                      placeholder="Seçiniz"
                      value={address.district}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <h1 className="text-lg font-bold mb-2 mt-1">İl</h1>
                    <input
                      className="outline-none border p-2 w-full"
                      type="text"
                      name="city"
                      placeholder="Seçiniz"
                      value={address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold mb-2 mt-1">Mahalle</h1>
                    <input
                      className="outline-none border p-2 w-full"
                      type="text"
                      name="neighborhood"
                      value={address.neighborhood}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold mb-2 mt-1">Açık Adres:</h1>
                <input
                  className="outline-none border w-full h-[70px] p-2"
                  type="text"
                  name="fullAddress"
                  placeholder="Lütfen açık adres bilgilerini girin."
                  value={address.fullAddress}
                  onChange={handleAddressChange}
                />
              </div>
            </form>
          </div>
        )}
      </section>

     {
      showPopup &&  <div className='bg-gray-400 text-white md:w-[450px] w-[300px]  text-xs p-1 py-2 absolute sm:top-72 top-[450px] right-2 flex items-center '>
      <p className='flex flex-wrap'>Ürün tanıtımı gerçekleştiren içerik üreticilerinin belirttiği adrese ürün gönderimi yapılır. Ürün, marka tarafından içerik üreticisine hediye edilmektedir.<br/> <br/>Mekan tanıtımı gerçekleştiren içerik üreticileri, kendine yakın lokasyonda bulunan mekanlara giderek içerik üretecekleri için adres bilgileri alınmaktadır.</p>
    </div>
     }

      <section className="mt-9">
  <h1 className="text-lg font-bold">İlgi Alanları:</h1>
  <p className="mb-2">Profiliniz ile eşleşen içerik alanlarını belirleyin</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-[50vw] ">
    {[
      "Spor ve Aktivite",
      "Yemek ve İçecek",
      "Film ve Dizi",
      "E-Ticaret",
      "Teknoloji",
      "Sanal ve El İşleri",
      "Bilim ve Teknoloji",
      "Doğa ve Hayvanlar",
      "Üretim ve Mühendislik",
      "Müzik",
      "Seyahat ve Kültür",
      "Gönüllülük",
      "Sağlık",
      "Eğlence ve Oyun",
      "Kitap ve Edebiyat",
      "Moda ve Güzellik",
      "Eğitim"
    ].map((interest, index) => (
      <label key={index} className="flex  items-center">
        <input type="radio" name="interest" id={`interest${index + 1}`} />
        <span className="ml-2 text-sm">{interest}</span>
      </label>
    ))}
  </div>
</section>

    </div>
    
   </div>
  )
}

export default ContentCreatorPreferences