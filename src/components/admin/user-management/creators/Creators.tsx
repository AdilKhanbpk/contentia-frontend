"use client";
import React, { useEffect, useState, useCallback, memo } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
    fetchAdminCreators,
    deleteAdminCreator,
    createAdminCreator,
    updateAdminCreator,
} from "@/store/features/admin/creatorsSlice";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import ModalNew from "./sub-creator/ModalNew";
import ModalView from "./sub-creator/ModelView"; // Import view modal
import CustomTable from "@/components/custom-table/CustomTable";
import { exportCsvFile } from "@/utils/exportCsvFile";
import EditCreatorForm from "./sub-creator/EditCreatorForm";
import { toast } from "react-toastify";
import { CreatorInterface } from "@/types/interfaces";
import { useTokenContext } from "@/context/TokenCheckingContext";

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

const Creators: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: creators = [], loading } = useSelector(
        (state: RootState) => state.adminCreators
    );

    const { token } = useTokenContext();
    if (!token) return null;
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [currentCreator, setCurrentCreator] = useState<CreatorInterface>(
        {} as CreatorInterface
    );
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = useCallback(
        (id: string) => {
            dispatch(deleteAdminCreator({ creatorId: id, token }))
                .unwrap()
                .then(() => {
                    toast.success("Creator deleted successfully!");
                })
                .catch((error: any) => {
                    toast.error(
                        `Error deleting creator: ${
                            error?.message || "Unknown error"
                        }`
                    );
                });
            dispatch(fetchAdminCreators(token));
        },
        [dispatch]
    );

    const handleView = (id: string) => {
        const creator = creators.find((creator) => creator._id === id);
        if (creator) {
            setCurrentCreator(creator);
        }
        setIsModalViewOpen(true);
    };

    const handleCreate = async (creatorData: any) => {
        const dataToUpdate = {
            fullName: creatorData.fullName ?? "",
            password: creatorData.password ?? "",
            tckn: creatorData.tckn,
            email: creatorData.email ?? "",
            dateOfBirth: creatorData.dateOfBirth ?? "",
            gender: creatorData.gender ?? "other",
            phoneNumber: creatorData.phoneNumber ?? "",
            isVerified: creatorData.isVerified ?? "pending",
            preferences: {
                contentInformation: {
                    creatorType:
                        creatorData.preferences?.contentInformation
                            ?.creatorType ?? "nano",
                    addressDetails: {
                        country:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.country ?? "",
                        state:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.state ?? "",
                        district:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.district ?? "",
                        neighborhood:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.neighborhood ?? "",
                        fullAddress:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.fullAddress ?? "",
                    },
                },
            },
        };

        const res = await dispatch(
            createAdminCreator({
                data: dataToUpdate,
                token,
            })
        ).unwrap();

        setIsModalOpen(false);

        toast.success(res.message || "Creator added successfully!");
        await dispatch(fetchAdminCreators(token));
    };

    const handleUpdate = async (creatorData: any) => {
        const creatorId = creatorData._id;
        const dataToUpdate = {
            fullName: creatorData.fullName ?? "",
            password: creatorData.password ?? "",
            tckn: creatorData.tckn,
            email: creatorData.email ?? "",
            dateOfBirth: creatorData.dateOfBirth ?? "",
            gender: creatorData.gender ?? "other",
            phoneNumber: creatorData.phoneNumber ?? "",
            isVerified: creatorData.isVerified ?? "pending",
            accountType: creatorData.accountType ?? "individual",
            invoiceType: creatorData.invoiceType ?? "individual",

            paymentInformation: {
                ibanNumber: creatorData.paymentInformation?.ibanNumber ?? "",
                address: creatorData.paymentInformation?.address ?? "",
                fullName: creatorData.paymentInformation?.fullName ?? "",
                trId: creatorData.paymentInformation?.trId ?? "",
                companyName: creatorData.paymentInformation?.companyName ?? "",
                taxNumber: creatorData.paymentInformation?.taxNumber ?? "",
                taxOffice: creatorData.paymentInformation?.taxOffice ?? "",
            },

            billingInformation: {
                invoiceStatus:
                    creatorData.billingInformation?.invoiceStatus ?? false,
                address: creatorData.billingInformation?.address ?? "",
                fullName: creatorData.billingInformation?.fullName ?? "",
                trId: creatorData.billingInformation?.trId ?? "",
                companyName: creatorData.billingInformation?.companyName ?? "",
                taxNumber: creatorData.billingInformation?.taxNumber ?? "",
                taxOffice: creatorData.billingInformation?.taxOffice ?? "",
            },

            preferences: {
                contentInformation: {
                    creatorType:
                        creatorData.preferences?.contentInformation
                            ?.creatorType ?? "nano",

                    contentType:
                        creatorData.preferences?.contentInformation
                            ?.contentType ?? "other",
                    contentFormats:
                        creatorData.preferences?.contentInformation
                            ?.contentFormats ?? [],
                    areaOfInterest:
                        creatorData.preferences?.contentInformation
                            ?.areaOfInterest ?? [],
                    addressDetails: {
                        country:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.country ?? "",
                        state:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.state ?? "",
                        district:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.district ?? "",
                        neighborhood:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.neighborhood ?? "",
                        fullAddress:
                            creatorData.preferences?.contentInformation
                                ?.addressDetails?.fullAddress ?? "",
                    },
                },
                socialInformation: {
                    contentType:
                        creatorData.preferences?.socialInformation
                            ?.contentType ?? "other",
                    platforms: {
                        Instagram: creatorData.preferences?.socialInformation
                            ?.platforms?.Instagram ?? {
                            followers: 0,
                            username: "",
                        },
                        TikTok: creatorData.preferences?.socialInformation
                            ?.platforms?.TikTok ?? {
                            followers: 0,
                            username: "",
                        },
                        Youtube: creatorData.preferences?.socialInformation
                            ?.platforms?.Youtube ?? {
                            followers: 0,
                            username: "",
                        },
                        X: creatorData.preferences?.socialInformation?.platforms
                            ?.X ?? {
                            followers: 0,
                            username: "",
                        },
                        Facebook: creatorData.preferences?.socialInformation
                            ?.platforms?.Facebook ?? {
                            followers: 0,
                            username: "",
                        },
                        Linkedin: creatorData.preferences?.socialInformation
                            ?.platforms?.Linkedin ?? {
                            followers: 0,
                            username: "",
                        },
                    },
                    portfolioLink:
                        creatorData.preferences?.socialInformation
                            ?.portfolioLink ?? "",
                },
            },

            userAgreement: creatorData.userAgreement ?? false,
            approvedCommercial: creatorData.approvedCommercial ?? false,
        };

        try {
            const res = await dispatch(
                updateAdminCreator({
                    creatorId,
                    data: dataToUpdate,
                    token,
                })
            );
            await dispatch(fetchAdminCreators(token));
            toast.success("Creator updated successfully!");
        } catch (error) {
            toast.error("Failed to update creator. Please try again.");
        }
    };

    const handleEdit = (id: string) => {
        const creator = creators.find((creator) => {
            return creator._id === id;
        });
        if (creator) {
            setCurrentCreator(creator);
        }
        setShowEditForm(true);
    };

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const handleExport = useCallback(() => {
        const headers = [
            "ID",
            "Name",
            "Email",
            "Contact",
            "User Type",
            "Country",
            "Status",
        ];
        const data = creators.map((creator) => [
            creator._id,
            creator.fullName,
            creator.email,
            creator.phoneNumber,
            creator.userType,
            creator.preferences.contentInformation.addressDetails.country,
            creator.isVerified,
        ]);

        exportCsvFile({ data, headers, filename: "creators.csv" });
    }, [creators]);

    useEffect(() => {
        if (!token) {
            dispatch(fetchAdminCreators(token));
        }
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            {
                name: "# Creator Id",
                selector: (row: any) => row._id,
                sortable: true,
            },
            {
                name: "Creator",
                cell: (row: any) => (
                    <div className='flex items-center space-x-2'>
                        <Image
                            width={100}
                            height={100}
                            src={row.profilePic || "/icons/avatar.png"}
                            alt='avatar'
                            className='w-10 h-10 rounded-full'
                        />
                        <div>
                            <p className='font-semibold'>
                                {row.fullName || "-"}
                            </p>
                            <p className='text-sm whitespace-nowrap text-gray-500'>
                                {row.email &&
                                    (row.email.length > 12
                                        ? `${row.email.substring(0, 20)}...`
                                        : row.email)}
                            </p>
                        </div>
                    </div>
                ),
                sortable: false,
                grow: 2,
            },
            {
                name: "Contact",
                selector: (row: any) => row.phoneNumber || "-",
                sortable: true,
            },
            {
                name: "User Type",
                selector: (row: any) => row.userType || "-",
                sortable: true,
            },
            {
                name: "Country",
                selector: (row: any) => row.addressDetails?.country || "-",
                sortable: true,
            },
            {
                name: "Status",
                cell: (row: any) => {
                    let status = row.isVerified || "pending";
                    return (
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                status === "approved"
                                    ? "text-green-700 bg-green-100"
                                    : status === "Pending"
                                    ? "text-yellow-700 bg-yellow-100"
                                    : "text-red-700 bg-red-100"
                            }`}
                        >
                            {status}
                        </span>
                    );
                },
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row: any) => (
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

    const filteredCreators = React.useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return creators.filter(
            (creator) =>
                creator.fullName?.toLowerCase().includes(lowerCaseSearchTerm) ||
                creator.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
                creator.phoneNumber?.includes(lowerCaseSearchTerm) ||
                creator?.preferences?.contentInformation?.creatorType
                    ?.toLowerCase()
                    .includes(lowerCaseSearchTerm)
        );
    }, [creators, searchTerm]);

    const handleCloseEdit = () => {
        setCurrentCreator({} as CreatorInterface);
    };

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
                            Add Creator
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
                    data={filteredCreators}
                    noDataComponent='No Creators Found'
                    loading={loading}
                />

                {/* Conditional render of the edit form */}
                {showEditForm && (
                    <EditCreatorForm
                        creatorData={currentCreator}
                        onSubmit={(data) => {
                            handleUpdate(data);
                            handleCloseEdit();
                        }}
                    />
                )}
            </div>

            {/* Modal for adding a new creator */}
            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                title=''
            >
                <ModalNew
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreate}
                />
            </CustomModelAdmin>

            {/* Modal for viewing a creator */}
            <CustomModelAdmin
                isOpen={isModalViewOpen}
                closeModal={() => setIsModalViewOpen(false)}
                title=''
            >
                <ModalView
                    isOpen={isModalViewOpen}
                    onClose={() => setIsModalViewOpen(false)}
                    creatorData={currentCreator}
                />
            </CustomModelAdmin>
        </div>
    );
};

export default Creators;
