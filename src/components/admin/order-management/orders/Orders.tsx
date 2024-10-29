"use client";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaFileCsv, FaEye } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomModelAdmin from '../../../modal/CustomModelAdmin'
import NewModal from "../sub-order/NewModal";
import EditModal from "../sub-order/EditModal";
import RequestModal from "../sub-order/RequestModal";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

// Define the Order interface
export interface Order {
    id: number;
    name: string;
    email: string;
    contact: string;
    orderID: number; // Updated field name for Order ID
    orderDate: string; // Updated field name for Order Date
    noOfUGC: number; // Updated field name for No of UGC
    creatorsAssigned: number; // Updated field name for Creators Assigned
    noOfUGCCompleted: number; // Updated field name for No of UGC Completed
    status: "Verified" | "Pending" | "Rejected";
}

// Initial orders data
const initialOrders: Order[] = [
    { id: 100, name: "Earl Parrini", email: "sah@gmail.com", contact: "+1 (965) 886-4355", orderID: 1, orderDate: "2023-10-01", noOfUGC: 5, creatorsAssigned: 2, noOfUGCCompleted: 5, status: "Verified" },
    { id: 99, name: "Nora Willis", email: "ket@gmail.com", contact: "+1 (382) 858-5995", orderID: 2, orderDate: "2023-10-02", noOfUGC: 3, creatorsAssigned: 1, noOfUGCCompleted: 2, status: "Pending" },
];

const Orders: React.FC = () => {
    const [customers, setCustomers] = useState(initialOrders);
    const [editingCustomer, setEditingCustomer] = useState<Order | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Order>();

    const handleEdit = (customer: Order) => {
        setEditingCustomer(customer);
        setShowEditForm(true);
        reset(customer);
    };

    const handleDelete = (id: number) => {
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    };

    // Filter customers based on search term
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.includes(searchTerm)
    );

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const openModalEdit = () => setIsModalEditOpen(true);
    const closeModalEdit = () => setIsModalEditOpen(false);

    const [isModalRequestsOpen, setIsModalRequestsOpen] = useState(false);

    const openModalRequests = () => setIsModalRequestsOpen(true);
    const closeModalRequests = () => setIsModalRequestsOpen(false);

    // Define table columns
    const columns = [
        {
            name: "#",
            selector: (row: any) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Customer Name",
            cell: (row: any) => (
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
            name: "Order ID",
            selector: (row: any) => row.orderID,
            sortable: true,
            width: "200px",
        },
        {
            name: "Order Date",
            selector: (row: any) => row.orderDate,
            sortable: true,
            width: "200px",
        },
        {
            name: "No of UGC",
            selector: (row: any) => row.noOfUGC,
            sortable: true,
            width: "200px",
        },
        {
            name: "Creators Assigned",
            selector: (row: any) => row.creatorsAssigned,
            sortable: true,
            width: "200px",
        },
        {
            name: "No of UGC Completed",
            selector: (row: any) => row.noOfUGCCompleted,
            sortable: true,
            width: "270px",
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
                    {row.status}
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

                    <button className="text-blue-500 hover:text-blue-700" onClick={openModalEdit}>
                        <FaEdit className="text-lg" />
                    </button>

                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(row.id)}>
                        <FaTrashAlt className="text-md" />
                    </button>

                    <button onClick={openModalRequests} className="text-gray-500 hover:text-gray-700">
                        <Image width={20} height={20} src='/icons/creatorRequest.png' alt="creator request icon" />
                    </button>
                </div>
            ),
            width: "150px",
        },
    ];

    // Function to export to CSV
    const exportToCSV = () => {
        const csvRows = [
            ["ID", "Name", "Email", "Contact", "Order ID", "Order Date", "No of UGC", "Creators Assigned", "No of UGC Completed", "Status"],
            ...initialOrders.map(order => [order.id, order.name, order.email, order.contact, order.orderID, order.orderDate, order.noOfUGC, order.creatorsAssigned, order.noOfUGCCompleted, order.status]),
        ];
        const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-5 bg-white rounded-lg ">
            <div className='flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28'>
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="p-2 border border-gray-300 rounded-lg mr-4"
                        />
                    </div>
                    <div className="space-x-2">
                        <button
                            className="px-4 py-2 ButtonBlue text-white rounded-md"
                            onClick={openModal}
                        >
                            Add Customer
                        </button>
                        <CustomModelAdmin isOpen={isModalOpen} closeModal={closeModal} title="">
                            <NewModal></NewModal>
                        </CustomModelAdmin>

                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            onClick={exportToCSV}
                        >
                            Export CSV <FaFileCsv className="inline ml-2" />
                        </button>
                    </div>
                </div>

                <div className="shadow-md">
                    <DataTable // Removed the type argument <Customer>
                        columns={columns} // No need for type casting here
                        data={filteredCustomers}
                        pagination
                        customStyles={{
                            rows: {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: "500",
                                },
                            },
                            headRow: {
                                style: {
                                    fontSize: "16px", // Optional: Set the font size for header
                                    fontWeight: "600", // Set to '600' for font-semibold
                                    backgroundColor: "#f8f8f8", // Optional: Background color for header
                                },
                            },
                            headCells: {
                                style: {
                                    fontWeight: "600", // Font weight for header cells
                                    color: "#333", // Optional: Text color for header
                                },
                            },
                        }}
                    />

                </div>
            </div>

            <CustomModelAdmin isOpen={isModalEditOpen} closeModal={closeModalEdit} title="">
                <EditModal />
            </CustomModelAdmin>

            <CustomModelAdmin isOpen={isModalRequestsOpen} closeModal={closeModalRequests} title="">
                <RequestModal />
            </CustomModelAdmin>
            
        </div>
    );
};

export default Orders;
