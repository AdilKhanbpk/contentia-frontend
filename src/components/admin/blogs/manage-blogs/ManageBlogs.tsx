"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes, FaEye, FaFileCsv } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import CustomModelAdmin from '../../../modal/CustomModelAdmin';
import Modal from "./sub-blogs/Modal";
import Image from "next/image";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

// Define the Blog interface
export interface Blog {
  id: number;
  number: number;
  creator: string;
  title: string;
  category: string;
  status: string;
  email: string;
}

// Initial blogs data
const initialBlogs: Blog[] = [
  { id: 1, number: 1, creator: "Earl Parrini", email: "sah@gmail.com", title: "Blog Title 1", category: "Tech", status: "Published" },
  { id: 2, number: 2, creator: "Earl Parrini", email: "sah@gmail.com", title: "Blog Title 2", category: "Health", status: "Draft" },
  { id: 3, number: 3, creator: "Earl Parrini", email: "sah@gmail.com", title: "Blog Title 3", category: "Finance", status: "Pending" },
];

const ManageBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Blog>();

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      name: "#",
      selector: (row: any) => row.number,
      sortable: true,
      width: "80px",
    },
    {
      name: "Creator",
      cell: (row: any) => (
        <div className="flex items-center space-x-2">
          <Image width={10} height={10} src="/icons/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{row.creator}</p>
            <p className="text-sm whitespace-nowrap text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
      sortable: false,
      width: "200px",
    },
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row: any) => row.category,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-lg text-sm font-semibold ${row.status === "Published" ? "bg-green-100 text-green-600" :
            row.status === "Draft" ? "bg-yellow-100 text-yellow-600" :
              "bg-blue-100 text-blue-600"
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

  // Function to export to CSV
  const exportToCSV = () => {
    const csvRows = [
      ["#", "Creator", "Title", "Category", "Status"],
      ...initialBlogs.map(blog => [blog.number, blog.creator, blog.title, blog.category, blog.status]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "blogs.csv");
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
              New Blog
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
            data={filteredBlogs}
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

export default ManageBlogs;
