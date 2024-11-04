import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Unified Coupon Interface to Avoid Mismatches
interface Coupon {
    id: number;
    code: string;
    customer: string;
    discount: string;
    limit: string;
    endingDate: string;
    status: string;
}

// Initial Coupons Array
const initialCoupons: Coupon[] = [
    {
        id: 1,
        code: "HELLO1",
        customer: "All",
        discount: "20%",
        limit: "Limitless",
        endingDate: "23/09/2024",
        status: "Active",
    },
    {
        id: 2,
        code: "WELCOME3",
        customer: "Saud Khan",
        discount: "500TL",
        limit: "1",
        endingDate: "28/09/2024",
        status: "Active",
    },
    {
        id: 3,
        code: "BLACKFRIDAY",
        customer: "All",
        discount: "10%",
        limit: "1,000",
        endingDate: "30/09/2024",
        status: "Cancelled",
    },
];

interface CouponForm {
    id?: number;
    code: string;
    customer: string;
    discountTL?: number;
    discountPercent?: number;
    useLimit: number;
    endingDate: string;
}

export default function ModalEdit() {
    const [data, setData] = useState<Coupon[]>(initialCoupons);
    const [editId, setEditId] = useState<number | null>(null); // Ensure correct type
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { control, handleSubmit, register, reset } = useForm<CouponForm>();

    // Helper to format discount (handles both TL and percentage cases)
    const formatDiscount = (formData: CouponForm) => {
        return formData.discountTL
            ? `${formData.discountTL} TL`
            : `${formData.discountPercent || 0}%`;
    };

    const closeEditModal = () => {
        setEditId(null);
        reset();
        setIsEditModalOpen(false);
    };

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => {
        reset();
        setIsCreateModalOpen(false);
    };

    const onSubmit = (formData: CouponForm) => {
        if (editId !== null) {
            // Update existing coupon
            const updatedData = data.map((item) =>
                item.id === editId ? { ...item, ...formData, discount: formatDiscount(formData) } : item
            );
            setData(updatedData);
            closeEditModal();
        } else {
            // Add new coupon
            const newCoupon: Coupon = {
                ...formData,
                id: data.length + 1,
                discount: formatDiscount(formData),
                limit: formData.useLimit.toString(),
                status: "Active",
            };
            setData([...data, newCoupon]);
            closeCreateModal();
        }
    };

    return (
        <>
            <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:px-16 lg:py-8">
                <h2 className="text-lg font-semibold mb-4">Edit Coupon</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold">Code</label>
                            <input
                                type="text"
                                {...register('code')}
                                className="w-full px-6 py-2 focus:outline-none  border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Select Customer</label>
                            <input
                                type="text"
                                {...register('customer')}
                                className="w-full px-6 py-2 focus:outline-none  border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Discount (TL)</label>
                            <input
                                type="number"
                                {...register('discountTL')}
                                className="w-full px-6 py-2 focus:outline-none  border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Discount (%)</label>
                            <input
                                type="number"
                                {...register('discountPercent')}
                                className="w-full px-6 py-2 focus:outline-none  border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Use Limit</label>
                            <input
                                type="number"
                                {...register('useLimit')}
                                className="w-full px-6 py-2 focus:outline-none  border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Ending Date</label>
                            <input
                                type="date"
                                {...register('endingDate')}
                                className="w-full px-6 py-2 focus:outline-none  border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button type="submit" className="ButtonBlue text-white px-5 py-2 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
