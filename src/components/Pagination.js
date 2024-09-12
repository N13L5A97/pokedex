'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Pagination({ totalPages, prev, next, currentPage }) {
    const router = useRouter();
    const [page, setPage] = useState(currentPage);

    // Update the URL when the page changes
    useEffect(() => {
        if (page > 1) {
            router.push(`?page=${page}`);
        } else {
            router.push('/');
        }
    }, [page, router]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="flex gap-4 p-4">
            <button onClick={handlePrevPage} disabled={page <= 1}>
                Prev
            </button>
            <p>Page {page} of {totalPages}</p>
            <button onClick={handleNextPage} disabled={page >= totalPages}>
                Next
            </button>
        </div>
    );
}
