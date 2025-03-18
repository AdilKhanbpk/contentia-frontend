"use client";

import { useState, useMemo, useEffect } from "react";
import { FaFileCsv, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
    fetchHelpSupports,
    deleteHelpSupport,
    setCurrentHelpSupport,
    HelpSupport,
} from "@/store/features/admin/helpSlice";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import { ModalCenters } from "./sub-content/ModalCenters";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/checkToken";

const HelpCenters: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { helpSupports } = useSelector((state: RootState) => state.help);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;
        dispatch(fetchHelpSupports(token));
    }, [dispatch]);

    const exportToCSV = () => {
        const headers = ["ID", "Title", "Category", "Content"];
        const data = helpSupports.map((support) => ({
            ID: support._id,
            Title: support.title,
            Category: support.category,
            Content: support.content,
        }));
        exportCsvFile({ data, headers, filename: "help_supports.csv" });
    };

    const handleDelete = (id: string) => {
        const token = getAccessToken();
        if (!token) return;
        dispatch(deleteHelpSupport({ helpSupportId: id, token }));
    };

    const filteredHelpSupports = useMemo(() => {
        return helpSupports.filter(
            (support: HelpSupport) =>
                support.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                support.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
    }, [helpSupports, searchTerm]);

    const columns = useMemo(() => {
        return [
            {
                name: "Title",
                selector: (row: HelpSupport) => row.title,
                sortable: true,
                width: "250px",
            },
            {
                name: "Category",
                selector: (row: HelpSupport) => row.category,
                sortable: true,
                width: "200px",
            },
            {
                name: "Actions",
                cell: (row: HelpSupport) => (
                    <div className='flex space-x-3'>
                        <button
                            className='text-blue-500 hover:text-blue-700'
                            onClick={() => {
                                console.log(
                                    "Setting current help support:",
                                    row
                                );
                                dispatch(setCurrentHelpSupport(row));
                                setIsModalOpen(true);
                            }}
                        >
                            <FaEdit className='text-lg' />
                        </button>
                        <button
                            className='text-red-500 hover:text-red-700'
                            onClick={() => handleDelete(row._id)}
                        >
                            <FaTrashAlt className='text-md' />
                        </button>
                    </div>
                ),
                width: "150px",
            },
        ];
    }, [dispatch]);

    return (
        <div className='bg-white rounded-lg'>
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className='flex justify-between mb-4'>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => {
                            console.log(
                                "Updating search term:",
                                e.target.value
                            );
                            setSearchTerm(e.target.value);
                        }}
                        placeholder='Search...'
                        className='p-2 border border-gray-300 rounded-lg'
                    />
                    <div className='flex flex-col md:flex-row lg:space-x-2'>
                        <button
                            onClick={() => {
                                console.log(
                                    "Opening modal to add a new help support..."
                                );
                                dispatch(setCurrentHelpSupport(null));
                                setIsModalOpen(true);
                            }}
                            className='px-1 md:px-4 py-0.5 md:py-2 ButtonBlue text-white rounded-md'
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
                        data={filteredHelpSupports}
                    />
                </div>
            </div>

            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={() => {
                    console.log("Closing modal...");
                    setIsModalOpen(false);
                }}
                title=''
            >
                <ModalCenters
                    onClose={() => {
                        console.log("Closing modal inside ModalCenters...");
                        setIsModalOpen(false);
                    }}
                />
            </CustomModelAdmin>
        </div>
    );
};

export default HelpCenters;
