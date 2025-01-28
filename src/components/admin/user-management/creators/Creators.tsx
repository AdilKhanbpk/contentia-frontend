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
import EditCreatorForm from "./sub-creator/EditCreatorForm";
import { toast } from 'react-toastify';

const SearchBar = memo(({ onSearch }: { onSearch: (value: string) => void }) => (
  <input
    type="text"
    placeholder="Search..."
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border border-gray-300 rounded-lg"
  />
));

SearchBar.displayName = 'SearchBar';

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

  const handleDelete = useCallback((id: string) => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    if (!tokenFromStorage) {
      toast.error('Authorization token is missing. Please log in again.');
      return;
    }

    dispatch(deleteAdminCreator({ customerId: id, token: tokenFromStorage }))
      .unwrap()
      .then(() => {
        toast.success('Customer deleted successfully!');
      })
      .catch((error: any) => {
        toast.error(`Error deleting customer: ${error?.message || 'Unknown error'}`);
      });
  }, [dispatch]);

  const handleView = (id: string) => {
    const customer = creators.find((customer) => customer.id === id);
    setCurrentCustomer(customer);
    setIsModalViewOpen(true);
  };

  const handleCreate = async (customerData: any) => {
    const tokenFromStorage = localStorage.getItem('accessToken');
    try {
      if (!tokenFromStorage) {
        toast.error('Authorization token is missing. Please log in again.');
        return;
      }

      if (!customerData || Object.keys(customerData).length === 0) {
        console.error('Customer data is empty');
        toast.error('Please provide valid customer data.');
        return;
      }

      const result = await dispatch(
        createAdminCreator({
          data: customerData,
          token: tokenFromStorage
        })
      ).unwrap();

      setIsModalOpen(false);

      toast.success('Creator added successfully!');
      await dispatch(fetchAdminCreators(tokenFromStorage));

    } catch (error) {
      toast.error(`Error creating customer: 'Unknown error'}`);
    }
  };

  const handleUpdate = async (customerData: any) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const customerId = customerData.id;
      console.log(customerId);
      const dataToUpdate = {
        fullName: customerData.fullName ?? '',
        creatorType: customerData.creatorType ?? 'individual',
        password: customerData.password ?? '',
        indentityNo: customerData.identityNo ?? '',
        email: customerData.email ?? '',
        dateOfBirth: customerData.dateOfBirth ?? '',
        gender: customerData.gender ?? 'other',
        phoneNumber: customerData.contact ?? '',
        isVerified: customerData.isVerified ?? 'pending',
        accountType: customerData.accountType ?? 'individual',
        invoiceType: customerData.invoiceType ?? 'individual',
        addressDetails: {
          addressOne: customerData.addressDetails?.addressOne ?? '',
          addressTwo: customerData.addressDetails?.addressTwo ?? '',
          country: customerData.addressDetails?.country ?? '',
          zipCode: customerData.addressDetails?.zipCode ?? '',
        },

        paymentInformation: {
          ibanNumber: customerData.paymentInformation?.ibanNumber ?? '',
          address: customerData.paymentInformation?.address ?? '',
          fullName: customerData.paymentInformation?.fullName ?? '',
          trId: customerData.paymentInformation?.trId ?? '',
          companyName: customerData.paymentInformation?.companyName ?? '',
          taxNumber: customerData.paymentInformation?.taxNumber ?? '',
          taxOffice: customerData.paymentInformation?.taxOffice ?? '',
        },

        billingInformation: {
          invoiceStatus: customerData.billingInformation?.invoiceStatus ?? false,
          address: customerData.billingInformation?.address ?? '',
          fullName: customerData.billingInformation?.fullName ?? '',
          trId: customerData.billingInformation?.trId ?? '',
          companyName: customerData.billingInformation?.companyName ?? '',
          taxNumber: customerData.billingInformation?.taxNumber ?? '',
          taxOffice: customerData.billingInformation?.taxOffice ?? '',
        },

        preferences: {
          contentInformation: {
            contentType: customerData.preferences?.contentInformation?.contentType ?? 'other',
            contentFormats: customerData.preferences?.contentInformation?.contentFormats ?? [],
            areaOfInterest: customerData.preferences?.contentInformation?.areaOfInterest ?? [],
            addressDetails: {
              country: customerData.preferences?.contentInformation?.addressDetails?.country ?? '',
              state: customerData.preferences?.contentInformation?.addressDetails?.state ?? '',
              district: customerData.preferences?.contentInformation?.addressDetails?.district ?? '',
              neighbourhood: customerData.preferences?.contentInformation?.addressDetails?.neighbourhood ?? '',
              fullAddress: customerData.preferences?.contentInformation?.addressDetails?.fullAddress ?? '',
            },
          },
          socialInformation: {
            contentType: customerData.preferences?.socialInformation?.contentType ?? 'other',
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
              X: customerData.preferences?.socialInformation?.platforms?.X ?? {
                followers: 0,
                username: '',
              },
              Facebook: customerData.preferences?.socialInformation?.platforms?.Facebook ?? {
                followers: 0,
                username: '',
              },
              Linkedin: customerData.preferences?.socialInformation?.platforms?.Linkedin ?? {
                followers: 0,
                username: '',
              },
            },
            portfolioLink: customerData.preferences?.socialInformation?.portfolioLink ?? '',
          },
        },

        userAgreement: customerData.userAgreement ?? false,
        approvedCommercial: customerData.approvedCommercial ?? false,
      };

      try {
        await dispatch(updateAdminCreator({ customerId, data: dataToUpdate, token }));
        await dispatch(fetchAdminCreators(token));
        toast.success('Customer updated successfully!');
      } catch (error) {
        toast.error('Failed to update customer. Please try again.');
      }
    } else {
      toast.error('Authorization token is missing! Please log in again.');
    }
  };

  const handleEdit = (id: string) => {
    const creator = creators.find((creator) => creator.id === id);
    setCurrentCustomer(creator);
    setEditingCreator(true);
    setShowEditForm(true);
  };

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

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
      selector: (row: any) => row.addressDetails?.country || '-',
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => {
        let status = row.isVerified || "pending";
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${status === "approved"
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

  const filteredCreators = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return creators.filter((customer) => (
      (customer.fullName?.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (customer.email?.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (customer.phoneNumber?.includes(lowerCaseSearchTerm)) ||
      (customer.creatorType?.toLowerCase().includes(lowerCaseSearchTerm))
    ));
  }, [creators, searchTerm]);

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
              Add Creator
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
