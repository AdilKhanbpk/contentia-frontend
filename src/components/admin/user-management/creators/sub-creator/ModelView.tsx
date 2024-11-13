import React from 'react';

export interface Creator {
    id: number;
    fullName: string;
    creatorType: "individual" | "company";
    password: string;
    tckn: string;
    email: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    phoneNumber: string;
    isVerified: boolean;
    addressOne: string;
    addressTwo?: string;
    accountType: "individual" | "institutional";
    invoiceType: "individual" | "institutional";
    paymentInformation: {
        ibanNumber?: string;
        address: string;
        fullName: string;
        trId?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
    billingInformation: {
        invoiceStatus: boolean;
        address: string;
        fullName: string;
        trId?: string;
        companyName?: string;
        taxNumber?: string;
        taxOffice?: string;
    };
    preferences: {
        contentInformation: {
            contentType: "product" | "service" | "other";
            contentFormats: string[];
            areaOfInterest: string[];
            addressDetails: {
                country: string;
                state: string;
                district: string;
                neighbourhood?: string;
                fullAddress: string;
            };
        };
        socialInformation: {
            contentType: "product" | "service" | "other";
            platforms: {
                Instagram?: {
                    followers: number;
                    username: string;
                };
                TikTok?: {
                    followers: number;
                    username: string;
                };
                Youtube?: {
                    followers: number;
                    username: string;
                };
            };
            portfolioLink?: string;
        };
    };
    userAgreement: boolean;
    approvedCommercial: boolean;
}

interface ModalViewProps {
    isOpen: boolean;
    onClose: () => void;
    customerData: Creator | null;
}

const getDefault = (value: any, defaultValue: string = 'N/A') => {
    return value ?? defaultValue;
}

const ModalView: React.FC<ModalViewProps> = ({ isOpen, onClose, customerData }) => {
    if (!isOpen || !customerData) return null;

    return (
        <div className="p-2">
            <div className="text-lg font-semibold px-4 py-2 border-b-2 border-gray-200">Customer Details</div>
            <div className="p-4 flex flex-col md:flex-row items-center">
                <div className="w-full mt-4 md:mt-0 md:pl-8">
                    {/* Basic Information */}
                    <div className="mb-4">
                        <strong>ID:</strong> {getDefault(customerData.id?.toString())}
                    </div>
                    <div className="mb-4">
                        <strong>Full Name:</strong> {getDefault(customerData.fullName)}
                    </div>
                    <div className="mb-4">
                        <strong>Creator Type:</strong> {getDefault(customerData.creatorType)}
                    </div>
                    <div className="mb-4">
                        <strong>TCKN:</strong> {getDefault(customerData.tckn)}
                    </div>
                    <div className="mb-4">
                        <strong>Email:</strong> {getDefault(customerData.email)}
                    </div>
                    <div className="mb-4">
                        <strong>Date of Birth:</strong> {getDefault(customerData.dateOfBirth)}
                    </div>
                    <div className="mb-4">
                        <strong>Gender:</strong> {getDefault(customerData.gender)}
                    </div>
                    <div className="mb-4">
                        <strong>Phone Number:</strong> {getDefault(customerData.phoneNumber)}
                    </div>
                    <div className="mb-4">
                        <strong>Verification Status:</strong> {getDefault(customerData.isVerified ? 'Verified' : 'Not Verified')}
                    </div>

                    {/* Address Information */}
                    <div className="text-lg font-semibold mt-6 mb-4">Address Information</div>
                    <div className="mb-4">
                        <strong>Address 1:</strong> {getDefault(customerData.addressOne)}
                    </div>
                    <div className="mb-4">
                        <strong>Address 2:</strong> {getDefault(customerData.addressTwo)}
                    </div>
                    <div className="mb-4">
                        <strong>Account Type:</strong> {getDefault(customerData.accountType)}
                    </div>
                    <div className="mb-4">
                        <strong>Invoice Type:</strong> {getDefault(customerData.invoiceType)}
                    </div>

                    {/* Payment Information */}
                    <div className="text-lg font-semibold mt-6 mb-4">Payment Information</div>
                    <div className="mb-4">
                        <strong>IBAN Number:</strong> {getDefault(customerData.paymentInformation?.ibanNumber)}
                    </div>
                    <div className="mb-4">
                        <strong>Payment Address:</strong> {getDefault(customerData.paymentInformation?.address)}
                    </div>
                    <div className="mb-4">
                        <strong>Payment Full Name:</strong> {getDefault(customerData.paymentInformation?.fullName)}
                    </div>
                    <div className="mb-4">
                        <strong>Transaction ID:</strong> {getDefault(customerData.paymentInformation?.trId)}
                    </div>
                    <div className="mb-4">
                        <strong>Company Name:</strong> {getDefault(customerData.paymentInformation?.companyName)}
                    </div>
                    <div className="mb-4">
                        <strong>Tax Number:</strong> {getDefault(customerData.paymentInformation?.taxNumber)}
                    </div>
                    <div className="mb-4">
                        <strong>Tax Office:</strong> {getDefault(customerData.paymentInformation?.taxOffice)}
                    </div>

                    {/* Billing Information */}
                    <div className="text-lg font-semibold mt-6 mb-4">Billing Information</div>
                    <div className="mb-4">
                        <strong>Invoice Status:</strong> {getDefault(customerData.billingInformation?.invoiceStatus ? 'Active' : 'Inactive')}
                    </div>
                    <div className="mb-4">
                        <strong>Billing Address:</strong> {getDefault(customerData.billingInformation?.address)}
                    </div>
                    <div className="mb-4">
                        <strong>Billing Full Name:</strong> {getDefault(customerData.billingInformation?.fullName)}
                    </div>
                    <div className="mb-4">
                        <strong>Billing TR ID:</strong> {getDefault(customerData.billingInformation?.trId)}
                    </div>
                    <div className="mb-4">
                        <strong>Company Name:</strong> {getDefault(customerData.billingInformation?.companyName)}
                    </div>
                    <div className="mb-4">
                        <strong>Tax Number:</strong> {getDefault(customerData.billingInformation?.taxNumber)}
                    </div>
                    <div className="mb-4">
                        <strong>Tax Office:</strong> {getDefault(customerData.billingInformation?.taxOffice)}
                    </div>

                    {/* Content Preferences */}
                    <div className="text-lg font-semibold mt-6 mb-4">Content Preferences</div>
                    <div className="mb-4">
                        <strong>Content Type:</strong> {getDefault(customerData.preferences?.contentInformation?.contentType)}
                    </div>
                    <div className="mb-4">
                        <strong>Content Formats:</strong> {getDefault(customerData.preferences?.contentInformation?.contentFormats?.join(', '))}
                    </div>
                    <div className="mb-4">
                        <strong>Areas of Interest:</strong> {getDefault(customerData.preferences?.contentInformation?.areaOfInterest?.join(', '))}
                    </div>

                    {/* Address Details */}
                    <div className="text-lg font-semibold mt-6 mb-4">Address Details</div>
                    <div className="mb-4">
                        <strong>Country:</strong> {getDefault(customerData.preferences?.contentInformation?.addressDetails?.country)}
                    </div>
                    <div className="mb-4">
                        <strong>State:</strong> {getDefault(customerData.preferences?.contentInformation?.addressDetails?.state)}
                    </div>
                    <div className="mb-4">
                        <strong>District:</strong> {getDefault(customerData.preferences?.contentInformation?.addressDetails?.district)}
                    </div>
                    <div className="mb-4">
                        <strong>Neighbourhood:</strong> {getDefault(customerData.preferences?.contentInformation?.addressDetails?.neighbourhood)}
                    </div>
                    <div className="mb-4">
                        <strong>Full Address:</strong> {getDefault(customerData.preferences?.contentInformation?.addressDetails?.fullAddress)}
                    </div>

                    {/* Social Information */}
                    <div className="text-lg font-semibold mt-6 mb-4">Social Media Information</div>
                    <div className="mb-4">
                        <strong>Social Content Type:</strong> {getDefault(customerData.preferences?.socialInformation?.contentType)}
                    </div>
                    
                    {/* Instagram */}
                    {customerData.preferences?.socialInformation?.platforms?.Instagram && (
                        <>
                            <div className="mb-4">
                                <strong>Instagram Username:</strong> {getDefault(customerData.preferences?.socialInformation?.platforms?.Instagram?.username)}
                            </div>
                            <div className="mb-4">
                                <strong>Instagram Followers:</strong> {getDefault(customerData.preferences?.socialInformation?.platforms?.Instagram?.followers?.toString())}
                            </div>
                        </>
                    )}

                    {/* TikTok */}
                    {customerData.preferences?.socialInformation?.platforms?.TikTok && (
                        <>
                            <div className="mb-4">
                                <strong>TikTok Username:</strong> {getDefault(customerData.preferences?.socialInformation?.platforms?.TikTok?.username)}
                            </div>
                            <div className="mb-4">
                                <strong>TikTok Followers:</strong> {getDefault(customerData.preferences?.socialInformation?.platforms?.TikTok?.followers?.toString())}
                            </div>
                        </>
                    )}

                    {/* YouTube */}
                    {customerData.preferences?.socialInformation?.platforms?.Youtube && (
                        <>
                            <div className="mb-4">
                                <strong>YouTube Username:</strong> {getDefault(customerData.preferences?.socialInformation?.platforms?.Youtube?.username)}
                            </div>
                            <div className="mb-4">
                                <strong>YouTube Followers:</strong> {getDefault(customerData.preferences?.socialInformation?.platforms?.Youtube?.followers?.toString())}
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                        <strong>Portfolio Link:</strong> {getDefault(customerData.preferences?.socialInformation?.portfolioLink)}
                    </div>

                    {/* Agreements */}
                    <div className="text-lg font-semibold mt-6 mb-4">Agreements</div>
                    <div className="mb-4">
                        <strong>User Agreement:</strong> {getDefault(customerData.userAgreement ? 'Accepted' : 'Not Accepted')}
                    </div>
                    <div className="mb-4">
                        <strong>Commercial Agreement:</strong> {getDefault(customerData.approvedCommercial ? 'Approved' : 'Not Approved')}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 ButtonBlue text-white rounded-md"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalView;