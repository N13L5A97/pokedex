'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ totalPages }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        if (currentPage > 1){
            router.push(`?page=${currentPage}`);
        } else {
            router.push("/");
        }
    }, [currentPage, router]);

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
