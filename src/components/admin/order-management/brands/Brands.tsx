"use client";
import ModelBrand from "@/components/orders/sub-orders/ModelBrand";

import React, { useState, useCallback, memo, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import {
    fetchBrands,
    fetchSingleBrand,
    deleteBrand,
    Brand,
    clearCurrentBrand,
} from "@/store/features/profile/brandSlice";
import ViewBrand from "../sub-order/ViewBrand";
import EditBrand from "../sub-order/EditBrand";
import { getAccessToken } from "@/utils/checkToken";

interface SearchBarProps {
    onSearch: (value: string) => void;
}

interface TableActionsProps {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onView: (id: string) => void;
    id: string;
}

const SearchBar = memo(({ onSearch }: SearchBarProps) => (
    <input
        type='text'
        placeholder='Search...'
        onChange={(e) => onSearch(e.target.value)}
        className='p-2 border border-gray-300 rounded-lg'
    />
));

SearchBar.displayName = "SearchBar";

const TableActions = memo(
    ({ onDelete, onEdit, onView, id }: TableActionsProps) => (
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

const Brands: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { brands, loading, error, currentBrand } = useSelector(
        (state: RootState) => state.brand
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalViewOpen, setIsViewModalOpen] = useState(false);
    const [isModalRequestsOpen, setIsModalRequestsOpen] = useState(false);

    useEffect(() => {
        const fetchBrandsData = async () => {
            const token = getAccessToken();
            if (!token) return;
            try {
                const res = await dispatch(fetchBrands(token)).unwrap();
                toast.success(res.message);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        fetchBrandsData();
    }, [dispatch]);

    const handleDelete = useCallback(
        async (id: string) => {
            const token = getAccessToken();
            if (!token) return;

            try {
                await dispatch(deleteBrand({ brandId: id, token })).unwrap();
                toast.success("Order deleted successfully!");
            } catch (error) {
                toast.error("Error deleting order.");
            }
        },
        [dispatch]
    );

    const handleView = useCallback(
        async (id: string) => {
            const token = getAccessToken();
            if (!token) return;

            try {
                await dispatch(
                    fetchSingleBrand({ brandId: id, token })
                ).unwrap();
                toast.success("Order details fetched successfully!");
                setIsViewModalOpen(true);
            } catch (error) {
                toast.error("Error fetching order details.");
            }
        },
        [dispatch]
    );

    const handleEdit = useCallback(
        async (id: string) => {
            const token = getAccessToken();
            if (!token) return;

            try {
                await dispatch(
                    fetchSingleBrand({ brandId: id, token })
                ).unwrap();
                setIsModalEditOpen(true);
                toast.success("Order fetched successfully for editing.");
            } catch (error) {
                toast.error("Error fetching order for editing.");
            }
        },
        [dispatch]
    );

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleExport = useCallback(() => {
        const headers = ["ID", "Brand Title", "Brand Category", "Brand Owner"];

        const data = brands.map((brand) => ({
            "# Brand Id": brand._id,
            "Brand Name": brand.brandName,
            "Brand Category": brand.brandCategory,
            "Brand Owner": brand.brandOwner,
        }));

        exportCsvFile({ data, headers, filename: "brands.csv" });
    }, [brands]);

    const handleCloseModals = useCallback(() => {
        setIsModalOpen(false);
        setIsModalEditOpen(false);
        setIsModalRequestsOpen(false);
        setIsViewModalOpen(false);
        dispatch(clearCurrentBrand());
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            {
                name: "Brand ID",
                selector: (row: Brand) => row._id,
                sortable: true,
            },
            {
                name: "Brand Name",
                selector: (row: Brand) => row.brandName,
                sortable: true,
            },
            {
                name: "Brand Image",
                cell: (row: Brand) => (
                    <Image
                        width={100}
                        height={100}
                        src={row.brandImage || "/icons/avatar.png"}
                        alt='Brand'
                        className='w-12 h-12 rounded-full'
                    />
                ),
                sortable: false,
            },
            {
                name: "Brand Category",
                selector: (row: Brand) => row.brandCategory,
                sortable: true,
            },
            {
                name: "Brand Owner",
                selector: (row: Brand) => row.brandOwner,
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row: Brand) => (
                    <TableActions
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onView={handleView}
                        id={row._id}
                    />
                ),
            },
        ],
        [handleDelete, handleEdit, handleView]
    );

    const filteredBrands = brands.filter((brand) =>
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            className='px-4 py-2 ButtonBlue text-white rounded-md'
                        >
                            Add Brand
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
                    data={filteredBrands}
                    noDataComponent='No Brands Found'
                    loading={loading}
                />
            </div>

            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={handleCloseModals}
                title='Add Brand'
            >
                <ModelBrand />
            </CustomModelAdmin>

            <CustomModelAdmin
                isOpen={isModalViewOpen}
                closeModal={handleCloseModals}
                title='View Brand'
            >
                <ViewBrand brand={currentBrand} />
            </CustomModelAdmin>

            <CustomModelAdmin
                isOpen={isModalEditOpen}
                closeModal={handleCloseModals}
                title='Update Brand'
            >
                <EditBrand brand={currentBrand} />
            </CustomModelAdmin>
        </div>
    );
};

export default Brands;
