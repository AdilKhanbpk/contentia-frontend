"use client";
// components/Dashboard.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions type

const ChartCircle: React.FC = () => {
  const chartOptions: ApexOptions = { // Set type explicitly
    labels: ['E-Commerce', 'Cosmetics', 'Fashion', 'Healthcare/Sports'],
    colors: ['#2ec4b6', '#0f4c75', '#3282b8', '#1b262c'],
    chart: {
      type: 'donut', // Type is now explicitly set to 'donut'
    },
    legend: {
      position: 'bottom',
    },
  };

  const chartSeries = [60.2, 18.1, 12, 9.6];

  return (
    <div className="flex flex-row justify-start items-center space-x-8 rounded-lg">
      {/* Order Status Section */}
      <div className="w-1/2 flex flex-col items-start space-y-4 p-4">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="border rounded-lg p-6">
            <p className="text-lg font-bold">500</p>
            <p className="text-gray-600">Active Orders</p>
          </div>
          <div className="border rounded-lg p-6">
            <p className="text-lg font-bold">18,800</p>
            <p className="text-gray-600">Completed</p>
          </div>
          <div className="border rounded-lg p-6">
            <p className="text-lg font-bold">1,200</p>
            <p className="text-gray-600">Cancelled</p>
          </div>
          <div className="border rounded-lg p-6">
            <p className="text-lg font-bold">58</p>
            <p className="text-gray-600">in Revision</p>
          </div>
        </div>
      </div>

      {/* Sales by Brand Category Chart */}
      <div className="w-1/2 flex flex-col items-center">
        <Chart
          options={chartOptions} // No type error
          series={chartSeries}
          type="donut"
          width="350"
        />
      </div>
    </div>
  );
};

export default ChartCircle;
