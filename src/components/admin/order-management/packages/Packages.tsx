"use client";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaFileCsv, FaEye } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import CustomModelAdmin from '../../../modal/CustomModelAdmin'
import NewPackage from "../sub-order/NewPackage";
import EditPackage from "../sub-order/EditPackage";
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

export interface Order {
    id: number;
    customerName: string;
    customerID: number;
    packageID: number;
    paymentID: number;
    paymentDate: string;
    packageType: number;
    contentsLeft: number;
    packageStatus: "Verified" | "Pending" | "Rejected";
}

const initialOrders: Order[] = [
    { id: 100, customerName: "Earl Parrini", customerID: 12412904, packageID: 901481, paymentID: 9284221, paymentDate: "21/10/2024", packageType: 3, contentsLeft: 2, packageStatus: "Verified" },
    { id: 99, customerName: "Nora Willis", customerID: 1903790, packageID: 201435, paymentID: 4254210, paymentDate: "14/09/2024", packageType: 12, contentsLeft: 8, packageStatus: "Pending" },
    { id: 98, customerName: "Lella Blanchi", customerID: 912041, packageID: 501657, paymentID: 4524108, paymentDate: "08/09/2024", packageType: 6, contentsLeft: 0, packageStatus: "Rejected" },
];

 const Packages: React.FC = () => {
    const [customers, setCustomers] = useState(initialOrders);
    const [editingCustomer, setEditingCustomer] = useState<Order | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    const {
        reset,
    } = useForm<Order>();

    const handleDelete = (id: number) => {
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerID.toString().includes(searchTerm) ||
        customer.packageID.toString().includes(searchTerm)
    );

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const openModalEdit = () => setIsModalEditOpen(true);
    const closeModalEdit = () => setIsModalEditOpen(false);

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
                        <p className="font-semibold">{row.customerName}</p>
                        <p className="text-sm whitespace-nowrap text-gray-500">{row.customerID}</p>
                    </div>
                </div>
            ),
            sortable: false,
            width: "200px",
        },
        {
            name: "Package ID",
            selector: (row: any) => row.packageID,
            sortable: true,
            width: "200px",
        },
        {
            name: "Payment ID",
            selector: (row: any) => row.paymentID,
            sortable: true,
            width: "200px",
        },
        {
            name: "Payment Date",
            selector: (row: any) => row.paymentDate,
            sortable: true,
            width: "200px",
        },
        {
            name: "Package Type",
            selector: (row: any) => row.packageType,
            sortable: true,
            width: "200px",
        },
        {
            name: "Contents Left",
            selector: (row: any) => row.contentsLeft,
            sortable: true,
            width: "200px",
        },
        {
            name: "Package Status",
            cell: (row: any) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${row.packageStatus === "Verified"
                        ? "text-green-700 bg-green-100"
                        : row.packageStatus === "Pending"
                            ? "text-yellow-700 bg-yellow-100"
                            : "text-red-700 bg-red-100"
                        }`}
                >
                    {row.packageStatus}
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

                </div>
            ),
            width: "150px",
        },
    ];

    const exportToCSV = () => {
        const csvRows = [
            ["ID", "Customer Name", "Customer ID", "Package ID", " Payment ID", "Payment Date", "Package Type", "Contents Left", "Package Status"],
            ...initialOrders.map(order => [order.id, order.customerName, order.customerID, order.packageID, order.paymentID, order.paymentDate, order.packageType, order.contentsLeft, order.packageStatus]),
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
        <div className=" bg-white rounded-lg ">
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
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
                    <div className="flex flex-col md:flex-row lg:space-x-2">
                        <button
                            className="px-1 md:px-4 py-0.5 md:py-2 ButtonBlue text-white rounded-md"
                            onClick={openModal}
                        >
                            New Package
                        </button>
                        <CustomModelAdmin isOpen={isModalOpen} closeModal={closeModal} title="">
                            <NewPackage></NewPackage>
                        </CustomModelAdmin>

                        <button
                            className="px-1 md:px-4 py-0.5 md:py-2 bg-green-500 text-white rounded-md"
                            onClick={exportToCSV}
                        >
                            Export CSV <FaFileCsv className="inline ml-2" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between mb-4">
                    <ul className="flex space-x-4">
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${activeTab === "All" ? "bg-gray-500 rounded  text-white" : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveTab("All")}
                            >
                                All
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${activeTab === "Active" ? "bg-gray-500 rounded  text-white" : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveTab("Active")}
                            >
                                Active
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${activeTab === "Completed" ? "bg-gray-500 rounded  text-white" : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveTab("Completed")}
                            >
                                Completed
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${activeTab === "Cancelled" ? "bg-gray-500 rounded  text-white" : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveTab("Cancelled")}
                            >
                                Cancelled
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="shadow-md">
                    <DataTable
                        columns={columns}
                        data={filteredCustomers.filter(customer => {
                            if (activeTab === "All") return true;
                            if (activeTab === "Active") return customer.packageStatus === "Pending";
                            if (activeTab === "Completed") return customer.packageStatus === "Verified";
                            if (activeTab === "Cancelled") return customer.packageStatus === "Rejected";
                            return false;
                        })}
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
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    backgroundColor: "#f8f8f8",
                                },
                            },
                            headCells: {
                                style: {
                                    fontWeight: "600",
                                    color: "#333",
                                },
                            },
                        }}
                    />

                </div>
            </div>

            <CustomModelAdmin isOpen={isModalEditOpen} closeModal={closeModalEdit} title="">
                <EditPackage />
            </CustomModelAdmin>

        </div>
    );
};

export default Packages;