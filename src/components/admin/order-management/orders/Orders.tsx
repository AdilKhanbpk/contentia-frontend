"use client";

import React, { useState, useCallback, memo, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import NewModal from "../sub-order/NewModal";
import EditModal from "../sub-order/EditModal";
import RequestModal from "../sub-order/RequestModal";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import {
    fetchOrders,
    deleteOrder,
    fetchOrderById,
    approveCreator,
    rejectCreator,
    setCurrentOrder,
    clearCurrentOrder
} from '@/store/features/admin/ordersSlice';
import { RootState } from '@/store/store';

// Define the Order interface based on your model
interface Order {
    _id: string;
    coupon?: string;
    orderOwner: {
        id: string; // User's ID
        fullName: string; // User's full name
      };
    assignedCreators: string[];
    appliedCreators: string[];
    noOfUgc: number;
    totalPrice: number;
    orderStatus: 'pending' | 'active' | 'completed' | 'cancelled' | 'revision';
    paymentStatus: 'paid' | 'pending' | 'refunded' | 'cancelled';
    contentsDelivered?: number;
    additionalServices: {
        platform: string;
        duration: string;
        edit: boolean;
        aspectRatio: string;
        share?: boolean;
        coverPicture?: boolean;
        creatorType?: string;
        productShipping?: boolean;
    };
    preferences?: {
        creatorGender?: string;
        minCreatorAge?: number;
        maxCreatorAge?: number;
        interests?: string[];
        contentType?: string;
        locationAddress?: {
            country?: string;
            city?: string;
            district?: string;
            street?: string;
            fullAddress?: string;
        };
    };
    briefContent?: {
        brandName?: string;
        brief?: string;
        productServiceName?: string;
        productServiceDesc?: string;
        scenario?: string;
        caseStudy?: string;
        uploadFiles?: string;
        uploadFileDate?: string;
    };
    numberOfRequests?: number;
    orderQuota?: number;
    quotaLeft?: number;
    uploadFiles?: Array<{
        uploadedBy: string;
        fileUrls: string[];
        uploadedDate: Date;
    }>;
    createdAt?: Date;
    updatedAt?: Date;
}

interface SearchBarProps {
    onSearch: (value: string) => void;
}

interface TableActionsProps {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    onRequest: (id: string) => void;
    id: string;
}

interface RequestModalProps {
    order: Order | null;
    onApprove: (orderId: string, creatorId: string) => Promise<void>;
    onReject: (orderId: string, creatorId: string) => Promise<void>;
}

interface EditModalProps {
    order: Order | null;
}

// Memoized SearchBar component
const SearchBar = memo(({ onSearch }: SearchBarProps) => (
    <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
    />
));

SearchBar.displayName = 'SearchBar';

// Memoized Table Actions component
const TableActions = memo(({ onDelete, onEdit, onView, onRequest, id }: TableActionsProps) => (
    <div className="flex space-x-3">
        <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onView(id)}
        >
            <FaEye className="text-lg" />
        </button>
        <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onEdit(id)}
        >
            <FaEdit className="text-lg" />
        </button>
        <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(id)}
        >
            <FaTrashAlt className="text-md" />
        </button>
        <button
            onClick={() => onRequest(id)}
            className="text-gray-500 hover:text-gray-700"
        >
            <Image width={20} height={20} src='/icons/creatorRequest.png' alt="creator request icon" />
        </button>
    </div>
));

TableActions.displayName = 'TableActions';

