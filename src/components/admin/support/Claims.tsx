"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import CustomTable from "@/components/custom-table/CustomTable";
import CustomModelAdmin from '../../modal/CustomModelAdmin';
import Modal from "./sub-support/Modal";
import ModalTwo from "./sub-support/ModalTwo";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { toast } from 'react-toastify'; // Import Toastify


// Import Redux actions
import {
  fetchAdminClaims,
  updateAdminClaim,
  fetchAdminClaimById,
} from "@/store/features/admin/claimSlice";

// Define the Claim interface to match the slice structure
export interface Claim {
  id?: string;
  status?: 'pending' | 'approved' | 'rejected';
  customer?: {
    id?: string;
    fullName?: string;
    email?: string;
  };
  order?: {
    id?: string;
  };
  claimDate?: Date | string;
  claimContent: string;
}

// Memoized SearchBar component
const SearchBar = memo(({ onSearch }: { onSearch: (value: string) => void }) => (
  <input
    type="text"
    placeholder="Search..."
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border border-gray-300 rounded-lg"
  />
));

SearchBar.displayName = 'SearchBar';

// Memoized Table Actions component
const TableActions = memo(({
  onView,
  onApprove,
  onReject,
  id
}: {
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  id: string
}) => (
  <div className="flex space-x-3">
    <button
      className="text-green-500 hover:text-green-700"
      onClick={() => onApprove(id)}
    >
      <FaCheck className="text-lg" />
    </button>
    <button
      className="text-red-500 hover:text-red-700"
      onClick={() => onReject(id)}
    >
      <FaTimes className="text-lg" />
    </button>
    <button
      className="text-gray-500 hover:text-gray-700"
      onClick={() => onView(id)}
    >
      <FaEye className="text-lg" />
    </button>
  </div>
));

TableActions.displayName = 'TableActions';

