"use client";
import { useState, useCallback, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import CustomTable from "@/components/custom-table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAppliedCreators } from "@/store/features/admin/ordersSlice";
import { CreatorInterface, OrderInterface } from "@/types/interfaces";

interface RequestModalProps {
    order: OrderInterface | null;
    onApprove: (orderId: string, creatorId: string) => Promise<void>;
    onReject: (orderId: string, creatorId: string) => Promise<void>;
    loading: boolean;
}

const RequestModal: React.FC<RequestModalProps> = ({
    order,
    onApprove,
    onReject,
    loading,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState("");
    const { currentOrder } = useSelector((state: RootState) => state.orders);
    useEffect(() => {
        const fetchAppliedCreators = async () => {
            if (!order?._id) {
                console.error("Missing  order ID");
                return;
            }

            try {
                const response = await dispatch(
                    getAppliedCreators({
                        orderId: order._id,
                    })
                ).unwrap();
            } catch (error) {
                console.error("Error fetching applied creators:", error);
            }
        };

        fetchAppliedCreators();
    }, [dispatch, order?._id]);

    const handleApprove = useCallback(
        async (creatorId: string) => {
            if (!order?._id) {
                console.error("No order ID available");
                return;
            }
            await onApprove(order._id, creatorId);
        },
        [order?._id, onApprove]
    );

    const handleReject = useCallback(
        async (creatorId: string) => {
            if (!order?._id) {
                console.error("No order ID available");
                return;
            }
            await onReject(order._id, creatorId);
        },
        [order?._id, onReject]
    );

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const columns = [
        {
            name: "#",
            selector: (row: CreatorInterface) => row._id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Creator Name",
            cell: (row: CreatorInterface) => (
                <div className='flex items-center space-x-2'>
                    <Image
                        width={10}
                        height={10}
                        src={row.profilePic || "/icons/avatar.png"}
                        alt='avatar'
                        className='w-10 h-10 rounded-full'
                    />
                    <div>
                        <p className='font-semibold'>{row.fullName}</p>
                        <p className='text-sm whitespace-nowrap text-gray-500'>
                            {row.email}
                        </p>
                    </div>
                </div>
            ),
            sortable: false,
            width: "200px",
        },
        {
            name: "Contact",
            selector: (row: CreatorInterface) => row.phoneNumber,
            sortable: true,
            width: "150px",
        },
        {
            name: "Status",
            cell: (row: CreatorInterface) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        row.isVerified === "approved"
                            ? "text-green-700 bg-green-100"
                            : row.isVerified === "pending"
                            ? "text-blue-700 bg-blue-100"
                            : "text-red-700 bg-red-100"
                    }`}
                >
                    {row.isVerified}
                </span>
            ),
            sortable: true,
            width: "150px",
        },
        {
            name: "Actions",
            cell: (row: CreatorInterface) => (
                <div className='flex space-x-3'>
                    <button
                        className='text-green-500 hover:text-green-700'
                        onClick={() => handleApprove(row._id.toString())}
                    >
                        <FaCheck className='text-lg' />
                    </button>
                    <button
                        className='text-red-500 hover:text-red-700'
                        onClick={() => handleReject(row._id.toString())}
                    >
                        <FaTimes className='text-lg' />
                    </button>
                </div>
            ),
            width: "150px",
        },
    ];

    const filteredCreators = currentOrder?.appliedCreators
        ? (currentOrder.appliedCreators as CreatorInterface[]).filter(
              (creator: CreatorInterface) => {
                  const searchLower = searchTerm.toLowerCase();
                  return (
                      creator.fullName?.toLowerCase().includes(searchLower) ||
                      creator.email?.toLowerCase().includes(searchLower) ||
                      creator.phoneNumber?.includes(searchTerm)
                  );
              }
          )
        : [];

    return (
        <div className='p-5 bg-white rounded-lg'>
            <div className='flex flex-col lg:mt-8'>
                <div className='flex justify-between mb-4'>
                    <div className='flex items-center'>
                        <input
                            type='text'
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder='Search...'
                            className='p-2 border border-gray-300 rounded-lg mr-4'
                        />
                    </div>
                </div>

                <div className='shadow-md'>
                    <CustomTable
                        columns={columns}
                        data={filteredCreators}
                        noDataComponent='No Requests Found'
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default RequestModal;
