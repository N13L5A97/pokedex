'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header({ onSearch, onFilter, sortOption, setSortOption }) {
    const [search, setSearch] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);

    useEffect(() => {
        if (onSearch) {
            onSearch(search);
        }
    }, [search]);

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
        <div className="pt-10 flex flex-col items-center">
            <Image src="/pokeball.png" alt="Pokeball" width={100} height={100} />
            <h1 className="text-4xl font-bold mb-10 text-white text-center mt-5">Pokédex</h1>
            <input
                type="search"
                id="search"
                placeholder="Search for a Pokemon"
                className="w-full p-2 rounded-lg mb-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="mb-10 flex gap-4 flex-wrap justify-center">
                {/* Type filters */}
                {['fire', 'water', 'grass', 'bug', 'normal', 'electric', 'ground', 'flying', 'fighting', 'psychic', 'rock', 'poison', 'ice', 'ghost', 'dragon', 'dark', 'steel', 'fairy'].map(type => (
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
            <div className="flex gap-4 mb-10">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 rounded-md"
                >
                    <option value="index-asc">Sort by Index (asc)</option>
                    <option value="index-desc">Sort by Index (desc)</option>
                    <option value="name-asc">Sort by Name (A-Z)</option>
                    <option value="name-desc">Sort by Name (Z-A)</option>
                </select>
            </div>
        </div>
    );
}
