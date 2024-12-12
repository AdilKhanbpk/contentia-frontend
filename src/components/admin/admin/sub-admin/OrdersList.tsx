"use client";
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import Dot from './Dot';

interface Data {
  name: string;
  carbs: number;
  fat: number;
  tracking_no: number;
  protein: number;
}

function createData(tracking_no: number, name: string, fat: number, carbs: number, protein: number): Data {
  return { tracking_no, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, 'Camera Lens', 40, 2, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 1, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 2, 70999),
  createData(98753263, 'Mouse', 89, 2, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(98753291, 'Chair', 100, 0, 14001)
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Table header cell types
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  align: 'center' | 'left' | 'right';
}

const headCells: readonly HeadCell[] = [
  { id: 'tracking_no', align: 'left', disablePadding: false, label: 'Tracking No' },
  { id: 'name', align: 'left', disablePadding: true, label: 'Product Name' },
  { id: 'fat', align: 'right', disablePadding: false, label: 'Total Order' },
  { id: 'carbs', align: 'left', disablePadding: false, label: 'Status' },
  { id: 'protein', align: 'right', disablePadding: false, label: 'Total Amount' }
];

interface OrderTableHeadProps {
  order: Order;
  orderBy: string;
}

function OrderTableHead({ order, orderBy }: OrderTableHeadProps) {
  return (
    <thead>
      <tr>
        {headCells.map((headCell) => (
          <th
            key={headCell.id}
            className={`p-2 whitespace-nowrap text-${headCell.align} font-semibold ${headCell.disablePadding ? 'px-0' : 'px-4'}`}
          >
            {headCell.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

interface OrderStatusProps {
  status: number;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'bg-yellow-400';
      title = 'Pending';
      break;
    case 1:
      color = 'bg-green-500';
      title = 'Approved';
      break;
    case 2:
      color = 'bg-red-500';
      title = 'Rejected';
      break;
    default:
      color = 'bg-gray-500';
      title = 'None';
  }

  return (
    <div className="flex items-center space-x-2">
      <Dot color={color} />
      <span>{title}</span>
    </div>
  );
};

export default function OrdersList() {
  const [order] = useState<Order>('asc');
  const [orderBy] = useState<keyof Data>('tracking_no');

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-200 text-sm">
        <OrderTableHead order={order} orderBy={orderBy} />
        <tbody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => (
            <tr key={row.tracking_no} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 text-left">
                <p className='list-none text-gray-600'>
                  {row.tracking_no}
                </p>
              </td>
              <td className="p-2 text-left">{row.name}</td>
              <td className="p-2 text-center">{row.fat}</td>
              <td className="p-2 text-left">
                <OrderStatus status={row.carbs} />
              </td>
              <td className="p-2 text-center">
                <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
