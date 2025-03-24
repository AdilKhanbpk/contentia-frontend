"use client";
import { useState } from "react";
import Image from "next/image";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import ModalTerms from "./sub-content/ModalTerms";
import { FaFileCsv } from "react-icons/fa";
import CustomTable from "@/components/custom-table/CustomTable";
import { setTimeout } from "timers";

export interface Page {
    id: number;
    number: number;
    title: string;
    url: string;
}

const initialPages: Page[] = [
    {
        id: 1,
        number: 1,
        title: "Terms and Conditions",
        url: "/terms_and_conditions",
    },
    { id: 2, number: 2, title: "Cookie Policy", url: "/cookie_policy" },
    { id: 3, number: 3, title: "Privacy Policy", url: "/privacy_policy" },
    { id: 4, number: 4, title: "GDPR", url: "/gdpr" },
    { id: 5, number: 5, title: "Sales Contract", url: "/sales_contract" },
];

const TermsConditions: React.FC = () => {
    const [pages, setPages] = useState(initialPages);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 1000);

    const filteredPages = pages.filter((page) =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                <button className='ml-6 text-gray-500 hover:text-gray-700'>
                    <Image
                        width={16}
                        height={16}
                        src='/pencil.png'
                        alt='Edit Icon'
                    />
                </button>
            ),
            width: "100px",
        },
    ];

    const exportToCSV = () => {
        const csvRows = [
            ["#", "Page Title", "URL"],
            ...pages.map((page) => [page.number, page.title, page.url]),
        ];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            csvRows.map((e) => e.join(",")).join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "pages.csv");
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
                            onClick={openModal}
                            className='px-1 md:px-4 py-0.5 ButtonBlue text-white rounded-md'
                        >
                            Add
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
                    <CustomTable
                        columns={columns}
                        data={filteredPages}
                        noDataComponent='No Pages Found'
                        loading={loading}
                    />
                </div>
            </div>

            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={closeModal}
                title=''
            >
                <ModalTerms />
            </CustomModelAdmin>
        </div>
    );
};

export default TermsConditions;
