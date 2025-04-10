import { setCreatorFormData } from "@/store/becomeCreator/becomeCreatorSlice";
import { ProfileFormInputs } from "@/types/interfaces";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormInputs>();

    const dispatch = useDispatch();
    const creatorFormData = useSelector(
        (state: any) => state.becomeCreator.creatorFormData
    );
    const [showVerification, setShowVerification] = React.useState(false);
    const [countdown, setCountdown] = React.useState(120);
    const countdownRef = React.useRef<NodeJS.Timeout | null>(null);

    const [code, setCode] = React.useState<string[]>(Array(6).fill(""));

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const startCountdown = () => {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setCountdown(120);
        countdownRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    React.useEffect(() => {
        if (showVerification) {
            startCountdown();
        }

        return () => {
            if (countdownRef.current) clearInterval(countdownRef.current);
        };
    }, [showVerification]);

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (sec % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const onSubmit = async (data: ProfileFormInputs) => {
        try {
            const res = await dispatch(setCreatorFormData(data));
            if (res) {
                toast.success("Profile information saved successfully");
                setShowVerification(true);
            } else {
                toast.error("Failed to save profile information");
            }
        } catch (error) {
            toast.error("An error occurred while saving profile information");
        }
    };

    const handleVerify = () => {
        toast.success("Phone number verified successfully");
        setActiveTab(2);
    };

    const handleChangePhoneNumber = () => {
        toast.success("Phone number changed successfully");
    };

    const handleResend = () => {
        if (countdown === 0) {
            toast.success("Verification code resent successfully");
            startCountdown();
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    useEffect(() => {
        if (creatorFormData) {
            reset(creatorFormData);
        }
    }, [creatorFormData, reset]);

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
                                                required:
                                                    "Password is required",
                                            })}
                                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                        />
                                    </div>

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
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button className='ButtonBlue text-white text-base font-semibold rounded-xl p-1 px-14'>
                            {isSubmitting ? "Yükleniyor..." : "Kaydet"}
                        </button>
                    </div>
                </div>
            </form>

            {showVerification && (
                <div className='bg-white p-5 sm:p-5 md:p-6 lg:p-6 py-3 mt-14'>
                    <h1 className='text-lg font-semibold'>
                        Telefon Numarası Doğrulama
                    </h1>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='mb-4 mt-6 text-base'>
                            SMS Doğrulama Kodu:
                        </h2>
                        <div className='flex flex-nowrap item-center justify-center gap-2'>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                        return;
                                    }}
                                    className='w-8 h-8 sm:w-12 md:w-12 lg:w-12 sm:h-12 md:h-12 lg:h-12 p-2 py-5 text-black text-center outline-none bg-gray-200 rounded'
                                    type='text'
                                    maxLength={1}
                                    value={code[index]}
                                    onChange={(e) =>
                                        handleCodeChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleVerify}
                            className='ButtonBlue text-white text-base font-semibold rounded-2xl p-1 mt-5 px-8'
                        >
                            Doğrula
                        </button>
                        <p
                            onClick={handleResend}
                            className={`mt-3 ${
                                countdown === 0
                                    ? "cursor-pointer text-blue-500"
                                    : "text-gray-400"
                            }`}
                        >
                            {countdown === 0
                                ? "Tekrar Gönder"
                                : `Tekrar Gönder (${formatTime(countdown)})`}
                        </p>
                        <a
                            onClick={handleChangePhoneNumber}
                            className='text-base font-semibold BlueText mt-3 hover:cursor-pointer'
                            href='#'
                        >
                            Numara Değiştir
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileInformation;
