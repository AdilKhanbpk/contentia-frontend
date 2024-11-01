"use client";
// components/IncomeOverview.tsx
import { useState } from 'react';
import IncomeChart from './IncomeChart';

const IncomeOverview = () => {
  const [slot, setSlot] = useState<'week' | 'month'>('month');
  const [quantity, setQuantity] = useState<'By volume' | 'By margin' | 'By sales'>('By volume');

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Income Overview</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-1 text-sm ${slot === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSlot('week')}
          >
            Week
          </button>
          <button
            className={`px-4 py-1 text-sm ${slot === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSlot('month')}
          >
            Month
          </button>
          <select
            className="px-2 py-1 bg-gray-200 text-sm"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value as typeof quantity)}
          >
            <option value="By volume">By Volume</option>
            <option value="By margin">By Margin</option>
            <option value="By sales">By Sales</option>
          </select>
        </div>
      </div>
      <div className="text-red-500 mt-4 flex items-center">
        <span>$1,12,900 (45.67%)</span>
        <span className="text-gray-400 ml-2 text-sm">Compare to : 01 Dec 2021-08 Jan 2022</span>
      </div>
      <div className="mt-4">
        <IncomeChart slot={slot} quantity={quantity} />
      </div>
    </div>
  );
};

export default IncomeOverview;
