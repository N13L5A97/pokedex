'use client';

import { useState, useEffect } from 'react';

export default function Search({ onSearch }) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        onSearch(search);
    }, [search]);

    return (
        <input
            type="search"
            id="search"
            placeholder="Search for a Pokemon"
            className="w-full p-2 mb-10 text-black rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