const Claims: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [currentClaim, setCurrentClaim] = useState<Claim | null>(null);

  // Get claims from Redux state
  const { data: claims, loading, error } = useSelector((state: RootState) => state.claim);

  // Fetch claims on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(fetchAdminClaims(token))
        .then(() => {
          toast.success("Claims fetched successfully!");
        })
        .catch((error) => {
          console.error("[Error] Failed to fetch claims:", error);
          toast.error("Failed to fetch claims. Please try again.");
        });
    } else {
      console.warn("[Warning] No token available in localStorage!");
      toast.error("No token available!");
    }
  }, [dispatch]);


  const handleView = (id: string) => {
    console.log(`handleView called with id: ${id}`);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('No access token found in localStorage.');
      toast.error('No access token found!'); // Error toast
      return;
    }

    console.log('Access token retrieved from localStorage:', token);

    dispatch(fetchAdminClaimById({ id, token }))
      .then((response) => {
        console.log('Response received from fetchAdminClaimById:', response);

        if (response.payload) {
          console.log('Response payload:', response.payload);

          setCurrentClaim(response.payload as Claim);
          console.log('Current claim set:', response.payload);

          setIsModalTwoOpen(true);
          console.log('Modal state updated to open.');
          toast.success('Claim details fetched successfully!'); // Success toast
        } else {
          console.log('No payload found in the response.');
          toast.error('No claim data found for this ID!'); // Error toast
        }
      })
      .catch((error) => {
        console.error('Error occurred while fetching claim:', error);
        toast.error('Failed to fetch claim details. Please try again!'); // Error toast
      });
  };



  const handleApprove = (id: string) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(updateAdminClaim({
        claimId: id,
        data: { status: 'approved' },
        token
      }))
        .then((response: any) => {
          if (response.meta.requestStatus === 'fulfilled') { // Check if the update was successful
            dispatch(fetchAdminClaims(token)); // Fetch claims again
            toast.success("Claim approved successfully!"); // Success toast
          }
        })
        .catch((error: any) => {
          console.error("Failed to update claim status:", error);
          toast.error("Failed to approve claim. Please try again."); // Error toast
        });
    }
  };


  const handleReject = (id: string) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(updateAdminClaim({
        claimId: id,
        data: { status: 'rejected' },
        token
      }))
        .then((response: any) => {
          if (response.meta.requestStatus === 'fulfilled') { // Check if the update was successful
            dispatch(fetchAdminClaims(token)); // Fetch claims again
            toast.success("Claim rejected successfully!"); // Success toast
          }
        })
        .catch((error: any) => {
          console.error("Failed to update claim status:", error);
          toast.error("Failed to reject claim. Please try again."); // Error toast
        });
    }
  };


  // Handler for search input
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Export to CSV
  const handleExport = useCallback(() => {
    const headers = ["#", "Customer Name", "Customer Email", "Customer ID", "Order ID", "Claim Date", "Claim Status"];
    const data = claims.map((claim, index) => ({
      "#No": index + 1,
      "Customer Name": claim.customer?.fullName || '',
      "Customer Email": claim.customer?.email || '',
      "Customer ID": claim.customer?.id || '',
      "Order ID": claim.order?.id || '',
      "Claim Date": claim.claimDate ? new Date(claim.claimDate).toLocaleDateString() : '',
      "Claim Status": claim.status || ''
    }));

    exportCsvFile({ data, headers, filename: "claims.csv" });
  }, [claims]);

  // Memoized columns configuration
  const columns = React.useMemo(() => [
    {
      name: "#",
      selector: (row: Claim, index: number) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Customer Info",
      cell: (row: Claim) => (
        <div className="flex items-center space-x-2">
          <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="whitespace-nowrap">
            <div className="font-semibold">{row.customer?.fullName || 'N/A'}</div>
            <div className="text-gray-500 text-sm">
              {row.customer?.email && row.customer.email.length > 20
                ? `${row.customer.email.substring(0, 20)}...`
                : row.customer?.email || 'N/A'}
            </div>
          </div>
        </div>
      ),
      sortable: false,
      grow: 2,
      width: "250px",
    },
    {
      name: "Customer ID",
      selector: (row: Claim) => row.customer?.id || 'N/A',
      sortable: true,
      width: "150px",
    },
    {
      name: "Order ID",
      selector: (row: Claim) => row.order?.id || 'N/A',
      sortable: true,
      width: "150px",
    },
    {
      name: "Claim Date",
      selector: (row: Claim) => row.claimDate
        ? new Date(row.claimDate).toLocaleDateString()
        : 'N/A',
      sortable: true,
      width: "150px",
    },
    {
      name: "Claim Status",
      cell: (row: Claim) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${row.status === "approved"
            ? "text-green-700 bg-green-100"
            : row.status === "pending"
              ? "text-yellow-700 bg-yellow-100"
              : "text-red-700 bg-red-100"
            }`}
        >
          {row.status || 'N/A'}
        </span>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row: Claim) => (
        <TableActions
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
          id={row.id || ''}
        />
      ),
      width: "150px",
    },
  ], [handleView, handleApprove, handleReject]);

  // Filtered claims based on search
  const filteredClaims = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return claims.filter((claim) => (
      claim.customer?.fullName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      claim.customer?.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
      claim.customer?.id?.toString().includes(lowerCaseSearchTerm) ||
      claim.order?.id?.toString().includes(lowerCaseSearchTerm)
    ));
  }, [claims, searchTerm]);

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
              Add Claims
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
          data={filteredClaims}
        />
      </div>

      {/* Modal for adding a new claim */}
      <CustomModelAdmin
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title=""
      >
        <Modal />
      </CustomModelAdmin>

      {/* Modal for viewing a claim */}
      <CustomModelAdmin
        isOpen={isModalTwoOpen}
        closeModal={() => setIsModalTwoOpen(false)}
        title=""
      >
        <ModalTwo claim={currentClaim} />
      </CustomModelAdmin>
    </div>
  );
};

export default Claims;