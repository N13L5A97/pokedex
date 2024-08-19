'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

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
        <div className="pt-10 flex flex-col items-center">
			<Image src="/pokeball.png" alt="Pokeball" width={100} height={100} />
            <h1 className="text-4xl font-bold mb-10 text-white text-center mt-5">Pokedex</h1>
            <input
                type="search"
                id="search"
                placeholder="Search for a Pokemon"
                className="w-full p-2 rounded-lg mb-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="mb-10 flex gap-4 flex-wrap justify-center">
                <label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
                    <input
						className="hidden"
                        type="checkbox"
                        value="fire"
                        onChange={() => handleTypeChange("fire")}
                    />{" "}
                    Fire
                </label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
                    <input
						className="hidden"
                        type="checkbox"
                        value="water"
                        onChange={() => handleTypeChange("water")}
                    />{" "}
                    Water
                </label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="grass"
						onChange={() => handleTypeChange("grass")}
					/>{" "}
					Grass
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="bug"
						onChange={() => handleTypeChange("bug")}
					/>{" "}
					Bug
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="normal"
						onChange={() => handleTypeChange("normal")}
					/>{" "}
					Normal
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="electric"
						onChange={() => handleTypeChange("electric")}
					/>{" "}
					Electric
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="ground"
						onChange={() => handleTypeChange("ground")}
					/>{" "}
					Ground
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="flying"
						onChange={() => handleTypeChange("flying")}
					/>{" "}
					Flying
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="fighting"
						onChange={() => handleTypeChange("fighting")}
					/>{" "}
					Fighting
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="psychic"
						onChange={() => handleTypeChange("psychic")}
					/>{" "}
					Psychic
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="rock"
						onChange={() => handleTypeChange("rock")}
					/>{" "}
					Rock
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="poison"
						onChange={() => handleTypeChange("poison")}
					/>{" "}
					Poison
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="ice"
						onChange={() => handleTypeChange("ice")}
					/>{" "}
					Ice
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="ghost"
						onChange={() => handleTypeChange("ghost")}
					/>{" "}
					Ghost
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="dragon"
						onChange={() => handleTypeChange("dragon")}
					/>{" "}
					Dragon
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="dark"
						onChange={() => handleTypeChange("dark")}
					/>{" "}
					Dark
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="steel"
						onChange={() => handleTypeChange("steel")}
					/>{" "}
					Steel
				</label>
				<label className="text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
					<input
						className="hidden"
						type="checkbox"
						value="fairy"
						onChange={() => handleTypeChange("fairy")}
					/>{" "}
					Fairy
				</label>

                {/* Add more checkboxes for other types as needed */}
            </div>
        </div>
    );
}