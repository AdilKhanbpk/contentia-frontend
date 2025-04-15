"use client";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface AnalyticsDataCardProps {
    title: string;
    count: number | string;
    percentage?: string;
    isLoss?: boolean;
    children: React.ReactNode;
}

const AnalyticsDataCard: React.FC<AnalyticsDataCardProps> = ({
    title,
    count,
    percentage,
    isLoss,
    children,
}) => {
    return (
        <div className='bg-white shadow-md rounded-lg p-4'>
            <div className='space-y-2'>
                <h4 className='text-gray-600 text-sm'>{title}</h4>
                <div className='flex items-center space-x-2'>
                    <span className='text-2xl font-bold text-gray-800'>
                        {count}
                    </span>
                    {percentage !== undefined && (
                        <span
                            className={`flex items-center text-xs font-semibold ${
                                isLoss
                                    ? "text-red-600 bg-red-100"
                                    : "text-green-600 bg-green-100"
                            } px-2 py-1 rounded`}
                        >
                            {isLoss ? (
                                <ArrowDownIcon className='h-4 w-4 mr-1' />
                            ) : (
                                <ArrowUpIcon className='h-4 w-4 mr-1' />
                            )}
                            {percentage}%
                        </span>
                    )}
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default AnalyticsDataCard;
