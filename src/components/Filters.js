'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Filters() {
    const types = [
        'fire', 'water', 'grass', 'bug', 'normal', 'electric',
        'ground', 'flying', 'fighting', 'psychic', 'rock', 'poison',
        'ice', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    
    function handleTypeChange(type) {
        // Create a new instance of URLSearchParams based on the existing searchParams
        const params = new URLSearchParams(typeParams);
        
        // Set the search query parameter, or delete it if the query is empty
        if (type) {
            params.set('type', type); // Set 'search' query param with the input v
            params.delete('page')
        } else {
            params.delete('type'); // If the input is empty, remove the 'search' param
        }
        
        // Update the URL with the new search parameter
        router.push(`?${params.toString()}`);
    }
    

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
            {types.map(type => (
                <label key={type} className="p-6 pt-1 pb-1 font-bold text-white bg-gray-600 border-4 border-gray-500 rounded-full cursor-pointer">
                    <input
                        className="hidden"
                        type="checkbox"
                        value={type}
                        onChange={() => handleTypeChange(type)}
                    />{" "}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
            ))}
        </div>
    );
}
