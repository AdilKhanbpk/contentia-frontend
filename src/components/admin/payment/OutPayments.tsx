"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes, FaEye, FaFileCsv } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import CustomModelAdmin from '../../modal/CustomModelAdmin'
import ModalTwo from "./sub-payment/ModelTwo";


const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

// Define the Order interface
export interface Order {
  id: number;
  creatorName: string;
  creatorSurname: string;
  paymentID: number;
  paymentDate: string;
  amountPaid: string;
  paymentStatus: string;
  cancelRefund: string;
}

// Initial orders data
const initialOrders: Order[] = [
  { id: 1, creatorName: "Saud", creatorSurname: "Khan", paymentID: 9080124, paymentDate: "19/09/2024", amountPaid: "25,000 TL", paymentStatus: "Success", cancelRefund: "Not Refunded" },
  { id: 2, creatorName: "Kagan", creatorSurname: "Sahin", paymentID: 9193824, paymentDate: "22/08/2024", amountPaid: "100,000 TL", paymentStatus: "Success", cancelRefund: "Refunded" },
  { id: 3, creatorName: "Ahmed", creatorSurname: "Barut", paymentID: 9084734, paymentDate: "10/08/2024", amountPaid: "45,000 TL", paymentStatus: "Success", cancelRefund: "Not Refunded" },
];

const OutPayments: React.FC = () => {
  const [creators, setCreators] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Order>();

  // Filter customers based on search term
  const filteredCustomers = creators.filter((creator) =>
    creator.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.creatorSurname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Define table columns
  const columns = [
    {
      name: "Order ID",
      selector: (row: any) => row.id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Creator Name",
      selector: (row: any) => row.creatorName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Creator Surname",
      selector: (row: any) => row.creatorSurname,
      sortable: true,
      width: "200px",
    },
    {
      name: "Payment ID",
      selector: (row: any) => row.paymentID,
      sortable: true,
      width: "150px",
    },
    {
      name: "Payment Date",
      selector: (row: any) => row.paymentDate,
      sortable: true,
      width: "150px",
    },
    {
      name: "Amount Paid",
      selector: (row: any) => row.amountPaid,
      sortable: true,
      width: "150px",
    },
    {
      name: "Payment Status",
      selector: (row: any) => row.paymentStatus,
      sortable: true,
      width: "150px",
    },
    {
      name: "Cancel / Refund",
      selector: (row: any) => row.cancelRefund,
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-3">
          <button className="text-green-500 hover:text-green-700">
            <FaCheck className="text-lg" />
          </button>
          <button className="text-red-500 hover:text-red-700" >
            <FaTimes className="text-lg" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FaEye className="text-lg" onClick={openModal}/>
          </button>
        </div>
      ),
      width: "200px",
    },
  ];

  // Function to export to CSV
  const exportToCSV = () => {
    const csvRows = [
      ["Order ID", "Customer Name", "Customer Surname", "Payment ID", "Payment Date", "Amount Paid", "Payment Status", "Cancel / Refund"],
      ...initialOrders.map(order => [order.id, order.creatorName, order.creatorSurname, order.paymentID, order.paymentDate, order.amountPaid, order.paymentStatus, order.cancelRefund]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-5 bg-white rounded-lg">
      <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-lg"
          />
          <div className="space-x-2">
            <button
              className="px-4 py-2 ButtonBlue text-white rounded-md"
            >
              Add Customer
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={exportToCSV}
            >
              Export CSV <FaFileCsv className="inline ml-2" />
            </button>
          </div>
        </div>

        <div className="shadow-md">
          <DataTable
            columns={columns}
            data={filteredCustomers}
            pagination
            customStyles={{
              rows: { style: { fontSize: "14px", fontWeight: "500" } },
              headRow: { style: { fontSize: "16px", fontWeight: "600", backgroundColor: "#f8f8f8" } },
              headCells: { style: { fontWeight: "600", color: "#333" } },
            }}
          />
        </div>
      </div>
      <CustomModelAdmin isOpen={isModalOpen} closeModal={closeModal} title="">
        <ModalTwo />
      </CustomModelAdmin>
    </div>
  );
};

export default OutPayments;
