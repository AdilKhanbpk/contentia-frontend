import { RiseOutlined, FallOutlined } from "@ant-design/icons";

interface Props {
    title: string;
    count: string;
}

const AnalyticEcommerce = ({ title, count }: Props) => (
    <div className='bg-white p-6 rounded-md shadow-md'>
        <div className='space-y-1'>
            <p className='text-gray-500'>{title}</p>
            <div className='flex items-center space-x-2'>
                <p className='text-2xl font-semibold text-black'>{count}</p>
            </div>
        </div>
    </div>
);

export default AnalyticEcommerce;
