import { setProfileInformation } from "@/store/becomeCreator/becomeCreatorSlice";
import React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface ProfileInformationProps {
  setActiveTab: (id: number) => void;
}

interface ProfileFormInputs {
  profile_information: {
    name: string;
    email: string;
    phoneNumber: string;
    tckn: string;
    dateOfBirth: string;
    gender?: string;
  };
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  setActiveTab,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>();

  const dispatch = useDispatch();

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      const res = await dispatch(setProfileInformation(data));
      if (res) {
        toast.success('Profile information saved successfully'); // Show success message
        setActiveTab(2);
      } else {
        toast.error('Failed to save profile information'); // Show error message
      }
    } catch (error) {
      toast.error('An error occurred while saving profile information'); // Handle unexpected errors
      console.error(error);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-28">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-5 sm:p-5 md:p-6 lg:p-6">
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
                  {/* Name Field */}
                  <div>
                    <p className="text-base">Ad Soyad:</p>
                    <input
                      {...register("profile_information.name", {
                        required: "Name is required",
                      })}
                      className="outline-none border w-full p-2 rounded"
                      type="text"
                    />
                    {errors?.profile_information?.name && (
                      <p className="text-red-500 text-xs">
                        {errors.profile_information.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <p className="text-base">E-Posta:</p>
                    <input
                      {...register("profile_information.email", {
                        required: "Email is required",
                      })}
                      className="outline-none border w-full p-2 rounded"
                      type="email"
                    />
                    {errors?.profile_information?.email && (
                      <p className="text-red-500 text-xs">
                        {errors.profile_information.email?.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <p className="text-base">Telefon Numarası:</p>
                    <input
                      {...register("profile_information.phoneNumber", {
                        required: "Phone number is required",
                      })}
                      className="outline-none border w-full p-2 rounded"
                      type="text"
                    />
                    {errors?.profile_information?.phoneNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.profile_information.phoneNumber?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  {/* TCKN Field */}
                  <div>
                    <p className="text-base">TCKN:</p>
                    <input
                      {...register("profile_information.tckn", {
                        required: "TCKN is required",
                      })}
                      className="outline-none border w-full p-2 rounded"
                      type="text"
                    />
                    {errors?.profile_information?.tckn && (
                      <p className="text-red-500 text-xs">
                        {errors.profile_information.tckn?.message}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <p className="text-base">Doğum Tarihi:</p>
                    <input
                      {...register("profile_information.dateOfBirth", {
                        required: "Date of birth is required",
                      })}
                      className="outline-none border w-full p-2 rounded"
                      type="date"
                    />
                    {errors?.profile_information?.dateOfBirth && (
                      <p className="text-red-500 text-xs">
                        {errors.profile_information.dateOfBirth?.message}
                      </p>
                    )}
                  </div>

                  {/* Gender Field (Optional) */}
                  <div className="mb-4 w-full sm:w-1/2 md:w-1/2 lg:w-full mt-2 grid grid-cols-3">
                    <label className="col-span-3 block text-base font-medium text-gray-700 mb-2">
                      Cinsiyet: <span className="font-medium">(Opsiyonel)</span>
                    </label>

                    {["Kadın", "Erkek", "Diğer"].map((gender, index) => (
                      <label
                        key={index}
                        className="inline-flex items-center cursor-pointer mb-2 lg:mb-6"
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
      </form>

      <div className="bg-white p-5 sm:p-5 md:p-6 lg:p-6 py-3 mt-14">
        <h1 className="text-lg font-semibold">Telefon Numarası Doğrulama</h1>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mb-4 mt-6 text-base">SMS Doğrulama Kodu:</h2>
          <div className="flex flex-nowrap item-center justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                className="w-8 h-8 sm:w-12 md:w-12 lg:w-12 sm:h-12 md:h-12 lg:h-12 p-2 py-5 text-black text-center outline-none bg-gray-200 rounded"
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
  );
};

export default ProfileInformation;
