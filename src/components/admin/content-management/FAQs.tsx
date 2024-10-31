"use client";
import React, { useState } from "react";
import { FaFileCsv } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import ModalFAQs from "./sub-content/ModalFAQs";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

// Define the FAQ interface
export interface FAQ {
  id: number;
  number: number;
  question: string;
  answer: string;
}

// Initial FAQs data
const initialFAQs: FAQ[] = [
  { id: 1, number: 1, question: "Contentia.io Nedir?", answer: "Contentia.io kullanıcıların içerik üreticilerle..." },
  { id: 2, number: 2, question: "FAQ 2", answer: "Answer 2" },
  { id: 3, number: 3, question: "FAQ 3", answer: "Answer 3" },
  { id: 4, number: 4, question: "FAQ 4", answer: "Answer 4" },
  { id: 5, number: 5, question: "FAQ 5", answer: "Answer 5" },
];

const FAQs: React.FC = () => {
  const [faqs, setFAQs] = useState(initialFAQs);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FAQ>();

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
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
      name: "FAQ",
      selector: (row: any) => row.question,
      sortable: true,
      width: "300px",
    },
    {
      name: "Answer",
      selector: (row: any) => row.answer,
      sortable: true,
      width: "400px",
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
      ["#", "FAQ", "Answer"],
      ...initialFAQs.map(faq => [faq.number, faq.question, faq.answer]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "faqs.csv");
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
            data={filteredFAQs}
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
        <ModalFAQs />
      </CustomModelAdmin>

    </div>
  );
};

export default FAQs;
