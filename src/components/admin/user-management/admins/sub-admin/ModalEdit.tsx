"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Customer } from "@/types/interfaces";

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    adminData: Customer | null;
    onSubmit: (data: Customer) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
    isOpen,
    onClose,
    adminData,
    onSubmit,
}) => {
    const [invoiceType, setInvoiceType] = useState<string>(
        adminData?.invoiceType || "individual"
    );

    const { register, handleSubmit, reset } = useForm<Customer>();

    useEffect(() => {
        if (adminData) {
            reset(adminData);
            setInvoiceType(adminData?.invoiceType ?? "individual");
        }
    }, [adminData, reset]);

    return (
        <>
            {isOpen && (
                <>
                    <div className='text-lg font-semibold px-4 py-2 border-b-2 border-gray-200'>
                        Edit Admin
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col md:flex-row justify-end '>
                            <div className='mt-2 ml-2 md:mt-20 md:ml-16'>
                                <Image
                                    width={100}
                                    height={100}
                                    src={
                                        adminData?.profilePic ||
                                        "/icons/avatar.png"
                                    }
                                    alt='avatar'
                                    className='w-40 h-40 rounded-full'
                                />
                            </div>
                            <div className='p-2 md:p-16'>
                                <div>
                                    <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                        <div className='flex flex-col mb-2 sm:mb-3 lg:mb-4 w-full md:w-1/2 pr-2'>
                                            <label>Name</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Admin Name'
                                                {...register("fullName", {
                                                    required: false,
                                                })}
                                                defaultValue={
                                                    adminData?.fullName
                                                }
                                                className='font-medium border px-1 py-1 rounded-md focus:outline-none'
                                            />
                                        </div>
                                        <div className='flex flex-col sm:mb-3 w-full md:w-1/2 pl-2'>
                                            <label>Email</label>
                                            <input
                                                type='email'
                                                placeholder='Enter your email address'
                                                {...register("email", {
                                                    required: false,
                                                })}
                                                defaultValue={adminData?.email}
                                                className='font-medium border px-1 py-1 rounded-md focus:outline-none'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                        <div className='flex flex-col w-full md:w-1/2 md:pr-2'>
                                            <label>Contact</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your phone number'
                                                {...register("phoneNumber", {
                                                    required: false,
                                                })}
                                                defaultValue={
                                                    adminData?.phoneNumber
                                                }
                                                className='font-medium border px-1 py-1 rounded-md focus:outline-none'
                                            />
                                        </div>
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2 pl-2'>
                                            <label>Age</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your age'
                                                {...register("age", {
                                                    required: false,
                                                })}
                                                defaultValue={adminData?.age}
                                                className='font-medium border px-1 py-1 rounded-md focus:outline-none'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                        {/* <div className='flex flex-col w-full md:w-1/2 md:pr-2'>
                                            <label>Password</label>
                                            <input
                                                type='text'
                                                placeholder='Enter your phone number'
                                                {...register("password", {
                                                    required: false,
                                                })}
                                                defaultValue={
                                                    adminData?.password
                                                }
                                                className='font-medium border px-1 py-1 rounded-md focus:outline-none'
                                            />
                                        </div> */}
                                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2'>
                                            <label>Role</label>
                                            <select
                                                {...register("role", {
                                                    required: true,
                                                })}
                                                defaultValue={
                                                    adminData?.role || "admin"
                                                }
                                                className='font-medium border px-1 py-1 rounded-md focus:outline-none'
                                            >
                                                <option value='admin'>
                                                    Admin
                                                </option>
                                                <option value='user'>
                                                    User
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Invoice Information */}
                                <div className='mb-6 p-6 lg:px-4 lg:py-4 flex flex-col lg:flex-row lg:space-x-16'>
                                    <h2 className='text-lg font-semibold mb-4 lg:mb-0 whitespace-normal lg:whitespace-nowrap'>
                                        Invoice Information
                                    </h2>

                                    <div className='w-full grid grid-cols-1 gap-y-4'>
                                        <input
                                            type='radio'
                                            value='true'
                                            defaultChecked
                                            {...register(
                                                "billingInformation.invoiceStatus"
                                            )}
                                            hidden
                                        />

                                        <div>
                                            <label className='block mb-2'>
                                                Invoice Type:
                                            </label>
                                            <select
                                                {...register("invoiceType")}
                                                defaultValue={
                                                    adminData?.invoiceType
                                                }
                                                onChange={(e) =>
                                                    setInvoiceType(
                                                        e.target.value
                                                    )
                                                }
                                                className='font-medium px-3 py-2 border rounded-md w-full focus:outline-none'
                                            >
                                                <option value='individual'>
                                                    Bireysel
                                                </option>
                                                <option value='institutional'>
                                                    Kurumsal
                                                </option>
                                            </select>
                                        </div>

                                        {/* Individual Invoice Fields */}
                                        {invoiceType === "individual" && (
                                            <div className='grid grid-cols-1 gap-y-4'>
                                                <div>
                                                    <label>Full Name:</label>
                                                    <input
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.fullName"
                                                        )}
                                                        defaultValue={
                                                            adminData
                                                                ?.billingInformation
                                                                ?.fullName
                                                        }
                                                        className='font-medium border px-3 py-2 rounded-md w-full focus:outline-none'
                                                    />
                                                </div>
                                                <div>
                                                    <label>TC Number:</label>
                                                    <input
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.trId"
                                                        )}
                                                        defaultValue={
                                                            adminData
                                                                ?.billingInformation
                                                                ?.trId
                                                        }
                                                        className='font-medium border px-3 py-2 rounded-md w-full focus:outline-none'
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Invoice Address:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.address"
                                                        )}
                                                        defaultValue={
                                                            adminData
                                                                ?.billingInformation
                                                                ?.address
                                                        }
                                                        className='font-medium border px-3 py-2 rounded-md w-full focus:outline-none'
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Institutional Invoice Fields */}
                                        {invoiceType === "institutional" && (
                                            <div className='grid grid-cols-1 gap-y-4'>
                                                <div>
                                                    <label>
                                                        Company Title:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.companyName"
                                                        )}
                                                        defaultValue={
                                                            adminData
                                                                ?.billingInformation
                                                                ?.companyName
                                                        }
                                                        className='font-medium border px-3 py-2 rounded-md w-full focus:outline-none'
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Tax Number / TCKN:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.taxNumber"
                                                        )}
                                                        defaultValue={
                                                            adminData
                                                                ?.billingInformation
                                                                ?.taxNumber
                                                        }
                                                        className='font-medium border px-3 py-2 rounded-md w-full focus:outline-none'
                                                    />
                                                </div>
                                                <div>
                                                    <label>Tax Office:</label>
                                                    <input
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.taxOffice"
                                                        )}
                                                        defaultValue={
                                                            adminData
                                                                ?.billingInformation
                                                                ?.taxOffice
                                                        }
                                                        className='font-medium border px-3 py-2 rounded-md w-full focus:outline-none'
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Invoice Address:
                                                    </label>
                                                    <input
                                                        type='text'
                                                        {...register(
                                                            "billingInformation.address"
                                                        )}
                                                        defaultValue={
                                                            adminData
                                                                ?.billingInformation
                                                                ?.address
                                                        }
                                                        className='font-medium border px-3 py-2 rounded-md w-full focus:outline-none'
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='flex justify-end'>
                                    <button
                                        type='submit'
                                        className='px-4 py-2 ButtonBlue text-white rounded-md mr-2'
                                    >
                                        Save
                                    </button>
                                    <button
                                        type='button'
                                        onClick={onClose}
                                        className='px-4 py-2 bg-red-500 text-white rounded-md'
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default ModalEdit;
