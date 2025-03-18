"use client";
import { useState, useEffect } from "react";
import CustomModal from "../modal/CustomModel";
import Image from "next/image";
import ModelDetails from "./sub-profile/ModelDetails";
import ModelRevision from "./sub-profile/ModelRevision";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchOrders, Order } from "@/store/features/profile/orderSlice";
import { getAccessToken } from "@/utils/checkToken";

export default function OrdersOrders() {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.order.orders);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRevModalOpen, setIsRevModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;
        dispatch(fetchOrders(token));
    }, [dispatch]);

    const openModal = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("Closing details modal");
        setIsModalOpen(false);
    };

    const openRevModal = (order: Order) => {
        setSelectedOrder(order);
        console.log("Opening revision modal for order:", order._id);
        setIsRevModalOpen(true);
    };

    const closeRevModal = () => {
        console.log("Closing revision modal");
        setIsRevModalOpen(false);
    };

    const getOrderStatusText = (status: string) => {
        console.log("Mapping order status:", status);
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

    return (
        <>
            <div className='px-4 sm:px-6 md:px-8 lg:px-28 py-14 sm:py-14 md:py-16 lg:py-24 bg-gray-50 '>
                <div className='flex flex-col'>
                    <div className='p-4 my-4 sm:p-5 sm:my-6 md:p-6 md:my-8 lg:p-6 lg:my-8'>
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className='py-4'
                            >
                                <h1 className='text-base font-semibold mb-4 sm:mb-5 md:mb-6 lg:mb-6'>
                                    Sipariş Detayları
                                </h1>
                                <div className='bg-white px-4 pt-4 sm:px-5 sm:pt-5 md:px-6 md:pt-6 lg:px-6 lg:pt-6'>
                                    <div className='flex flex-col lg:flex-row justify-between pb-2 mb-2 sm:pb-3 sm:mb-3 md:pb-4 md:mb-4 lg:pb-4 lg:mb-4'>
                                        <div className='w-full lg:w-3/4 grid grid-cols-1'>
                                            <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p className='w-full lg:w-1/4'>
                                                    Sipariş No:
                                                </p>
                                                <p className='font-semibold'>
                                                    {order._id}
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
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
                                            <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p className='w-full lg:w-1/4'>
                                                    Sipariş Durumu:
                                                </p>
                                                <p className='font-semibold'>
                                                    {getOrderStatusText(
                                                        order.orderStatus
                                                    )}
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p className='w-full lg:w-1/4'>
                                                    Marka:
                                                </p>
                                                <p className='font-semibold'>
                                                    {
                                                        order.briefContent
                                                            .brandName
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                <p className='w-full lg:w-1/4'>
                                                    Ürün / Hizmet Adı:
                                                </p>
                                                <p className='font-semibold'>
                                                    {
                                                        order.briefContent
                                                            .productServiceName
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex flex-col lg:flex-row'>
                                                <p className='w-full lg:w-1/4'>
                                                    Toplam:
                                                </p>
                                                <p className='font-semibold'>
                                                    {order.totalPrice} TL
                                                </p>
                                            </div>
                                        </div>

                                        <div className='mt-4 lg:mt-0 flex flex-col justify-between space-x-0 lg:space-x-4'>
                                            <button
                                                onClick={() =>
                                                    openRevModal(order)
                                                }
                                            >
                                                <div className='flex flex-row justify-start lg:justify-end space-x-4'>
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
                                                        openModal(order)
                                                    }
                                                    className='px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-1 lg:px-8 lg:py-1 text-sm font-semibold ButtonBlue text-white rounded-lg'
                                                >
                                                    Detaylar
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openModal(order)
                                                    }
                                                    className='px-3 text-sm font-semibold border BlueBorder text-white rounded-lg'
                                                >
                                                    <div>
                                                        <Image
                                                            width={20}
                                                            height={20}
                                                            src='/pencil.png'
                                                            alt='pencil icon'
                                                        />
                                                    </div>
                                                </button>
                                                <button className='px-3 text-sm font-semibold bg-[#00B836] text-white rounded-lg'>
                                                    <div>
                                                        <Image
                                                            width={20}
                                                            height={20}
                                                            src='/approveButton.png'
                                                            alt='approve icon'
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <CustomModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    title=''
                >
                    {selectedOrder && (
                        <ModelDetails orderData={selectedOrder} />
                    )}
                </CustomModal>

                <CustomModal
                    isOpen={isRevModalOpen}
                    closeModal={closeRevModal}
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
