export interface Customer {
    id: number;
    fullName: string;
    email: string;
    contact: string;
    age: number;
    country: string;
    status: "Verified" | "Pending" | "Rejected";
    invoiceType: string;
    tcNumber?: string;
    companyTitle?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
    billingInformation?: {
        invoiceStatus: boolean;
        trId: string;
        address: string;
        fullName: string;
        companyName: string;
        taxNumber: string;
        taxOffice: string;
    };
    rememberMe?: boolean;
    termsAndConditionsApproved?: boolean;
}

interface ModalViewProps {
    isOpen: boolean;
    onClose: () => void;
    customerData: Customer | null;
}

const getDefault = (value: any, defaultValue: string = "N/A") => {
    return value ?? defaultValue;
};

const ModalView: React.FC<ModalViewProps> = ({
    isOpen,
    onClose,
    customerData,
}) => {
    if (!isOpen || !customerData) return null;

    return (
        <div className='p-2'>
            <div className='text-lg font-semibold px-4 py-2 border-b-2 border-gray-200'>
                Customer Details
            </div>
            <div className='p-4 flex flex-col md:flex-row items-center'>
                <div className='w-full mt-4 md:mt-0 md:pl-8'>
                    <div className='mb-4'>
                        <strong>Name:</strong>{" "}
                        {getDefault(customerData.fullName)}
                    </div>
                    <div className='mb-4'>
                        <strong>Email:</strong> {getDefault(customerData.email)}
                    </div>
                    <div className='mb-4'>
                        <strong>Contact:</strong>{" "}
                        {getDefault(customerData.contact)}
                    </div>
                    <div className='mb-4'>
                        <strong>Age:</strong>{" "}
                        {getDefault(customerData.age?.toString())}
                    </div>
                    <div className='mb-4'>
                        <strong>Country:</strong>{" "}
                        {getDefault(customerData.country)}
                    </div>
                    <div className='mb-4'>
                        <strong>Status:</strong>{" "}
                        {getDefault(customerData.status)}
                    </div>
                    <div className='mb-4'>
                        <strong>Invoice Type:</strong>{" "}
                        {getDefault(customerData.invoiceType)}
                    </div>

                    {/* Billing Information */}
                    <div className='mb-4'>
                        <strong>Invoice Status:</strong>{" "}
                        {getDefault(
                            customerData.billingInformation?.invoiceStatus?.toString()
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Transaction ID:</strong>{" "}
                        {getDefault(customerData.billingInformation?.trId)}
                    </div>
                    <div className='mb-4'>
                        <strong>Billing Address:</strong>{" "}
                        {getDefault(customerData.billingInformation?.address)}
                    </div>
                    <div className='mb-4'>
                        <strong>Billing Full Name:</strong>{" "}
                        {getDefault(customerData.billingInformation?.fullName)}
                    </div>
                    <div className='mb-4'>
                        <strong>Company Name:</strong>{" "}
                        {getDefault(
                            customerData.billingInformation?.companyName
                        )}
                    </div>
                    <div className='mb-4'>
                        <strong>Tax Number:</strong>{" "}
                        {getDefault(customerData.billingInformation?.taxNumber)}
                    </div>
                    <div className='mb-4'>
                        <strong>Tax Office:</strong>{" "}
                        {getDefault(customerData.billingInformation?.taxOffice)}
                    </div>

                    {/* Conditional display based on invoice type */}
                    {customerData.invoiceType === "Bireysel" && (
                        <div className='mb-4'>
                            <strong>T.C. Kimlik No:</strong>{" "}
                            {getDefault(customerData.tcNumber)}
                        </div>
                    )}

                    {customerData.invoiceType === "Kurumsal" && (
                        <>
                            <div className='mb-4'>
                                <strong>Company Title:</strong>{" "}
                                {getDefault(customerData.companyTitle)}
                            </div>
                            <div className='mb-4'>
                                <strong>Tax Number:</strong>{" "}
                                {getDefault(customerData.taxNumber)}
                            </div>
                            <div className='mb-4'>
                                <strong>Tax Office:</strong>{" "}
                                {getDefault(customerData.taxOffice)}
                            </div>
                            <div className='mb-4'>
                                <strong>Address:</strong>{" "}
                                {getDefault(customerData.address)}
                            </div>
                        </>
                    )}

                    {/* Remember Me and Terms & Conditions */}
                    <div className='mb-4'>
                        <strong>Remember Me:</strong>{" "}
                        {getDefault(customerData.rememberMe ? "Yes" : "No")}
                    </div>
                    <div className='mb-4'>
                        <strong>Terms & Conditions Approved:</strong>{" "}
                        {getDefault(
                            customerData.termsAndConditionsApproved
                                ? "Yes"
                                : "No"
                        )}
                    </div>
                </div>
            </div>

            <div className=' flex justify-end'>
                <button
                    onClick={onClose}
                    className='px-4 py-2 Button text-white rounded-md'
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalView;
