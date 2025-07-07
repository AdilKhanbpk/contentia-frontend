"use client";
import { useState, useEffect } from "react";
import CustomModal from "../modal/CustomModel";
import Image from "next/image";
import ModelDetails from "./sub-profile/ModelDetails";
import ModelRevision from "./sub-profile/ModelRevision";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchOrders } from "@/store/features/profile/orderSlice";
import ModelClaim from "./sub-profile/ModelClaim";
import EditOrder from "./sub-profile/EditOrder";
import { OrderInterface, CreatorInterface } from "@/types/interfaces";
import { CiPickerEmpty } from "react-icons/ci";
import { FaBoxOpen } from "react-icons/fa";
import { checkStatus } from "@/utils/CheckOrderStatus";
import { FaChevronDown } from "react-icons/fa";


export default function OrdersOrders() {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.order.orders);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRevModalOpen, setIsRevModalOpen] = useState(false);
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const openEditModal = (order: OrderInterface) => {
        setSelectedOrder(order);
        setIsEditModalOpen(true);
    };

    const openViewModal = (order: OrderInterface) => {
        setIsViewModalOpen(true);
        setSelectedOrder(order);
    };

    const openClaimModal = (order: OrderInterface) => {
        setSelectedOrder(order);
        setIsClaimModalOpen(true);
    };

    const openRevModal = (order: OrderInterface) => {
        setSelectedOrder(order);
        setIsRevModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
        setIsRevModalOpen(false);
        setIsClaimModalOpen(false);
    };

    const getButtonClassByStatus = (status: string) => {
        switch (status) {
            case "active":
                return "bg-blue-500";
            case "pending":
                return "bg-yellow-500";
            case "completed":
                return "bg-green-600";
            case "cancelled":
                return "bg-red-500";
            case "revision":
                return "bg-purple-500";
            default:
                return "bg-gray-400";
        }
    };

    const filteredOrders = orders.filter((order) => {
        if (selectedFilter === "all") return true;
        return order.orderStatus === selectedFilter;
    });

    return (
        <>
            <div className='my-14 xs:my-32 md:my-24 lg:my-24 px-4 sm:px-6 md:px-8 lg:px-28 p-4 sm:p-6 md:p-8 lg:p-8 bg-gray-50'>
                <div className='flex flex-col'>
                    <div className='p-4 my-4 sm:p-5 sm:my-6 md:p-6 md:my-8 lg:p-6 lg:my-8'>
                        <div className='flex xs:flex-col lg:flex-row lg:justify-between lg:items-center'>
                            <h1 className='text-base font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-6'>
                                Sipariş Detayları
                            </h1>
                            {/* Mobile Dropdown */}
                            <div className='md:hidden relative'>
                                <button
                                    className='w-full px-4 py-2 bg-white border-2 BlueBorder BlueColor rounded-lg font-medium flex items-center justify-between'
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span>
                                        {selectedFilter === "all" && "Tümü"}
                                        {selectedFilter === "completed" && "Tamamlandı"}
                                        {selectedFilter === "active" && "Aktif"}
                                        {selectedFilter === "pending" && "Onay Bekliyor"}
                                        {selectedFilter === "revision" && "Revizyon"}
                                    </span>
                                    <FaChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isDropdownOpen && (
                                    <div className='absolute top-full left-0 right-0 mt-1 bg-white border-2 BlueBorder rounded-lg shadow-lg z-10'>
                                        {[
                                            { key: "all", label: "Tümü" },
                                            { key: "completed", label: "Tamamlandı" },
                                            { key: "active", label: "Aktif" },
                                            { key: "pending", label: "Onay Bekliyor" },
                                            { key: "revision", label: "Revizyon" }
                                        ].map((option) => (
                                            <button
                                                key={option.key}
                                                className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${selectedFilter === option.key ? 'bg-blue-50 BlueColor font-semibold' : 'text-gray-700'
                                                    }`}
                                                onClick={() => {
                                                    setSelectedFilter(option.key);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Desktop Buttons */}
                            <div className='hidden md:flex space-x-2'>
                                <button
                                    className={`px-4 py-1 border-2 text-base ${selectedFilter === "all"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                        } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("all")}
                                >
                                    Tümü
                                </button>
                                <button
                                    className={`px-4 py-1 border-2 text-base ${selectedFilter === "completed"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                        } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("completed")}
                                >
                                    Tamamlandı
                                </button>
                                <button
                                    className={`px-4 py-1 border-2 text-base ${selectedFilter === "active"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                        } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("active")}
                                >
                                    Aktif
                                </button>
                                <button
                                    className={`px-4 py-1 border-2 text-base ${selectedFilter === "pending"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                        } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("pending")}
                                >
                                    Onay Bekliyor
                                </button>
                                <button
                                    className={`px-4 py-1 border-2 text-base ${selectedFilter === "revision"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                        } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("revision")}
                                >
                                    Revizyon
                                </button>
                            </div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div className='text-center py-16 text-gray-500'>
                                <FaBoxOpen size={100} className='mx-auto' />
                                <p className='text-lg font-semibold'>
                                    Hiç sipariş bulunamadı
                                </p>
                                <p className='text-sm'>
                                    Yeni siparişleriniz burada görünecek.
                                </p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order._id} className='py-4'>
                                    <div className='bg-white px-4 pt-4 sm:px-5 sm:pt-5 md:px-6 md:pt-6 lg:px-6 lg:pt-6'>
                                        <div className='flex flex-col lg:flex-row justify-between pb-2 mb-2 sm:pb-3 sm:mb-3 md:pb-4 md:mb-4 lg:pb-4 lg:mb-4'>
                                            <div className='w-full lg:w-3/4 grid grid-cols-1'>
                                                <div className='flex flex-col lg:flex-row mb-2'>
                                                    <p className='w-full lg:w-1/4'>
                                                        Sipariş No:
                                                    </p>
                                                    <p className='font-semibold'>
                                                        {order._id}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col lg:flex-row mb-2'>
                                                    <p className='w-full lg:w-1/4'>
                                                        Sipariş Tarihi:
                                                    </p>
                                                    <p className='font-semibold'>
                                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString("tr-TR") : "N/A"}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col lg:flex-row mb-2'>
                                                    <p className='w-full lg:w-1/4'>
                                                        Sipariş Durumu:
                                                    </p>
                                                    <p className='font-semibold'>
                                                        {checkStatus(order.orderStatus)}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col lg:flex-row mb-2'>
                                                    <p className='w-full lg:w-1/4'>
                                                        Marka:
                                                    </p>
                                                    <p className='font-semibold'>
                                                        {order.briefContent?.brandName || "N/A"}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col lg:flex-row mb-2'>
                                                    <p className='w-full lg:w-1/4'>
                                                        Ürün / Hizmet Adı:
                                                    </p>
                                                    <p className='font-semibold'>
                                                        {order.briefContent?.productServiceName || "N/A"}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col lg:flex-row'>
                                                    <p className='w-full lg:w-1/4'>
                                                        Toplam:
                                                    </p>
                                                    <p className='font-semibold'>
                                                        {order.totalPriceForCustomer?.toLocaleString("tr-TR")} TL
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='mt-4 lg:mt-0 flex xs:flex-col-reverse lg:flex-col justify-between space-x-0 lg:space-x-4'>
                                                <button onClick={() => openClaimModal(order)}>
                                                    <div className='flex mt-2 flex-row justify-start lg:justify-end xs:space-x-2 lg:space-x-4'>
                                                        <div>
                                                            <Image width={28} height={28} src='/userWarningIcon.png' alt='warning icon' />
                                                        </div>
                                                        <div>
                                                            <p className='text-base'>Sorun Bildir</p>
                                                        </div>
                                                    </div>
                                                </button>

                                                <div className='flex space-x-2 lg:space-x-4'>
                                                    <button
                                                        onClick={() => openViewModal(order)}
                                                        className='px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-1 lg:px-8 lg:py-1 text-sm font-semibold Button text-white rounded-lg'
                                                    >
                                                        Detaylar
                                                    </button>
                                                    {order.orderStatus === "completed" && (
                                                        <button
                                                            onClick={() => openRevModal(order)}
                                                            className='px-3 text-sm font-semibold border BlueBorder text-white rounded-lg'
                                                        >
                                                            <Image width={20} height={20} src='/revisionButton.png' alt='revision icon' />
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => openEditModal(order)}
                                                        className='px-3 text-sm font-semibold border BlueBorder text-white rounded-lg'
                                                    >
                                                        <Image width={20} height={20} src='/pencil.png' alt='pencil icon' />
                                                    </button>
                                                    {order.orderStatus === "completed" && (
                                                        <button
                                                            className={`px-3 text-sm font-semibold ${getButtonClassByStatus(order.orderStatus)} text-white rounded-lg`}
                                                        >
                                                            <Image width={20} height={20} src='/approveButton.png' alt='approve icon' />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Modals */}
                <CustomModal isOpen={isEditModalOpen} closeModal={closeModal} title=''>
                    {selectedOrder && <EditOrder orderData={selectedOrder} />}
                </CustomModal>

                <CustomModal isOpen={isViewModalOpen} closeModal={closeModal} title=''>
                    {selectedOrder && <ModelDetails orderData={selectedOrder} />}
                </CustomModal>

                <CustomModal isOpen={isClaimModalOpen} closeModal={closeModal} title=''>
                    {selectedOrder && <ModelClaim orderData={selectedOrder} />}
                </CustomModal>

                <CustomModal isOpen={isRevModalOpen} closeModal={closeModal} title=''>
                    {selectedOrder && <ModelRevision orderData={selectedOrder} />}
                </CustomModal>
            </div>
        </>
    );
}