"use client";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import Header from "../components/Header";

export default function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 20;

  const fetchAllPokemon = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await res.json();

    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const details = await fetch(pokemon.url).then((res) => res.json());
        return { ...pokemon, types: details.types.map((typeInfo) => typeInfo.type.name) };
      })
    );

    setAllPokemon(detailedData);
    setFilteredPokemon(detailedData);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const handleSearch = (search) => {
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilter = (selectedTypes) => {
    if (selectedTypes.length === 0) {
      setFilteredPokemon(allPokemon);
      return;
    }

    const filtered = allPokemon.filter((pokemon) =>
      pokemon.types.some((type) => selectedTypes.includes(type))
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Get current Pokémon based on pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentPokemon.map((pokemon, index) => (
          <Pokemon key={index} pokemon={pokemon} index={indexOfFirstPokemon + index} />
        ))}
      </div>
      <div className="w-full flex justify-center gap-4 mt-10">
        <button 
          className="p-2 px-4 rounded-md bg-sky-500"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          >
          Prev
        </button>
        <button 
          className="p-2 px-4 rounded-md bg-sky-500"
          onClick={() => setCurrentPage((prev) => (indexOfLastPokemon < filteredPokemon.length ? prev + 1 : prev))}
          disabled={indexOfLastPokemon >= filteredPokemon.length}
        >
          Next
        </button>
      </div>
    </main>
  );
}
