import { setCreatorFormData } from "@/store/becomeCreator/becomeCreatorSlice";
import { RootState } from "@/store/store";
import { PaymentInformationFormValues } from "@/types/interfaces";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PaymentInformation: React.FC<{ setActiveTab: (id: number) => void }> = ({
    setActiveTab,
}) => {
    const [socialContentExemption, setSocialContentExemption] = useState<"var" | "yok">("yok");
    const [useSameBillingInfo, setUseSameBillingInfo] = useState(false);
    const isUpdatingFromSocial = useRef(false);
    const isUpdatingFromInvoice = useRef(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<PaymentInformationFormValues>({
        defaultValues: {
            accountType: 'individual',
            invoiceType: 'individual',
            paymentInformation: {
                fullName: '',
                trId: '',
                companyName: '',
                taxNumber: '',
                taxOffice: '',
                ibanNumber: '',
                address: ''
            },
            billingInformation: {
                invoiceStatus: false,
                fullName: '',
                trId: '',
                companyName: '',
                taxNumber: '',
                taxOffice: '',
                ibanNumber: '',
                address: ''
            }
        }
    });

    const dispatch = useDispatch();
    const creatorFormData = useSelector(
        (state: RootState) => state.becomeCreator.creatorFormData
    );
    const accountType = watch("accountType");
    const invoiceType = watch("invoiceType");
    const invoiceStatus = watch("billingInformation.invoiceStatus");

    const onSubmit = async (data: PaymentInformationFormValues) => {
        try {
            const res = await dispatch(setCreatorFormData(data));
            if (res) {
                toast.success("Payment information saved successfully");
                setActiveTab(3);
            } else {
                toast.error("Failed to save payment information");
            }
        } catch (error) {
            toast.error("An error occurred while saving payment information");
        }
    };
    useEffect(() => {
        if (creatorFormData) {
            reset(creatorFormData);
        }
    }, [creatorFormData, reset]);

    // Auto-set invoice status based on social content exemption
    useEffect(() => {
        if (!isUpdatingFromInvoice.current) {
            isUpdatingFromSocial.current = true;
            if (socialContentExemption === 'var') {
                setValue("billingInformation.invoiceStatus", false, { shouldValidate: false });
                trigger("billingInformation.invoiceStatus");
            } else if (socialContentExemption === 'yok') {
                setValue("billingInformation.invoiceStatus", true, { shouldValidate: false });
                trigger("billingInformation.invoiceStatus");
            }
            // Use a longer timeout to ensure the update completes
            setTimeout(() => {
                isUpdatingFromSocial.current = false;
            }, 100);
        }
    }, [socialContentExemption, setValue, trigger]);

    // Auto-set social content exemption based on invoice status
    useEffect(() => {
        if (!isUpdatingFromSocial.current) {
            isUpdatingFromInvoice.current = true;
            if (invoiceStatus === false) {
                setSocialContentExemption('var');
            } else if (invoiceStatus === true) {
                setSocialContentExemption('yok');
            }
            // Use a longer timeout to ensure the update completes
            setTimeout(() => {
                isUpdatingFromInvoice.current = false;
            }, 100);
        }
    }, [invoiceStatus]);

    // Handle useSameBillingInfo functionality
    useEffect(() => {
        const paymentInfo = watch('paymentInformation');
        if (useSameBillingInfo) {
            if (paymentInfo) {
                setValue('billingInformation.fullName', paymentInfo.fullName || '');
                setValue('billingInformation.trId', paymentInfo.trId || '');
                setValue('billingInformation.companyName', paymentInfo.companyName || '');
                setValue('billingInformation.taxNumber', paymentInfo.taxNumber || '');
                setValue('billingInformation.taxOffice', paymentInfo.taxOffice || '');
                setValue('billingInformation.ibanNumber', paymentInfo.ibanNumber || '');
                setValue('billingInformation.address', paymentInfo.address || '');
            }
        }
    }, [useSameBillingInfo, setValue, watch]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='px-4 sm:px-6 md:px-8 lg:px-28'>
                <div className='bg-white p-5 sm:p-5 md:p-6 lg:p-6'>
                    <div className='md:flex md:flex-row justify-start md:space-x-32 lg:space-x-32 flex flex-col lg:p-0 p-3'>
                        <div>
                            <h1 className='text-lg font-semibold'>
                                Ödeme Bilgileri
                            </h1>
                        </div>

                        <div>
                            <div className='flex flex-col gap-4'>
                                <div>
                                    <p className='text-base'>Hesap Türü:</p>
                                    <select
                                        className='outline-none border w-full p-1 rounded font-semibold'
                                        {...register("accountType")}
                                    >
                                        <option
                                            className='font-semibold'
                                            value='individual'
                                        >
                                            Bireysel
                                        </option>
                                        <option
                                            className='font-semibold'
                                            value='institutional'
                                        >
                                            Kurumsal
                                        </option>
                                    </select>
                                </div>

                                {/* Individual Form Fields */}
                                {accountType === "individual" && (
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <p className='text-base'>
                                                Ad Soyad:
                                            </p>
                                            <input
                                                className='outline-none border w-full p-1'
                                                type='text'
                                                {...register(
                                                    "paymentInformation.fullName",
                                                    {
                                                        required:
                                                            "Ad Soyad zorunludur",
                                                    }
                                                )}
                                            />
                                            {errors.paymentInformation
                                                ?.fullName && (
                                                    <span className='text-red-500'>
                                                        {
                                                            errors
                                                                .paymentInformation
                                                                .fullName.message
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                        <div>
                                            <p className='text-base'>
                                                TC Kimlik Numarası:
                                            </p>
                                            <input
                                                className='outline-none border w-full p-1'
                                                type='text'
                                                {...register(
                                                    "paymentInformation.trId",
                                                    {
                                                        required:
                                                            "TC Kimlik Numarası zorunludur",
                                                        minLength: {
                                                            value: 11,
                                                            message:
                                                                "TC Kimlik Numarası 11 haneli olmalıdır",
                                                        },
                                                    }
                                                )}
                                            />
                                            {errors.paymentInformation
                                                ?.trId && (
                                                    <span className='text-red-500'>
                                                        {
                                                            errors
                                                                .paymentInformation
                                                                .trId.message
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                )}

                                {/* Institutional Form Fields */}
                                {accountType === "institutional" && (
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <p className='text-base'>
                                                Şirket Unvanı:
                                            </p>
                                            <input
                                                className='outline-none border w-full p-1'
                                                type='text'
                                                {...register(
                                                    "paymentInformation.companyName",
                                                    {
                                                        required:
                                                            "Şirket Unvanı zorunludur",
                                                    }
                                                )}
                                            />
                                            {errors.paymentInformation
                                                ?.companyName && (
                                                    <span className='text-red-500'>
                                                        {
                                                            errors
                                                                .paymentInformation
                                                                .companyName.message
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                        <div>
                                            <p className='text-base'>
                                                Vergi Numarası:
                                            </p>
                                            <input
                                                className='outline-none border w-full p-1'
                                                type='text'
                                                {...register(
                                                    "paymentInformation.taxNumber",
                                                    {
                                                        required:
                                                            "Vergi Numarası zorunludur",
                                                    }
                                                )}
                                            />
                                            {errors.paymentInformation
                                                ?.taxNumber && (
                                                    <span className='text-red-500'>
                                                        {
                                                            errors
                                                                .paymentInformation
                                                                .taxNumber.message
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                        <div>
                                            <p className='text-base'>
                                                Vergi Dairesi:
                                            </p>
                                            <input
                                                className='outline-none border w-full p-1'
                                                type='text'
                                                {...register(
                                                    "paymentInformation.taxOffice",
                                                    {
                                                        required:
                                                            "Vergi Dairesi zorunludur",
                                                    }
                                                )}
                                            />
                                            {errors.paymentInformation
                                                ?.taxOffice && (
                                                    <span className='text-red-500'>
                                                        {
                                                            errors
                                                                .paymentInformation
                                                                .taxOffice.message
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className='text-base'>IBAN Numarası:</p>
                                    <input
                                        className='outline-none border w-full p-1'
                                        type='text'
                                        {...register(
                                            "paymentInformation.ibanNumber",
                                            {
                                                required:
                                                    "IBAN Numarası zorunludur",
                                            }
                                        )}
                                    />
                                    {errors.paymentInformation?.ibanNumber && (
                                        <span className='text-red-500'>
                                            {
                                                errors.paymentInformation
                                                    .ibanNumber.message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className='text-base'>Adres:</p>
                                    <input
                                        className='outline-none border w-full p-1'
                                        type='text'
                                        {...register(
                                            "paymentInformation.address",
                                            {
                                                required: "Adres zorunludur",
                                            }
                                        )}
                                    />
                                    {errors.paymentInformation?.address && (
                                        <span className='text-red-500'>
                                            {
                                                errors.paymentInformation
                                                    .address.message
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Two */}
                <div className='bg-white p-5 sm:p-5 md:p-6 lg:p-6 py-6 mt-8'>
                    <div className='md:flex md:flex-row justify-start lg:space-x-32 flex flex-col lg:p-0 p-3'>
                        <div>
                            <h1 className='text-lg font-semibold'>
                                Fatura Bilgileri
                            </h1>
                        </div>

                        <div>
                            <div className='flex flex-col gap-4'>
                                <div>
                                    <h1 className='text-base'>
                                        Sosyal İçerik Üretici Muafiyet Hesabı:
                                    </h1>
                                    <div className='mt-2 flex gap-4'>
                                        <label className='flex items-center'>
                                            <input
                                                type='radio'
                                                name='socialContentExemption'
                                                className='mr-1'
                                                value='var'
                                                checked={socialContentExemption === 'var'}
                                                onChange={(e) => setSocialContentExemption(e.target.value as 'var' | 'yok')}
                                            />
                                            <span>Var</span>
                                        </label>
                                        <label className='flex items-center'>
                                            <input
                                                type='radio'
                                                name='socialContentExemption'
                                                className='mr-1'
                                                value='yok'
                                                checked={socialContentExemption === 'yok'}
                                                onChange={(e) => setSocialContentExemption(e.target.value as 'var' | 'yok')}
                                            />
                                            <span>Yok</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className='flex items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            checked={useSameBillingInfo}
                                            onChange={(e) => setUseSameBillingInfo(e.target.checked)}
                                        />
                                        <span>Ödeme Bilgileriyle aynı bilgileri kullan</span>
                                    </label>
                                </div>

                                <div>
                                    <h1 className='text-base'>
                                        Fatura Durumu:
                                    </h1>
                                    <div className='mt-2 flex gap-4'>
                                        <label className='flex items-center'>
                                            <input
                                                type='radio'
                                                className='mr-1'
                                                name='invoiceStatus'
                                                value="true"
                                                checked={invoiceStatus === true}
                                                disabled={socialContentExemption === 'var'}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setValue("billingInformation.invoiceStatus", true, { shouldValidate: false });
                                                        trigger("billingInformation.invoiceStatus");
                                                    }
                                                }}
                                            />
                                            <span>Var</span>
                                        </label>
                                        <label className='flex items-center'>
                                            <input
                                                type='radio'
                                                className='mr-1'
                                                name='invoiceStatus'
                                                value="false"
                                                checked={invoiceStatus === false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setValue("billingInformation.invoiceStatus", false, { shouldValidate: false });
                                                        trigger("billingInformation.invoiceStatus");
                                                    }
                                                }}
                                            />
                                            <span>Yok</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {invoiceStatus && socialContentExemption !== 'var' && (
                                <div>
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <p className='text-base mt-4'>
                                                Fatura Türü:
                                            </p>
                                            <select
                                                className='outline-none border w-full p-1 rounded font-semibold'
                                                {...register("invoiceType")}
                                            >
                                                <option
                                                    className='font-semibold'
                                                    value='individual'
                                                >
                                                    Bireysel
                                                </option>
                                                <option
                                                    className='font-semibold'
                                                    value='institutional'
                                                >
                                                    Kurumsal
                                                </option>
                                            </select>
                                        </div>

                                        {/* Individual Form Fields */}
                                        {invoiceType === "individual" && (
                                            <div className='flex flex-col gap-4'>
                                                <div>
                                                    <p className='text-base'>
                                                        Ad Soyad:
                                                    </p>
                                                    <input
                                                        className='outline-none border w-full p-1'
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.fullName",
                                                            {
                                                                required: invoiceStatus && !useSameBillingInfo ? "Ad Soyad zorunludur" : false,
                                                            }
                                                        )}
                                                        disabled={useSameBillingInfo}
                                                    />
                                                    {errors.billingInformation
                                                        ?.fullName && (
                                                            <span className='text-red-500'>
                                                                {
                                                                    errors.billingInformation
                                                                        .fullName
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                </div>
                                                <div>
                                                    <p className='text-base'>
                                                        TC Kimlik Numarası:
                                                    </p>
                                                    <input
                                                        className='outline-none border w-full p-1'
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.trId",
                                                            {
                                                                required: invoiceStatus && !useSameBillingInfo ? "TC Kimlik Numarası zorunludur" : false,
                                                                minLength: invoiceStatus && !useSameBillingInfo ? {
                                                                    value: 11,
                                                                    message:
                                                                        "TC Kimlik Numarası 11 haneli olmalıdır",
                                                                } : undefined,
                                                            }
                                                        )}
                                                        disabled={useSameBillingInfo}
                                                    />
                                                    {errors.billingInformation
                                                        ?.trId && (
                                                            <span className='text-red-500'>
                                                                {
                                                                    errors.billingInformation.trId
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Institutional Form Fields */}
                                        {invoiceType === "institutional" && (
                                            <div className='flex flex-col gap-4'>
                                                <div>
                                                    <p className='text-base'>
                                                        Şirket Unvanı:
                                                    </p>
                                                    <input
                                                        className='outline-none border w-full p-1'
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.companyName",
                                                            {
                                                                required: invoiceStatus && !useSameBillingInfo ? "Şirket Unvanı zorunludur" : false,
                                                            }
                                                        )}
                                                        disabled={useSameBillingInfo}
                                                    />
                                                    {errors.billingInformation
                                                        ?.companyName && (
                                                            <span className='text-red-500'>
                                                                {
                                                                    errors.billingInformation
                                                                        .companyName
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                </div>
                                                <div>
                                                    <p className='text-base'>
                                                        Vergi Numarası:
                                                    </p>
                                                    <input
                                                        className='outline-none border w-full p-1'
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.taxNumber",
                                                            {
                                                                required: invoiceStatus && !useSameBillingInfo ? "Vergi Numarası zorunludur" : false,
                                                            }
                                                        )}
                                                        disabled={useSameBillingInfo}
                                                    />
                                                    {errors.billingInformation
                                                        ?.taxNumber && (
                                                            <span className='text-red-500'>
                                                                {
                                                                    errors.billingInformation
                                                                        .taxNumber
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                </div>
                                                <div>
                                                    <p className='text-base'>
                                                        Vergi Dairesi:
                                                    </p>
                                                    <input
                                                        className='outline-none border w-full p-1'
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.taxOffice",
                                                            {
                                                                required: invoiceStatus && !useSameBillingInfo ? "Vergi Dairesi zorunludur" : false,
                                                            }
                                                        )}
                                                        disabled={useSameBillingInfo}
                                                    />
                                                    {errors.billingInformation
                                                        ?.taxOffice && (
                                                            <span className='text-red-500'>
                                                                {
                                                                    errors.billingInformation
                                                                        .taxOffice
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <p className='text-base'>
                                                IBAN Numarası:
                                            </p>
                                            <input
                                                className='outline-none border w-full p-1'
                                                type='text'
                                                {...register(
                                                    "billingInformation.ibanNumber",
                                                    {
                                                        required: invoiceStatus && !useSameBillingInfo ? "IBAN Numarası zorunludur" : false,
                                                    }
                                                )}
                                                disabled={useSameBillingInfo}
                                            />
                                            {errors.billingInformation
                                                ?.ibanNumber && (
                                                    <span className='text-red-500'>
                                                        {
                                                            errors.billingInformation.ibanNumber.message
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                        <div>
                                            <p className='text-base'>Adres:</p>
                                            <input
                                                className='outline-none border w-full p-1'
                                                type='text'
                                                {...register(
                                                    "billingInformation.address",
                                                    {
                                                        required: invoiceStatus && !useSameBillingInfo ? "Adres zorunludur" : false,
                                                    }
                                                )}
                                                disabled={useSameBillingInfo}
                                            />
                                            {errors.billingInformation
                                                ?.address && (
                                                    <span className='text-red-500'>
                                                        {
                                                            errors.billingInformation.address.message
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='Button text-white text-lg font-bold rounded-xl p-1 px-14'
                        >
                            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PaymentInformation;