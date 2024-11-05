"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes, FaEye, FaFileCsv } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import CustomModelAdmin from '../../modal/CustomModelAdmin'
import Modal from "./sub-support/Modal";
import ModalTwo from "./sub-support/ModalTwo";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

// Define the Claim interface
export interface Claim {
  id: number;
  number: number;
  customerName: string;
  customerEmail: string;
  customerID: number;
  orderID: number;
  claimDate: string;
  claimStatus: string;
}

// Initial claims data
const initialClaims: Claim[] = [
  { id: 1, number: 100, customerName: "Earl Parrini", customerEmail: "sah@gmail.com", customerID: 901481, orderID: 9284221, claimDate: "21/10/2024", claimStatus: "Verified" },
  { id: 2, number: 99, customerName: "Nora Willis", customerEmail: "ket@gmail.com", customerID: 201435, orderID: 4254210, claimDate: "14/09/2024", claimStatus: "Pending" },
  { id: 3, number: 98, customerName: "Lelia Bianchi", customerEmail: "ulusozi@gmail.com", customerID: 801857, orderID: 4524108, claimDate: "08/09/2024", claimStatus: "Rejected" },
];

const Claims: React.FC = () => {
  const [claims, setClaims] = useState(initialClaims);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Claim>();

  // Filter customers based on search term
  const filteredClaims = claims.filter((claim) =>
    claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  const openModalTwo = () => setIsModalTwoOpen(true);
  const closeModalTwo = () => setIsModalTwoOpen(false);

  // Define table columns
  const columns = [
    {
      name: "#No",
      selector: (row: any) => row.number,
      sortable: true,
      width: "100px",
    },
    {
      name: "Customer Name",
      cell: (row: any) => (
        <div className="flex items-center space-x-2">
          <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="whitespace-nowrap">
            <div className="font-semibold">{row.customerName}</div>
            <div className="text-gray-500 text-sm">{row.customerEmail}</div>
          </div>
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Customer ID",
      selector: (row: any) => row.customerID,
      sortable: true,
      width: "150px",
    },
    {
      name: "Order ID",
      selector: (row: any) => row.orderID,
      sortable: true,
      width: "150px",
    },
    {
      name: "Claim Date",
      selector: (row: any) => row.claimDate,
      sortable: true,
      width: "150px",
    },
    {
      name: "Claim Status",
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-lg text-sm font-semibold ${
            row.claimStatus === "Verified" ? "bg-green-100 text-green-600" :
            row.claimStatus === "Pending" ? "bg-blue-100 text-blue-600" :
            "bg-red-100 text-red-600"
          }`}
        >
          {row.claimStatus}
        </span>
      ),
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
          <button className="text-red-500 hover:text-red-700">
            <FaTimes className="text-lg" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FaEye className="text-lg" onClick={openModalTwo}/>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  // Function to export to CSV
  const exportToCSV = () => {
    const csvRows = [
      ["#No", "Customer Name", "Customer Email", "Customer ID", "Order ID", "Claim Date", "Claim Count", "Assigned Count", "Claim Status"],
      ...initialClaims.map(claim => [claim.number, claim.customerName, claim.customerEmail, claim.customerID, claim.orderID, claim.claimDate, claim.claimStatus]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "claims.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" bg-white rounded-lg">
      <div className="flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-lg"
          />
          <div className="flex flex-col md:flex-row lg:space-x-2">
            <button onClick={openModal} className="px-1 md:px-4 py-0.5 md:py-2 ButtonBlue text-white rounded-md">
              Add Claims
            </button>
            <button
              className="px-1 md:px-4 py-0.5 md:py-2 bg-green-500 text-white rounded-md"
              onClick={exportToCSV}
            >
              Export CSV <FaFileCsv className="inline ml-2" />
            </button>
          </div>
        </div>

        <div className="shadow-md">
          <DataTable
            columns={columns}
            data={filteredClaims}
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
        <Modal />
      </CustomModelAdmin>

      <CustomModelAdmin isOpen={isModalTwoOpen} closeModal={closeModalTwo} title="">
        <ModalTwo />
      </CustomModelAdmin>

    </div>
  );
};

export default Claims;
