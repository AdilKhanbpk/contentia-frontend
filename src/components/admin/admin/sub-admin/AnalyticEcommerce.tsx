import { RiseOutlined, FallOutlined } from "@ant-design/icons";

interface Props {
    title: string;
    count: string;
    percentage?: number;
    isLoss?: boolean;
    extra?: string;
    color?: string;
}

const AnalyticEcommerce = ({
    color = "text-blue-500",
    title,
    count,
    percentage = 5.6, // dummy default
    isLoss = false, // dummy default
    extra = "$1,200", // dummy default
}: Props) => (
    <div className='bg-white p-6 rounded-md shadow-md'>
        <div className='space-y-1'>
            <p className='text-gray-500'>{title}</p>
            <div className='flex items-center space-x-2'>
                <p className='text-2xl font-semibold text-black'>{count}</p>
                <div
                    className={`flex items-center px-2 py-1 text-xs font-medium rounded ${
                        isLoss
                            ? "bg-red-100 text-red-500"
                            : "bg-green-100 text-green-500"
                    }`}
                >
                    {isLoss ? (
                        <FallOutlined className='text-xs' />
                    ) : (
                        <RiseOutlined className='text-xs' />
                    )}
                    <span className='ml-1'>{`${percentage}%`}</span>
                </div>
            </div>
        </div>
        <div className='pt-4'>
            <p className='text-gray-500 text-xs'>
                You made an extra{" "}
                <span className={`${color} font-semibold`}>{extra}</span> this
                year
            </p>
        </div>
    </div>
);

export default AnalyticEcommerce;
