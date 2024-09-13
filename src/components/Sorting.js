'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortingOptions() {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleSorting(sort) {
        // Create a new instance of URLSearchParams based on the existing searchParams
        const params = new URLSearchParams(searchParams);
        
        // Set the search query parameter, or delete it if the query is empty
        if (sort) {
            params.set('sort', sort); // Set 'search' query param with the input v
            params.delete('page')
        }
        
        // Update the URL with the new search parameter
        router.push(`?${params.toString()}`);
    }

    return (
        <select
            onChange={(e) => handleSorting(e.target.value)}
            className="p-2 text-black rounded-md"
        >
            <option value="index-asc">Sort by Index (asc)</option>
            <option value="index-desc">Sort by Index (desc)</option>
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
        </select>
    );
}
