"use client";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaFileCsv } from "react-icons/fa";
import { TableColumn } from "react-data-table-component";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import CustomModelAdmin from '../../../modal/CustomModelAdmin'
import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });


// Define the Customer interface
interface Customer {
    id: number;
    name: string;
    email: string;
    contact: string;
    age: number;
    country: string;
    status: "Verified" | "Pending" | "Rejected";
    invoiceType: string;
    tcNumber?: string;
    companyTitle?: string;
    taxNumber?: string;
    taxOffice?: string;
    address?: string;
}

// Sample customers data
const initialCustomers: Customer[] = [
    {
        id: 100,
        name: "Earl Parrini",
        email: "sah@gmail.com",
        contact: "+1 (965) 886-4355",
        age: 55,
        country: "Russia",
        status: "Verified",
        invoiceType: ''
    },
    {
        id: 99,
        name: "Nora Willis",
        email: "ket@gmail.com",
        contact: "+1 (382) 858-5995",
        age: 63,
        country: "Kenya",
        status: "Pending",
        invoiceType: ''
    },
    // Add more customers here...
];

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Customer>();

    // Edit a customer
    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setShowEditForm(true);
        reset(customer); // Populate form with customer data
    };

    // Save edited customer details
    const onSubmit: SubmitHandler<Customer> = (data) => {
        if (editingCustomer) {
            setCustomers((prev) =>
                prev.map((customer) =>
                    customer.id === editingCustomer.id ? { ...data, id: customer.id } : customer
                )
            );
            setEditingCustomer(null);
            setShowEditForm(false);
        } else {
            // Add new customer
            const newCustomer: Customer = { ...data, id: Math.max(...customers.map(c => c.id)) + 1 }; // Generate a new ID
            setCustomers((prev) => [...prev, newCustomer]);
            setShowEditForm(false);
        }
    };

    // Delete a customer
    const handleDelete = (id: number) => {
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    };

    // Export customers data to CSV
    const exportToCSV = () => {
        const csvRows = [
            ["ID", "Name", "Email", "Contact", "Age", "Country", "Status"], // Header
            ...customers.map(customer => [
                customer.id,
                customer.name,
                customer.email,
                customer.contact,
                customer.age,
                customer.country,
                customer.status,
            ]),
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "customers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Form for editing customer
    const EditCustomerForm = () => {
        if (!editingCustomer && !showEditForm) return null;

        return (
            <div className="p-4 my-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: "Name is required" })}
                            className="p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                            className="p-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        <input
                            type="text"
                            placeholder="Contact"
                            {...register("contact", { required: "Contact is required" })}
                            className="p-2 border rounded"
                        />
                        {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}

                        <input
                            type="number"
                            placeholder="Age"
                            {...register("age", { valueAsNumber: true })}
                            className="p-2 border rounded"
                        />

                        <input
                            type="text"
                            placeholder="Country"
                            {...register("country", { required: "Country is required" })}
                            className="p-2 border rounded"
                        />
                        {errors.country && <p className="text-red-500">{errors.country.message}</p>}

                        <select
                            {...register("status", { required: "Status is required" })}
                            className="p-2 border rounded"
                        >
                            <option value="Verified">Verified</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 ButtonBlue text-white rounded-md mr-2"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowEditForm(false);
                                reset(); // Reset form for new customer
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    // Filter customers based on search term
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.includes(searchTerm) ||
        customer.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Define table columns
    const columns: TableColumn<Customer>[] = [
        {
            name: "#",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "User Info",
            cell: (row) => (
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
            name: "Contact",
            selector: (row) => row.contact,
            sortable: true,
        },
        {
            name: "Age",
            selector: (row) => row.age,
            sortable: true,
            width: "100px",
        },
        {
            name: "Country",
            selector: (row) => row.country,
            sortable: true,
        },
        {
            name: "Status",
            cell: (row) => (
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
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(row)}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(row.id)}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            ),
            width: "150px",
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [invoiceType, setInvoiceType] = useState('Bireysel');

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
                            <div className="text-lg font-semibold px-4 py-2 border-b-2 border-gray-200">New Customer</div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-row justify-end ">
                                    <div className="mt-20 ml-16"><Image width={30} height={30} src="/icons/avatar.png" alt="avatar" className="w-24 h-w-24 rounded-full" /></div>
                                    <div className="p-16">
                                        <div>
                                            <div className='flex flex-row col-span-2 '>
                                                <div className='flex flex-col mb-2 sm:mb-3 lg:mb-4 w-1/2 pr-2'> {/* Add width and padding */}
                                                    <label>Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Name"
                                                        {...register('name')}
                                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                                    />
                                                </div>
                                                <div className='flex flex-col sm:mb-3 w-1/2 pl-2'> {/* Add width and padding */}
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        {...register('email')}
                                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-row col-span-2 '>
                                                <div className='flex flex-col w-1/2 pr-2'> {/* Add width and padding */}
                                                    <label>Contact</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your phone number"
                                                        {...register('contact')}
                                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                                    />
                                                </div>
                                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-1/2 pl-2'> {/* Add width and padding */}
                                                    <label>Age</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your age"
                                                        {...register('age')}
                                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        {/* Fatura Bilgileri */}
                                        <div className="mb-4 p-4 sm:mb-6 sm:p-6 lg:mb-6 lg:px-4 lg:py-2 flex flex-col lg:flex-row lg:space-x-16 border-2 border-gray-200">
                                            <h2 className="text-lg font-semibold mb-4 whitespace-normal lg:whitespace-nowrap">Fatura Bilgileri</h2>
                                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Left side for personal or corporate details */}
                                                <div>
                                                    <label className="block mb-2">Fatura Türü:</label>
                                                    <select
                                                        {...register('invoiceType')}
                                                        value={invoiceType}
                                                        onChange={(e) => setInvoiceType(e.target.value)}
                                                        className=" font-medium px-1 py-0.5 border rounded-md focus:outline-none"
                                                    >
                                                        <option value="Bireysel">Bireysel</option>
                                                        <option value="Kurumsal">Kurumsal</option>
                                                    </select>

                                                    {invoiceType === 'Bireysel' && (
                                                        <>
                                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                                <p className="mt-4">Ad Soyad:</p>
                                                                <p className='font-medium'>
                                                                    <input
                                                                        type="text"
                                                                        {...register('name')}
                                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                                    />

                                                                </p>
                                                            </div>
                                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                                <p>T.C. Kimlik No:</p>
                                                                <p className='font-medium'>
                                                                    <input
                                                                        type="text"
                                                                        {...register('tcNumber')}
                                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                                    />
                                                                </p>
                                                            </div>
                                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                                <p>Fatura Adresi:</p>
                                                                <p className='font-medium whitespace-normal lg:whitespace-nowrap'>

                                                                    <input
                                                                        type="text"
                                                                        {...register('address')}
                                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                                    />

                                                                </p>
                                                            </div>
                                                        </>
                                                    )}

                                                    {invoiceType === 'Kurumsal' && (
                                                        <>
                                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                                <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-4">Şirket Ünvanı:</p>
                                                                <p className='font-medium'>

                                                                    <input
                                                                        type="text"
                                                                        {...register('companyTitle')}
                                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                                    />

                                                                </p>
                                                            </div>
                                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                                <p>Vergi Numarası / TCKN</p>
                                                                <p className='font-medium'>

                                                                    <input
                                                                        type="text"
                                                                        {...register('taxNumber')}
                                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                                    />

                                                                </p>
                                                            </div>
                                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                                <p>Vergi Dairesi:</p>
                                                                <p className='font-medium'>

                                                                    <input
                                                                        type="text"
                                                                        {...register('taxOffice')}
                                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                                    />

                                                                </p>
                                                            </div>
                                                            <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4'>
                                                                <p>Fatura Adresi:</p>
                                                                <p className='font-medium whitespace-normal lg:whitespace-nowrap'>

                                                                    <input
                                                                        type="text"
                                                                        {...register('address')}
                                                                        className="font-medium border px-1 py-0.5 rounded-md focus:outline-none"
                                                                    />

                                                                </p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 ButtonBlue text-white rounded-md mr-2"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>

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


                <EditCustomerForm />
            </div>
        </div>
    );
};

export default Customers;
