'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const types = [
        'fire', 'water', 'grass', 'bug', 'normal', 'electric',
        'ground', 'flying', 'fighting', 'psychic', 'rock', 'poison',
        'ice', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    // Function to handle the type change
    function handleTypeChange(type) {
        // Create a new instance of URLSearchParams based on the existing searchParams
        const params = new URLSearchParams(searchParams);

        // Get all the current 'type' parameters as an array
        let selectedTypes = params.getAll('type');

        if (selectedTypes.includes(type)) {
            // If the type is already selected, remove it from the array \\ every type that is not the selected type keep into selectedTypes
            selectedTypes = selectedTypes.filter((t) => t !== type);
        } else {
            // If the type is not selected, add it to the array
            selectedTypes.push(type);
        }

        params.delete('type'); // Delete all 'type' query params
        params.delete('page'); // Delete the 'page' query param

        // Add all the selected types back to the URL
        selectedTypes.forEach((t) => params.append('type', t));
        
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
