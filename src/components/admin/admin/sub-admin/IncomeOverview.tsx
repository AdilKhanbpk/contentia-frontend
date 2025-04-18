"use client";
import { useState } from "react";
import IncomeChart from "./IncomeChart";
import { OrderInterface } from "@/types/interfaces";

// By sales => Total Price Of orders
// By margin => Total price of order - Total amount of money paid to creators
// By volume => The amount of order in the relevant week/month

const IncomeOverview = ({
    orders,
    sales,
    revenue,
}: {
    orders: any;
    sales: any;
    revenue: any;
}) => {
    const [slot, setSlot] = useState<"week" | "month">("month");
    const [quantity, setQuantity] = useState<
        "By volume" | "By margin" | "By sales"
    >("By volume");

    const getTotal = (arr: number[]) =>
        arr.reduce((acc, curr) => acc + curr, 0);

    const totalWeekOrdersCount = getTotal(orders.totalOrdersByWeek);
    const totalMonthOrdersCount = getTotal(orders.totalOrdersByMonth);

    const totalWeeksSale = getTotal(sales.totalSalesByWeek);
    const totalMonthsSale = getTotal(sales.totalSalesByMonth);

    const totalWeeksRevenue = getTotal(revenue.totalRevenueByWeek);
    const totalMonthsRevenue = getTotal(revenue.totalRevenueByMonth);

    return (
        <div className='p-6 md:p-4 sm:p-3 xs:p-2 bg-white rounded-lg'>
            <div className='flex  flex-col md:flex-row justify-between items-center'>
                <h2 className='my-2 md:my-0 text-sm md:text-lg font-semibold md:font-bold whitespace-nowrap'>
                    Income Overview
                </h2>
                <div className='flex gap-2'>
                    <button
                        className={`px-1 md:px-3 py-0.5 border rounded ${
                            slot === "week"
                                ? "border-blue-500 text-blue-500"
                                : "border-gray-300 text-gray-500"
                        }`}
                        onClick={() => setSlot("week")}
                    >
                        Week
                    </button>
                    <button
                        className={`px-1 md:px-3 py-0.5 border rounded ${
                            slot === "month"
                                ? "border-blue-500 text-blue-500"
                                : "border-gray-300 text-gray-500"
                        }`}
                        onClick={() => setSlot("month")}
                    >
                        Month
                    </button>
                    <select
                        className='px-1 md:px-2 py-1 bg-gray-200 text-sm'
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value as typeof quantity)
                        }
                    >
                        <option value='By volume'>By Volume</option>
                        <option value='By margin'>By Margin</option>
                        <option value='By sales'>By Sales</option>
                    </select>
                </div>
            </div>
            <div className='text-gray-500 mt-4 flex items-center'>
                <span>
                    {(() => {
                        if (slot === "month" && quantity === "By volume")
                            return `${totalMonthOrdersCount} Orders`;
                        if (slot === "month" && quantity === "By margin")
                            return `TL ${totalMonthsRevenue.toLocaleString(
                                "tr-TR"
                            )} in Revenue`;
                        if (slot === "month" && quantity === "By sales")
                            return `TL ${totalMonthsSale.toLocaleString(
                                "tr-TR"
                            )} in Sales`;
                        if (slot === "week" && quantity === "By volume")
                            return `${totalWeekOrdersCount} Orders`;
                        if (slot === "week" && quantity === "By margin")
                            return `TL ${totalWeeksRevenue.toLocaleString(
                                "tr-TR"
                            )} in Revenue`;
                        if (slot === "week" && quantity === "By sales")
                            return `TL ${totalWeeksSale.toLocaleString(
                                "tr-TR"
                            )} in Sales`;
                        return "0"; // fallback
                    })()}
                </span>

                <span className='text-gray-400 ml-2 text-sm'>
                    {/* Compare to : 01 Dec 2021-08 Jan 2022 */}
                </span>
            </div>
            <div className='mt-4'>
                <IncomeChart
                    slot={slot}
                    quantity={quantity}
                    orders={orders}
                    sales={sales}
                    revenue={revenue}
                />
            </div>
        </div>
    );
};

export default IncomeOverview;
