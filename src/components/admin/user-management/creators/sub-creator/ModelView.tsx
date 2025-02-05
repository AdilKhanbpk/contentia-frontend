import { CreatorInterface } from "@/types/interfaces";
import React from "react";

interface ModalViewProps {
    isOpen: boolean;
    onClose: () => void;
    creatorData: CreatorInterface | null;
}

const getDefault = (value: any, defaultValue: string = "N/A") => {
    return value ?? defaultValue;
};

const ModalView: React.FC<ModalViewProps> = ({
    isOpen,
    onClose,
    creatorData,
}) => {
    if (!isOpen || !creatorData) return null;

    return (
        <div className='p-2'>
            <div className='text-lg font-semibold px-4 py-2 border-b-2 border-gray-200'>
                Creator Details
            </div>
            <div className='p-4 flex flex-col md:flex-row items-center'>
                <div className='w-full mt-4 md:mt-0 md:pl-8'>
                    {/* Basic Information */}
                    <div className='mb-4'>
                        <strong>ID:</strong>{" "}
                        {getDefault(creatorData._id?.toString())}
                    </div>
                    <div className='mb-4'>
                        <strong>Full Name:</strong>{" "}
                        {getDefault(creatorData.fullName)}
                    </div>
                    <div className='mb-4'>
                        <strong>Creator Type:</strong>{" "}
                        {getDefault(
                            creatorData?.preferences?.contentInformation
                                ?.creatorType
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>TCKN:</strong> {getDefault(creatorData.tckn)}
                    </div>
                    <div className='mb-4'>
                        <strong>Email:</strong> {getDefault(creatorData.email)}
                    </div>
                    <div className='mb-4'>
                        <strong>Date of Birth:</strong>{" "}
                        {getDefault(creatorData.dateOfBirth)}
                    </div>
                    <div className='mb-4'>
                        <strong>Gender:</strong>{" "}
                        {getDefault(creatorData.gender)}
                    </div>
                    <div className='mb-4'>
                        <strong>Phone Number:</strong>{" "}
                        {getDefault(creatorData.phoneNumber)}
                    </div>
                    <div className='mb-4'>
                        <strong>Verification Status:</strong>{" "}
                        {getDefault(
                            creatorData.isVerified ? "Verified" : "Not Verified"
                        )}
                    </div>

                    {/* Address Information */}
                    <div className='text-lg font-semibold mt-6 mb-4'>
                        Address Information
                    </div>
                    <div className='mb-4'>
                        <strong>Full Address:</strong>{" "}
                        {getDefault(
                            creatorData.preferences.contentInformation
                                .addressDetails.fullAddress
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>State:</strong>{" "}
                        {getDefault(
                            creatorData.preferences.contentInformation
                                .addressDetails.state
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Account Type:</strong>{" "}
                        {getDefault(creatorData.accountType)}
                    </div>
                    <div className='mb-4'>
                        <strong>Invoice Type:</strong>{" "}
                        {getDefault(creatorData.invoiceType)}
                    </div>

                    {/* Payment Information */}
                    <div className='text-lg font-semibold mt-6 mb-4'>
                        Payment Information
                    </div>
                    <div className='mb-4'>
                        <strong>IBAN Number:</strong>{" "}
                        {getDefault(creatorData.paymentInformation?.ibanNumber)}
                    </div>
                    <div className='mb-4'>
                        <strong>Payment Address:</strong>{" "}
                        {getDefault(creatorData.paymentInformation?.address)}
                    </div>
                    <div className='mb-4'>
                        <strong>Payment Full Name:</strong>{" "}
                        {getDefault(creatorData.paymentInformation?.fullName)}
                    </div>
                    <div className='mb-4'>
                        <strong>Transaction ID:</strong>{" "}
                        {getDefault(creatorData.paymentInformation?.trId)}
                    </div>
                    <div className='mb-4'>
                        <strong>Company Name:</strong>{" "}
                        {getDefault(
                            creatorData.paymentInformation?.companyName
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Tax Number:</strong>{" "}
                        {getDefault(creatorData.paymentInformation?.taxNumber)}
                    </div>
                    <div className='mb-4'>
                        <strong>Tax Office:</strong>{" "}
                        {getDefault(creatorData.paymentInformation?.taxOffice)}
                    </div>

                    {/* Billing Information */}
                    <div className='text-lg font-semibold mt-6 mb-4'>
                        Billing Information
                    </div>
                    <div className='mb-4'>
                        <strong>Invoice Status:</strong>{" "}
                        {getDefault(
                            creatorData.billingInformation?.invoiceStatus
                                ? "Yes"
                                : "No"
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Billing Address:</strong>{" "}
                        {getDefault(creatorData.billingInformation?.address)}
                    </div>
                    <div className='mb-4'>
                        <strong>Billing Full Name:</strong>{" "}
                        {getDefault(creatorData.billingInformation?.fullName)}
                    </div>
                    <div className='mb-4'>
                        <strong>Billing TR ID:</strong>{" "}
                        {getDefault(creatorData.billingInformation?.trId)}
                    </div>
                    <div className='mb-4'>
                        <strong>Company Name:</strong>{" "}
                        {getDefault(
                            creatorData.billingInformation?.companyName
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Tax Number:</strong>{" "}
                        {getDefault(creatorData.billingInformation?.taxNumber)}
                    </div>
                    <div className='mb-4'>
                        <strong>Tax Office:</strong>{" "}
                        {getDefault(creatorData.billingInformation?.taxOffice)}
                    </div>

                    {/* Content Preferences */}
                    <div className='text-lg font-semibold mt-6 mb-4'>
                        Content Preferences
                    </div>
                    <div className='mb-4'>
                        <strong>Content Type:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation
                                ?.contentType
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Content Formats:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation?.contentFormats?.join(
                                ", "
                            )
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Areas of Interest:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation?.areaOfInterest?.join(
                                ", "
                            )
                        )}
                    </div>

                    {/* Address Details */}
                    <div className='text-lg font-semibold mt-6 mb-4'>
                        Address Details
                    </div>
                    <div className='mb-4'>
                        <strong>Country:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.country
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>State:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.state
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>District:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.district
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Neighborhood:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.neighborhood
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Full Address:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.fullAddress
                        )}
                    </div>

                    {/* Social Information */}
                    <div className='text-lg font-semibold mt-6 mb-4'>
                        Social Media Information
                    </div>
                    <div className='mb-4'>
                        <strong>Social Content Type:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.socialInformation
                                ?.contentType
                        )}
                    </div>

                    {/* Instagram */}
                    {creatorData.preferences?.socialInformation?.platforms
                        ?.Instagram && (
                        <>
                            <div className='mb-4'>
                                <strong>Instagram Username:</strong>{" "}
                                {getDefault(
                                    creatorData.preferences?.socialInformation
                                        ?.platforms?.Instagram?.username
                                )}
                            </div>
                            <div className='mb-4'>
                                <strong>Instagram Followers:</strong>{" "}
                                {getDefault(
                                    creatorData.preferences?.socialInformation?.platforms?.Instagram?.followers?.toString()
                                )}
                            </div>
                        </>
                    )}

                    {/* TikTok */}
                    {creatorData.preferences?.socialInformation?.platforms
                        ?.TikTok && (
                        <>
                            <div className='mb-4'>
                                <strong>TikTok Username:</strong>{" "}
                                {getDefault(
                                    creatorData.preferences?.socialInformation
                                        ?.platforms?.TikTok?.username
                                )}
                            </div>
                            <div className='mb-4'>
                                <strong>TikTok Followers:</strong>{" "}
                                {getDefault(
                                    creatorData.preferences?.socialInformation?.platforms?.TikTok?.followers?.toString()
                                )}
                            </div>
                        </>
                    )}

                    {/* YouTube */}
                    {creatorData.preferences?.socialInformation?.platforms
                        ?.Youtube && (
                        <>
                            <div className='mb-4'>
                                <strong>YouTube Username:</strong>{" "}
                                {getDefault(
                                    creatorData.preferences?.socialInformation
                                        ?.platforms?.Youtube?.username
                                )}
                            </div>
                            <div className='mb-4'>
                                <strong>YouTube Followers:</strong>{" "}
                                {getDefault(
                                    creatorData.preferences?.socialInformation?.platforms?.Youtube?.followers?.toString()
                                )}
                            </div>
                        </>
                    )}

                    <div className='mb-4'>
                        <strong>Portfolio Link:</strong>{" "}
                        {getDefault(
                            creatorData.preferences?.socialInformation
                                ?.portfolioLink
                        )}
                    </div>

                    {/* Agreements */}
                    <div className='text-lg font-semibold mt-6 mb-4'>
                        Agreements
                    </div>
                    <div className='mb-4'>
                        <strong>User Agreement:</strong>{" "}
                        {getDefault(
                            creatorData.userAgreement
                                ? "Accepted"
                                : "Not Accepted"
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Commercial Agreement:</strong>{" "}
                        {getDefault(
                            creatorData.approvedCommercial
                                ? "Approved"
                                : "Not Approved"
                        )}
                    </div>
                </div>
            </div>

            <div className='flex justify-end'>
                <button
                    onClick={onClose}
                    className='px-4 py-2 ButtonBlue text-white rounded-md'
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalView;
