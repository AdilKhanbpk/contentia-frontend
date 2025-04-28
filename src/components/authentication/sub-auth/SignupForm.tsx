"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { signupUser } from "@/store/features/auth/loginSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Customer } from "@/types/interfaces";

const SignupForm = () => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Customer>();
    const loginState = useSelector((state: RootState) => state.login);

    const onSubmit = (data: Customer) => {
        dispatch(signupUser(data))
            .then(() => {
                toast.success("Signup successful");
                router.push("/");
            })
            .catch(() => {
                toast.error("Signup failed");
            });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-4'
        >
            <button
                type='button'
                className='flex justify-center w-full text-gray-700 mb-4 border border-gray-300'
            >
                <Image
                    src='/googleIcon.svg'
                    width={15}
                    height={15}
                    alt='Google Icon'
                    className='p-1.5 w-10 h-10 border-r border-gray-300'
                />
                <div className='w-11/12 py-2'>Google ile devam et</div>
            </button>

            <div className='text-center mb-4 text-gray-500'>veya</div>

            <div className='mb-4'>
                <div className='flex items-center border border-gray-300'>
                    <div className='bg-gray-100 p-2 rounded-l border-r border-gray-300'>
                        <img
                            src='/messageIcon.png'
                            alt='Email Icon'
                            className='w-7 h-7'
                        />
                    </div>
                    <input
                        type='email'
                        {...register("email", {
                            required: "E-posta zorunludur",
                        })}
                        className='w-full px-4 py-2 focus:outline-none'
                        placeholder='eposta@gmail.com'
                    />
                </div>
                {errors.email && (
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
            </div>

            <div className='mb-4'>
                <div className='flex items-center border border-gray-300'>
                    <div className='bg-gray-100 p-2 rounded-l border-r border-gray-300'>
                        <img
                            src='/lockIcon.png'
                            alt='Password Icon'
                            className='h-7 w-7'
                        />
                    </div>
                    <input
                        type='password'
                        {...register("password", {
                            required: "Şifre zorunludur",
                        })}
                        className='w-full px-4 py-2 focus:outline-none'
                        placeholder='şifrenizi girin'
                    />
                </div>
                {errors.password && (
                    <span className='text-red-500'>
                        {errors.password.message}
                    </span>
                )}
            </div>

            {/* First Checkbox */}
            <div className='flex items-start my-4'>
                <input
                    id='sozlesme'
                    type='checkbox'
                    {...register("userAgreement", {
                        required:
                            "Kullanıcı Sözleşmesi'ni onaylamak zorunludur.",
                    })}
                    className='mt-1 mr-2'
                />
                <label
                    htmlFor='sozlesme'
                    className='text-sm text-gray-500'
                >
                    <span className='underline'>
                        <Link href='/dummy-url'>Kullanıcı Sözleşmesi</Link>
                    </span>
                    'ni{" "}
                    <span className='underline'>
                        <Link href='/dummy-url'>Aydınlatma Metni</Link>
                    </span>
                    'ni{" "}
                    <span className='underline'>
                        <Link href='/dummy-url'>Açık Rıza Metni</Link>
                    </span>
                    'ni ve{" "}
                    <span className='underline'>
                        <Link href='/dummy-url'>
                            Ödeme Platform Kullanım Sözleşmesi
                        </Link>
                    </span>
                    'ni okudum, onaylıyorum.
                </label>
            </div>
            {errors?.userAgreement && (
                <span className='text-red-500 text-sm'>
                    {errors?.userAgreement?.message}
                </span>
            )}

            <div className='flex items-start mb-4'>
                <input
                    id='iletisim'
                    type='checkbox'
                    {...register("termsAndConditionsApproved")}
                    className='mt-1 mr-2'
                />
                <label
                    htmlFor='iletisim'
                    className='text-sm text-gray-500'
                >
                    <span className='underline'>
                        <Link href='/dummy-url'>
                            Ticari Elektronik İleti ve İletişim İzni
                        </Link>
                    </span>
                    'ni onaylıyorum.
                </label>
            </div>

            <button
                type='submit'
                className='w-full Button text-white py-2 rounded-lg font-semibold'
            >
                {loginState.loading ? " Yükleniyor..." : "Üye Ol"}
            </button>

            {loginState.error && (
                <span className='text-red-500'>{loginState.error}</span>
            )}
        </form>
    );
};

export default SignupForm;
