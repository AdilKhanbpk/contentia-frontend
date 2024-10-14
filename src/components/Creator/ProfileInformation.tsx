import { setProfileInformation } from "@/store/becomeCreator/becomeCreatorSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ProfileInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(setProfileInformation(data));
    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-28">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* div one */}
          <div className="">
            <div className="bg-white p-5  sm:p-5  md:p-6  lg:p-6 ">
              <div className="flex flex-col lg:flex-row justify-start items-start lg:items-start">
                <div className="w-full lg:w-1/4 flex flex-col mb-6 lg:mb-0">
                  <h1 className="text-lg font-semibold whitespace-nowrap">
                    Profil Bilgileri
                  </h1>
                  <img
                    className="w-36 h-36 mt-4"
                    src="https://avatar.iran.liara.run/public/24"
                    alt="ProfileImage"
                  />
                </div>
                <div className="w-full lg:w-2/4">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                      <div>
                        <p className="text-base">Ad Soyad:</p>
                        <input
                          {...register("profile_information.name", {
                            required: true,
                          })}
                          className="outline-none border w-full p-2 rounded"
                          type="text"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs">
                            Name is required
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-base">E-Posta:</p>
                        <input
                          {...register("profile_information.email", {
                            required: true,
                          })}
                          className="outline-none border w-full p-2 rounded"
                          type="text"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs">
                            Email is required
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-base">Telefon Numarası:</p>
                        <input
                          {...register("profile_information.phoneNumber", {
                            required: true,
                          })}
                          className="outline-none border w-full p-2 rounded"
                          type="text"
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-xs">
                            Phone number is required
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                      <div>
                        <p className="text-base">TCKN:</p>
                        <input
                          {...register("profile_information.tckn", {
                            required: true,
                          })}
                          className="outline-none border w-full p-2 rounded"
                          type="text"
                        />
                        {errors.tckn && (
                          <p className="text-red-500 text-xs">
                            TCKN is required
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-base">Doğum Tarihi:</p>
                        <input
                          {...register("profile_information.dateOfBirth", {
                            required: true,
                          })}
                          className="outline-none border w-full p-2 rounded"
                          type="date"
                        />
                        {errors.dateOfBirth && (
                          <p className="text-red-500 text-xs">
                            Date of birth is required
                          </p>
                        )}
                      </div>
                      {/* Cinsiyet */}
                      <div className="mb-4 w-full sm:w-1/2 md:w-1/2 lg:w-full  mt-2 grid grid-cols-3">
                        <label className="col-span-3 block text-base font-medium text-gray-700 mb-2">
                          Cinsiyet:{" "}
                          <span className="font-medium">(Opsiyonel)</span>
                        </label>

                        {["Kadın", "Erkek", "Diğer"].map((gender, index) => (
                          <label
                            key={index}
                            className=" inline-flex items-center cursor-pointer mb-2 lg:mb-6"
                          >
                            <input
                              type="radio"
                              value={gender}
                              {...register("profile_information.gender")}
                              className="hidden peer"
                            />
                            <div className="w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out">
                              <div className="w-full h-full bg-white rounded-full"></div>
                            </div>
                            <span className="ml-0.5 text-base">{gender}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="ButtonBlue text-white text-base font-semibold rounded-xl p-1 px-14">
                  İleri
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* div two */}
        <div className=" bg-white  p-5  sm:p-5  md:p-6  lg:p-6  py-3 mt-14">
          <h1 className="text-lg font-semibold">Telefon Numarası Doğrulama</h1>
          <div className="flex flex-col justify-center items-center">
            <h2 className="mb-4 mt-6 text-base">SMS Doğrulama Kodu:</h2>
            <div className="flex flex-nowrap item-center justify-center gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  className="w-8 h-8  sm:w-12 md:w-12 lg:w-12  sm:h-12 md:h-12 lg:h-12  p-2 py-5 text-black text-center outline-none bg-gray-200 rounded"
                  type="text"
                  maxLength={1}
                />
              ))}
            </div>
            <button className="ButtonBlue text-white text-base font-semibold rounded-2xl p-1 mt-5 px-8">
              Doğrula
            </button>
            <p className="mt-3">Tekrar Gönder (02:00)</p>
            <p className="text-base font-semibold BlueText mt-3">
              Numara Değiştir
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
