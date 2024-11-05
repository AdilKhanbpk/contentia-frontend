"use client";
import React, { useState, useCallback } from "react";
import { FaCheck, FaTimes, FaEye, FaFileCsv } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler } from "react-hook-form";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

export interface Creator {
  id: number;
  name: string;
  email: string;
  contact: string;
  totalOrders: number;
  country: string;
  status: "Verified" | "Pending" | "Rejected";
}

const initialCreators: Creator[] = [
  { id: 100, name: "Earl Parrini", email: "sah@gmail.com", contact: "+1 (965) 886-4355", totalOrders: 55, country: "Russia", status: "Verified" },
  { id: 99, name: "Nora Willis", email: "ket@gmail.com", contact: "+1 (382) 858-5995", totalOrders: 63, country: "Kenya", status: "Pending" },
];

const RequestModal: React.FC = () => {
  const [customers, setCustomers] = useState<Creator[]>(initialCreators);
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Creator>();

  const handleEdit = useCallback((customer: Creator) => {
    setEditingCreator(customer);
    setShowEditForm(true);
    reset(customer);
  }, [reset]);

  const onSubmit: SubmitHandler<Creator> = (data) => {
    if (editingCreator) {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === editingCreator.id ? { ...data, id: customer.id } : customer
        )
      );
      setEditingCreator(null);
      setShowEditForm(false);
    } else {
      const newCustomer: Creator = { ...data, id: Math.max(...customers.map(c => c.id)) + 1 };
      setCustomers((prev) => [...prev, newCustomer]);
      setShowEditForm(false);
    }
  };

  const handleDelete = useCallback((id: number) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  }, []);

  const exportToCSV = () => {
    const csvRows = [
      ["ID", "Name", "Email", "Contact", "Total Orders", "Country", "Status"],
      ...customers.map(c => [c.id, c.name, c.email, c.contact, c.totalOrders, c.country, c.status]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.includes(searchTerm) ||
    customer.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "#",
      selector: (row: any) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Creator Name",
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
      grow: 2,
    },
    {
      name: "Creator ID",
      selector: (row: any) => row.contact,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      cell: (row: any) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${row.status === "Verified"
            ? "text-green-700 bg-green-100"
            : row.status === "Pending"
              ? "text-blue-700 bg-blue-100"
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
          <button className="text-green-500 hover:text-green-700">
            <FaCheck className="text-lg" />
          </button>
          <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(row.id)}>
            <FaTimes className="text-lg" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FaEye className="text-lg" />
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="p-5 bg-white rounded-lg ">
      <div className='flex flex-col lg:mt-8'>
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
            >
              Add Customer
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
    </div>
  );
};

export default RequestModal;
