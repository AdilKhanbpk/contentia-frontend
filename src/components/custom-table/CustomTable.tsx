import React from "react";
import dynamic from "next/dynamic";

const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

interface CustomTableProps {
    columns: any[];
    data: any[];
    onExport: () => void;
    showAddCustomerModal: () => void;
    showEditCustomerModal: () => void;
    addButtonText: string;
    searchTerm: string;  // Add searchTerm prop
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // Add onSearchChange prop
}

const CustomTable: React.FC<CustomTableProps> = ({
    columns,
    data,
    onExport,
    showAddCustomerModal,
    showEditCustomerModal,
    addButtonText,
    searchTerm,  // Use searchTerm
    onSearchChange  // Use onSearchChange
}) => {
    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-4 space-x-2">
                <div className="flex justify-center items-center">
                    {/* Add the search input here */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={onSearchChange}
                        placeholder="Search..."
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="flex flex-row space-x-2">
                    <button
                        className="px-4 py-2 ButtonBlue text-white rounded-md"
                        onClick={showAddCustomerModal}
                    >
                        {addButtonText}
                    </button>

                    <button
                        className="px-4 py-0.5 bg-green-500 text-white rounded-md"
                        onClick={onExport}
                    >
                        Export CSV
                    </button>
                </div>
            </div>



            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={{
                    rows: {
                        style: {
                            fontSize: "14px",
                            fontWeight: "500",
                        },
                    },
                    headRow: {
                        style: {
                            fontSize: "15px",
                            fontWeight: "bold",
                        },
                    },
                }}
            />
        </div>
    );
};

export default CustomTable;
