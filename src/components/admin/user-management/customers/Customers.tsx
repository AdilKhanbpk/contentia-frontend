"use client";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaFileCsv, FaEye  } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler } from "react-hook-form";
import EditCustomerForm from "./sub-customer/EditCustomerForm"; // Import the new component
import CustomModelAdmin from '../../../modal/CustomModelAdmin'

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

export interface Customer {
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

const initialCustomers: Customer[] = [
    { id: 100, name: "Earl Parrini", email: "sah@gmail.com", contact: "+1 (965) 886-4355", age: 55, country: "Russia", status: "Verified", invoiceType: '' },
    { id: 99, name: "Nora Willis", email: "ket@gmail.com", contact: "+1 (382) 858-5995", age: 63, country: "Kenya", status: "Pending", invoiceType: '' },
];

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Customer>();

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setShowEditForm(true);
        reset(customer);
    };

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
            const newCustomer: Customer = { ...data, id: Math.max(...customers.map(c => c.id)) + 1 };
            setCustomers((prev) => [...prev, newCustomer]);
            setShowEditForm(false);
        }
    };

    const handleDelete = (id: number) => {
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    };

    const exportToCSV = () => {
        const csvRows = [
            ["ID", "Name", "Email", "Contact", "Age", "Country", "Status"],
            ...customers.map(c => [c.id, c.name, c.email, c.contact, c.age, c.country, c.status]),
        ];
        const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "customers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    // Filter customers based on search term
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.includes(searchTerm) ||
        customer.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Define table columns
    const columns = [
        {
            name: "#",
            selector: (row: any) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "User Info",
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
            name: "Contact",
            selector: (row: any) => row.contact,
            sortable: true,
        },
        {
            name: "Age",
            selector: (row: any) => row.age,
            sortable: true,
            width: "100px",
        },
        {
            name: "Country",
            selector: (row: any) => row.country,
            sortable: true,
        },
        {
            name: "Status",
            cell: (row: any) => (
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
            cell: (row: any) => (
                <div className="flex space-x-3">
                    <button className="text-gray-500 hover:text-gray-700">
                        <FaEye className="text-lg" /> {/* Adjust size here */}
                    </button>

                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(row)}>
                        <FaEdit className="text-lg" /> {/* Adjust size here */}
                    </button>

                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(row.id)}>
                        <FaTrashAlt className="text-md" /> {/* Adjust size here */}
                    </button>
                </div>
            ),
            width: "150px",
        },
    ];

    const [invoiceType, setInvoiceType] = useState('Bireysel');
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
                    <div className="flex flex-col md:flex-row md:space-x-2">
                        <button
                            className="px-1 md:px-4 py-0.5 md:py-2 ButtonBlue text-white rounded-md"
                            onClick={openModal}
                        >
                            Add Customer
                        </button>
                        <CustomModelAdmin isOpen={isModalOpen} closeModal={closeModal} title="">
                            <div className="text-lg font-semibold px-4 py-2 border-b-2 border-gray-200">New Customer</div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col md:flex-row justify-end ">
                                    <div className="mt-2 ml-2 md:mt-20 md:ml-16"><Image width={30} height={30} src="/icons/avatar.png" alt="avatar" className="w-24 h-w-24 rounded-full" /></div>
                                    <div className="p-2 md:p-16">
                                        <div>
                                            <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                                <div className='flex flex-col mb-2 sm:mb-3 lg:mb-4 w-full md:w-1/2 pr-2'> {/* Add width and padding */}
                                                    <label>Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Name"
                                                        {...register('name')}
                                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                                    />
                                                </div>
                                                <div className='flex flex-col sm:mb-3 w-full md:w-1/2 pl-2'> {/* Add width and padding */}
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        {...register('email')}
                                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row col-span-1 md:col-span-2 '>
                                                <div className='flex flex-col w-full md:w-1/2 md:pr-2'> {/* Add width and padding */}
                                                    <label>Contact</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your phone number"
                                                        {...register('contact')}
                                                        className="font-medium border px-1 py-1 rounded-md focus:outline-none"
                                                    />
                                                </div>
                                                <div className='flex flex-col mb-2 sm:mb-3 md:mb-4 lg:mb-4 w-full md:w-1/2 pl-2'> {/* Add width and padding */}
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
                            className="px-1 md:px-4 py-0.5 md:py-2 bg-green-500 text-white rounded-md"
                            onClick={exportToCSV}
                        >
                            Export CSV <FaFileCsv className="inline ml-2" />
                        </button>
                    </div>
                </div>

                <div className="shadow-md">
                    <DataTable // Removed the type argument <Customer>
                        columns={columns} // No need for type casting here
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


                {/* Conditional render of the edit form */}
                {showEditForm && (
                    <EditCustomerForm
                        editingCustomer={editingCustomer}
                        onSubmit={onSubmit}
                        setShowEditForm={setShowEditForm}
                        reset={reset}
                        errors={errors}
                        register={register}
                        handleSubmit={handleSubmit}
                    />
                )}

            </div>
        </div>
    );
};

export default Customers;
