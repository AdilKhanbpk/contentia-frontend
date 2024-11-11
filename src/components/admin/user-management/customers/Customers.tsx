'use client';

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchAdminCustomers } from "@/store/features/admin/customersSlice";
import { deleteAdminCustomer } from "@/store/features/admin/customersSlice";
import { updateAdminCustomer } from "@/store/features/admin/customersSlice";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import Modal from "./sub-customer/Modal";
import ModalTwo from "./sub-customer/ModalTwo";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";

// In the file where the Customer interface is defined (e.g., Customers.tsx)
export interface Customer {
    id: string; // or number, depending on your setup
    name: string;
    email: string;
    contact: string;
    age: string | number;
    country: string;
    status: "Verified" | "Pending" | "Rejected";
    invoiceType: string;  // Make sure invoiceType is included
    tcNumber?: string;
    companyTitle?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
}

const Customers: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: customers = [], loading, error } = useSelector((state: RootState) => state.adminCustomers || { data: [], loading: false, error: null });

    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [customer, setCustomer] = useState<Customer[]>([]);

    const { register, handleSubmit, reset } = useForm<Customer>();

    const [token, setToken] = useState<string | null>(null);


    // Delete function with token retrieval
    const handleDelete = (id: string) => {
        console.log("Delete button clicked, customer ID:", id);

        const tokenFromStorage = localStorage.getItem('accessToken'); // Get the latest token directly from storage
        if (tokenFromStorage) {
            console.log("Token found in localStorage:", tokenFromStorage);

            dispatch(deleteAdminCustomer({ customerId: id, token: tokenFromStorage }))
                .unwrap()
                .then(() => {
                    console.log("Customer deleted successfully, updating local state");
                    // Update local state to remove customer
                    setCustomer((prev) => prev.filter((customer) => customer.id !== id));
                })
                .catch((error: any) => {
                    const errorMessage = error.message || JSON.stringify(error);
                    console.error("Delete failed:", errorMessage);
                    alert("Failed to delete customer: " + errorMessage);
                });
        } else {
            console.warn("Authorization token is missing.");
            alert("Authorization token is missing.");
        }
    };

    // Fetch admin customers when the token is set
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('accessToken');
        setToken(tokenFromStorage);

        if (tokenFromStorage) {
            dispatch(fetchAdminCustomers(tokenFromStorage));
        }
    }, [dispatch, handleDelete]);

    const handleEdit = (customer: Customer) => {
        console.log("Edit button clicked for customer:", customer);
      
        setEditingCustomer(customer); // Sets the customer to be edited in the form
        openModalEdit();
        reset(customer); // Resets form with customer data
      };
      
      const handleSaveEdit = (customerId: string, updatedData: any) => {
        const tokenFromStorage = localStorage.getItem('accessToken'); // Retrieve token directly
      
        console.log("Attempting to save updated data for customer:", customerId);
        console.log("Updated data to send:", updatedData);
      
        if (tokenFromStorage) {
          dispatch(updateAdminCustomer({ customerId, data: updatedData, token: tokenFromStorage }))
            .unwrap()
            .then((updatedCustomer:any) => {
              console.log("Customer updated successfully:", updatedCustomer);
              setEditingCustomer(null); // Clear editing state
              // Update local state or trigger a re-fetch if necessary
            })
            .catch((error: any) => {
              const errorMessage = error.message || JSON.stringify(error);
              console.error("Update failed:", errorMessage);
              alert("Failed to update customer: " + errorMessage);
            });
        } else {
          console.warn("Authorization token is missing.");
          alert("Authorization token is missing.");
        }
      };

    const onSubmit: SubmitHandler<Customer> = (data) => {
        if (editingCustomer) {
            setCustomer((prev: any) =>
                prev.map((customer: Customer) =>
                    customer.id === editingCustomer.id ? { ...data, id: customer.id } : customer
                )
            );
            setEditingCustomer(null);
        } else {
            const newCustomer: Customer = { ...data, id: (Math.max(...customers.map(c => parseInt(c.id))) + 1).toString() };
            setCustomer((prev: any) => [...prev, newCustomer]);
        }
    };

    


    const handleExport = () => {
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
    };

    const filteredCustomers = customers.filter((customer) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return (
            (customer.Name && customer.Name.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (customer.Email && customer.Email.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (customer.Contact && customer.Contact.includes(lowerCaseSearchTerm)) ||
            (customer.Country && customer.Country.toLowerCase().includes(lowerCaseSearchTerm))
        );
    });

    const columns = [
        {
            name: "#",
            selector: (row: any) => row.ID,
            sortable: true,
            width: "80px",
        },
        {
            name: "User  Info",
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
                <div className="flex space-x-3">
                    <button className="text-gray-500 hover:text-gray-700">
                        <FaEye className="text-lg" />
                    </button>

                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(row.ID)}>
                        <FaEdit className="text-lg" />
                    </button>

                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(row.ID)}>
                        <FaTrashAlt className="text-md" />
                    </button>
                </div>
            ),
            width: "150px",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const openModalEdit = () => setIsModalEditOpen(true);
    const closeModalEdit = () => setIsModalEditOpen(false);

    return (
        <div className="bg-white rounded-lg">
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <CustomTable
                    columns={columns}
                    data={filteredCustomers}
                    onExport={handleExport}
                    showAddCustomerModal={openModal}
                    showEditCustomerModal={openModalEdit}
                    addButtonText="Add Customer"
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                />
                <CustomModelAdmin isOpen={isModalOpen} closeModal={closeModal} title="Add Customer">
                    <Modal />
                </CustomModelAdmin>

                <CustomModelAdmin isOpen={isModalEditOpen} closeModal={closeModalEdit} title="Edit Customer">
                    <ModalTwo customer={editingCustomer} onSaveEdit={handleSaveEdit} closeModal={closeModalEdit} />
                </CustomModelAdmin>
            </div>
        </div>
    );
};

export default Customers;