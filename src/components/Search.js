'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleSearch(query) {
        // Create a new instance of URLSearchParams based on the existing searchParams
        const params = new URLSearchParams(searchParams);
        
        // Set the search query parameter, or delete it if the query is empty
        if (query) {
            params.set('search', query); // Set 'search' query param with the input v
            params.delete('page')
        } else {
            params.delete('search'); // If the input is empty, remove the 'search' param
        }
        
        // Update the URL with the new search parameter
        // router.push(`?${params.toString()}`);
    }

    return (
        <input
            type="search"
            id="search"
            name="search"
            placeholder="Search for a Pokemon"
            className="w-full p-2 mb-10 text-black rounded-lg"
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
}