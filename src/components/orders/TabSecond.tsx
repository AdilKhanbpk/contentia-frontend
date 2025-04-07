"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Define interfaces for the form data structure
interface AdditionalServices {
    share?: boolean;
    coverPicture?: boolean;
    creatorType?: boolean;
    productShipping?: boolean;
}

interface OrderFormData {
    additionalServices?: AdditionalServices;
    noOfUgc?: number;
    totalPrice?: number;
}

// Define form input types
interface PaymentFormInputs {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
    country: string;
    whereDidYouHear?: string;
    companyName: string;
    taxId: string;
    taxOffice?: string;
    address: string;
    email: string;
    phoneNumber: string;
    saveCard?: boolean;
    agreement?: boolean;
}

export default function TabSecond({
    setActiveTab,
}: {
    setActiveTab: (id: number) => void;
}) {
    const [orderDate, setOrderDate] = useState<Date>(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    // Type the selector properly
    const orderFormData = useSelector<RootState, OrderFormData | null>(
        (state: RootState) => state.order.orderFormData as OrderFormData
    );

    const deliveryStartDate = new Date(orderDate);
    deliveryStartDate.setDate(deliveryStartDate.getDate() + 30);

    const deliveryEndDate = new Date(orderDate);
    deliveryEndDate.setDate(deliveryEndDate.getDate() + 35);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
        });
    };

    const handleCalendarClick = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentFormInputs>();

    const onSubmit = async (data: PaymentFormInputs) => {
        console.log(data);
    };

    const basePrice = 3000;
    const quantity = orderFormData?.noOfUgc || 1;
    const totalPrice = orderFormData?.totalPrice || 0;

    return (
        <>
            <div className='flex flex-col lg:flex-row justify-between px-4 sm:px-6 md:px-12 lg:px-24 lg:space-x-16'>
                <div className='w-full lg:w-3/5'>
                    <div className='bg-white border rounded-lg p-6 shadow-md w-full'>
                        {/* Order Summary */}
                        <h2 className='text-xl font-semibold mb-4'>
                            Sipariş Özeti:
                        </h2>
                        <div className='space-y-3'>
                            {/* Base Videos */}
                            <div className='flex justify-between'>
                                <div>
                                    <p className='font-semibold'>
                                        {quantity} Videos
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        {basePrice} TL / Video
                                    </p>
                                </div>
                                <p className='font-semibold'>
                                    {basePrice * quantity} TL
                                </p>
                            </div>

                            {/* Additional Services */}
                            {orderFormData?.additionalServices?.share && (
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='font-semibold'>
                                            Sosyal Medya Paylaşım
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            500 TL / Video
                                        </p>
                                    </div>
                                    <p className='font-semibold'>500 TL</p>
                                </div>
                            )}

                            {orderFormData?.additionalServices
                                ?.coverPicture && (
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='font-semibold'>
                                            Kapak Görseli
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            250 TL / Video
                                        </p>
                                    </div>
                                    <p className='font-semibold'>250 TL</p>
                                </div>
                            )}

                            {orderFormData?.additionalServices?.creatorType && (
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='font-semibold'>
                                            Influencer Paketi
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            1000 TL / Video
                                        </p>
                                    </div>
                                    <p className='font-semibold'>1000 TL</p>
                                </div>
                            )}

                            {orderFormData?.additionalServices
                                ?.productShipping && (
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='font-semibold'>
                                            Ürün Gönderimi
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            150 TL / Video
                                        </p>
                                    </div>
                                    <p className='font-semibold'>150 TL</p>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className='border-t mt-4 pt-4'>
                            <div className='flex justify-between font-semibold text-lg'>
                                <p>Toplam</p>
                                <p>{totalPrice} TL</p>
                            </div>
                        </div>

                        {/* Coupon Code */}
                        <div className='mt-4 flex flex-col '>
                            <div>
                                <label>Kupon Kodu</label>
                            </div>
                            <div className='flex flex-col lg:flex-row  lg:space-x-3'>
                                <input
                                    type='text'
                                    placeholder=''
                                    className='border px-3 py-2 mb-4 rounded-md focus:outline-none '
                                />
                                <div>
                                    <button className='ButtonBlue text-white px-4 py-2 rounded-md font-semibold'>
                                        Uygula
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Date */}
                        <div className='mt-6 sectionBG p-4 rounded-lg flex items-center space-x-3 relative'>
                            {/* Calendar Icon with Tooltip */}
                            <div
                                className='bg-indigo-600 p-2 rounded-full text-white cursor-pointer relative'
                                onClick={handleCalendarClick}
                                onMouseEnter={() => setIsTooltipVisible(true)}
                                onMouseLeave={() => setIsTooltipVisible(false)}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M8 7V3m8 4V3m-8 8h8m-8 4h8M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z'
                                    />
                                </svg>

                                {/* Custom Tooltip */}
                                {isTooltipVisible && (
                                    <div className='absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-2 py-1 rounded'>
                                        <div className='flex flex-col'>
                                            <span className='whitespace-nowrap'>
                                                Order Date +{" "}
                                            </span>
                                            <span className='whitespace-nowrap'>
                                                {" "}
                                                30 Days - 35 Days
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Date Range */}
                            <div className='flex flex-row'>
                                <p className='font-semibold text-sm BlueText mr-3'>
                                    {formatDate(deliveryStartDate)} -{" "}
                                    {formatDate(deliveryEndDate)}
                                </p>
                                <p className='text-sm font-semibold border-l border-black pl-4'>
                                    İçeriklerinizin tahmini iletilme zamanını
                                    gösterir
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-2 sm:mt-2 md:mt-2 lg:mt-0 w-full lg:w-2/5'>
                    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                        <div className='w-full bg-white p-8 shadow-lg rounded-md'>
                            <h2 className='text-xl font-semibold mb-6'>
                                Ödeme
                            </h2>
                            <form
                                className='space-y-4'
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/* Card Number */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        Kart Numarası
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='1111 2222 3333 4444'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("cardNumber", {
                                            required: true,
                                        })}
                                    />
                                    {errors.cardNumber && (
                                        <span className='text-red-500'>
                                            Kart numarası gerekli
                                        </span>
                                    )}
                                </div>

                                {/* Expiry and CVV */}
                                <div className='flex space-x-4'>
                                    <div className='w-2/2 lg:w-1/2'>
                                        <label className='block text-sm font-semibold mb-1'>
                                            Son Kullanma Tarihi
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='AA/YY'
                                            className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                            {...register("expiryDate", {
                                                required: true,
                                            })}
                                        />
                                        {errors.expiryDate && (
                                            <span className='text-red-500'>
                                                Son kullanma tarihi gerekli
                                            </span>
                                        )}
                                    </div>
                                    <div className='w-2/2 lg:w-1/2'>
                                        <label className='block text-sm font-semibold mb-1'>
                                            CVV
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='***'
                                            className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                            {...register("cvv", {
                                                required: true,
                                            })}
                                        />
                                        {errors.cvv && (
                                            <span className='text-red-500'>
                                                CVV gerekli
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Name on Card */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        İsim Soyisim
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Kart Üzerindeki İsim Soyisim'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("nameOnCard", {
                                            required: true,
                                        })}
                                    />
                                    {errors.nameOnCard && (
                                        <span className='text-red-500'>
                                            İsim soyisim gerekli
                                        </span>
                                    )}
                                </div>

                                {/* Country and City */}
                                <div className=''>
                                    <label className='block text-sm font-semibold mb-1'>
                                        Ülke
                                    </label>
                                    <select
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("country", {
                                            required: true,
                                        })}
                                    >
                                        <option value='Türkiye'>Türkiye</option>
                                    </select>
                                    {errors.country && (
                                        <span className='text-red-500'>
                                            Ülke gerekli
                                        </span>
                                    )}
                                </div>

                                <div className=''>
                                    <label className='block text-sm font-semibold mb-1'>
                                        Contentia’yı Nereden Duydun?
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Opsiyonel'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("whereDidYouHear", {
                                            required: false,
                                        })}
                                    />
                                </div>

                                {/* Invoice Information */}
                                <h2 className='text-xl font-semibold mt-8 mb-4'>
                                    Fatura Bilgileri
                                </h2>

                                {/* Company Name */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        Ad Soyad / Şirket Ünvanı
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Ad Soyad / Şirket Unvanı'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("companyName", {
                                            required: true,
                                        })}
                                    />
                                    {errors.companyName && (
                                        <span className='text-red-500'>
                                            Ad Soyad / Şirket Ünvanı gerekli
                                        </span>
                                    )}
                                </div>

                                {/* Tax/VAT ID */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        TCKN / VKN
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='TCKN / VKN'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("taxId", {
                                            required: true,
                                        })}
                                    />
                                    {errors.taxId && (
                                        <span className='text-red-500'>
                                            TCKN / VKN gerekli
                                        </span>
                                    )}
                                </div>

                                {/* Tax Office */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        Vergi Dairesi (Opsiyonel)
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Opsiyonel'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("taxOffice", {
                                            required: false,
                                        })}
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        Adres
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Açık Adres'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("address", {
                                            required: true,
                                        })}
                                    />
                                    {errors.address && (
                                        <span className='text-red-500'>
                                            Adres gerekli
                                        </span>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        E-Posta
                                    </label>
                                    <input
                                        type='email'
                                        placeholder='E-Posta'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("email", {
                                            required: true,
                                        })}
                                    />
                                    {errors.email && (
                                        <span className='text-red-500'>
                                            E-posta gerekli
                                        </span>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className='block text-sm font-semibold mb-1'>
                                        Telefon Numarası
                                    </label>
                                    <input
                                        type='text'
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none'
                                        {...register("phoneNumber", {
                                            required: true,
                                        })}
                                    />
                                    {errors.phoneNumber && (
                                        <span className='text-red-500'>
                                            Telefon numarası gerekli
                                        </span>
                                    )}
                                </div>

                                {/* Save Card Checkbox */}
                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        className='h-3 w-3 rounded border-gray-300'
                                        {...register("saveCard")}
                                    />
                                    <label className='ml-2 text-sm font-semibold'>
                                        Kartımı Kaydet
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    onClick={() => setActiveTab(2)}
                                    className='w-full ButtonBlue text-white px-4 py-2 rounded-md font-semibold'
                                >
                                    <div className='flex flex-row space-x-8'>
                                        <div className='w-1/4 flex justify-end items-center'>
                                            <img
                                                src='/lockIcon.png'
                                                alt='brand logo'
                                                height={20}
                                                width={20}
                                                className=''
                                            />
                                        </div>
                                        <div className='w-3/4 flex justify-start items-center'>
                                            Güvenli Ödeme
                                        </div>
                                    </div>
                                </button>

                                {/* Agreement Checkbox */}
                                <div className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        className='h-4 w-4 rounded border-gray-300'
                                        {...register("agreement", {
                                            required: false,
                                        })}
                                    />
                                    <label className='ml-2 text-sm font-semibold'>
                                        Mesafeli Satış Sözleşmesini ve Ön
                                        Bilgilendirme Formunu Onaylıyorum
                                    </label>
                                    {errors.agreement && (
                                        <span className='text-red-500'>
                                            Bu alan zorunludur
                                        </span>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
