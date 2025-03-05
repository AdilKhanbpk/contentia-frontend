"use client";
import { useCallback, useState } from "react";
import { FaFileCsv, FaEye } from "react-icons/fa";
import dynamic from "next/dynamic";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import Modal from "./sub-payment/Modal";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

const DataTable = dynamic(() => import("react-data-table-component"), {
    ssr: false,
});

export interface InvoiceInterface {
    id: number;
    paymentID: number;
    paymentDate: string;
    amountPaid: string;
    paymentStatus: string;
    cancelRefund: string;
}

const initialOrders: InvoiceInterface[] = [
    {
        id: 1,
        paymentID: 9080124,
        paymentDate: "19/09/2024",
        amountPaid: "25,000 TL",
        paymentStatus: "Success",
        cancelRefund: "Not Refunded",
    },
    {
        id: 2,
        paymentID: 9193824,
        paymentDate: "22/08/2024",
        amountPaid: "100,000 TL",
        paymentStatus: "Success",
        cancelRefund: "Refunded",
    },
    {
        id: 3,
        paymentID: 9084734,
        paymentDate: "10/08/2024",
        amountPaid: "45,000 TL",
        paymentStatus: "Success",
        cancelRefund: "Not Refunded",
    },
];

const InPayments: React.FC = () => {
    const [customers, setCustomers] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModals = useCallback(() => {
        setIsModalOpen(false);
    }, [dispatch]);

    // Filter customers based on search term
    const filteredCustomers = customers.filter(
        (customer) =>
            customer.paymentStatus
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            customer.paymentStatus
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: "Order ID",
            selector: (row: any) => row.id,
            sortable: true,
        },
        {
            name: "Payment ID",
            selector: (row: any) => row.paymentID,
            sortable: true,
        },
        {
            name: "Payment Date",
            selector: (row: any) => row.paymentDate,
            sortable: true,
        },
        {
            name: "Amount Paid",
            selector: (row: any) => row.amountPaid,
            sortable: true,
        },
        {
            name: "Payment Status",
            selector: (row: any) => row.paymentStatus,
            sortable: true,
        },
        {
            name: "Cancel / Refund",
            selector: (row: any) => row.cancelRefund,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row: any) => (
                <div className='flex space-x-3'>
                    <button className='text-blue-500 hover:text-blue-700'>
                        Invoice
                    </button>
                    <button className='text-red-500 hover:text-red-700'>
                        Refund
                    </button>
                    <button className='text-gray-500 hover:text-gray-700'>
                        <FaEye className='text-lg' />
                    </button>
                </div>
            ),
            width: "200px",
        },
    ];

    const exportToCSV = () => {
        const csvRows = [
            [
                "Order ID",
                "Payment ID",
                "Payment Date",
                "Amount Paid",
                "Payment Status",
                "Cancel / Refund",
            ],
            ...initialOrders.map((order) => [
                order.id,
                order.paymentID,
                order.paymentDate,
                order.amountPaid,
                order.paymentStatus,
                order.cancelRefund,
            ]),
        ];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            csvRows.map((e) => e.join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className=' bg-white rounded-lg'>
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className='flex justify-between mb-4'>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search...'
                        className='p-2 border border-gray-300 rounded-lg'
                    />
                    <div className='flex flex-col md:flex-row lg:space-x-2'>
                        <button
                            className='px-1 md:px-4 py-0.5 md:py-2 ButtonBlue text-white rounded-md'
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add Invoice
                        </button>

                        <button
                            className='px-1 md:px-4 py-0.5 md:py-2 bg-green-500 text-white rounded-md'
                            onClick={exportToCSV}
                        >
                            Export CSV <FaFileCsv className='inline ml-2' />
                        </button>
                    </div>
                </div>

                <div className='shadow-md'>
                    <DataTable
                        columns={columns}
                        data={filteredCustomers}
                        pagination
                        customStyles={{
                            rows: {
                                style: { fontSize: "14px", fontWeight: "500" },
                            },
                            headRow: {
                                style: {
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    backgroundColor: "#f8f8f8",
                                },
                            },
                            headCells: {
                                style: { fontWeight: "600", color: "#333" },
                            },
                        }}
                    />
                </div>
            </div>
            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={handleCloseModals}
                title=''
            >
                <Modal />
            </CustomModelAdmin>
        </div>
    );
};

export default InPayments;
