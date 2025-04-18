"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchAdmins } from "@/store/features/admin/customersSlice";

import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { useTokenContext } from "@/context/TokenCheckingContext";
import { fetchCreatorFiles } from "@/store/features/admin/fileSlice";
import { FilesInterface } from "@/types/interfaces";

const SearchBar = memo(
    ({ onSearch }: { onSearch: (value: string) => void }) => (
        <input
            type='text'
            placeholder='Search...'
            onChange={(e) => onSearch(e.target.value)}
            className='p-2 border border-gray-300 rounded-lg'
        />
    )
);

SearchBar.displayName = "SearchBar";

const Files: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { files: creatorFiles, loading } = useSelector(
        (state: RootState) => state.files
    );
    const { token } = useTokenContext();
    if (!token) return null;
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleExport = useCallback(() => {
        const headers = ["ID", "Name", "Email", "Phone", "Age"];
        const data = creatorFiles.map((file: FilesInterface) => ({
            ID: file.creatorId,
            Name: file.fullName,
            Email: file.email,
            OrderId: file.orderId,
            GoogleDrive: file.googleDriveUrl,
        }));

        exportCsvFile({ data, headers, filename: "customers.csv" });
    }, [creatorFiles]);

    useEffect(() => {
        if (token) {
            dispatch(fetchCreatorFiles(token));
        }
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            {
                name: "Creator ID",
                selector: (row: any) => row.creatorId || "-",
                sortable: true,
            },
            {
                name: "Creator",
                cell: (row: any) => (
                    <div className='flex items-center space-x-2'>
                        <Image
                            width={100}
                            height={100}
                            src={row?.profilePic || "/icons/avatar.png"}
                            alt='avatar'
                            className='w-10 h-10 rounded-full'
                        />
                        <div>
                            <p className='font-semibold'>
                                {row.fullName || "No Name"}
                            </p>
                            <p className='text-sm whitespace-nowrap text-gray-500'>
                                {row.email.length > 12
                                    ? `${row.email.substring(0, 20)}...`
                                    : row.email}
                            </p>
                        </div>
                    </div>
                ),
                sortable: false,
                grow: 2,
                width: "280px",
            },
            {
                name: "Order ID",
                selector: (row: any) => row.orderId || "-",
                sortable: true,
            },
            {
                name: "Google Drive URL",
                cell: (row: any) =>
                    row.googleDriveUrl ? (
                        <a
                            href={row.googleDriveUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:underline text-xs flex items-center gap-3'
                        >
                            <span className='BlueText max-w-[180px]'>
                                Folder Link
                            </span>
                            <FaExternalLinkAlt className='BlueText w-3.5 h-3.5' />
                        </a>
                    ) : (
                        "-"
                    ),
                sortable: false,
                grow: 2,
            },
        ],
        []
    );

    const filteredCustomers = React.useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return creatorFiles.filter(
            (customer: any) =>
                customer.fullName
                    ?.toLowerCase()
                    .includes(lowerCaseSearchTerm) ||
                customer.email?.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [creatorFiles, searchTerm]);

    return (
        <div className='bg-white rounded-lg'>
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className='flex flex-row justify-between items-center mb-4 space-x-2'>
                    <div className='flex justify-center items-center'>
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className='flex flex-row space-x-2'>
                        <button
                            onClick={handleExport}
                            className='px-4 py-2 bg-green-500 text-white rounded-md'
                        >
                            Export CSV
                        </button>
                    </div>
                </div>
                <CustomTable
                    columns={columns}
                    data={filteredCustomers}
                    noDataComponent='No Files Found'
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Files;
