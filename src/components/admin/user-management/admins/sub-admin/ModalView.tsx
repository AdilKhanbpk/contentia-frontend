import { Customer } from "@/types/interfaces";
import React from "react";
import Image from "next/image";

interface ModalViewProps {
    isOpen: boolean;
    onClose: () => void;
    adminData: Customer | null;
}

const getDefault = (value: any, defaultValue: string = "N/A") => {
    return value ?? defaultValue;
};

const ModalView: React.FC<ModalViewProps> = ({
    isOpen,
    onClose,
    adminData,
}) => {
    if (!isOpen || !adminData) return null;

    return (
        <div className='p-4'>
            <div className='text-lg font-semibold px-4 py-2 border-b-2 border-gray-200'>
                Admin Details
            </div>
            <div className='p-4 flex flex-col md:flex-row items-center'>
                <div className='w-full md:w-1/3 flex justify-center'>
                    <Image
                        width={120}
                        height={120}
                        src={adminData.profilePic || "/icons/avatar.png"}
                        alt='Admin Avatar'
                        className='w-32 h-32 rounded-full'
                    />
                </div>
                <div className='w-full md:w-2/3 mt-4 md:mt-0 md:pl-8'>
                    <div className='mb-2'>
                        <strong>Name:</strong> {getDefault(adminData.fullName)}
                    </div>
                    <div className='mb-2'>
                        <strong>Email:</strong> {getDefault(adminData.email)}
                    </div>
                    <div className='mb-2'>
                        <strong>Contact:</strong>{" "}
                        {getDefault(adminData.phoneNumber)}
                    </div>
                    <div className='mb-2'>
                        <strong>Age:</strong>{" "}
                        {getDefault(adminData.age?.toString())}
                    </div>
                    <div className='mb-2'>
                        <strong>Status:</strong> {getDefault(adminData.status)}
                    </div>
                    <div className='mb-2'>
                        <strong>Invoice Type:</strong>{" "}
                        {getDefault(adminData.invoiceType)}
                    </div>
                    <div className='mb-2'>
                        <strong>Role:</strong> {getDefault(adminData.role)}
                    </div>
                </div>
            </div>

            {/* Billing Information Section */}
            {adminData.billingInformation && (
                <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
                    <h2 className='text-lg font-semibold mb-3'>
                        Billing Information
                    </h2>
                    {adminData.invoiceType === "individual" ? (
                        <>
                            <div className='mb-2'>
                                <strong>Full Name:</strong>{" "}
                                {getDefault(
                                    adminData.billingInformation.fullName
                                )}
                            </div>
                            <div className='mb-2'>
                                <strong>TC Number:</strong>{" "}
                                {getDefault(adminData.billingInformation.trId)}
                            </div>
                            <div className='mb-2'>
                                <strong>Invoice Address:</strong>{" "}
                                {getDefault(
                                    adminData.billingInformation.address
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='mb-2'>
                                <strong>Company Title:</strong>{" "}
                                {getDefault(
                                    adminData.billingInformation.companyName
                                )}
                            </div>
                            <div className='mb-2'>
                                <strong>Tax Number / TCKN:</strong>{" "}
                                {getDefault(
                                    adminData.billingInformation.taxNumber
                                )}
                            </div>
                            <div className='mb-2'>
                                <strong>Tax Office:</strong>{" "}
                                {getDefault(
                                    adminData.billingInformation.taxOffice
                                )}
                            </div>
                            <div className='mb-2'>
                                <strong>Invoice Address:</strong>{" "}
                                {getDefault(
                                    adminData.billingInformation.address
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className='flex justify-end mt-4'>
                <button
                    onClick={onClose}
                    className='px-4 py-2 bg-blue-500 text-white rounded-md'
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalView;
