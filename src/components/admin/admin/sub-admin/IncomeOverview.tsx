"use client";
import { useState } from "react";
import IncomeChart from "./IncomeChart";

// By sales => Total amount of money paid by customers
// By margin => The amount paid to the platform
// By volume => The orders

const IncomeOverview = () => {
    const [slot, setSlot] = useState<"week" | "month">("month");
    const [quantity, setQuantity] = useState<
        "By volume" | "By margin" | "By sales"
    >("By volume");

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
            <div className='text-red-500 mt-4 flex items-center'>
                <span>1</span>
                <span className='text-gray-400 ml-2 text-sm'>
                    {/* Compare to : 01 Dec 2021-08 Jan 2022 */}
                </span>
            </div>
            <div className='mt-4'>
                <IncomeChart
                    slot={slot}
                    quantity={quantity}
                />
            </div>
        </div>
    );
};

export default IncomeOverview;
