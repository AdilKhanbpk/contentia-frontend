type ExportData = Record<string, any>;

interface ExportCsvParams {
    data: ExportData[];  // Array of objects to be exported
    headers: string[];    // Array of headers
    filename: string;     // Filename for the CSV download
}

export const exportCsvFile = ({ data, headers, filename }: ExportCsvParams) => {
    // Convert data to CSV format
    const csvRows = [
        headers, // Use dynamic headers passed to the function
        ...data.map(item => headers.map(header => item[header] || ''))  // Map each item to match the header keys
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
