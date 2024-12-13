import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

interface CustomTableProps {
    columns: any[];
    data: any[];
}

const CustomTable: React.FC<CustomTableProps> = ({
    columns,
    data,
}) => {
    return (
        <div>
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
