"use client";
import { memo, useCallback, useEffect, useState, useMemo } from "react";
import { FaCheck, FaTimes, FaEye, FaFileCsv, FaSync } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchMyBrands } from "@/store/features/profile/brandSlice";
import { fetchOrders } from "@/store/features/admin/ordersSlice";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import ModalTwo from "./sub-in-payment/ViewInPaymentModal";
import { OrderInterface, CreatorInterface } from "@/types/interfaces";
import Image from "next/image";
import CustomTable from "@/components/custom-table/CustomTable";

// Interface for flattened order data with single creator
interface SingleCreatorOrderData {
    orderId: string;
    orderStatus: string;
    paymentStatus: string;
    brandName?: string;
    brandImage?: string;
    ownerName?: string;
    ownerEmail?: string;
    creatorId: string;
    creatorName: string;
    creatorEmail?: string;
    priceForSingleCreator: number;
    originalOrder: OrderInterface;
}

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
    const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(null);
    const { data: orders, loading } = useSelector(
        (state: RootState) => state.orders
    );

    // Transform orders data to create separate entries for each creator
    const flattenedOrders = useMemo(() => {
        const result: SingleCreatorOrderData[] = [];

        // Only process Active and Completed orders
        const filteredOrders = orders.filter(
            (order: OrderInterface) =>
                order.orderStatus === "active" ||
                order.orderStatus === "completed"
        );

        filteredOrders.forEach((order: OrderInterface) => {
            // Check if assignedCreators exists and is an array
            if (Array.isArray(order.assignedCreators) && order.assignedCreators.length > 0) {
                // Use totalPriceForCreator divided by noOfUgc
                // This is the standard calculation method
                const pricePerCreator = order.totalPriceForCreator
                    ? order.totalPriceForCreator / order.noOfUgc
                    : 0;

                // Note: If you want to add a priceForSingleCreator field to the database,
                // you would need to update the OrderInterface in src/types/interfaces.ts

                // Create a separate entry for each creator
                order.assignedCreators.forEach((creator: any) => {
                    result.push({
                        orderId: order._id,
                        orderStatus: order.orderStatus,
                        paymentStatus: order.paymentStatus,
                        brandName: order.associatedBrands?.brandName,
                        brandImage: order.associatedBrands?.brandImage,
                        ownerName: order.orderOwner?.fullName,
                        ownerEmail: order.orderOwner?.email,
                        creatorId: typeof creator === 'string' ? creator : creator._id,
                        creatorName: typeof creator === 'string' ? 'Unknown' : creator.fullName,
                        creatorEmail: typeof creator === 'string' ? '' : creator.email,
                        priceForSingleCreator: pricePerCreator,
                        originalOrder: order
                    });
                });
            }
        });

        return result;
    }, [orders]);

    // Filter flattened orders based on search term
    const filteredFlattenedOrders = useMemo(() => {
        return flattenedOrders.filter(
            (item) =>
                item.brandName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.creatorId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [flattenedOrders, searchTerm]);

    const handleCloseModals = useCallback(() => {
        setIsViewModalOpen(false);
        setSelectedOrder(null);
    }, []);

    const handleView = useCallback(async (id: string) => {
        // Find the original order from the flattened data
        const item = flattenedOrders.find(item => item.orderId === id);
        if (item) {
            setSelectedOrder(item.originalOrder);
            setIsViewModalOpen(true);
        }
    }, [flattenedOrders]);

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
        { name: "Order ID", selector: (row: SingleCreatorOrderData) => row.orderId, sortable: true },
        {
            name: "Order Title",
            cell: (row: SingleCreatorOrderData) => {
                return (
                    <div className='flex items-center space-x-2'>
                        <Image
                            width={100}
                            height={100}
                            src={
                                row.brandImage ||
                                "/icons/avatar.png"
                            }
                            alt='avatar'
                            className='w-10 h-10 rounded-full'
                        />
                        <div>
                            <p className='font-semibold'>
                                {row.brandName || "No Title"}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {row.ownerEmail || "No Email"}
                            </p>
                        </div>
                    </div>
                );
            },
            sortable: false,
        },
        {
            name: "Creator Name",
            selector: (row: SingleCreatorOrderData) => row.creatorName,
            sortable: true,
        },
        {
            name: "Creator ID",
            selector: (row: SingleCreatorOrderData) => row.creatorId,
            sortable: true,
        },
        {
            name: "Order Status",
            selector: (row: SingleCreatorOrderData) => row.orderStatus,
            sortable: true,
        },
        {
            name: "Price For Single Creator",
            cell: (row: SingleCreatorOrderData) => (
                <span className="font-semibold">
                    {row.priceForSingleCreator.toLocaleString("tr-TR")} TL
                </span>
            ),
            sortable: true,
        },
        {
            name: "Payment Status",
            selector: (row: SingleCreatorOrderData) => row.paymentStatus,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: SingleCreatorOrderData) => (
                <TableActions
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onView={handleView}
                    id={row.orderId}
                />
            ),
            width: "200px",
        },
    ];

    const exportToCSV = () => {
        const csvRows = [
            ["Order ID", "Creator Name", "Creator ID", "Order Status", "Price For Single Creator", "Payment Status"],
            ...filteredFlattenedOrders.map((item: SingleCreatorOrderData) => [
                item.orderId,
                item.creatorName,
                item.creatorId,
                item.orderStatus,
                item.priceForSingleCreator,
                item.paymentStatus,
            ]),
        ];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            csvRows.map((e) => e.join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "outgoing-payments-per-creator.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const fetchOrdersData = useCallback(async () => {
        try {
            await dispatch(fetchOrders()).unwrap();
            toast.success("Orders data refreshed successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch orders");
        }
    }, [dispatch]);

    const fetchBrands = useCallback(async () => {
        try {
            await dispatch(fetchMyBrands()).unwrap();
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch brands");
        }
    }, [dispatch]);

    useEffect(() => {
        fetchBrands();
        fetchOrdersData();
    }, [fetchBrands, fetchOrdersData]);

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
                        <button
                            className='px-1 md:px-4 py-0.5 md:py-2 bg-blue-500 text-white rounded-md'
                            onClick={fetchOrdersData}
                        >
                            Refresh <FaSync className='inline ml-2' />
                        </button>
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
                        data={filteredFlattenedOrders}
                        noDataComponent='No Outgoing Payments Found'
                        loading={loading}
                    />
                </div>
            </div>

            {/* Modal */}
            <CustomModelAdmin
                isOpen={isViewModalOpen}
                closeModal={handleCloseModals}
                title='Order Details'
            >
                {selectedOrder && (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Order Information</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="font-semibold">Order ID:</p>
                                <p>{selectedOrder._id}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Order Status:</p>
                                <p>{selectedOrder.orderStatus}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Payment Status:</p>
                                <p>{selectedOrder.paymentStatus}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Number of UGCs:</p>
                                <p>{selectedOrder.noOfUgc}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Total Price for Creator:</p>
                                <p>{selectedOrder.totalPriceForCreator?.toLocaleString("tr-TR")} TL</p>
                            </div>
                            <div>
                                <p className="font-semibold">Price Per Creator:</p>
                                <p>{selectedOrder.totalPriceForCreator && selectedOrder.noOfUgc
                                    ? (selectedOrder.totalPriceForCreator / selectedOrder.noOfUgc).toLocaleString("tr-TR")
                                    : 0} TL</p>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold mb-2">Assigned Creators</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border">Creator ID</th>
                                        <th className="py-2 px-4 border">Creator Name</th>
                                        <th className="py-2 px-4 border">Creator Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(selectedOrder.assignedCreators) &&
                                     selectedOrder.assignedCreators.map((creator: any, index: number) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border">{typeof creator === 'string' ? creator : creator._id}</td>
                                            <td className="py-2 px-4 border">{typeof creator === 'string' ? 'Unknown' : creator.fullName}</td>
                                            <td className="py-2 px-4 border">{typeof creator === 'string' ? '' : creator.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </CustomModelAdmin>
        </div>
    );
};

export default OutPayments;
