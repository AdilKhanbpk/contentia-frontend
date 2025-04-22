import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    1,
                    "...",
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className='my-6 flex justify-center items-center space-x-2'>
            {/* Previous Arrow */}
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className='px-2'
                >
                    <ArrowLeftCircleIcon
                        width={40}
                        height={40}
                        color='#4D4EC9'
                    />
                </button>
            )}

            {/* Page Buttons */}
            {pageNumbers.map((number, index) =>
                number === "..." ? (
                    <span
                        key={index}
                        className='px-2 font-semibold text-gray-500'
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={number}
                        onClick={() => onPageChange(Number(number))}
                        className={`px-3 py-1 font-semibold rounded-full transition ${
                            currentPage === number
                                ? "BlueText border border-blue-500"
                                : "text-black hover:text-blue-600"
                        }`}
                    >
                        {number}
                    </button>
                )
            )}

            {/* Next Arrow */}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className='px-2'
                >
                    <ArrowRightCircleIcon
                        width={40}
                        height={40}
                        color='#4D4EC9'
                    />
                </button>
            )}
        </div>
    );
};

export default Pagination;
