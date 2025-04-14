"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FaEye, FaFileCsv } from "react-icons/fa";
import CustomModelAdmin from "../../../modal/CustomModelAdmin";
import Modal from "./sub-push/ViewModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
    fetchNotificationById,
    fetchNotifications,
    selectCurrentNotification,
    selectNotificationLoading,
    selectNotifications,
} from "@/store/features/admin/notificationSlice";
import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/checkToken";
import ModalNew from "./sub-push/ModalNew";
import CustomTable from "@/components/custom-table/CustomTable";

interface TableActionsProps {
    onView: (id: string) => void;
    id: string;
}

const PushNotifications: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector(selectNotifications);
    const currentNotification = useSelector(selectCurrentNotification);
    const loading = useSelector(selectNotificationLoading);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleView = useCallback(
        async (id: string) => {
            const token = getAccessToken();
            if (!token) return;

            try {
                await dispatch(
                    fetchNotificationById({
                        notificationId: id,
                        token,
                    })
                ).unwrap();
                toast.success("Order details fetched successfully!");
                setIsViewModalOpen(true);
            } catch (error) {
                toast.error("Error fetching order details.");
            }
        },
        [dispatch]
    );

    const handleCloseModals = useCallback(() => {
        setIsViewModalOpen(false);
    }, [dispatch]);

    const filteredNotifications = notifications.filter((notification) =>
        notification._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const TableActions = memo(({ onView, id }: TableActionsProps) => (
        <div className='flex space-x-3'>
            <button
                className='text-gray-500 hover:text-gray-700'
                onClick={() => onView(id)}
            >
                <FaEye className='text-lg' />
            </button>
        </div>
    ));

    TableActions.displayName = "TableActions";

    const columns = React.useMemo(
        () => [
            {
                name: "Notification ID",
                selector: (row: any) => row._id,
                sortable: true,
            },
            {
                name: "Notification Title",
                selector: (row: any) => row.title,
                sortable: true,
            },
            {
                name: "Sent Date",
                selector: (row: any) => row.createdAt,
                sortable: true,
            },
            {
                name: "Event Type",
                selector: (row: any) => row.eventType,
                sortable: true,
            },
            {
                name: "Target Users",
                selector: (row: any) => row.userType,
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row: any) => (
                    <TableActions
                        onView={handleView}
                        id={row._id}
                    />
                ),
            },
        ],
        [handleView]
    );

    useEffect(() => {
        const token = getAccessToken();
        if (!token) return;
        dispatch(fetchNotifications(token));
    }, [dispatch]);

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
                            Push Notification
                        </button>
                    </div>
                </div>
                <div className='shadow-md'>
                    <CustomTable
                        columns={columns}
                        data={filteredNotifications}
                        noDataComponent={"No notifications found"}
                        loading={loading}
                    />
                </div>
            </div>
            <CustomModelAdmin
                isOpen={isViewModalOpen}
                closeModal={handleCloseModals}
                title='View Notification'
            >
                <Modal notification={currentNotification} />
            </CustomModelAdmin>
            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                title=''
            >
                <ModalNew onClose={() => setIsModalOpen(false)} />
            </CustomModelAdmin>
        </div>
    );
};

export default PushNotifications;
