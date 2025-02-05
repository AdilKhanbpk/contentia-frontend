import { setCreatorFormData } from "@/store/becomeCreator/becomeCreatorSlice";
import { ProfileFormInputs } from "@/types/interfaces";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface ProfileInformationProps {
    setActiveTab: (id: number) => void;
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
            console.log(data);
            const res = await dispatch(setCreatorFormData(data));
            if (res) {
                toast.success("Profile information saved successfully");
                setActiveTab(2);
            } else {
                toast.error("Failed to save profile information");
            }
        } catch (error) {
            toast.error("An error occurred while saving profile information");
        }
    };

    return (
        <div className='px-4 sm:px-6 md:px-8 lg:px-28'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='bg-white p-5 sm:p-5 md:p-6 lg:p-6'>
                    <div className='flex flex-col lg:flex-row justify-start items-start lg:items-start'>
                        <div className='w-full lg:w-1/4 flex flex-col mb-6 lg:mb-0'>
                            <h1 className='text-lg font-semibold whitespace-nowrap'>
                                Profil Bilgileri
                            </h1>
                            <img
                                className='w-36 h-36 mt-4'
                                src='https://avatar.iran.liara.run/public/24'
                                alt='ProfileImage'
                            />
                        </div>
                        <div className='w-full lg:w-2/4'>
                            <div className='flex flex-col lg:flex-row gap-6'>
                                <div className='flex flex-col gap-4 w-full lg:w-1/2'>
                                    {/* Name Field */}
                                    <div>
                                        <p className='text-base'>Ad Soyad:</p>
                                        <input
                                            {...register("fullName", {
                                                required: "Name is required",
                                            })}
                                            className='outline-none border w-full p-2 rounded'
                                            type='text'
                                        />
                                        {errors?.fullName && (
                                            <p className='text-red-500 text-xs'>
                                                {errors.fullName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium'>
                                            Password
                                        </label>
                                        <input
                                            type='password'
                                            {...register("password", {
                                                required: "Contact is required",
                                            })}
                                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <p className='text-base'>E-Posta:</p>
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                            })}
                                            className='outline-none border w-full p-2 rounded'
                                            type='email'
                                        />
                                        {errors?.email && (
                                            <p className='text-red-500 text-xs'>
                                                {errors.email?.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Number Field */}
                                    <div>
                                        <p className='text-base'>
                                            Telefon Numarası:
                                        </p>
                                        <input
                                            {...register("phoneNumber", {
                                                required:
                                                    "Phone number is required",
                                            })}
                                            className='outline-none border w-full p-2 rounded'
                                            type='text'
                                        />
                                        {errors?.phoneNumber && (
                                            <p className='text-red-500 text-xs'>
                                                {errors.phoneNumber?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-col gap-4 w-full lg:w-1/2'>
                                    {/* TCKN Field */}
                                    <div>
                                        <p className='text-base'>
                                            Identity No (TCKN):
                                        </p>
                                        <input
                                            {...register("tckn", {
                                                required: "TCKN is required",
                                            })}
                                            className='outline-none border w-full p-2 rounded'
                                            type='text'
                                        />
                                        {errors?.tckn && (
                                            <p className='text-red-500 text-xs'>
                                                {errors.tckn?.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Date of Birth Field */}
                                    <div>
                                        <p className='text-base'>
                                            Doğum Tarihi:
                                        </p>
                                        <input
                                            {...register("dateOfBirth", {
                                                required:
                                                    "Date of birth is required",
                                            })}
                                            className='outline-none border w-full p-2 rounded'
                                            type='date'
                                        />
                                        {errors?.dateOfBirth && (
                                            <p className='text-red-500 text-xs'>
                                                {errors.dateOfBirth?.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Gender Field (Optional) */}
                                    <div className='mb-4 w-full sm:w-1/2 md:w-1/2 lg:w-full mt-2 grid grid-cols-3'>
                                        <label className='col-span-3 block text-base font-medium text-gray-700 mb-2'>
                                            Cinsiyet:{" "}
                                            <span className='font-medium'>
                                                (Opsiyonel)
                                            </span>
                                        </label>

                                        {[
                                            { label: "Kadın", value: "female" },
                                            { label: "Erkek", value: "male" },
                                            { label: "Diğer", value: "other" },
                                        ].map((gender, index) => (
                                            <label
                                                key={index}
                                                className='inline-flex items-center cursor-pointer mb-2 lg:mb-6'
                                            >
                                                <input
                                                    type='radio'
                                                    value={gender.value}
                                                    {...register("gender")}
                                                    className='hidden peer'
                                                />
                                                <div className='w-5 h-5 p-1 border-2 BlueBorder rounded-full peer-checked:bg-[#4D4EC9] transition-all duration-300 ease-in-out'>
                                                    <div className='w-full h-full bg-white rounded-full'></div>
                                                </div>
                                                <span className='ml-0.5 text-base'>
                                                    {gender.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className='text-xl font-semibold mt-6 mb-4'>
                                    Address
                                </h2>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium'>
                                            Address 01
                                        </label>
                                        <input
                                            type='text'
                                            {...register(
                                                "addressDetails.addressOne"
                                            )}
                                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium'>
                                            Address 02
                                        </label>
                                        <input
                                            type='text'
                                            {...register(
                                                "addressDetails.addressTwo"
                                            )}
                                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium'>
                                            Country
                                        </label>
                                        <input
                                            type='text'
                                            {...register(
                                                "addressDetails.country"
                                            )}
                                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        />
                                        {errors?.addressDetails?.country && (
                                            <p className='text-red-500 text-xs mt-1'>
                                                {
                                                    errors.addressDetails
                                                        .country.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium'>
                                            Zip Code
                                        </label>
                                        <input
                                            type='text'
                                            {...register(
                                                "addressDetails.zipCode"
                                            )}
                                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button className='ButtonBlue text-white text-base font-semibold rounded-xl p-1 px-14'>
                            İleri
                        </button>
                    </div>
                </div>
            </form>

            <div className='bg-white p-5 sm:p-5 md:p-6 lg:p-6 py-3 mt-14'>
                <h1 className='text-lg font-semibold'>
                    Telefon Numarası Doğrulama
                </h1>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='mb-4 mt-6 text-base'>SMS Doğrulama Kodu:</h2>
                    <div className='flex flex-nowrap item-center justify-center gap-2'>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                className='w-8 h-8 sm:w-12 md:w-12 lg:w-12 sm:h-12 md:h-12 lg:h-12 p-2 py-5 text-black text-center outline-none bg-gray-200 rounded'
                                type='text'
                                maxLength={1}
                            />
                        ))}
                    </div>
                    <button className='ButtonBlue text-white text-base font-semibold rounded-2xl p-1 mt-5 px-8'>
                        Doğrula
                    </button>
                    <p className='mt-3'>Tekrar Gönder (02:00)</p>
                    <p className='text-base font-semibold BlueText mt-3'>
                        Numara Değiştir
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInformation;
