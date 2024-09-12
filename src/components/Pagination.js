'use client';

import { useState } from 'react';

export default function Pagination({ totalPages }) {
    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    console.log(totalPages);

    return (
        <div className="flex gap-4 p-4">
            <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
            >
                Prev
            </button>
            <p>Page {currentPage} of {totalPages}</p>
            <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>
    );
}