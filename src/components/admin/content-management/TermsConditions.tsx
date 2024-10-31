"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import CustomModelAdmin from '../../modal/CustomModelAdmin';
import ModalTerms from "./sub-content/ModalTerms";
import { FaFileCsv } from "react-icons/fa";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

// Define the Page interface
export interface Page {
  id: number;
  number: number;
  title: string;
  url: string;
}

// Initial pages data
const initialPages: Page[] = [
  { id: 1, number: 1, title: "Terms and Conditions", url: "/terms_and_conditions" },
  { id: 2, number: 2, title: "Cookie Policy", url: "/cookie_policy" },
  { id: 3, number: 3, title: "Privacy Policy", url: "/privacy_policy" },
  { id: 4, number: 4, title: "GDPR", url: "/gdpr" },
  { id: 5, number: 5, title: "Sales Contract", url: "/sales_contract" },
];

const TermsConditions: React.FC = () => {
  const [pages, setPages] = useState(initialPages);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Page>();

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      width: "60px",
    },
    {
      name: "Page Title",
      selector: (row: any) => row.title,
      sortable: true,
      width: "300px",
    },
    {
      name: "URL",
      selector: (row: any) => row.url,
      sortable: true,
      width: "200px",
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
      ["#", "Page Title", "URL"],
      ...pages.map(page => [page.number, page.title, page.url]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "pages.csv");
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
            <button onClick={openModal} className="px-4 py-2 ButtonBlue text-white rounded-md">
              Add
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
            data={filteredPages}
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
        <ModalTerms />
      </CustomModelAdmin>
    </div>
  );
};

export default TermsConditions;
