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
        const customer = customers.find((customer) => customer.ID === id);
        setCurrentCustomer(customer);
        setIsModalViewOpen(true);
    };

    const handleCreate = (customerData: any) => {
        const tokenFromStorage = localStorage.getItem('accessToken');

        // Log the token to debug if it's missing
        console.log("Token from localStorage:", tokenFromStorage);

        if (!tokenFromStorage) {
            console.warn("Authorization token is missing.");
            return;
        }

        // Log the customerData for debugging
        console.log("Customer Data to be sent:", customerData);

        // Dispatching the create action with the correct payload shape
        dispatch(createAdminCustomer({ data: customerData, token: tokenFromStorage }))
            .unwrap()
            .then(() => {
                console.log("Customer created successfully");
                setIsModalOpen(false);
            })
            .catch((error: any) => {
                console.error("Create failed:", error);
            });
    };

    const handleUpdate = async (customerData: any) => {
        console.log('Function `handleUpdate` called with customerData: ', customerData);

        const token = localStorage.getItem('accessToken');  // Assume the token is stored in localStorage
        console.log('Retrieved token from storage: ', token);

        if (token) {
            const customerId = customerData.ID;
            const dataToUpdate = {
                fullName: customerData.Name,
                email: customerData.Email,
                phoneNumber: customerData.Contact,
                age: customerData.Age,
                country: customerData.Country,
                customerStatus: customerData.CustomerStatus,
                invoiceType: customerData.InvoiceType,
                billingInformation: {
                    invoiceStatus: customerData.BillingInformation.InvoiceStatus,
                    trId: customerData.BillingInformation.TrId,
                    address: customerData.BillingInformation.Address,
                    fullName: customerData.BillingInformation.FullName,
                    companyName: customerData.BillingInformation.CompanyName,
                    taxNumber: customerData.BillingInformation.TaxNumber,
                    taxOffice: customerData.BillingInformation.TaxOffice,
                },
                rememberMe: customerData.RememberMe,
                termsAndConditionsApproved: customerData.TermsAndConditionsApproved,
            };

            // Dispatch the update action
            dispatch(updateAdminCustomer({ customerId, data: dataToUpdate, token }));
            console.log('Data to be sent for update: ', dataToUpdate);
        } else {
            console.error('Authorization token is missing!');
        }
    };

    // Handler for editing a customer
    const handleEdit = (id: string) => {
        const customer = customers.find((customer) => customer.ID === id);
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
            selector: (row: any) => row.ID,
            sortable: true,
            width: "80px",
        },
        {
            name: "User Info",
            cell: (row: any) => (
                <div className="flex items-center space-x-2">
                    <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold">{row.Name}</p>
                        <p className="text-sm whitespace-nowrap text-gray-500">
                            {row.Email.length > 12 ? `${row.Email.substring(0, 20)}...` : row.Email}
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
            selector: (row: any) => row.Contact,
            sortable: true,
        },
        {
            name: "Age",
            selector: (row: any) => row.Age,
            sortable: true,
            width: "100px",
        },
        {
            name: "Country",
            selector: (row: any) => row.Country,
            sortable: true,
        },
        {
            name: "Status",
            cell: (row: any) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${row.status === "Verified"
                        ? "text-green-700 bg-green-100"
                        : row.status === "Pending"
                            ? "text-yellow-700 bg-yellow-100"
                            : "text-red-700 bg-red-100"
                        }`}
                >
                    {row.Status}
                </span>
            ),
            sortable: true,
            width: "150px",
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <TableActions onDelete={handleDelete} onEdit={handleEdit} onView={handleView} id={row.ID} />
            ),
            width: "150px",
        },
    ], [handleDelete, handleEdit, handleView]);

    // Filtered customers based on search
    const filteredCustomers = React.useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return customers.filter((customer) => (
            (customer.Name?.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (customer.Email?.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (customer.Contact?.includes(lowerCaseSearchTerm)) ||
            (customer.Country?.toLowerCase().includes(lowerCaseSearchTerm))
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
                            Export
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
