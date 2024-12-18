import { setPaymentInformation } from "@/store/becomeCreator/becomeCreatorSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const PaymentInformation: React.FC<{ setActiveTab: (id: number) => void }> = ({
  setActiveTab,
}) => {
  const [accountType, setAccountType] = useState("bireysel");
  const [accountTypeOne, setAccountTypeOne] = useState("bireysel");

  interface PaymentInformationFormValues {
    payment_information: {
      ad_soyad?: string;
      tr_id?: string;
      company_name?: string;
      tax_number?: string;
      tax_office?: string;
      iban_number?: string;
      address?: string;
      invoice_status: string;
    };
    billing_information: {
      ad_soyad?: string;
      tr_id?: string;
      company_name?: string;
      tax_number?: string;
      tax_office?: string;
      address?: string;
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInformationFormValues>();
  const dispatch = useDispatch();

  const onSubmit = async (data: PaymentInformationFormValues) => {
    try {
      const res = await dispatch(setPaymentInformation(data));
      if (res) {
        toast.success('Payment information saved successfully');
        setActiveTab(3);
      } else {
        toast.error('Failed to save payment information');
      }
    } catch (error) {
      toast.error('An error occurred while saving payment information');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 sm:px-6 md:px-8 lg:px-28">
        <div className=" bg-white  p-5  sm:p-5  md:p-6  lg:p-6 ">
          <div className="md:flex md:flex-row justify-start md:space-x-32 lg:space-x-32 flex flex-col lg:p-0 p-3">
            <div>
              <h1 className="text-lg font-semibold">Ödeme Bilgileri</h1>
            </div>

            <div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-base">Hesap Türü:</p>
                  <select
                    className="outline-none border w-full p-1 rounded font-semibold"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option
                      className="font-semibold"
                      value="bireysel"
                    >
                      Bireysel
                    </option>
                    <option
                      className="font-semibold"
                      value="kurumsal"
                    >
                      Kurumsal
                    </option>
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
                        {...register("payment_information.ad_soyad", {
                          required: "Ad Soyad zorunludur",
                        })}
                      />
                      {errors.payment_information?.ad_soyad && (
                        <span className="text-red-500">
                          {errors.payment_information.ad_soyad.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-base">TC Kimlik Numarası:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                        {...register("payment_information.tr_id", {
                          required: "TC Kimlik Numarası zorunludur",
                          minLength: {
                            value: 11,
                            message: "TC Kimlik Numarası 11 haneli olmalıdır",
                          },
                        })}
                      />
                      {errors.payment_information?.tr_id && (
                        <span className="text-red-500">
                          {errors.payment_information.tr_id.message}
                        </span>
                      )}
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
                        {...register("payment_information.company_name", {
                          required: "Şirket Unvanı zorunludur",
                        })}
                      />
                      {errors.payment_information?.company_name && (
                        <span className="text-red-500">
                          {errors.payment_information.company_name.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-base">Vergi Numarası:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                        {...register("payment_information.tax_number", {
                          required: "Vergi Numarası zorunludur",
                        })}
                      />
                      {errors.payment_information?.tax_number && (
                        <span className="text-red-500">
                          {errors.payment_information.tax_number.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-base">Vergi Dairesi:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                        {...register("payment_information.tax_office", {
                          required: "Vergi Dairesi zorunludur",
                        })}
                      />
                      {errors.payment_information?.tax_office && (
                        <span className="text-red-500">
                          {errors.payment_information.tax_office.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-base">IBAN Numarası:</p>
                  <input
                    className="outline-none border w-full p-1"
                    type="text"
                    placeholder=""
                    {...register("payment_information.iban_number", {
                      required: "IBAN Numarası zorunludur",
                    })}
                  />
                  {errors.payment_information?.iban_number && (
                    <span className="text-red-500">
                      {errors.payment_information.iban_number.message}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-base">Adres:</p>
                  <input
                    className="outline-none border w-full p-1"
                    type="text"
                    placeholder=""
                    {...register("payment_information.address", {
                      required: "Adres zorunludur",
                    })}
                  />
                  {errors.payment_information?.address && (
                    <span className="text-red-500">
                      {errors.payment_information.address.message}
                    </span>
                  )}
                </div>
              </div>
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
              <div>
                <div>
                  <h1 className="text-base">Fatura Durumu:</h1>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="mr-1"
                        value={"true"}
                        {...register("payment_information.invoice_status")}
                      />
                      <span>Var</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="mr-1"
                        value={"false"}
                        {...register("payment_information.invoice_status")}
                      />
                      <span>Yok</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-9">
                {accountTypeOne === "bireysel" && (
                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <p className="text-base">Fatura Türü:</p>
                      <select
                        value={accountTypeOne}
                        onChange={(e) => setAccountTypeOne(e.target.value)}
                        className="outline-none border w-full p-1 rounded font-bold"
                      >
                        <option
                          className="font-semibold"
                          value="bireysel"
                        >
                          Bireysel
                        </option>
                        <option
                          className="font-semibold"
                          value="kurumsal"
                        >
                          Kurumsal
                        </option>
                      </select>
                    </div>
                    <div>
                      <p className="text-base">Ad Soyad:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                        {...register("billing_information.ad_soyad", {
                          required: "Ad Soyad zorunludur",
                        })}
                      />
                      {errors.billing_information?.ad_soyad && (
                        <span className="text-red-500">
                          {errors.billing_information.ad_soyad.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-base">T.C Kimlik No:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                        {...register("billing_information.tr_id", {
                          required: "T.C Kimlik No zorunludur",
                          minLength: {
                            value: 11,
                            message: "T.C Kimlik No 11 haneli olmalıdır",
                          },
                        })}
                      />
                      {errors.billing_information?.tr_id && (
                        <span className="text-red-500">
                          {errors.billing_information.tr_id.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

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
                        {...register("billing_information.company_name", {
                          required: "Şirket Unvanı zorunludur",
                        })}
                      />
                      {errors.billing_information?.company_name && (
                        <span className="text-red-500">
                          {errors.billing_information.company_name.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-base">Vergi Numarası / TCKN:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                        {...register("billing_information.tax_number", {
                          required: "Vergi Numarası veya TCKN zorunludur",
                        })}
                      />
                      {errors.billing_information?.tax_number && (
                        <span className="text-red-500">
                          {errors.billing_information.tax_number.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-base">Vergi Dairesi:</p>
                      <input
                        className="outline-none border w-full p-1"
                        type="text"
                        placeholder=""
                        {...register("billing_information.tax_office", {
                          required: "Vergi Dairesi zorunludur",
                        })}
                      />
                      {errors.billing_information?.tax_office && (
                        <span className="text-red-500">
                          {errors.billing_information.tax_office.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-base">Fatura Adresi:</p>
                  <input
                    className="outline-none border w-full p-1"
                    type="text"
                    placeholder=""
                    {...register("billing_information.address", {
                      required: "Fatura Adresi zorunludur",
                    })}
                  />
                  {errors.billing_information?.address && (
                    <span className="text-red-500">
                      {errors.billing_information.address.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
            <button
              type="submit"
              className="ButtonBlue text-white text-lg font-bold rounded-xl p-1 px-14"
            >
              İleri
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentInformation;
