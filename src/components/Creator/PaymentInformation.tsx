import React, { useState } from "react";

const PaymentInformation = () => {

  const [accountType, setAccountType] = useState("bireysel");
  const [accountTypeOne, setAccountTypeOne] = useState("bireysel");

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-28">
      <div className=" bg-white  p-5  sm:p-5  md:p-6  lg:p-6 ">
        <div className="md:flex md:flex-row justify-start md:space-x-32 lg:space-x-32 flex flex-col lg:p-0 p-3">
          <div>
            <h1 className="text-lg font-semibold">Ödeme Bilgileri</h1>
          </div>
          <div>
            <form>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-base">Hesap Türü:</p>
                  <select
                    className="outline-none border w-full p-1 rounded font-semibold"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    {/* <option value="">Seçiniz</option> */}
                    <option className="font-semibold" value="bireysel">Bireysel</option>
                    <option className="font-semibold" value="kurumsal">Kurumsal</option>
                  </select>
                </div>

                {/* Bireysel form fields */}
                {accountType === "bireysel" && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-base">Ad Soyad:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">IBAN Numarası:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">TC Kimlik Numarası:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Adres:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                )}

                {/* Kurumsal form fields */}
                {accountType === "kurumsal" && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-base">Şirket Unvanı:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">IBAN Numarası:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Vergi Numarası:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Vergi Dairesi:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Adres:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Section Two */}
      <div className=" bg-white  p-5  sm:p-5  md:p-6  lg:p-6  py-6 mt-8">
        <div className="md:flex md:flex-row justify-start lg:space-x-32 flex flex-col lg:p-0 p-3">
          <div>
            <h1 className="text-lg font-semibold">Fatura Bilgileri</h1>
          </div>

          <div>
            <form>
              <div>
                <div>
                  <h1 className="text-base">Fatura Durumu:</h1>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-1" />
                      <span>Var</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-1" />
                      <span>Yok</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 mt-9">
                {/* Left Section: Conditional Form Fields */}
                {accountTypeOne === "bireysel" && (
                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <p className="text-base">Fatura Türü:</p>
                      <select
                        value={accountTypeOne}
                        onChange={(e) => setAccountTypeOne(e.target.value)}
                        className="outline-none border w-full p-1 rounded font-bold"
                      >
                        <option className="font-semibold" value="bireysel">Bireysel</option>
                        <option className="font-semibold" value="kurumsal">Kurumsal</option>
                      </select>
                    </div>

                    <div>
                      <p className="text-base">Ad Soyad:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">T.C Kimlik No:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Fatura Adresi:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                )}

                {/* Right Section: Conditional Form Fields */}
                {accountTypeOne === "kurumsal" && (
                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <p className="text-base">Fatura Türü:</p>
                      <select
                        value={accountTypeOne}
                        onChange={(e) => setAccountTypeOne(e.target.value)}
                        className="outline-none border w-full p-1 rounded font-bold"
                      >
                        <option value="kurumsal">Kurumsal</option>
                        <option value="bireysel">Bireysel</option>
                      </select>
                    </div>

                    <div>
                      <p className="text-base">Şirket Unvanı:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Vergi Numarası / TCKN:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Vergi Dairesi:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <p className="text-base">Fatura Adresi:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                      />
                    </div>

                  </div>

                )}

              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end ">
          <button className="ButtonBlue text-white text-lg font-bold rounded-xl p-1 px-14">
            İleri
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
