// app/page.tsx
"use client";

import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import { useForm, Controller } from 'react-hook-form';
import ModalCreate from "./sub-coupons/ModalCreate";
import ModalEdit from "./sub-coupons/ModalEdit";

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
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null); // Ensure correct type

    const { control, handleSubmit, register, reset } = useForm<CouponForm>();

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => {
        reset();
        setIsCreateModalOpen(false);
    };

    const openEditModal = (coupon: Coupon) => {
        setEditId(coupon.id || null);
        reset(coupon);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setEditId(null);
        reset();
        setIsEditModalOpen(false);
    };

    const handleDelete = (id: number) => {
        const filtered = data.filter((item) => item.id !== id);
        setData(filtered);
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

    // Helper to format discount (handles both TL and percentage cases)
    const formatDiscount = (formData: CouponForm) => {
        return formData.discountTL
            ? `${formData.discountTL} TL`
            : `${formData.discountPercent || 0}%`;
    };

    return (
        <div className="">
            <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
                <div className="flex flex-row mb-4">
                    <h1 className="text-lg font-semibold">Manage Coupons</h1>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center bg-transparent border-none cursor-pointer ml-2"
                    >
                        <img src="/plusIcon.png" alt="custom package icon" className="w-5 h-5" />
                    </button>
                </div>
                <p className="mb-4">Select the price for additional services (for 1 UGC)</p>

                {/* Create Coupon Modal */}
                <CustomModelAdmin isOpen={isCreateModalOpen} closeModal={closeCreateModal} title="">
                    <ModalCreate></ModalCreate>
                </CustomModelAdmin>

                {/* Edit Coupon Modal */}
                <CustomModelAdmin isOpen={isEditModalOpen} closeModal={closeEditModal} title="">
                    <ModalEdit></ModalEdit>
                </CustomModelAdmin>

                {/* Table of Coupons */}
                <table className="mt-6 border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3 ">Code</th>
                            <th className="p-3 ">Customer</th>
                            <th className="p-3 ">Discount</th>
                            <th className="p-3 ">Limit</th>
                            <th className="p-3 ">Ending Date</th>
                            <th className="p-3 ">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((coupon) => (
                            <tr key={coupon.id} className="border-b border-gray-300">
                                <td className="p-3">{coupon.code}</td>
                                <td className="p-3">{coupon.customer}</td>
                                <td className="p-3">{coupon.discount}</td>
                                <td className="p-3">{coupon.limit}</td>
                                <td className="p-3">{coupon.endingDate}</td>
                                <td className="p-3">{coupon.status}</td>
                                <td className="p-3 flex space-x-4">
                                    <button onClick={() => openEditModal(coupon)}>
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(coupon.id)}>
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
