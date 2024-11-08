// InvoiceInfo.tsx
import React from 'react';

interface InvoiceInfoProps {
    register: any;
    invoiceType: string;
    setInvoiceType: (value: string) => void;
    setIsEditing: (value: boolean) => void;
    isEditing: boolean;
}

export const InvoiceInfo: React.FC<InvoiceInfoProps> = ({ register, invoiceType, setInvoiceType, setIsEditing, isEditing }) => (
    <>
        <h2 className="text-xl font-semibold mb-4 whitespace-normal lg:whitespace-nowrap">Fatura Bilgileri</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block mb-2 whitespace-nowrap">Fatura Türü:</label>
                <select
                    {...register('invoiceType')}
                    value={invoiceType}
                    onChange={(e) => setInvoiceType(e.target.value)}
                    className="w-full font-semibold px-1 py-0.5 border rounded-md focus:outline-none"
                    disabled={!isEditing}
                >
                    <option value="individual">Bireysel</option>
                    <option value="institutional">Kurumsal</option>
                </select>
                {invoiceType === 'individual' && (
                    <>
                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <p className="mt-4 whitespace-nowrap">Ad Soyad:</p>
                            <p className='font-semibold'>
                                <input
                                    type="text"
                                    {...register('billingInformation.fullName')}
                                    disabled={!isEditing}
                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                />
                            </p>
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <p className='whitespace-nowrap'>T.C. Kimlik No:</p>
                            <p className='font-semibold'>
                                <input
                                    type="text"
                                    {...register('billingInformation.trId')}
                                    disabled={!isEditing}
                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                />
                            </p>
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <p className='whitespace-nowrap'>Fatura Adresi:</p>
                            <p className='font-semibold whitespace-normal lg:whitespace-nowrap'>
                                <input
                                    type="text"
                                    {...register('billingInformation.address')}
                                    disabled={!isEditing}
                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                />
                            </p>
                        </div>
                    </>
                )}
                {invoiceType === 'institutional' && (
                    <>
                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 whitespace-nowrap">Şirket Ünvanı:</p>
                            <p className='font-semibold'>
                                <input
                                    type="text"
                                    {...register('billingInformation.companyName')}
                                    disabled={!isEditing}
                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                />
                            </p>
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <p className='whitespace-nowrap'>Vergi Numarası / TCKN</p>
                            <p className='font-semibold'>
                                <input
                                    type="text"
                                    {...register('billingInformation.taxNumber')}
                                    disabled={!isEditing}
                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                />
                            </p>
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <p className='whitespace-nowrap'>Vergi Dairesi:</p>
                            <p className='font-semibold'>
                                <input
                                    type="text"
                                    {...register('billingInformation.taxOffice')}
                                    disabled={!isEditing}
                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                />
                            </p>
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                            <p className='whitespace-nowrap'>Fatura Adresi:</p>
                            <p className='font-semibold whitespace-normal lg:whitespace-nowrap'>
                                <input
                                    type="text"
                                    {...register('billingInformation.address')}
                                    disabled={!isEditing}
                                    className="font-semibold border px-1 py-0.5 rounded-md focus:outline-none"
                                />
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
);
