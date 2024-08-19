'use client';

import { useState } from 'react';

export default function Filters({ onFilter }) {
    const types = [
        'fire', 'water', 'grass', 'bug', 'normal', 'electric',
        'ground', 'flying', 'fighting', 'psychic', 'rock', 'poison',
        'ice', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleTypeChange = (type) => {
        const updatedTypes = selectedTypes.includes(type)
            ? selectedTypes.filter((t) => t !== type)
            : [...selectedTypes, type];
        setSelectedTypes(updatedTypes);
        if (onFilter) {
            onFilter(updatedTypes);
        }
    };


    return (
        <div className="mb-10 flex gap-4 flex-wrap justify-center">
            {types.map(type => (
                <label key={type} className="cursor-pointer text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
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