const Orders: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: orders, loading, error, currentOrder } = useSelector((state: RootState) => state.orders);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalRequestsOpen, setIsModalRequestsOpen] = useState(false);

    // Fetch orders on component mount
    useEffect(() => {
        const fetchOrdersData = async () => {
            console.log('Starting fetchOrdersData'); // Log at the start of the function

            const token = localStorage.getItem('accessToken');
            console.log('Token retrieved from localStorage:', token); // Log the token value

            if (token) {
                console.log('Token is valid, proceeding to dispatch fetchOrders'); // Log if the token is present
                try {
                    const response = await dispatch(fetchOrders(token)).unwrap();
                    console.log('Orders fetched successfully:', response); // Log the successful response
                } catch (error) {
                    console.error('Error occurred while fetching orders:', error); // Log error details
                }
            } else {
                console.warn('No token found in localStorage, skipping fetchOrders'); // Log if the token is absent
            }
        };

        fetchOrdersData();

        console.log('fetchOrdersData invoked on component mount'); // Log after invoking the function
    }, [dispatch]);


    // Handler for deleting an order
    const handleDelete = useCallback(async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            await dispatch(deleteOrder({ orderId: id, token })).unwrap();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    }, [dispatch]);

    // Handler for viewing order details
    const handleView = useCallback(async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            await dispatch(fetchOrderById({ orderId: id, token })).unwrap();
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }, [dispatch]);

    // Handler for editing order
    const handleEdit = useCallback(async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            await dispatch(fetchOrderById({ orderId: id, token })).unwrap();
            setIsModalEditOpen(true);
        } catch (error) {
            console.error('Error fetching order for edit:', error);
        }
    }, [dispatch]);

    // Handler for creator requests
    const handleRequest = useCallback(async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            await dispatch(fetchOrderById({ orderId: id, token })).unwrap();
            setIsModalRequestsOpen(true);
        } catch (error) {
            console.error('Error fetching order for creator requests:', error);
        }
    }, [dispatch]);

    // Handler for approving creator
    const handleApproveCreator = useCallback(async (orderId: string, creatorId: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            await dispatch(approveCreator({ orderId, creatorId, token })).unwrap();
        } catch (error) {
            console.error('Error approving creator:', error);
        }
    }, [dispatch]);

    // Handler for rejecting creator
    const handleRejectCreator = useCallback(async (orderId: string, creatorId: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            await dispatch(rejectCreator({ orderId, creatorId, token })).unwrap();
        } catch (error) {
            console.error('Error rejecting creator:', error);
        }
    }, [dispatch]);

    // Handler for search input
    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    // Export to CSV
    const handleExport = useCallback(() => {
        const headers = [
            "ID", "Order Owner", "No of UGC", "Total Price", "Order Status",
            "Payment Status", "Contents Delivered", "Created At"
        ];

        const data = orders.map(order => ({
            ID: order._id,
            "Order Owner": order.orderOwner,
            "No of UGC": order.noOfUgc,
            "Total Price": order.totalPrice,
            "Order Status": order.orderStatus,
            "Payment Status": order.paymentStatus,
            "Contents Delivered": order.contentsDelivered || 0,
            "Created At": order.createdAt
        }));

        exportCsvFile({ data, headers, filename: "orders.csv" });
    }, [orders]);

    // Clean up current order when modals close
    const handleCloseModals = useCallback(() => {
        setIsModalOpen(false);
        setIsModalEditOpen(false);
        setIsModalRequestsOpen(false);
        dispatch(clearCurrentOrder());
    }, [dispatch]);

    // Memoized columns configuration
    const columns = React.useMemo(() => [
        {
            name: "#",
            selector: (row: Order) => row._id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Order Owner",
            cell: (row: Order) => (
                <div className="flex items-center space-x-2">
                    <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold">{row.orderOwner.fullName}</p>
                    </div>
                </div>
            ),
            sortable: false,
            width: "200px",
        },
        {
            name: "No of UGC",
            selector: (row: Order) => row.noOfUgc,
            sortable: true,
            width: "150px",
        },
        {
            name: "Creators Assigned",
            selector: (row: Order) => row.assignedCreators.length,
            sortable: true,
            width: "150px",
        },
        {
            name: "Contents Delivered",
            selector: (row: Order) => row.contentsDelivered || 0,
            sortable: true,
            width: "150px",
        },
        {
            name: "Order Status",
            cell: (row: Order) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${row.orderStatus === "completed"
                        ? "text-green-700 bg-green-100"
                        : row.orderStatus === "pending"
                            ? "text-yellow-700 bg-yellow-100"
                            : "text-red-700 bg-red-100"
                        }`}
                >
                    {row.orderStatus.charAt(0).toUpperCase() + row.orderStatus.slice(1)}
                </span>
            ),
            sortable: true,
            width: "150px",
        },
        {
            name: "Actions",
            cell: (row: Order) => (
                <TableActions
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={handleView}
                    onRequest={handleRequest}
                    id={row._id}
                />
            ),
            width: "150px",
        },
    ], [handleDelete, handleEdit, handleView, handleRequest]);

    const filteredOrders = React.useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return orders.filter((order) => {
            // Safely check if orderOwner and fullName exist before calling toLowerCase
            const fullNameMatch = order.orderOwner?.fullName?.toLowerCase().includes(lowerCaseSearchTerm) ?? false;
            // Safely check if _id exists before calling toLowerCase
            const idMatch = order._id?.toLowerCase().includes(lowerCaseSearchTerm) ?? false;
    
            return fullNameMatch || idMatch;
        });
    }, [orders, searchTerm]);
    
    // Loading state
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // Error state
    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white rounded-lg">
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className="flex flex-row justify-between items-center mb-4 space-x-2">
                    <div className="flex justify-center items-center">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className="flex flex-row space-x-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 ButtonBlue text-white rounded-md"
                        >
                            Add Order
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Export CSV
                        </button>
                    </div>
                </div>

                <CustomTable
                    columns={columns}
                    data={filteredOrders}
                />
            </div>

            {/* Modal for adding a new order */}
            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={handleCloseModals}
                title=""
            >
                <NewModal />
            </CustomModelAdmin>

            {/* Modal for editing an order */}
            <CustomModelAdmin
                isOpen={isModalEditOpen}
                closeModal={handleCloseModals}
                title=""
            >
                <EditModal order={currentOrder} />
            </CustomModelAdmin>

            {/* Modal for creator requests */}
            <CustomModelAdmin
                isOpen={isModalRequestsOpen}
                closeModal={handleCloseModals}
                title=""
            >
                <RequestModal
                    order={currentOrder}
                    onApprove={handleApproveCreator}
                    onReject={handleRejectCreator}
                />
            </CustomModelAdmin>
        </div>
    );
};

export default Orders;