"use client";
import { useState, useCallback, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";
import CustomTable from "@/components/custom-table/CustomTable";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAppliedCreators } from '@/store/features/admin/ordersSlice';

export interface Creator {
  _id: string;
  name: string;
  email: string;
  contact: string;
  totalOrders: number;
  country: string;
  status: "Verified" | "Pending" | "Rejected";
}

interface Order {
  _id: string;
  coupon?: string;
  orderOwner: {
    id: string;
    fullName: string;
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

interface RequestModalProps {
  order: Order | null;
  onApprove: (orderId: string, creatorId: string) => Promise<void>;
  onReject: (orderId: string, creatorId: string) => Promise<void>;
}

const RequestModal: React.FC<RequestModalProps> = ({ order, onApprove, onReject }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentOrder } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    const fetchAppliedCreators = async () => {
      console.log("Fetching applied creators for order:", order?._id);
      const token = localStorage.getItem('accessToken');
      
      if (!token || !order?._id) {
        console.error("Missing token or order ID");
        return;
      }

      try {
        const response = await dispatch(getAppliedCreators({ 
          orderId: order._id, 
          token 
        })).unwrap();
        console.log("Applied creators fetched successfully:", response);
      } catch (error) {
        console.error("Error fetching applied creators:", error);
      }
    };

    fetchAppliedCreators();
  }, [dispatch, order?._id]);

  const handleApprove = useCallback(async (creatorId: string) => {
    console.log("Approving creator:", creatorId, "for order:", order?._id);
    if (!order?._id) {
      console.error("No order ID available");
      return;
    }
    await onApprove(order._id, creatorId);
  }, [order?._id, onApprove]);

  const handleReject = useCallback(async (creatorId: string) => {
    console.log("Rejecting creator:", creatorId, "for order:", order?._id);
    if (!order?._id) {
      console.error("No order ID available");
      return;
    }
    await onReject(order._id, creatorId);
  }, [order?._id, onReject]);

  const handleSearch = useCallback((value: string) => {
    console.log("Search term:", value);
    setSearchTerm(value);
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row: Creator) => row._id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Creator Name",
      cell: (row: Creator) => (
        <div className="flex items-center space-x-2">
          <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{row.name}</p>
            <p className="text-sm whitespace-nowrap text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
      sortable: false,
      width: "200px",
    },
    {
      name: "Creator ID",
      selector: (row: Creator) => row.contact,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      cell: (row: Creator) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            row.status === "Verified"
              ? "text-green-700 bg-green-100"
              : row.status === "Pending"
                ? "text-blue-700 bg-blue-100"
                : "text-red-700 bg-red-100"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row: Creator) => (
        <div className="flex space-x-3">
          <button 
            className="text-green-500 hover:text-green-700"
            onClick={() => handleApprove(row._id.toString())}
          >
            <FaCheck className="text-lg" />
          </button>
          <button 
            className="text-red-500 hover:text-red-700"
            onClick={() => handleReject(row._id.toString())}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      ),
      width: "150px",
    }
  ];

  const filteredCreators = currentOrder?.appliedCreators?.filter((creator: any) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      creator.name?.toLowerCase().includes(searchLower) ||
      creator.email?.toLowerCase().includes(searchLower) ||
      creator.contact?.includes(searchTerm) ||
      creator.country?.toLowerCase().includes(searchLower)
    );
  }) || [];

  console.log("Rendering RequestModal with filtered creators:", filteredCreators);

  return (
    <div className="p-5 bg-white rounded-lg">
      <div className='flex flex-col lg:mt-8'>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-lg mr-4"
            />
          </div>
        </div>

        <div className="shadow-md">
          <CustomTable
            columns={columns}
            data={filteredCreators}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
