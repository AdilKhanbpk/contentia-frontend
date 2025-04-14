"use client";

import React, {
    useState,
    useEffect,
    useDeferredValue,
    useMemo,
    useCallback,
    memo,
} from "react";
import {
    FaCheck,
    FaTimes,
    FaEye,
    FaFileCsv,
    FaEdit,
    FaTrashAlt,
} from "react-icons/fa";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import Modal from "./sub-emails/NewModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAccessToken } from "@/utils/checkToken";
import {
    deleteEmailNotification,
    fetchEmailNotificationById,
    fetchEmailNotifications,
} from "@/store/features/admin/emailNotificationSlice";
import { exportCsvFile } from "@/utils/exportCsvFile";
import CustomTable from "@/components/custom-table/CustomTable";
import EditModal from "./sub-emails/EditModal";
import ViewModal from "./sub-emails/ViewModal";

const Emails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        emailNotifications = [],
        currentEmailNotification,
        loading,
    } = useSelector((state: RootState) => state.emailNotification);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);

    const handleView = async (id: string) => {
        const token = getAccessToken();
        if (!token) return;
        await dispatch(
            fetchEmailNotificationById({ emailNotificationId: id, token })
        ).unwrap();
        setIsModalViewOpen(true);
    };

    const handleEdit = async (id: string) => {
        const token = getAccessToken();
        if (!token) return;
        await dispatch(
            fetchEmailNotificationById({ emailNotificationId: id, token })
        ).unwrap();
        setIsModalEditOpen(true);
    };

    const handleDelete = async (id: string) => {
        const token = getAccessToken();
        if (!token) return;
        await dispatch(
            deleteEmailNotification({ emailNotificationId: id, token })
        ).unwrap();
        setIsModalViewOpen(true);
    };

    const handleExport = useCallback(() => {
        if (!emailNotifications) {
            console.error("No email notifications available to export");
            return;
        }

        const headers = ["ID", "Email Title", "User Type", "Created At"];
        const data = emailNotifications.map((email) => ({
            ID: email._id,
            "Email Title": email.emailTitle,
            "User Type": email.userType,
            "Created At": email.createdAt
                ? new Date(email.createdAt).toLocaleString()
                : "",
        }));

        exportCsvFile({ data, headers, filename: "email_notifications.csv" });
    }, [emailNotifications]);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;
        dispatch(fetchEmailNotifications(token));
    }, [dispatch]);

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
    const columns = React.useMemo(
        () => [
            {
                name: "#",
                selector: (row: any) => row._id,
                sortable: true,
            },
            {
                name: "Email Title",
                selector: (row: any) => row.emailTitle,
                sortable: true,
                grow: 2,
            },
            {
                name: "User Type",
                selector: (row: any) => row.userType,
                sortable: true,
            },
            {
                name: "Created At",
                selector: (row: any) =>
                    new Date(row.createdAt).toLocaleString(),
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row: any) => (
                    <TableActions
                        onView={() => handleView(row._id)}
                        onEdit={() => handleEdit(row._id)}
                        onDelete={() => handleDelete(row._id)}
                        id={row._id}
                    />
                ),
                width: "150px",
            },
        ],
        [handleView]
    );

    const deferredSearchTerm = useDeferredValue(searchTerm);
    const filteredEmails = useMemo(() => {
        if (!emailNotifications) return [];
        const lowerCaseSearchTerm = deferredSearchTerm.toLowerCase().trim();
        return emailNotifications.filter(
            (email: any) =>
                email.emailTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
                email.userType.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [emailNotifications, deferredSearchTerm]);

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
                    <div className='flex space-x-2'>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2 Button text-white rounded-md'
                        >
                            Email Notification
                        </button>
                        <button
                            className='px-4 py-2 bg-green-500 text-white rounded-md'
                            onClick={handleExport}
                        >
                            Export CSV <FaFileCsv className='inline ml-2' />
                        </button>
                    </div>
                </div>

                <div className='shadow-md'>
                    <CustomTable
                        columns={columns}
                        data={filteredEmails}
                        noDataComponent='No email notifications found'
                        loading={loading}
                    />
                </div>
            </div>

            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                title=''
            >
                <Modal onClose={() => setIsModalOpen(false)} />
            </CustomModelAdmin>
            <CustomModelAdmin
                isOpen={isModalEditOpen}
                closeModal={() => setIsModalEditOpen(false)}
                title=''
            >
                <EditModal
                    emailNotification={currentEmailNotification}
                    onClose={() => setIsModalEditOpen(false)}
                />
            </CustomModelAdmin>
            <CustomModelAdmin
                isOpen={isModalViewOpen}
                closeModal={() => setIsModalViewOpen(false)}
                title=''
            >
                <ViewModal
                    emailNotification={currentEmailNotification}
                    onClose={() => setIsModalViewOpen(false)}
                />
            </CustomModelAdmin>
        </div>
    );
};

export default Emails;
