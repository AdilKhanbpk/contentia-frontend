import { setCreatorFormData } from "@/store/becomeCreator/becomeCreatorSlice";
import { RootState } from "@/store/store";
import { PaymentInformationFormValues } from "@/types/interfaces";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PaymentInformation: React.FC<{ setActiveTab: (id: number) => void }> = ({
    setActiveTab,
}) => {
    const [accountType, setAccountType] = useState<
        "individual" | "institutional"
    >("individual");
    const [invoiceType, setInvoiceType] = useState<
        "individual" | "institutional"
    >("individual");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PaymentInformationFormValues>();

    const dispatch = useDispatch();
    const creatorFormData = useSelector(
        (state: RootState) => state.becomeCreator.creatorFormData
    );
    const invoiceStatus = watch("billingInformation.invoiceStatus");
    console.log("🚀 ~ invoiceStatus:", invoiceStatus);

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
                                        value={accountType}
                                        onChange={(e) =>
                                            setAccountType(
                                                e.target.value as
                                                    | "individual"
                                                    | "institutional"
                                            )
                                        }
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
                            <div>
                                <div>
                                    <h1 className='text-base'>
                                        Fatura Durumu:
                                    </h1>
                                    <div className='mt-2 flex gap-4'>
                                        <label className='flex items-center'>
                                            <input
                                                type='radio'
                                                className='mr-1'
                                                value={"true"}
                                                {...register(
                                                    "billingInformation.invoiceStatus"
                                                )}
                                            />
                                            <span>Var</span>
                                        </label>
                                        <label className='flex items-center'>
                                            <input
                                                type='radio'
                                                className='mr-1'
                                                value={"false"}
                                                {...register(
                                                    "billingInformation.invoiceStatus"
                                                )}
                                            />
                                            <span>Yok</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {String(invoiceStatus) === "true" && (
                                <div>
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <p className='text-base mt-4'>
                                                Fatura Durumu:
                                            </p>
                                            <select
                                                className='outline-none border w-full p-1 rounded font-semibold'
                                                {...register("invoiceType")}
                                                value={invoiceType}
                                                onChange={(e) =>
                                                    setInvoiceType(
                                                        e.target.value as
                                                            | "individual"
                                                            | "institutional"
                                                    )
                                                }
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
                                                                    .trId
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
                                                        required:
                                                            "IBAN Numarası zorunludur",
                                                    }
                                                )}
                                            />
                                            {errors.paymentInformation
                                                ?.ibanNumber && (
                                                <span className='text-red-500'>
                                                    {
                                                        errors
                                                            .paymentInformation
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
                                                    "billingInformation.address",
                                                    {
                                                        required:
                                                            "Adres zorunludur",
                                                    }
                                                )}
                                            />
                                            {errors.paymentInformation
                                                ?.address && (
                                                <span className='text-red-500'>
                                                    {
                                                        errors
                                                            .paymentInformation
                                                            .address.message
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
