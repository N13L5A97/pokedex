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
        </div>
    );
}
