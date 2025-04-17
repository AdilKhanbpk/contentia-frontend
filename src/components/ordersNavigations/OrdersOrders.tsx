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
import ViewOrderDetails from "./sub-profile/ModelDetails";
import { useTokenContext } from "@/context/TokenCheckingContext";
import { OrderInterface } from "@/types/interfaces";

export default function OrdersOrders() {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.order.orders);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRevModalOpen, setIsRevModalOpen] = useState(false);
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(
        null
    );
    const [selectedFilter, setSelectedFilter] = useState<string>("all");
    const { token } = useTokenContext();
    if (!token) return null;

    useEffect(() => {
        if (token) {
            dispatch(fetchOrders(token));
        }
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

    const getOrderStatusText = (status: string) => {
        switch (status) {
            case "active":
                return "Aktif";
            case "completed":
                return "Tamamlandı";
            case "pending":
                return "Onay Bekliyor";
            case "cancelled":
                return "İptal";
            default:
                return status;
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
                            <div className='flex space-x-2'>
                                <button
                                    className={`px-3 py-0.5 lg:px-4 lg:py-1 border-2 text-sm lg:text-base ${
                                        selectedFilter === "all"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                    } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("all")}
                                >
                                    Tümü
                                </button>
                                <button
                                    className={`px-3 py-0.5 lg:px-4 lg:py-1 border-2 text-sm lg:text-base ${
                                        selectedFilter === "active"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                    } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("active")}
                                >
                                    Aktif
                                </button>
                                <button
                                    className={`px-3 py-0.5 lg:px-4 lg:py-1 border-2 text-sm lg:text-base ${
                                        selectedFilter === "pending"
                                            ? "BlueBorder bg-white"
                                            : "border-transparent bg-[#F4F4F4]"
                                    } BlueColor rounded-full font-medium`}
                                    onClick={() => setSelectedFilter("pending")}
                                >
                                    Onay Bekliyor
                                </button>
                            </div>
                        </div>

                        {filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className='py-4'
                            >
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
                                                    {new Date(
                                                        order.createdAt!
                                                    ).toLocaleDateString(
                                                        "tr-TR"
                                                    )}
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row mb-2'>
                                                <p className='w-full lg:w-1/4'>
                                                    Sipariş Durumu:
                                                </p>
                                                <p className='font-semibold'>
                                                    {getOrderStatusText(
                                                        order.orderStatus
                                                    )}
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row mb-2'>
                                                <p className='w-full lg:w-1/4'>
                                                    Marka:
                                                </p>
                                                <p className='font-semibold'>
                                                    {
                                                        order.briefContent
                                                            ?.brandName
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row mb-2'>
                                                <p className='w-full lg:w-1/4'>
                                                    Ürün / Hizmet Adı:
                                                </p>
                                                <p className='font-semibold'>
                                                    {
                                                        order.briefContent
                                                            ?.productServiceName
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row'>
                                                <p className='w-full lg:w-1/4'>
                                                    Toplam:
                                                </p>
                                                <p className='font-semibold'>
                                                    {order.totalPrice.toLocaleString(
                                                        "tr-TR"
                                                    )}{" "}
                                                    TL
                                                </p>
                                            </div>
                                        </div>

                                        <div className='mt-4 lg:mt-0 flex xs:flex-col-reverse lg:flex-col justify-between space-x-0 lg:space-x-4'>
                                            <button
                                                onClick={() =>
                                                    openClaimModal(order)
                                                }
                                            >
                                                <div className='flex mt-2 flex-row justify-start lg:justify-end xs:space-x-2  lg:space-x-4'>
                                                    <div>
                                                        <Image
                                                            width={28}
                                                            height={28}
                                                            src='/userWarningIcon.png'
                                                            alt='warning icon'
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className='text-base'>
                                                            Sorun Bildir
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>

                                            <div className='flex space-x-2 lg:space-x-4'>
                                                <button
                                                    onClick={() =>
                                                        openViewModal(order)
                                                    }
                                                    className='px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-1 lg:px-8 lg:py-1 text-sm font-semibold Button text-white rounded-lg'
                                                >
                                                    Detaylar
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openRevModal(order)
                                                    }
                                                    className='px-3 text-sm font-semibold border BlueBorder text-white rounded-lg'
                                                >
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src='/revisionButton.png'
                                                        alt='revision icon'
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openEditModal(order)
                                                    }
                                                    className='px-3 text-sm font-semibold border BlueBorder text-white rounded-lg'
                                                >
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src='/pencil.png'
                                                        alt='pencil icon'
                                                    />
                                                </button>
                                                <button className='px-3 text-sm font-semibold bg-[#00B836] text-white rounded-lg'>
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src='/approveButton.png'
                                                        alt='approve icon'
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modals */}
                <CustomModal
                    isOpen={isEditModalOpen}
                    closeModal={closeModal}
                    title=''
                >
                    {selectedOrder && <EditOrder orderData={selectedOrder} />}
                </CustomModal>
                <CustomModal
                    isOpen={isViewModalOpen}
                    closeModal={closeModal}
                    title=''
                >
                    {selectedOrder && (
                        <ViewOrderDetails orderData={selectedOrder} />
                    )}
                </CustomModal>

                <CustomModal
                    isOpen={isClaimModalOpen}
                    closeModal={closeModal}
                    title=''
                >
                    {selectedOrder && <ModelClaim orderData={selectedOrder} />}
                </CustomModal>

                <CustomModal
                    isOpen={isRevModalOpen}
                    closeModal={closeModal}
                    title=''
                >
                    {selectedOrder && (
                        <ModelRevision orderData={selectedOrder} />
                    )}
                </CustomModal>
            </div>
        </>
    );
}
