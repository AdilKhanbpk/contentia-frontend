"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import { useForm } from "react-hook-form";
import ModalCreate from "./sub-coupons/ModalCreate";
import ModalEdit from "./sub-coupons/ModalEdit";
import { useDispatch, useSelector } from "react-redux";
import {
    getCoupons,
    deleteCoupon,
    Coupon as ReduxCoupon,
    Customer,
} from "@/store/features/admin/couponSlice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

export interface CouponForm {
    _id: string;
    customer?: Customer;
    code: string;
    discountTl?: string;
    discountPercentage?: number;
    expiryDate: string;
    isActive: boolean;
    usageLimit: number | null;
    usedCount: number;
    createdAt: string;
    updatedAt: string;
}

export default function Coupon() {
    const dispatch = useDispatch();

    const { data: coupons, loading } = useSelector(
        (state: RootState) => state.coupon
    );

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [token, setToken] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { reset } = useForm<CouponForm>();

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            dispatch(getCoupons(storedToken) as any)
                .then(() => toast.success("Coupons fetched successfully!"))
                .catch((err: Error) => {
                    setErrorMessage(err.message || "Failed to fetch coupons");
                    toast.error(err.message || "Failed to fetch coupons");
                });
        }
    }, [dispatch]);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => {
        reset();
        setIsCreateModalOpen(false);
    };

    const openEditModal = (coupon: ReduxCoupon) => {
        setEditId(coupon._id);
        reset({
            _id: coupon._id,
            code: coupon.code,
            customer: coupon.customer,
            discountTl: coupon.discountTl,
            discountPercentage: coupon.discountPercentage,
            expiryDate: new Date(coupon.expiryDate).toISOString().split("T")[0],
            isActive: coupon.isActive,
            usageLimit: coupon.usageLimit,
            usedCount: coupon.usedCount,
            createdAt: coupon.createdAt,
            updatedAt: coupon.updatedAt,
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditId(null);
        reset();
        setIsEditModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this coupon?")) {
            try {
                await dispatch(deleteCoupon({ id, token }) as any);
                toast.success("Coupon deleted successfully!");
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Failed to delete coupon";
                setErrorMessage(errorMessage);
                toast.error(errorMessage || "Failed to delete coupon");
            }
        } else {
            console.log(
                "User cancelled the deletion process for coupon ID:",
                id
            );
        }
    };

    const formatDiscount = (coupon: ReduxCoupon): string => {
        if (coupon.discountTl) {
            return `${coupon.discountTl} TL`;
        }
        if (coupon.discountPercentage) {
            return `${coupon.discountPercentage}%`;
        }
        return "-";
    };

    return (
        <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
            <div className='flex flex-row mb-4'>
                <h1 className='text-lg font-semibold'>Add Coupons</h1>
                <button
                    onClick={openCreateModal}
                    className='flex items-center bg-transparent border-none cursor-pointer ml-2'
                >
                    <img
                        src='/plusIcon.png'
                        alt='Add coupon'
                        className='w-5 h-5'
                    />
                </button>
            </div>

            {errorMessage && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                    {errorMessage}
                </div>
            )}

            <CustomModelAdmin
                isOpen={isCreateModalOpen}
                closeModal={closeCreateModal}
                title=''
            >
                <ModalCreate
                    closeModal={closeCreateModal}
                    token={token}
                />
            </CustomModelAdmin>

            <CustomModelAdmin
                isOpen={isEditModalOpen}
                closeModal={closeEditModal}
                title=''
            >
                <ModalEdit
                    closeModal={closeEditModal}
                    token={token}
                    couponId={editId}
                />
            </CustomModelAdmin>

            {loading ? (
                <div className='flex justify-center items-center p-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='mt-6 border border-gray-300 w-full'>
                        <thead>
                            <tr className='bg-gray-200 text-left'>
                                <th className='p-3'>Code</th>
                                <th className='p-3'>Customer</th>
                                <th className='p-3'>Discount</th>
                                <th className='p-3'>Limit</th>
                                <th className='p-3'>Ending Date</th>
                                <th className='p-3'>Status</th>
                                <th className='p-3'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons?.map((coupon: ReduxCoupon) => (
                                <tr
                                    key={coupon._id}
                                    className='border-b border-gray-300'
                                >
                                    <td className='p-3'>{coupon.code}</td>
                                    <td className='p-3'>
                                        {coupon.customer?.fullName || "Unknown"}
                                    </td>
                                    <td className='p-3'>
                                        {formatDiscount(coupon)}
                                    </td>
                                    <td className='p-3'>
                                        {coupon.usageLimit === null
                                            ? "Limitless"
                                            : coupon.usageLimit}
                                    </td>
                                    <td className='p-3'>
                                        {new Date(
                                            coupon.expiryDate
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className='p-3'>
                                        {coupon.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td className='p-3 flex space-x-4'>
                                        <button
                                            onClick={() =>
                                                openEditModal(coupon)
                                            }
                                            className='text-blue-600 hover:text-blue-800'
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(coupon._id)
                                            }
                                            className='text-red-600 hover:text-red-800'
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
