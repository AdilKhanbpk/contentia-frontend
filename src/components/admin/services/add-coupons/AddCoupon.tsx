// app/page.tsx
"use client";

import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import { useForm, Controller } from 'react-hook-form';

// Unified Coupon Interface to Avoid Mismatches
interface Coupon {
    id: number;
    code: string;
    customer: string;
    discount: string; // Use consistent type (string) for all discounts.
    limit: string;
    endingDate: string;
    status: string;
}

interface CouponForm {
    id?: number;
    code: string;
    customer: string;
    discountTL?: number;
    discountPercent?: number;
    useLimit: number;
    endingDate: string;
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

export default function AddCoupon() {
    const [data, setData] = useState<Coupon[]>(initialCoupons);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null); // Ensure correct type

    const { control, handleSubmit, register, reset } = useForm<CouponForm>();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setEditId(null);
        reset();
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        const filtered = data.filter((item) => item.id !== id);
        setData(filtered);
    };

    const handleEdit = (coupon: Coupon) => {
        setEditId(coupon.id || null); // Ensure editId is either number or null
        reset(coupon);
        openModal();
    };

    const onSubmit = (formData: CouponForm) => {
        if (editId !== null) {
            // Update existing coupon
            const updatedData = data.map((item) =>
                item.id === editId ? { ...item, ...formData, discount: formatDiscount(formData) } : item
            );
            setData(updatedData);
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
        }
        closeModal();
    };

    // Helper to format discount (handles both TL and percentage cases)
    const formatDiscount = (formData: CouponForm) => {
        return formData.discountTL
            ? `${formData.discountTL} TL`
            : `${formData.discountPercent || 0}%`;
    };

    return (
        <div className="p-6">
            <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28">
                <div className="flex flex-row mb-4">
                    <h1 className="text-lg font-semibold">Manage Coupons</h1>
                    <button
                        onClick={openModal}
                        className="flex items-center bg-transparent border-none cursor-pointer ml-2"
                    >
                        <img src="/plusIcon.png" alt="custom package icon" className="w-5 h-5" />
                    </button>
                </div>
                <p className="mb-4">Select the price for additional services (for 1 UGC)</p>

                <CustomModelAdmin isOpen={isModalOpen} closeModal={closeModal} title="">
                    <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
                        <h2 className="text-lg font-semibold">
                            {editId ? "Edit Coupon" : "Create Coupon"}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold">Code</label>
                                    <input
                                        type="text"
                                        {...register('code')}
                                        className="w-full px-3 py-0.5 border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">Select Customer</label>
                                    <input
                                        type="text"
                                        {...register('customer')}
                                        className="w-full px-3 py-0.5 border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">Discount (TL)</label>
                                    <input
                                        type="number"
                                        {...register('discountTL')}
                                        className="w-full px-3 py-0.5 border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">Discount (%)</label>
                                    <input
                                        type="number"
                                        {...register('discountPercent')}
                                        className="w-full px-3 py-0.5 border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">Use Limit</label>
                                    <input
                                        type="number"
                                        {...register('useLimit')}
                                        className="w-full px-3 py-0.5 border rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">Ending Date</label>
                                    <input
                                        type="date"
                                        {...register('endingDate')}
                                        className="w-full px-3 py-0.5 border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 text-right">
                                <button type="submit" className="ButtonBlue text-white px-4 py-0.5 rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </CustomModelAdmin>

                <table className=" min-w-full border border-gray-200">
                    <thead>
                        <tr>
                            {["No", "Code", "Customer", "Discount", "Limit", "Ending Date", "Status", "Actions"].map(
                                (header) => (
                                    <th key={header} className="p-3 text-left border-b border-r">
                                        {header}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((coupon, index) => (
                            <tr key={coupon.id}>
                                <td className="p-3 border-b border-r">{index + 1}</td>
                                <td className="p-3 border-b border-r">{coupon.code}</td>
                                <td className="p-3 border-b border-r">{coupon.customer}</td>
                                <td className="p-3 border-b border-r">{coupon.discount}</td>
                                <td className="p-3 border-b border-r">{coupon.limit}</td>
                                <td className="p-3 border-b border-r">{coupon.endingDate}</td>
                                <td className="p-3 border-b border-r">
                                    <span
                                        className={`${coupon.status === "Active" ? "text-green-500" : "text-red-500"
                                            } font-semibold`}
                                    >
                                        {coupon.status}
                                    </span>
                                </td>
                                <td className="p-3 border-b border-r flex justify-center gap-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEdit(coupon)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(coupon.id)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
