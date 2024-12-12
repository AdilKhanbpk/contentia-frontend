"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes, FaEye, FaFileCsv } from "react-icons/fa";
import dynamic from "next/dynamic";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import Modal from "./sub-push/Modal";
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

export interface Claim {
  id: number;
  number: number;
  notificationID: string;
  orderID: number;
  claimDate: string;
  claimStatus: string;
}

const initialClaims: Claim[] = [
  { id: 1, number: 100, notificationID: "NF1001", orderID: 9284221, claimDate: "21/10/2024", claimStatus: "Verified" },
  { id: 2, number: 99, notificationID: "NF1002", orderID: 4254210, claimDate: "14/09/2024", claimStatus: "Pending" },
  { id: 3, number: 98, notificationID: "NF1003", orderID: 4524108, claimDate: "08/09/2024", claimStatus: "Rejected" },
];

const PushNotifies: React.FC = () => {
  const [claims, setClaims] = useState(initialClaims);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClaims = claims.filter((claim) =>
    claim.notificationID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  const openModalTwo = () => setIsModalTwoOpen(true);

  const columns = [
    {
      name: "#No",
      selector: (row: any) => row.number,
      sortable: true,
      width: "100px",
    },
    {
      name: "Notification ID",
      selector: (row: any) => row.notificationID,
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
            <FaEye className="text-lg" onClick={openModalTwo} />
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  const exportToCSV = () => {
    const csvRows = [
      ["#No", "Notification ID", "Order ID", "Claim Date", "Claim Status"],
      ...initialClaims.map(claim => [claim.number, claim.notificationID, claim.orderID, claim.claimDate, claim.claimStatus]),
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
          <div className="flex flex-col lg:flex-row lg:space-x-2">
            <button onClick={openModal} className="px-1 md:px-4 py-0.5 md:py-2 ButtonBlue text-white rounded-md">
              Push Notification
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
    
    </div>
  );
};

export default PushNotifies;
