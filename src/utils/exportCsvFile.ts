type ExportData = Record<string, any>;

interface ExportCsvParams {
    data: ExportData[];
    headers: string[];
    filename: string;
}

export const exportCsvFile = ({ data, headers, filename }: ExportCsvParams) => {

    const csvRows = [
        headers,
        ...data.map(item => headers.map(header => item[header] || ''))
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
