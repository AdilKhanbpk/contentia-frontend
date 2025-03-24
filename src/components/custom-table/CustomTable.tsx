import dynamic from "next/dynamic";
import { FC } from "react";

const DataTable = dynamic(() => import("react-data-table-component"), {
    ssr: false,
});

interface CustomTableProps {
    columns: any[];
    data: any[];
    noDataComponent: string;
    loading?: boolean;
}

const CustomTable: FC<CustomTableProps> = ({
    columns,
    data,
    noDataComponent,
    loading,
}) => {
    return (
        <div>
            {loading ? (
                <table className='w-full text-center text-gray-500 py-4 border'>
                    <tbody>
                        <tr>
                            <td className='p-4'>Loading Data ...</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    customStyles={customTableStyles}
                    noDataComponent={
                        <table className='w-full text-center text-gray-500 py-4 border'>
                            <tbody>
                                <tr>
                                    <td className='p-4'>{noDataComponent}</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                />
            )}
        </div>
    );
};

const customTableStyles = {
    rows: {
        style: {
            fontSize: "14px",
            fontWeight: "500",
        },
    },
    headRow: {
        style: {
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#f8f8f8",
        },
    },
    headCells: {
        style: {
            fontWeight: "600",
            color: "#333",
        },
    },
};

export default CustomTable;
