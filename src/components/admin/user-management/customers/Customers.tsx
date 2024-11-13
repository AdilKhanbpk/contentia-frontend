"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
    fetchAdminCustomers,
    deleteAdminCustomer,
    createAdminCustomer,
    updateAdminCustomer
} from "@/store/features/admin/customersSlice";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import ModalNew from "./sub-customer/ModalNew";
import ModalEdit from "./sub-customer/ModalEdit";
import ModalView from "./sub-customer/ModelView"; // Import view modal
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";


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
    const { data: customers = [] } = useSelector((state: RootState) => state.adminCustomers);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState<any>(null);

    // Handler for deleting a customer
    const handleDelete = useCallback((id: string) => {
        const tokenFromStorage = localStorage.getItem('accessToken');
        if (!tokenFromStorage) {
            console.warn("Authorization token is missing.");
            return;
        }

        dispatch(deleteAdminCustomer({ customerId: id, token: tokenFromStorage }))
            .unwrap()
            .catch((error: any) => {
                console.error("Delete failed:", error);
            });
    }, [dispatch]);

    // Handler for viewing a customer
    const handleView = (id: string) => {
        const customer = customers.find((customer) => customer.id === id);
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
            createAdminCustomer({ 
              data: customerData, 
              token: tokenFromStorage 
            })
          ).unwrap();
      
          console.log('Customer created successfully:', result);
          setIsModalOpen(false);
          
          // Optionally refresh the customer list or show success message
          // dispatch(fetchCustomers());
          await dispatch(fetchAdminCustomers(tokenFromStorage));
          
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
            const dataToUpdate = {
                fullName: customerData.fullName ?? '',  // Default to empty string if fullName is missing or undefined
                email: customerData.email ?? '',  // Default to empty string if email is missing or undefined
                phoneNumber: customerData.contact ?? '',  // Default to empty string if contact is missing or undefined
                age: customerData.age ?? null,  // Default to null if age is missing or undefined
                country: customerData.country ?? '',  // Default to empty string if country is missing or undefined
                customerStatus: customerData.customerStatus ?? '',  // Default to empty string if customerStatus is missing or undefined
                invoiceType: customerData.invoiceType ?? '',  // Default to empty string if invoiceType is missing or undefined
                billingInformation: {
                    invoiceStatus: customerData.billingInformation?.invoiceStatus ?? false,  // Default to false if invoiceStatus is missing or undefined
                    trId: customerData.billingInformation?.trId ?? '',  // Default to empty string if trId is missing or undefined
                    address: customerData.billingInformation?.address ?? '',  // Default to empty string if address is missing or undefined
                    fullName: customerData.billingInformation?.fullName ?? '',  // Default to empty string if fullName is missing or undefined
                    companyName: customerData.billingInformation?.companyName ?? '',  // Default to empty string if companyName is missing or undefined
                    taxNumber: customerData.billingInformation?.taxNumber ?? '',  // Default to empty string if taxNumber is missing or undefined
                    taxOffice: customerData.billingInformation?.taxOffice ?? '',  // Default to empty string if taxOffice is missing or undefined
                },
                rememberMe: customerData.rememberMe ?? false,  // Default to false if rememberMe is missing or undefined
                termsAndConditionsApproved: customerData.termsAndConditionsApproved ?? false  // Default to false if termsAndConditionsApproved is missing or undefined
            };

            // Dispatch the update action
            dispatch(updateAdminCustomer({ customerId, data: dataToUpdate, token }));
            console.log('Data to be sent for update: ', dataToUpdate);
            await dispatch(fetchAdminCustomers(token));

        } else {
            console.error('Authorization token is missing!');
        }
    };

    // Handler for editing a customer
    const handleEdit = (id: string) => {
        const customer = customers.find((customer) => customer.id === id);
        setCurrentCustomer(customer);
        setIsModalEditOpen(true);
    };

    // Handler for search input
    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    // Export to CSV
    const handleExport = useCallback(() => {
        const headers = ["ID", "Name", "Email", "Contact", "Age", "Country", "Status"];
        const data = customers.map(customer => ({
            ID: customer.id,
            Name: customer.name,
            Email: customer.email,
            Contact: customer.contact,
            Age: customer.age,
            Country: customer.country,
            Status: customer.status
        }));

        exportCsvFile({ data, headers, filename: "customers.csv" });
    }, [customers]);

    // Fetch customers on mount
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('accessToken');
        if (tokenFromStorage) {
            dispatch(fetchAdminCustomers(tokenFromStorage));
        }
    }, [dispatch]);

    // Memoized columns configuration
    const columns = React.useMemo(() => [
        {
            name: "#",
            selector: (row: any) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "User Info",
            cell: (row: any) => (
                <div className="flex items-center space-x-2">
                    <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold">{row.fullName}</p>
                        <p className="text-sm whitespace-nowrap text-gray-500">
                            {row.email.length > 12 ? `${row.email.substring(0, 20)}...` : row.email}
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
            selector: (row: any) => row.contact,
            sortable: true,
        },
        {
            name: "Age",
            selector: (row: any) => row.age,
            sortable: true,
            width: "100px",
        },
        {
            name: "Country",
            selector: (row: any) => row.country,
            sortable: true,
        },
        {
            name: "Status",
            cell: (row: any) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        row.customerStatus === "approved"
                            ? "text-green-700 bg-green-100"
                            : row.customerStatus === "waiting"
                                ? "text-yellow-700 bg-yellow-100"
                                : "text-red-700 bg-red-100"
                    }`}
                >
                    {row.customerStatus}
                </span>
            ),
            sortable: true,
            width: "150px",
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <TableActions onDelete={handleDelete} onEdit={handleEdit} onView={handleView} id={row.id} />
            ),
            width: "150px",
        },
    ], [handleDelete, handleEdit, handleView]);

    // Filtered customers based on search
    const filteredCustomers = React.useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return customers.filter((customer) => (
            (customer.fullName?.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (customer.email?.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (customer.contact?.includes(lowerCaseSearchTerm)) ||
            (customer.country?.toLowerCase().includes(lowerCaseSearchTerm))
        ));
    }, [customers, searchTerm]);

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
                    data={filteredCustomers}
                />
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

            {/* Modal for editing a customer */}
            <CustomModelAdmin
                isOpen={isModalEditOpen}
                closeModal={() => setIsModalEditOpen(false)}
                title=""
            >
                <ModalEdit
                    isOpen={isModalEditOpen}
                    onClose={() => setIsModalEditOpen(false)}
                    customerData={currentCustomer}
                    onSubmit={handleUpdate}
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
