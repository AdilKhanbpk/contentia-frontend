"use client";
import React, { useEffect, useState, useCallback, memo } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchAdminCreators,
  deleteAdminCreator,
  createAdminCreator,
  updateAdminCreator
} from "@/store/features/admin/creatorsSlice";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import ModalNew from "./sub-creator/ModalNew";
import ModalView from "./sub-creator/ModelView"; // Import view modal
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { useForm, SubmitHandler } from "react-hook-form";
import EditCreatorForm from "./sub-creator/EditCreatorForm";

interface Creator {
  id: number;
  fullName: string;
  creatorType: "individual" | "company";
  password: string;
  tckn: string;
  email: string;
  dateOfBirth: string; // Format: "YYYY-MM-DD"
  gender: "male" | "female" | "other";
  phoneNumber: string;
  isVerified: boolean;
  addressOne: string;
  addressTwo?: string;
  accountType: "individual" | "institutional";
  invoiceType: "individual" | "institutional";
  paymentInformation: {
    ibanNumber?: string;
    address: string;
    fullName: string;
    trId?: string;
    companyName?: string;
    taxNumber?: string;
    taxOffice?: string;
  };
  billingInformation: {
    invoiceStatus: boolean;
    address: string;
    fullName: string;
    trId?: string;
    companyName?: string;
    taxNumber?: string;
    taxOffice?: string;
  };
  preferences: {
    contentInformation: {
      contentType: "product" | "service" | "other";
      contentFormats: string[]; // Example: ["video", "image"]
      areaOfInterest: string[]; // Example: ["tech", "gadgets"]
      addressDetails: {
        country: string;
        state: string;
        district: string;
        neighbourhood?: string;
        fullAddress: string;
      };
    };
    socialInformation: {
      contentType: "product" | "service" | "other";
      platforms: {
        Instagram?: {
          followers: number;
          username: string;
        };
        TikTok?: {
          followers: number;
          username: string;
        };
        Youtube?: {
          followers: number;
          username: string;
        };
      };
      portfolioLink?: string;
    };
  };
  userAgreement: boolean;
  approvedCommercial: boolean;
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
const TableActions = memo(({ onDelete, onEdit, onView, id }: { onDelete: (id: string) => void; onEdit: (id: string) => void; onView: (id: string) => void; id: string }) => (
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
  </div>
));

TableActions.displayName = 'TableActions';

const Customers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: creators = [] } = useSelector((state: RootState) => state.adminCreators);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<any>(null);
  const [editingCreator, setEditingCreator] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Handler for deleting a customer
  const handleDelete = useCallback((id: string) => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (!tokenFromStorage) {
      console.warn("Authorization token is missing.");
      return;
    }

    dispatch(deleteAdminCreator({ customerId: id, token: tokenFromStorage }))
      .unwrap()
      .catch((error: any) => {
        console.error("Delete failed:", error);
      });
  }, [dispatch]);

  // Handler for viewing a customer
  const handleView = (id: string) => {
    const customer = creators.find((customer) => customer.id === id);
    setCurrentCustomer(customer);
    setIsModalViewOpen(true);
  };

  const handleCreate = async (customerData: any) => {
    const tokenFromStorage = localStorage.getItem('accessToken');

    try {
      // Validate token
      if (!tokenFromStorage) {
        console.error('Authorization token is missing');
        // Handle missing token (e.g., redirect to login)
        return;
      }

      // Validate customer data
      if (!customerData || Object.keys(customerData).length === 0) {
        console.error('Customer data is empty');
        return;
      }

      // Log the request attempt
      console.log('Attempting to create customer:', {
        ...customerData,
        token: tokenFromStorage ? '${token.substring(0, 10)}...' : 'missing'
      });

      const result = await dispatch(
        createAdminCreator({
          data: customerData,
          token: tokenFromStorage
        })
      ).unwrap();

      console.log('Customer created successfully:', result);
      setIsModalOpen(false);

      // Optionally refresh the customer list or show success message
      // dispatch(fetchCustomers());
      await dispatch(fetchAdminCreators(tokenFromStorage));

    } catch (error) {
      console.error('Customer creation failed:', error);
      // Handle error (e.g., show error message to user)
    }

  };

  const handleUpdate = async (customerData: any) => {
    console.log('Function `handleUpdate` called with customerData: ', customerData);

    const token = localStorage.getItem('accessToken');  // Assume the token is stored in localStorage
    console.log('Retrieved token from storage: ', token);

    if (token) {
      const customerId = customerData.id;
      console.log(customerId);
      const dataToUpdate = {
        fullName: customerData.fullName ?? '', // Default to empty string if missing
        creatorType: customerData.creatorType ?? 'individual', // Default to "individual"
        password: customerData.password ?? '', // Default to empty string if missing
        tckn: customerData.tckn ?? '', // Default to empty string if missing
        email: customerData.email ?? '', // Default to empty string if missing
        dateOfBirth: customerData.dateOfBirth ?? '', // Default to empty string if missing
        gender: customerData.gender ?? 'other', // Default to "other"
        phoneNumber: customerData.contact ?? '', // Default to empty string if missing
        isVerified: customerData.isVerified ?? false, // Default to false if missing
        addressOne: customerData.addressOne ?? '', // Default to empty string if missing
        addressTwo: customerData.addressTwo ?? '', // Optional, default to empty string if missing
        accountType: customerData.accountType ?? 'individual', // Default to "individual"
        invoiceType: customerData.invoiceType ?? 'individual', // Default to "individual"

        paymentInformation: {
          ibanNumber: customerData.paymentInformation?.ibanNumber ?? '', // Default to empty string if missing
          address: customerData.paymentInformation?.address ?? '', // Default to empty string if missing
          fullName: customerData.paymentInformation?.fullName ?? '', // Default to empty string if missing
          trId: customerData.paymentInformation?.trId ?? '', // Default to empty string if missing
          companyName: customerData.paymentInformation?.companyName ?? '', // Default to empty string if missing
          taxNumber: customerData.paymentInformation?.taxNumber ?? '', // Default to empty string if missing
          taxOffice: customerData.paymentInformation?.taxOffice ?? '', // Default to empty string if missing
        },

        billingInformation: {
          invoiceStatus: customerData.billingInformation?.invoiceStatus ?? false, // Default to false if missing
          address: customerData.billingInformation?.address ?? '', // Default to empty string if missing
          fullName: customerData.billingInformation?.fullName ?? '', // Default to empty string if missing
          trId: customerData.billingInformation?.trId ?? '', // Default to empty string if missing
          companyName: customerData.billingInformation?.companyName ?? '', // Default to empty string if missing
          taxNumber: customerData.billingInformation?.taxNumber ?? '', // Default to empty string if missing
          taxOffice: customerData.billingInformation?.taxOffice ?? '', // Default to empty string if missing
        },

        preferences: {
          contentInformation: {
            contentType: customerData.preferences?.contentInformation?.contentType ?? 'other', // Default to "other"
            contentFormats: customerData.preferences?.contentInformation?.contentFormats ?? [], // Default to empty array
            areaOfInterest: customerData.preferences?.contentInformation?.areaOfInterest ?? [], // Default to empty array
            addressDetails: {
              country: customerData.preferences?.contentInformation?.addressDetails?.country ?? '', // Default to empty string
              state: customerData.preferences?.contentInformation?.addressDetails?.state ?? '', // Default to empty string
              district: customerData.preferences?.contentInformation?.addressDetails?.district ?? '', // Default to empty string
              neighbourhood: customerData.preferences?.contentInformation?.addressDetails?.neighbourhood ?? '', // Optional
              fullAddress: customerData.preferences?.contentInformation?.addressDetails?.fullAddress ?? '', // Default to empty string
            },
          },
          socialInformation: {
            contentType: customerData.preferences?.socialInformation?.contentType ?? 'other', // Default to "other"
            platforms: {
              Instagram: customerData.preferences?.socialInformation?.platforms?.Instagram ?? {
                followers: 0,
                username: '',
              },
              TikTok: customerData.preferences?.socialInformation?.platforms?.TikTok ?? {
                followers: 0,
                username: '',
              },
              Youtube: customerData.preferences?.socialInformation?.platforms?.Youtube ?? {
                followers: 0,
                username: '',
              },
            },
            portfolioLink: customerData.preferences?.socialInformation?.portfolioLink ?? '', // Default to empty string if missing
          },
        },

        userAgreement: customerData.userAgreement ?? false, // Default to false if missing
        approvedCommercial: customerData.approvedCommercial ?? false, // Default to false if missing
      };


      // Dispatch the update action
      dispatch(updateAdminCreator({ customerId, data: dataToUpdate, token }));
      console.log('Data to be sent for update: ', dataToUpdate);
      await dispatch(fetchAdminCreators(token));

    } else {
      console.error('Authorization token is missing!');
    }
  };

  // Handler for editing a customer
  const handleEdit = (id: string) => {
    const creator = creators.find((creator) => creator.id === id);
    setCurrentCustomer(creator);
    setEditingCreator(true);
    setShowEditForm(true);
  };

  // Handler for search input
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Export to CSV
  const handleExport = useCallback(() => {
    const headers = ["ID", "Name", "Email", "Contact", "Total Orders", "Country", "Status"];
    const data = creators.map(customer => [
      customer.id,
      customer.name,
      customer.email,
      customer.contact,
      customer.totalOrders,
      customer.country,
      customer.status
    ]);

    exportCsvFile({ data, headers, filename: "creators.csv" });
  }, [creators]);

  // Fetch customers on mount
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (tokenFromStorage) {
      dispatch(fetchAdminCreators(tokenFromStorage));
    }
  }, [dispatch]);

  const columns = React.useMemo(() => [
    {
      name: "#",
      selector: (row: any) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Creator",
      cell: (row: any) => (
        <div className="flex items-center space-x-2">
          <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{row.fullName || '-'}</p>
            <p className="text-sm whitespace-nowrap text-gray-500">
              {row.email && (row.email.length > 12 ? `${row.email.substring(0, 20)}...` : row.email)}
            </p>
          </div>
        </div>
      ),
      sortable: false,
      grow: 2,
      width: "280px",
    },
    {
      name: "Contact",
      selector: (row: any) => row.phoneNumber || '-',
      sortable: true,
    },
    {
      name: "Orders",
      selector: (row: any) => row.totalOrders || '-',
      sortable: true,
      width: "100px",
    },
    {
      name: "Country",
      selector: (row: any) => row.country || '-',
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => {
        let status = row.isVerified ? "Verified" : "Pending";
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${status === "Verified"
                ? "text-green-700 bg-green-100"
                : status === "Pending"
                  ? "text-yellow-700 bg-yellow-100"
                  : "text-red-700 bg-red-100"
              }`}
          >
            {status}
          </span>
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <TableActions onDelete={handleDelete} onEdit={handleEdit} onView={handleView} id={row.id} />
      ),
      width: "150px",
    }
  ], [handleDelete, handleEdit, handleView]);


  // Update the filteredCustomers function to match the new data structure
  const filteredCreators = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return creators.filter((customer) => (
      (customer.fullName?.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (customer.email?.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (customer.phoneNumber?.includes(lowerCaseSearchTerm)) ||
      (customer.creatorType?.toLowerCase().includes(lowerCaseSearchTerm))
    ));
  }, [creators, searchTerm]);

  // Handler for closing the edit form
  const handleCloseEdit = () => {
    setEditingCreator(false);
    setCurrentCustomer(null);
  };

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
              Add Customer
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
          data={filteredCreators}
        />
        {/* Conditional render of the edit form */}
        {showEditForm && (
          <EditCreatorForm
            customerData={currentCustomer}
            onSubmit={(data) => {
              handleUpdate(data);
              handleCloseEdit();
            }}
          />
        )}
      </div>

      {/* Modal for adding a new customer */}
      <CustomModelAdmin
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title=""
      >
        <ModalNew
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreate}
        />
      </CustomModelAdmin>



      {/* Modal for viewing a customer */}
      <CustomModelAdmin
        isOpen={isModalViewOpen}
        closeModal={() => setIsModalViewOpen(false)}
        title=""
      >
        <ModalView
          isOpen={isModalViewOpen}
          onClose={() => setIsModalViewOpen(false)}
          customerData={currentCustomer}
        />
      </CustomModelAdmin>
    </div>
  );
};

export default Customers;
