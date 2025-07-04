"use client";

import React, {
    useState,
    useEffect,
    useDeferredValue,
    useMemo,
    useCallback,
    memo,
} from "react";
import { FaFileCsv, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomModelAdmin from "../../modal/CustomModelAdmin";
import NewModal from "./sub-in-payment/NewInPaymentModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
    refundPayment,
    fetchPayments,
    PaymentInterface,
    deletePayment,
    updatePayment,
} from "@/store/features/admin/incomingPaymentSlice";
import { fetchOrders } from "@/store/features/admin/ordersSlice";
import { OrderInterface } from "@/types/interfaces";
import { exportCsvFile } from "@/utils/exportCsvFile";
import CreateInvoiceModal from "./sub-in-payment/UploadInPaymentInvoiceModal";
import ViewModal from "./sub-in-payment/ViewInPaymentModal";
import CustomTable from "@/components/custom-table/CustomTable";
import { toast } from "react-toastify";
import EditInvoiceModal from "./sub-in-payment/EditInPaymentInvoiceModal";

const InPayments: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { payments = [], loading } = useSelector(
        (state: RootState) => state.incomingPayment
    );
    const { data: orders = [] } = useSelector(
        (state: RootState) => state.orders
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditInvoiceModalOpen, setIsEditInvoiceModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentPayment, setCurrentPayment] = useState<PaymentInterface>(
        {} as PaymentInterface
    );
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [Allorders, setAllOrders] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchPayments());
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        if (orders.length > 0) {
            const ordersData = orders.map((order: OrderInterface) => ({
                orderId: order._id,
                orderName: order.associatedBrands?.brandName || order.briefContent?.brandName || `Order ${order._id.slice(-6)}`,
                orderOwner: order.orderOwner?.fullName || 'Unknown',
                orderStatus: order.orderStatus,
                paymentStatus: order.paymentStatus,
                totalPrice: order.totalPriceForCustomer,
                createdAt: order.createdAt
            }));

            // Sort by creation date - newest first (descending order)
            const sortedOrdersData = ordersData.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setAllOrders(sortedOrdersData);
        }
    }, [orders]);

    const handleRefund = async (id: string) => {
        try {
            await dispatch(refundPayment({ paymentId: id })).unwrap();
            toast.success("Refund Status Active");
        } catch (error: any) {
            console.log("🚀 ~ handleRefund ~ error:", error);
            toast.error(error.message);
        }
        await dispatch(fetchPayments());
    };
    const handleView = (id: string) => {
        const payment = payments.find((payment) => payment._id === id);
        if (payment) {
            setCurrentPayment(payment);
        }
        setIsViewModalOpen(true);
    };

    const handleDelete = useCallback(
        (id: string) => {
            dispatch(deletePayment({ paymentId: id }))
                .unwrap()
                .then(() => {
                    toast.success("Payment deleted successfully!");
                })
                .catch((error: any) => {
                    toast.error(
                        `Error deleting Payment: ${
                            error?.message || "Unknown error"
                        }`
                    );
                });
            dispatch(fetchPayments());
        },
        [dispatch]
    );

    const handleEdit = async (id: any) => {
        const payment = payments.find((payment) => payment._id === id);
        if (payment) {
            setCurrentPayment(payment);
        }
        setIsEditInvoiceModalOpen(true);
    };



    const getOrder = (id: string) => {
        const payment = payments.find((payment) => payment._id === id);
        if (payment) {
            setCurrentPayment(payment);
        }
        setIsViewModalOpen(true);
    };

    const handleExport = useCallback(() => {
        if (!payments) {
            console.error("No payments available to export");
            return;
        }

        const headers = [
            "Order ID",
            "Payment ID",
            "Payment Date",
            "Amount Paid",
            "Payment Status",
            "Refund Status",
        ];
        const data = payments.map((payment: any) => ({
            "Order ID": payment.orderId,
            "Payment ID": payment._id,
            "Payment Date": new Date(payment.paymentDate).toLocaleString(),
            "Amount Paid": payment.paymentAmount,
            "Payment Status": payment.paymentStatus,
            "Refund Status": payment.refundStatus,
        }));

        exportCsvFile({ data, headers, filename: "incoming_payments.csv" });
    }, [payments]);

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
                    className='text-blue-500 hover:text-blue-700'
                    onClick={() => {
                        setIsInvoiceModalOpen(true);
                    }}
                >
                    Invoice
                </button>
                <button
                    className='text-red-500 hover:text-red-700'
                    onClick={() => handleRefund(id)}
                >
                    Refund
                </button>
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
            </div>
        )
    );

    TableActions.displayName = "TableActions";
    const columns = useMemo(
        () => [
            {
                name: "Order ID",
                selector: (row: any) => row.orderId,
                sortable: true,
            },
            {
                name: "Payment ID",
                selector: (row: any) => row._id,
                sortable: true,
            },
            {
                name: "Payment Date",
                selector: (row: any) =>
                    new Date(row.paymentDate).toLocaleString(),
                sortable: true,
            },
            {
                name: "Amount Paid",
                selector: (row: any) => row.paymentAmount,
                sortable: true,
            },
            {
                name: "Payment Status",
                selector: (row: any) => row.paymentStatus,
                sortable: true,
            },
            {
                name: "Refund Status",
                selector: (row: any) => row.refundStatus,
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row: any) => (
                    <TableActions
                        id={row._id}
                        onView={handleView}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ),
                width: "240px",
            },
        ],
        []
    );

    const orderColumns = useMemo(
        () => [
            {
                name: "Order ID",
                selector: (row: any) => row.orderId,
                sortable: true,
                grow: 1,
                wrap: true,
            },
            {
                name: "Order Title",
                selector: (row: any) => row.orderName,
                sortable: true,
                grow: 1,
                wrap: true,
            },
            {
                name: "Creator Name",
                selector: (row: any) => row.orderOwner,
                sortable: true,
                grow: 1,
                wrap: true,
            },
            {
                name: "Created Date",
                selector: (row: any) => new Date(row.createdAt).toLocaleDateString(),
                sortable: true,
                grow: 1,
                wrap: true,
            },
            {
                name: "Order Status",
                selector: (row: any) => row.orderStatus,
                sortable: true,
                cell: (row: any) => (
                    <span className={`px-2 py-1 rounded text-xs ${
                        row.orderStatus === 'completed' ? 'bg-green-100 text-green-800' :
                        row.orderStatus === 'active' ? 'bg-blue-100 text-blue-800' :
                        row.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {row.orderStatus}
                    </span>
                ),
                grow: 1,
                wrap: true,
            },
            {
                name: "Total Price",
                selector: (row: any) => `₺${row.totalPrice}`,
                sortable: true,
                grow: 1,
                wrap: true,
            },
            {
                name: "Payment Status",
                selector: (row: any) => row.paymentStatus,
                sortable: true,
                cell: (row: any) => (
                    <span className={`px-2 py-1 rounded text-xs ${
                        row.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        row.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {row.paymentStatus}
                    </span>
                ),
                grow: 1,
                wrap: true,
            },
        ],
        []
    );

    const deferredSearchTerm = useDeferredValue(searchTerm);
    const filteredPayments = useMemo(() => {
        if (!payments) return [];
        const lowerCaseSearchTerm = deferredSearchTerm.toLowerCase().trim();
        return payments.filter(
            (payment: any) =>
                payment.orderId.toLowerCase().includes(lowerCaseSearchTerm) ||
                payment.paymentStatus
                    .toLowerCase()
                    .includes(lowerCaseSearchTerm)
        );
    }, [payments, deferredSearchTerm]);

    const filteredOrders = useMemo(() => {
        if (!Allorders) return [];
        const lowerCaseSearchTerm = deferredSearchTerm.toLowerCase().trim();
        return Allorders.filter(
            (order: any) =>
                order.orderName.toLowerCase().includes(lowerCaseSearchTerm) ||
                order.orderId.toLowerCase().includes(lowerCaseSearchTerm) ||
                order.orderOwner.toLowerCase().includes(lowerCaseSearchTerm) ||
                order.orderStatus.toLowerCase().includes(lowerCaseSearchTerm) ||
                order.paymentStatus.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [Allorders, deferredSearchTerm]);

    return (
        <div className='bg-white rounded-lg'>
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
                            Add Invoice
                        </button>
                        <button
                            className='px-4 py-2 bg-green-500 text-white rounded-md'
                            onClick={handleExport}
                        >
                            Export CSV <FaFileCsv className='inline ml-2' />
                        </button>
                    </div>
                </div>
                {Allorders.length === 0 && (
                    <div className='shadow-md'>
                        <CustomTable
                            columns={columns}
                            data={filteredPayments}
                            noDataComponent='No Ingoing Payments Found'
                            loading={loading}
                        />
                    </div>
                )}

                {Allorders.length > 0 && (
                    <div className='shadow-md'>
                        <CustomTable
                            columns={orderColumns}
                            data={filteredOrders}
                            noDataComponent='No Orders Found'
                            loading={loading}
                        />
                    </div>
                )}
            </div>

            <CustomModelAdmin
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                title=''
            >
                <NewModal onClose={() => setIsModalOpen(false)} />
            </CustomModelAdmin>

            <CustomModelAdmin
                isOpen={isInvoiceModalOpen}
                closeModal={() => setIsInvoiceModalOpen(false)}
                title=''
            >
                <CreateInvoiceModal
                    onClose={() => setIsInvoiceModalOpen(false)}
                    currentInvoice={currentPayment}
                />
            </CustomModelAdmin>
            <CustomModelAdmin
                isOpen={isEditInvoiceModalOpen}
                closeModal={() => setIsEditInvoiceModalOpen(false)}
                title=''
            >
                <EditInvoiceModal
                    onClose={() => setIsEditInvoiceModalOpen(false)}
                    currentInvoice={currentPayment}
                />
            </CustomModelAdmin>

            <CustomModelAdmin
                isOpen={isViewModalOpen}
                closeModal={() => setIsViewModalOpen(false)}
                title=''
            >
                <ViewModal
                    onClose={() => setIsViewModalOpen(false)}
                    currentInvoice={currentPayment}
                />
            </CustomModelAdmin>
        </div>
    );
};

export default InPayments;
