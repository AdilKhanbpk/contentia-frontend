import React from 'react';

export interface Customer {
    ID: number;
    Name: string;
    Email: string;
    Contact: string;
    Age: number;
    Country: string;
    Status: "Verified" | "Pending" | "Rejected";
    InvoiceType: string;  // Capitalized
    TcNumber?: string;  // Capitalized
    CompanyTitle?: string;  // Capitalized
    TaxNumber?: string;  // Capitalized
    TaxOffice?: string;  // Capitalized
    Address?: string;  // Capitalized
    BillingInformation?: {  // Capitalized
        InvoiceStatus: boolean;  // Capitalized
        TrId: string;  // Capitalized
        Address: string;  // Capitalized
        FullName: string;  // Capitalized
        CompanyName: string;  // Capitalized
        TaxNumber: string;  // Capitalized
        TaxOffice: string;  // Capitalized
    };
    RememberMe?: boolean;  // Capitalized
    TermsAndConditionsApproved?: boolean;  // Capitalized
}


interface ModalViewProps {
    isOpen: boolean;
    onClose: () => void;
    customerData: Customer | null;
}

// Helper function to return a default value if data is empty, undefined, or null
const getDefault = (value: any, defaultValue: string = 'N/A') => {
    return value ?? defaultValue;
}

const ModalView: React.FC<ModalViewProps> = ({ isOpen, onClose, customerData }) => {
    // If modal is not open or no customer data, return null
    if (!isOpen || !customerData) return null;

    return (
        <div className="p-2">
            <div className="text-lg font-semibold px-4 py-2 border-b-2 border-gray-200">Customer Details</div>
            <div className="p-4 flex flex-col md:flex-row items-center">
                <div className="w-full mt-4 md:mt-0 md:pl-8">
                    <div className="mb-4">
                        <strong>Name:</strong> {getDefault(customerData.Name)}
                    </div>
                    <div className="mb-4">
                        <strong>Email:</strong> {getDefault(customerData.Email)}
                    </div>
                    <div className="mb-4">
                        <strong>Contact:</strong> {getDefault(customerData.Contact)}
                    </div>
                    <div className="mb-4">
                        <strong>Age:</strong> {getDefault(customerData.Age?.toString())}
                    </div>
                    <div className="mb-4">
                        <strong>Country:</strong> {getDefault(customerData.Country)}
                    </div>
                    <div className="mb-4">
                        <strong>Status:</strong> {getDefault(customerData.Status)}
                    </div>
                    <div className="mb-4">
                        <strong>Invoice Type:</strong> {getDefault(customerData.InvoiceType)}
                    </div>
                    <div className="mb-4">
                        <strong>Customer Status:</strong> {getDefault(customerData.Status)}
                    </div>

                    {/* Billing Information */}
                    <div className="mb-4">
                        <strong>Invoice Status:</strong> {getDefault(customerData.BillingInformation?.InvoiceStatus?.toString())}
                    </div>
                    <div className="mb-4">
                        <strong>Transaction ID:</strong> {getDefault(customerData.BillingInformation?.TrId)}
                    </div>
                    <div className="mb-4">
                        <strong>Billing Address:</strong> {getDefault(customerData.BillingInformation?.Address)}
                    </div>
                    <div className="mb-4">
                        <strong>Billing Full Name:</strong> {getDefault(customerData.BillingInformation?.FullName)}
                    </div>
                    <div className="mb-4">
                        <strong>Company Name:</strong> {getDefault(customerData.BillingInformation?.CompanyName)}
                    </div>
                    <div className="mb-4">
                        <strong>Tax Number:</strong> {getDefault(customerData.BillingInformation?.TaxNumber)}
                    </div>
                    <div className="mb-4">
                        <strong>Tax Office:</strong> {getDefault(customerData.BillingInformation?.TaxOffice)}
                    </div>

                    {/* Conditional display based on invoice type */}
                    {customerData.InvoiceType === 'Bireysel' && (
                        <div className="mb-4">
                            <strong>T.C. Kimlik No:</strong> {getDefault(customerData.TcNumber)}
                        </div>
                    )}

                    {customerData.InvoiceType === 'Kurumsal' && (
                        <>
                            <div className="mb-4">
                                <strong>Company Title:</strong> {getDefault(customerData.CompanyTitle)}
                            </div>
                            <div className="mb-4">
                                <strong>Tax Number:</strong> {getDefault(customerData.TaxNumber)}
                            </div>
                            <div className="mb-4">
                                <strong>Tax Office:</strong> {getDefault(customerData.TaxOffice)}
                            </div>
                            <div className="mb-4">
                                <strong>Address:</strong> {getDefault(customerData.Address)}
                            </div>
                        </>
                    )}

                    {/* Remember Me and Terms & Conditions */}
                    <div className="mb-4">
                        <strong>Remember Me:</strong> {getDefault(customerData.RememberMe ? 'Yes' : 'No')}
                    </div>
                    <div className="mb-4">
                        <strong>Terms & Conditions Approved:</strong> {getDefault(customerData.TermsAndConditionsApproved ? 'Yes' : 'No')}
                    </div>
                </div>
            </div>

            <div className=" flex justify-end">
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
