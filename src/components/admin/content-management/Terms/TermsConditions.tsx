"use client";

import React, {
    useEffect,
    useState,
    useCallback,
    memo,
    useDeferredValue,
    useMemo,
} from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { toast } from "react-toastify";
import { TermsInterface } from "@/types/interfaces";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";

import {
    deleteTerm,
    fetchTermById,
    fetchTerms,
    updateTerm,
} from "@/store/features/admin/termsSlice";
import { CreateTerms } from "./CreateTerms";
import { EditTerms } from "./EditTerms";
import { ViewTerms } from "./ViewTerms";
import { useTokenContext } from "@/context/TokenCheckingContext";

const SearchBar = memo(
    ({ onSearch }: { onSearch: (value: string) => void }) => (
        <input
            type='text'
            placeholder='Search terms...'
            onChange={(e) => onSearch(e.target.value)}
            className='p-2 border border-gray-300 rounded-lg'
        />
    )
);

SearchBar.displayName = "SearchBar";

const TableActions = memo(
    ({
        onDelete,
        onEdit,
        onView,
        id,
    }: {
        onDelete: (id: string) => void;
        onEdit: (id: string) => void;
        onView: (id: string) => void;
        id: string;
    }) => (
        <div className='flex space-x-3'>
            <button
                className='text-gray-500 hover:text-gray-700'
                onClick={() => onView(id)}
            >
                <FaEye className='text-lg' />
            </button>
            <button
                className='text-blue-500 hover:text-blue-700'
                onClick={() => onEdit(id)}
            >
                <FaEdit className='text-lg' />
            </button>
            <button
                className='text-red-500 hover:text-red-700'
                onClick={() => onDelete(id)}
            >
                <FaTrashAlt className='text-md' />
            </button>
        </div>
    )
);

TableActions.displayName = "TableActions";

const TermsConditions: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        terms = [],
        currentTerm,
        loading,
    } = useSelector((state: RootState) => state.terms);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const { token } = useTokenContext();
    if (!token) return null;

    const handleDelete = useCallback(
        (id: string) => {
            dispatch(deleteTerm({ termId: id, token }))
                .unwrap()
                .then(() => {
                    toast.success("Term deleted successfully");
                    dispatch(fetchTerms(token));
                })
                .catch((error: any) => {
                    toast.error("Delete failed");
                    console.error("Delete failed:", error);
                });
        },
        [dispatch]
    );

    const handleView = async (id: string) => {
        await dispatch(fetchTermById({ termId: id, token })).unwrap();
        setIsModalViewOpen(true);
    };

    const handleUpdate = async (termData: TermsInterface) => {
        if (!termData._id) {
            toast.error("Term ID is missing!");
            return;
        }

        try {
            await dispatch(
                updateTerm({ termId: termData._id, termData, token })
            ).unwrap();
            toast.success("Term updated successfully");
            await dispatch(fetchTerms(token));
            setIsModalEditOpen(false);
        } catch (error: any) {
            toast.error(
                `Term update failed: ${
                    error?.message || "Something went wrong"
                }`
            );
            console.error("Term update failed:", error);
        }
    };

    const handleEdit = async (id: string) => {
        await dispatch(fetchTermById({ termId: id, token })).unwrap();
        setIsModalEditOpen(true);
    };

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleExport = useCallback(() => {
        if (!terms) {
            console.error("No terms available to export");
            return;
        }

        const headers = ["ID", "Title", "Category"];
        const data = terms.map((term) => ({
            ID: term._id,
            Title: term.pageTitle,
            Category: term.pageCategory,
        }));

        exportCsvFile({ data, headers, filename: "terms.csv" });
    }, [terms]);

    useEffect(() => {
        dispatch(fetchTerms(token));
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            {
                name: "#Term Id",
                selector: (row: TermsInterface) => row._id,
                sortable: true,
            },
            {
                name: "Page Title",
                selector: (row: TermsInterface) =>
                    row.pageTitle || "Not Specified",
                sortable: true,
            },
            {
                name: "Category",
                selector: (row: TermsInterface) =>
                    row.pageCategory || "Not Specified",
                sortable: true,
            },
            {
                name: "Slug",
                selector: (row: TermsInterface) =>
                    row.pageSlug || "Not Specified",
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row: TermsInterface) => (
                    <TableActions
                        onDelete={() => handleDelete(row._id)}
                        onEdit={() => handleEdit(row._id)}
                        onView={() => handleView(row._id)}
                        id={row._id}
                    />
                ),
                width: "150px",
            },
        ],
        [handleDelete]
    );

    const deferredSearchTerm = useDeferredValue(searchTerm);
    const filteredTerms = useMemo(() => {
        if (!terms) return [];
        const lowerCaseSearchTerm = deferredSearchTerm.toLowerCase().trim();
        return terms.filter(
            (term) =>
                term.pageTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
                term.pageCategory.toLowerCase().includes(lowerCaseSearchTerm) ||
                term.pageSlug.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [terms, deferredSearchTerm]);

    return (
        <div className='bg-white rounded-lg'>
            <div className='flex flex-col py-24 md:py-24 lg:my-0 px-4 sm:px-6 md:px-12 lg:pl-72'>
                <div className='flex flex-row justify-between items-center mb-4 space-x-2'>
                    <div className='flex justify-center items-center'>
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className='flex flex-row space-x-2'>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2 Button text-white rounded-md'
                        >
                            Add Terms
                        </button>
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
                    data={filteredTerms}
                    noDataComponent='No terms found'
                    loading={loading}
                />
            </div>

            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                title=''
            >
                <CreateTerms onClose={() => setIsModalOpen(false)} />
            </CustomModelAdmin>

            {currentTerm && (
                <CustomModelAdmin
                    isOpen={isModalEditOpen}
                    closeModal={() => setIsModalEditOpen(false)}
                    title=''
                >
                    <EditTerms
                        onClose={() => setIsModalEditOpen(false)}
                        termData={currentTerm}
                        onSubmit={handleUpdate}
                    />
                </CustomModelAdmin>
            )}

            {currentTerm && (
                <CustomModelAdmin
                    isOpen={isModalViewOpen}
                    closeModal={() => setIsModalViewOpen(false)}
                    title=''
                >
                    <ViewTerms
                        onClose={() => setIsModalViewOpen(false)}
                        termData={currentTerm}
                    />
                </CustomModelAdmin>
            )}
        </div>
    );
};

export default TermsConditions;
