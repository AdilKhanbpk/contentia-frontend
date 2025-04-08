"use client";

interface InvoiceInfoProps {
    register: any;
    invoiceType: string;
    setInvoiceType: (value: string) => void;
    setIsEditing: (value: boolean) => void;
    isEditing: boolean;
}

export const InvoiceInfo: React.FC<InvoiceInfoProps> = ({
    register,
    invoiceType,
    setInvoiceType,
    setIsEditing,
    isEditing,
}) => (
    <>
        <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold whitespace-normal lg:whitespace-nowrap'>
                Fatura Bilgileri
            </h2>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='block mb-2 whitespace-nowrap'>
                    Fatura Türü:
                </label>
                <select
                    {...register("invoiceType")}
                    value={invoiceType}
                    onChange={(e) => setInvoiceType(e.target.value)}
                    className={`w-full font-semibold px-1 py-0.5 border rounded-md focus:outline-none mb-2 ${
                        !isEditing
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : ""
                    }`}
                    disabled={!isEditing}
                >
                    <option value='individual'>Bireysel</option>
                    <option value='institutional'>Kurumsal</option>
                </select>

                {invoiceType === "individual" && (
                    <>
                        <FormField
                            label='Ad Soyad:'
                            name='billingInformation.fullName'
                            register={register}
                            isEditing={isEditing}
                        />
                        <FormField
                            label='T.C. Kimlik No:'
                            name='billingInformation.trId'
                            register={register}
                            isEditing={isEditing}
                        />
                        <FormField
                            label='Fatura Adresi:'
                            name='billingInformation.address'
                            register={register}
                            isEditing={isEditing}
                        />
                    </>
                )}

                {invoiceType === "institutional" && (
                    <>
                        <FormField
                            label='Şirket Ünvanı:'
                            name='billingInformation.companyName'
                            register={register}
                            isEditing={isEditing}
                        />
                        <FormField
                            label='Vergi Numarası / TCKN'
                            name='billingInformation.taxNumber'
                            register={register}
                            isEditing={isEditing}
                        />
                        <FormField
                            label='Vergi Dairesi:'
                            name='billingInformation.taxOffice'
                            register={register}
                            isEditing={isEditing}
                        />
                        <FormField
                            label='Fatura Adresi:'
                            name='billingInformation.address'
                            register={register}
                            isEditing={isEditing}
                        />
                    </>
                )}
            </div>
        </div>
    </>
);

// ✅ Reusable form field for cleaner JSX
const FormField = ({
    label,
    name,
    register,
    isEditing,
}: {
    label: string;
    name: string;
    register: any;
    isEditing: boolean;
}) => (
    <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
        <label className='mb-1 whitespace-nowrap'>{label}</label>
        <input
            type='text'
            {...register(name)}
            readOnly={!isEditing}
            className={`font-semibold border px-1 py-0.5 rounded-md focus:outline-none ${
                !isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
            }`}
        />
    </div>
);
