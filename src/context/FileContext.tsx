import React, { createContext, useState, useContext } from "react";

interface FileContextType {
    selectedFiles: File[];
    setSelectedFiles: (files: File[] | ((prevFiles: File[]) => File[])) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <FileContext.Provider value={{ selectedFiles, setSelectedFiles }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFileContext must be used within a FileProvider");
    }
    return context;
};
