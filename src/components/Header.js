'use client';

import { useEffect, useState } from "react";

export default function Header({ onSearch, onFilter }) {
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
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-10 text-white">Pokedex</h1>
            <input
                type="search"
                id="search"
                placeholder="Search for a Pokemon"
                className="w-full p-2 rounded-lg mb-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="mb-10 flex gap-4">
                <label className="text-white">
                    <input
                        type="checkbox"
                        value="fire"
                        onChange={() => handleTypeChange("fire")}
                    />{" "}
                    Fire
                </label>
                <label className="text-white">
                    <input
                        type="checkbox"
                        value="water"
                        onChange={() => handleTypeChange("water")}
                    />{" "}
                    Water
                </label>
                <label className="text-white">
                    <input
                        type="checkbox"
                        value="grass"
                        onChange={() => handleTypeChange("grass")}
                    />{" "}
                    Grass
                </label>
                {/* Add more checkboxes for other types as needed */}
            </div>
        </div>
    );
}