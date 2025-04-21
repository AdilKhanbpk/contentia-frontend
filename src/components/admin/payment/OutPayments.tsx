"use client";
import { memo, useCallback, useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEye, FaFileCsv } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchMyBrands } from "@/store/features/profile/brandSlice";
import { getAssignedOrders } from "@/store/features/admin/ordersSlice";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import ModalTwo from "./sub-in-payment/ViewInPaymentModal";
import { OrderInterface } from "@/types/interfaces";
import Image from "next/image";
import CustomTable from "@/components/custom-table/CustomTable";
import { useTokenContext } from "@/context/TokenCheckingContext";

interface TableActionsProps {
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onView: (id: string) => void;
    id: string;
}

const OutPayments: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState("");
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const { token } = useTokenContext();
    if (!token) return null;
    const { data: orders, loading } = useSelector(
        (state: RootState) => state.orders
    );

    const filteredOrders = orders.filter(
        (order: OrderInterface) =>
            order.briefContent?.brandName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            order.briefContent?.productServiceName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const handleCloseModals = useCallback(() => {
        setIsViewModalOpen(false);
    }, []);

    const handleView = useCallback(async (id: string) => {
        setIsViewModalOpen(true);
    }, []);

    const handleApprove = useCallback(async (id: string) => {
        toast.success("Payment Sent successfully!");
    }, []);

    const handleReject = useCallback(async (id: string) => {
        toast.dark("Payment rejected for the Order!");
    }, []);

    const TableActions = memo(
        ({ onApprove, onReject, onView, id }: TableActionsProps) => (
            <div className='flex space-x-3'>
                <button
                    className='text-green-500 hover:text-green-700'
                    onClick={() => onApprove(id)}
                >
                    <FaCheck className='text-lg' />
                </button>
                <button
                    className='text-red-500 hover:text-red-700'
                    onClick={() => onReject(id)}
                >
                    <FaTimes className='text-lg' />
                </button>
                <button
                    className='text-gray-500 hover:text-gray-700'
                    onClick={() => onView(id)}
                >
                    <FaEye className='text-lg' />
                </button>
            </div>
        )
    );

    TableActions.displayName = "TableActions";

    const columns = [
        { name: "Order ID", selector: (row: any) => row._id, sortable: true },
        {
            name: "Order Title",
            cell: (row: any) => {
                const owner = row.orderOwner;
                const isValidOwner =
                    owner && typeof owner === "object" && owner !== null;

                return (
                    <div className='flex items-center space-x-2'>
                        <Image
                            width={100}
                            height={100}
                            src={
                                row.associatedBrands?.brandImage ||
                                "/icons/avatar.png"
                            }
                            alt='avatar'
                            className='w-10 h-10 rounded-full'
                        />
                        <div>
                            <p className='font-semibold'>
                                {row.associatedBrands &&
                                row.associatedBrands.brandName
                                    ? row.associatedBrands.brandName
                                    : "No Title"}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {isValidOwner && owner.email
                                    ? owner.email
                                    : "No Email"}
                            </p>
                        </div>
                    </div>
                );
            },
            sortable: false,
        },
        {
            name: "Creator Name",
            cell: (row: any) => (
                <div className='flex flex-col gap-4'>
                    {row.assignedCreators.map((c: any) => (
                        <span key={c._id}>{c.fullName}</span>
                    ))}
                </div>
            ),
            sortable: true,
        },
        {
            name: "Creator ID",
            cell: (row: any) => (
                <div className='flex flex-col'>
                    {row.assignedCreators.map((c: any) => (
                        <span key={c._id}>{c._id}</span>
                    ))}
                </div>
            ),
            sortable: true,
        },

        {
            name: "Amount Paid",
            selector: (row: any) =>
                `${row.totalPriceForCreator.toLocaleString("tr-TR")} TL`,
            sortable: true,
        },
        {
            name: "Payment Status",
            selector: (row: any) => row.paymentStatus,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <TableActions
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onView={handleView}
                    id={row._id}
                />
            ),
            width: "200px",
        },
    ];

    const exportToCSV = () => {
        const csvRows = [
            ["Order ID", "Creator Name", "Amount Paid", "Payment Status"],
            ...filteredOrders.map((order: OrderInterface) => [
                order._id,
                order.assignedCreators.map((c: any) => c.fullName).join(", "),
                order.totalPriceForCreator,
                order.paymentStatus,
            ]),
        ];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            csvRows.map((e) => e.join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchOrdersData = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }
            try {
                await dispatch(getAssignedOrders(token)).unwrap();
            } catch (error: any) {
                toast.error(error.message);
            }
        };

        const fetchBrands = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }
            try {
                await dispatch(fetchMyBrands(token)).unwrap();
            } catch (error: any) {
                toast.error(error.message);
            }
        };

        fetchBrands();
        fetchOrdersData();
    }, [dispatch]);

    return (
        <div className='bg-white rounded-lg'>
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                {/* Search and Buttons */}
                <div className='flex justify-between mb-4'>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search...'
                        className='p-2 border border-gray-300 rounded-lg'
                    />
                    <div className='flex flex-col md:flex-row lg:space-x-2'>
                        <button className='px-1 md:px-4 py-0.5 md:py-2 Button text-white rounded-md'>
                            Add Out Payment
                        </button>
                        <button
                            className='px-1 md:px-4 py-0.5 md:py-2 bg-green-500 text-white rounded-md'
                            onClick={exportToCSV}
                        >
                            Export CSV <FaFileCsv className='inline ml-2' />
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className='shadow-md'>
                    <CustomTable
                        columns={columns}
                        data={filteredOrders}
                        noDataComponent='No Outgoing Payments Found'
                        loading={loading}
                    />
                </div>
            </div>

            {/* Modal */}
            {/* <CustomModelAdmin
                isOpen={isViewModalOpen}
                closeModal={handleCloseModals}
                title=''
            >
                <ModalTwo />
            </CustomModelAdmin> */}
        </div>
    );
};

export default OutPayments;
