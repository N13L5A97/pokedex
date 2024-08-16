"use client";

import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Set the number of items per page

  // Fetch all Pokémon data on component mount
  useEffect(() => {
    const fetchAllPokemon = async () => {
      let url = "https://pokeapi.co/api/v2/pokemon?limit=10000"; // Fetching all Pokémon
      try {
        const res = await fetch(url);
        const allPokemonData = await res.json();
        setData(allPokemonData.results);
        setFilteredData(allPokemonData.results); // Initially, display all Pokémon
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchAllPokemon();
  }, []);

  // Filter Pokémon based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page when searching
    } else {
      setFilteredData(data); // Show all Pokémon if there's no search query
    }
  }, [searchQuery, data]);

  // Calculate the current page's Pokémon to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">
      <div className="w-full">
        <input
          type="search"
          placeholder="Search for a Pokémon"
          className="w-full p-2 rounded-lg mb-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* pokemon cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {paginatedData.map((pokemon, index) => (
          <Pokemon key={index} pokemon={pokemon} index={startIndex + index} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="w-full flex justify-center gap-4 mt-10">
        <button
          className="p-2 px-4 rounded-md bg-sky-500"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="p-2 px-4 rounded-md bg-sky-500"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
