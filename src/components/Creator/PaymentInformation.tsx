import React, { useState } from "react";

const PaymentInformation = () => {
  // Define state for account type
  const [accountType, setAccountType] = useState("bireysel");

  return (
    <div>
      <div className="shadow-md bg-white w-[90vw] md:w-[80vw] lg:w-[70vw] mx-auto py-6">
      <div className="md:flex md:flex-row justify-around flex flex-col lg:p-0 p-3">
        <div>
          <h1 className="text-2xl font-bold">Ödeme Bilgileri</h1>
        </div>
        <div>
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-lg">Hesap Türü:</p>
                <select
                  className="outline-none border w-full p-1 rounded font-bold"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  {/* <option value="">Seçiniz</option> */}
                  <option value="bireysel">Bireysel</option>
                  <option value="kurumsal">Kurumsal</option>
                </select>
              </div>

              {/* Bireysel form fields */}
              {accountType === "bireysel" && (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-lg">Ad Soyad:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">IBAN Numarası:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">TC Kimlik Numarası:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Adres:</p>
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
                    <p className="text-lg">Şirket Unvanı:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">IBAN Numarası:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Vergi Numarası:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Vergi Dairesi:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Adres:</p>
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
      <div className="shadow-md bg-white w-[90vw] md:w-[80vw] lg:w-[70vw] mx-auto py-6 mt-8">
      <div className="md:flex md:flex-row justify-around flex flex-col lg:p-0 p-3">
        <div>
          <h1 className="text-2xl font-bold">Fatura Bilgileri</h1>
        </div>

        <div>
          <form>
            <div>
              <div>
                <h1 className="text-lg">Fatura Durumu:</h1>
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
              {accountType === "bireysel" && (
                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <p className="text-lg">Fatura Türü:</p>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="outline-none border w-full p-1 rounded font-bold"
                    >
                      <option value="bireysel">Bireysel</option>
                      <option value="kurumsal">Kurumsal</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-lg">Ad Soyad:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">T.C Kimlik No:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Fatura Adresi:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
              )}

              {/* Right Section: Conditional Form Fields */}
              {accountType === "kurumsal" && (
                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <p className="text-lg">Fatura Türü:</p>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="outline-none border w-full p-1 rounded font-bold"
                    >
                      <option value="kurumsal">Kurumsal</option>
                      <option value="bireysel">Bireysel</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-lg">Şirket Unvanı:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Vergi Numarası / TCKN:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Vergi Dairesi:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <p className="text-lg">Fatura Adresi:</p>
                    <input
                      className="outline-none border w-full p-1"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="flex justify-end mt-6 ">
                    <button className="bg-blue-900 text-white text-lg font-bold rounded-md p-2 px-14">
                      İleri
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PaymentInformation;
