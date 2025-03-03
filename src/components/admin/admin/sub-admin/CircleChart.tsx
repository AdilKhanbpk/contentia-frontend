"use client";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { OrderAnalytics } from "@/store/features/admin/dashboardSlice";

interface ChartCircleProps {
    orders: OrderAnalytics;
}

const ChartCircle: React.FC<ChartCircleProps> = ({ orders }) => {
    const chartOptions: ApexOptions = {
        labels: ["E-Commerce", "Cosmetics", "Fashion", "Healthcare/Sports"],
        colors: ["#2ec4b6", "#0f4c75", "#3282b8", "#1b262c"],
        chart: {
            type: "donut",
        },
        legend: {
            position: "bottom",
        },
    };

    const chartSeries = [60.2, 18.1, 12, 9.6];

    return (
        <div className='flex flex-col lg:flex-row justify-start  space-x-8 rounded-lg'>
            {/* Order Status Section */}
            <div className=' w-full lg:w-1/2 flex flex-col items-start space-y-4 p-4'>
                <h3 className='text-xl font-bold'>Order Status</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-6 text-center'>
                    <div className='border rounded-lg p-6'>
                        <p className='text-lg font-bold'>
                            {orders?.activeOrders}
                        </p>
                        <p className='text-gray-600'>Active Orders</p>
                    </div>
                    <div className='border rounded-lg p-6'>
                        <p className='text-lg font-bold'>
                            {orders?.completedOrders}
                        </p>
                        <p className='text-gray-600'>Completed</p>
                    </div>
                    <div className='border rounded-lg p-6'>
                        <p className='text-lg font-bold'>
                            {orders?.canceledOrders}
                        </p>
                        <p className='text-gray-600'>Cancelled</p>
                    </div>
                    <div className='border rounded-lg p-6'>
                        <p className='text-lg font-bold'>
                            {orders?.revisionOrders}
                        </p>
                        <p className='text-gray-600'>in Revision</p>
                    </div>
                </div>
            </div>

            {/* Sales by Brand Category Chart */}
            <div className=' w-full lg:w-1/2 flex flex-col items-center space-y-4 p-4'>
                <div>
                    <h3 className='text-xl font-bold'>
                        Sales by Brand Category
                    </h3>
                </div>
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type='donut'
                    width='350'
                />
            </div>
        </div>
    );
};

export default ChartCircle;
