"use client";

import React, { useState, useCallback, memo, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
// import CustomModelAdmin from "../../../modal/CustomModelAdmin";
// import NewModal from "../sub-package/NewModal";
// import EditModal from "../sub-package/EditModal";
// import ViewModal from "../sub-package/ViewModal";
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import {
    fetchPackages,
    deletePackage,
    fetchPackageById,
    clearCurrentPackage,
} from "@/store/features/admin/customPackageSlice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import { PackageInterface } from "@/types/interfaces";
import { fetchMyBrands } from "@/store/features/profile/brandSlice";

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
        className='p-2 bpackage bpackage-gray-300 rounded-lg'
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

const Packages: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: packages,
        loading,
        error,
        currentPackage,
    } = useSelector((state: RootState) => state.customPackages);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalViewOpen, setIsViewModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        const fetchPackagesData = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }
            try {
                const res = await dispatch(fetchPackages(token)).unwrap();
                toast.success(res.message);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        const fetchBrands = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }
            try {
                const res = await dispatch(fetchMyBrands(token)).unwrap();
                toast.success(res.message);
            } catch (error: any) {
                toast.error(error.message);
            }
        };
        fetchBrands();
        fetchPackagesData();
    }, [dispatch]);

    const handleDelete = useCallback(
        async (id: string) => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }

            try {
                await dispatch(
                    deletePackage({ packageId: id, token })
                ).unwrap();
                toast.success("Package deleted successfully!");
            } catch (error) {
                toast.error("Error deleting package.");
            }
        },
        [dispatch]
    );

    const handleView = useCallback(
        async (id: string) => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }

            try {
                await dispatch(
                    fetchPackageById({ packageId: id, token })
                ).unwrap();
                toast.success("Package details fetched successfully!");
                setIsViewModalOpen(true);
            } catch (error) {
                toast.error("Error fetching package details.");
            }
        },
        [dispatch]
    );

    const handleEdit = useCallback(
        async (id: string) => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }

            try {
                await dispatch(
                    fetchPackageById({ packageId: id, token })
                ).unwrap();
                setIsModalEditOpen(true);
                toast.success("Package fetched successfully for editing.");
            } catch (error) {
                toast.error("Error fetching package for editing.");
            }
        },
        [dispatch]
    );

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleExport = useCallback(() => {
        const headers = [
            "ID",
            "No of UGC",
            "Total Price",
            "Package Status",
            "Payment Status",
            "Contents Delivered",
            "Created At",
        ];

        const data = packages.map((customPackage) => ({
            "# Package Id": customPackage._id,
            "No of UGC": customPackage.noOfUgc,
            "Total Price": customPackage.packageTotalPrice,
            "Package Status": customPackage.packageStatus,
            "Payment Status": customPackage.paymentStatus,
            "Contents Delivered": customPackage.contentsDelivered || 0,
            "Created At": customPackage.createdAt,
        }));

        exportCsvFile({ data, headers, filename: "packages.csv" });
    }, [packages]);

    const handleCloseModals = useCallback(() => {
        setIsModalOpen(false);
        setIsModalEditOpen(false);
        setIsViewModalOpen(false);
        dispatch(clearCurrentPackage());
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            {
                name: "#Package Id",
                selector: (row: PackageInterface) => row._id,
                sortable: true,
            },
            {
                name: "Package Creator",
                cell: (row: PackageInterface) => {
                    const owner = row.packageCreator;
                    const isValidOwner =
                        owner && typeof owner === "object" && owner !== null;

                    return (
                        <div className='flex items-center space-x-2'>
                            <Image
                                width={100}
                                height={100}
                                src={owner?.profilePic || "/icons/avatar.png"}
                                alt='avatar'
                                className='w-10 h-10 rounded-full'
                            />
                            <div>
                                <p className='text-sm text-gray-500'>
                                    {isValidOwner && owner.email
                                        ? owner.email
                                        : "No Email"}
                                </p>
                            </div>
                        </div>
                    );
                },
                sortable: false,
                width: "200px",
            },

            {
                name: "No of UGC",
                selector: (row: PackageInterface) => row.noOfUgc,
                sortable: true,
            },
            {
                name: "Package Owner",
                cell: (row: PackageInterface) => {
                    const owner = row.packageCustomer;
                    const isValidOwner =
                        owner && typeof owner === "object" && owner !== null;

                    return (
                        <div className='flex items-center space-x-2'>
                            <Image
                                width={100}
                                height={100}
                                src={owner?.profilePic || "/icons/avatar.png"}
                                alt='avatar'
                                className='w-10 h-10 rounded-full'
                            />
                            <div>
                                <p className='text-sm text-gray-500'>
                                    {isValidOwner && owner.email
                                        ? owner.email
                                        : "No Email"}
                                </p>
                            </div>
                        </div>
                    );
                },
                sortable: false,
                width: "200px",
            },
            {
                name: "Total Price",
                selector: (row: PackageInterface) => row.packageTotalPrice,
                sortable: true,
            },

            {
                name: "Package Status",
                cell: (row: PackageInterface) => (
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            row.packageStatus === "completed"
                                ? "text-green-700 bg-green-100"
                                : row.packageStatus === "pending"
                                ? "text-yellow-700 bg-yellow-100"
                                : "text-red-700 bg-red-100"
                        }`}
                    >
                        {row.packageStatus.charAt(0).toUpperCase() +
                            row.packageStatus.slice(1)}
                    </span>
                ),
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row: PackageInterface) => (
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

    const filteredPackages = React.useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return packages?.filter((customPackage) => {
            const owner = customPackage.packageCreator;
            const fullNameMatch =
                owner &&
                typeof owner === "object" &&
                owner.fullName &&
                owner.fullName.toLowerCase().includes(lowerCaseSearchTerm);
            const idMatch = customPackage._id
                ?.toLowerCase()
                .includes(lowerCaseSearchTerm);
            return fullNameMatch || idMatch;
        });
    }, [packages, searchTerm]);

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
                            Add Package
                        </button>
                        <button
                            onClick={handleExport}
                            className='px-4 py-2 bg-green-500 text-white rounded-md'
                        >
                            Export CSV
                        </button>
                    </div>
                </div>
                <div className='flex justify-between mb-4'>
                    <ul className='flex space-x-4'>
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${
                                    activeTab === "All"
                                        ? "bg-gray-500 rounded  text-white"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setActiveTab("All")}
                            >
                                All
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${
                                    activeTab === "Active"
                                        ? "bg-gray-500 rounded  text-white"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setActiveTab("Active")}
                            >
                                Active
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${
                                    activeTab === "Completed"
                                        ? "bg-gray-500 rounded  text-white"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setActiveTab("Completed")}
                            >
                                Completed
                            </button>
                        </li>
                        <li>
                            <button
                                className={`px-1 md:px-4 py-0.5 md:py-2 ${
                                    activeTab === "Cancelled"
                                        ? "bg-gray-500 rounded  text-white"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setActiveTab("Cancelled")}
                            >
                                Cancelled
                            </button>
                        </li>
                    </ul>
                </div>

                <div>
                    <CustomTable
                        columns={columns}
                        data={filteredPackages.filter((customPackage) => {
                            if (activeTab === "All") return true;
                            if (activeTab === "Active")
                                return (
                                    customPackage.packageStatus === "pending"
                                );
                            if (activeTab === "Completed")
                                return (
                                    customPackage.packageStatus === "completed"
                                );
                            if (activeTab === "Cancelled")
                                return (
                                    customPackage.packageStatus === "cancelled"
                                );
                            return false;
                        })}
                    />
                </div>
            </div>

            {/* <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={handleCloseModals}
                title='Add Package'
            >
                <NewModal />
            </CustomModelAdmin>

            <CustomModelAdmin
                isOpen={isModalViewOpen}
                closeModal={handleCloseModals}
                title='View Package'
            >
                <ViewModal package={currentPackage} />
            </CustomModelAdmin>

            <CustomModelAdmin
                isOpen={isModalEditOpen}
                closeModal={handleCloseModals}
                title='Update Package'
            >
                <EditModal package={currentPackage} />
            </CustomModelAdmin> */}
        </div>
    );
};

export default Packages;
