import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
    updateAdminCreator,
    fetchAdminCreators,
} from "@/store/features/admin/creatorsSlice";
import { AppDispatch } from "@/store/store";
import { toast } from "react-toastify";
import { CreatorInterface } from "@/types/interfaces";

interface SecondTabProps {
    editCreatorForm: CreatorInterface | null;
    onSubmit: (data: CreatorInterface) => void;
}

export default function SecondTab({ editCreatorForm }: SecondTabProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const accountType = watch("accountType", "individual");
    const invoiceType = watch("invoiceType", "individual");

    useEffect(() => {
        if (editCreatorForm) {
            reset({
                accountType: editCreatorForm.accountType,
                invoiceType: editCreatorForm.invoiceType,
                paymentInformation: {
                    fullName: editCreatorForm.paymentInformation.fullName,
                    trId: editCreatorForm.paymentInformation.trId,
                    companyName: editCreatorForm.paymentInformation.companyName,
                    taxNumber: editCreatorForm.paymentInformation.taxNumber,
                    taxOffice: editCreatorForm.paymentInformation.taxOffice,
                    ibanNumber: editCreatorForm.paymentInformation.ibanNumber,
                    address: editCreatorForm.paymentInformation.address,
                },
                billingInformation: {
                    invoiceStatus: editCreatorForm.billingInformation
                        .invoiceStatus
                        ? "true"
                        : "false",
                    fullName: editCreatorForm.billingInformation.fullName,
                    trId: editCreatorForm.billingInformation.trId,
                    companyName: editCreatorForm.billingInformation.companyName,
                    taxNumber: editCreatorForm.billingInformation.taxNumber,
                    taxOffice: editCreatorForm.billingInformation.taxOffice,
                    address: editCreatorForm.billingInformation.address,
                },
            });
        }
    }, [editCreatorForm, reset]);

    const onSubmit: SubmitHandler<any> = async (formData) => {
        if (!editCreatorForm?._id) {
            toast.error(
                "Error: No creator ID found. Please ensure the creator is selected."
            );
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Error: No access token found. Please log in again.");
            return;
        }

        try {
            const resultAction = await dispatch(
                updateAdminCreator({
                    creatorId: editCreatorForm._id,
                    data: formData,
                    token,
                })
            );

            if (updateAdminCreator.fulfilled.match(resultAction)) {
                toast.success("Update successful");
                await dispatch(fetchAdminCreators(token));
            } else {
                toast.error("Update failed. Please try again later.");
            }
        } catch (error: any) {
            toast.error(
                `Error updating creator: ${error.message || "Unknown error"}`
            );
        }
    };

    return (
        <div className='w-full sm:w-2/3 bg-white p-6 rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-xl font-semibold mb-4'>
                    Payment Information
                </h2>
                <div className='grid grid-cols-1 gap-4'>
                    <div>
                        <label className='block text-sm font-medium'>
                            Account Type
                        </label>
                        <select
                            {...register("accountType")}
                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                        >
                            <option value='individual'>Individual</option>
                            <option value='institutional'>Institutional</option>
                        </select>
                    </div>

                    {accountType === "individual" ? (
                        <>
                            <div>
                                <label className='block text-sm font-medium'>
                                    Full Name
                                </label>
                                <input
                                    type='text'
                                    {...register(
                                        "paymentInformation.fullName",
                                        { required: "Full name is required" }
                                    )}
                                    className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium'>
                                    Tr Id Number
                                </label>
                                <input
                                    type='text'
                                    {...register("paymentInformation.trId", {
                                        required: "Identity number is required",
                                        minLength: {
                                            value: 11,
                                            message: "Must be 11 digits",
                                        },
                                    })}
                                    className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className='block text-sm font-medium'>
                                    Company Name
                                </label>
                                <input
                                    type='text'
                                    {...register(
                                        "paymentInformation.companyName",
                                        { required: "Company name is required" }
                                    )}
                                    className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium'>
                                    Tax Number
                                </label>
                                <input
                                    type='text'
                                    {...register(
                                        "paymentInformation.taxNumber",
                                        { required: "Tax number is required" }
                                    )}
                                    className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium'>
                                    Tax Office
                                </label>
                                <input
                                    type='text'
                                    {...register(
                                        "paymentInformation.taxOffice",
                                        { required: "Tax office is required" }
                                    )}
                                    className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className='block text-sm font-medium'>
                            IBAN Number
                        </label>
                        <input
                            type='text'
                            {...register("paymentInformation.ibanNumber", {
                                required: "IBAN is required",
                            })}
                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium'>
                            Address
                        </label>
                        <input
                            type='text'
                            {...register("paymentInformation.address", {
                                required: "Address is required",
                            })}
                            className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                        />
                    </div>
                </div>

                <h2 className='text-xl font-semibold mt-8 mb-4'>
                    Invoice Information
                </h2>
                <div className='grid grid-cols-1 gap-4'>
                    <div>
                        <label className='block text-sm font-medium'>
                            Invoice Status
                        </label>
                        {/* TODO REOSOLVE THSI */}
                        <div className='mt-2 space-x-4'>
                            <label className='inline-flex items-center'>
                                <input
                                    type='radio'
                                    {...register(
                                        "billingInformation.invoiceStatus"
                                    )}
                                    value='true'
                                    className='mr-2'
                                />
                                <span>Yes</span>
                            </label>
                            <label className='inline-flex items-center'>
                                <input
                                    type='radio'
                                    {...register(
                                        "billingInformation.invoiceStatus"
                                    )}
                                    value='false'
                                    className='mr-2'
                                />
                                <span>No</span>
                            </label>
                        </div>
                    </div>

                    <>
                        <div>
                            <label className='block text-sm font-medium'>
                                Invoice Type
                            </label>
                            <select
                                {...register("invoiceType")}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            >
                                <option value='individual'>Individual</option>
                                <option value='institutional'>
                                    Institutional
                                </option>
                            </select>
                        </div>

                        {invoiceType === "individual" ? (
                            <>
                                <div>
                                    <label className='block text-sm font-medium'>
                                        Full Name
                                    </label>
                                    <input
                                        type='text'
                                        {...register(
                                            "billingInformation.fullName",
                                            {
                                                required:
                                                    "Full name is required",
                                            }
                                        )}
                                        className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium'>
                                        Identity Number
                                    </label>
                                    <input
                                        type='text'
                                        {...register(
                                            "billingInformation.trId",
                                            {
                                                required:
                                                    "Identity number is required",
                                                minLength: {
                                                    value: 11,
                                                    message:
                                                        "Must be 11 digits",
                                                },
                                            }
                                        )}
                                        className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className='block text-sm font-medium'>
                                        Company Name
                                    </label>
                                    <input
                                        type='text'
                                        {...register(
                                            "billingInformation.companyName",
                                            {
                                                required:
                                                    "Company name is required",
                                            }
                                        )}
                                        className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium'>
                                        Tax Number
                                    </label>
                                    <input
                                        type='text'
                                        {...register(
                                            "billingInformation.taxNumber",
                                            {
                                                required:
                                                    "Tax number is required",
                                            }
                                        )}
                                        className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium'>
                                        Tax Office
                                    </label>
                                    <input
                                        type='text'
                                        {...register(
                                            "billingInformation.taxOffice",
                                            {
                                                required:
                                                    "Tax office is required",
                                            }
                                        )}
                                        className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className='block text-sm font-medium'>
                                Invoice Address
                            </label>
                            <input
                                type='text'
                                {...register("billingInformation.address", {
                                    required: "Invoice address is required",
                                })}
                                className='mt-1 px-2 py-1 block w-full border border-gray-300 rounded-md shadow-sm'
                            />
                        </div>
                    </>
                </div>

                <div className='flex justify-end mt-6'>
                    <button
                        type='submit'
                        className='ButtonBlue text-white px-4 py-2 rounded-md'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
