"use client";
import React, { useState } from "react";
import { FaFileCsv } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import CustomModelAdmin from '../../modal/CustomModelAdmin';
import ModalCenters from "./sub-content/ModalCenters";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

// Define the Claim interface
export interface Claim {
  id: number;
  number: number;
  title: string;
  category: string;
}

// Initial claims data
const initialClaims: Claim[] = [
  { id: 1, number: 1, title: "UGC Siparişi", category: "Sipariş Oluşturma" },
  { id: 2, number: 2, title: "Paket Seçimi", category: "Sipariş Oluşturma" },
  { id: 3, number: 3, title: "Marka Yönetimi", category: "Sipariş Oluşturma" },
  { id: 4, number: 4, title: "İçer", category: "Sipariş Oluşturma" },
  { id: 5, number: 5, title: "Paket Seçimi", category: "Sipariş Oluşturma" },
  { id: 6, number: 6, title: "Paket Seçimi", category: "Sipariş Oluşturma" },
];

const HelpCenters: React.FC = () => {
  const [claims, setClaims] = useState(initialClaims);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Claim>();

  const filteredClaims = claims.filter((claim) =>
    claim.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Define table columns
  const columns = [
    {
      name: "#",
      selector: (row: any) => row.number,
      sortable: true,
      width: "100px",
    },
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
      width: "250px",
    },
    {
      name: "Category",
      selector: (row: any) => row.category,
      sortable: true,
      width: "250px",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <button className="ml-6 text-gray-500 hover:text-gray-700">
          <Image width={16} height={16} src='/pencil.png' alt="Edit Icon" />
        </button>
      ),
      width: "100px",
    },
  ];

  // Function to export to CSV
  const exportToCSV = () => {
    const csvRows = [
      ["#", "Title", "Category"],
      ...initialClaims.map(claim => [claim.number, claim.title, claim.category]),
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
              Add
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
        <ModalCenters />
      </CustomModelAdmin>

    </div>
  );
};

export default HelpCenters;