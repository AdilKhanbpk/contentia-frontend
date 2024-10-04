import React from 'react';
import Image from 'next/image';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="my-6 flex justify-center items-center space-x-2">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`${currentPage === number ? 'BlueText font-semibold' : 'text-black font-semibold'
                        } px-3 py-1`}
                >
                    {number}
                </button>
            ))}

            {currentPage < totalPages && (
                <>
                    <span className="px-3 font-semibold">...</span>
                    <button onClick={() => onPageChange(totalPages)} className="px-3 text-black font-semibold">
                        {totalPages}
                    </button>
                    <button onClick={() => onPageChange(currentPage + 1)} className="px-3 text-black font-semibold">
                        <Image width={20} height={20} src="/NextArrow.svg" alt='next arrow'></Image>
                    </button>
                </>
            )}
        </div>
    );
};

export default Pagination;
