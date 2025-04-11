"use client";
import { NumericFormat } from "react-number-format";
import Dot from "./Dot";
import { OrderInterface } from "@/types/interfaces";

function OrderStatus({ status }: { status: string }) {
    let color = "bg-gray-500";
    let title = "Unknown";

    switch (status) {
        case "pending":
            color = "bg-yellow-400";
            title = "Pending";
            break;
        case "active":
            color = "bg-yellow-500";
            title = "Active";
            break;
        case "revision":
            color = "bg-blue-500";
            title = "Revision";
            break;
        case "completed":
            color = "bg-green-500";
            title = "Completed";
            break;
        case "rejected":
            color = "bg-red-500";
            title = "Rejected";
            break;
    }

    return (
        <div className='flex items-center justify-start space-x-2'>
            <Dot color={color} />
            <span>{title}</span>
        </div>
    );
}

export default function OrdersList({
    recentOrders,
}: {
    recentOrders: OrderInterface[];
}) {
    return (
        <div className='overflow-x-auto w-full'>
            <table className='min-w-full border border-gray-200 text-sm'>
                <thead>
                    <tr>
                        <th className='p-2 text-start border-b border-gray-200'>
                            Order ID
                        </th>
                        <th className='p-2 text-start border-b border-gray-200'>
                            Brand
                        </th>
                        <th className='p-2 text-start border-b border-gray-200'>
                            Status
                        </th>
                        <th className='p-2 text-start border-b border-gray-200'>
                            Total Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map((order) => (
                        <tr
                            key={order._id}
                            className='border-b border-gray-200 hover:bg-gray-50'
                        >
                            <td className='p-4 text-start text-gray-600'>
                                {order._id}
                            </td>
                            <td className='p-2 text-start'>
                                {order.briefContent?.brandName || "N/A"}
                            </td>
                            <td className='p-2 text-start'>
                                <OrderStatus status={order.orderStatus} />
                            </td>
                            <td className='p-2 text-start'>
                                <NumericFormat
                                    value={order.totalPrice}
                                    displayType='text'
                                    thousandSeparator
                                    prefix='$'
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
