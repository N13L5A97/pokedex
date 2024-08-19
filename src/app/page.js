"use client";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import Header from "../components/Header";

export default function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('index-asc'); // Default sort by name ascending
  const pokemonPerPage = 20;

  const fetchAllPokemon = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await res.json();

    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        // Extract Pokémon index number from the URL
        const pokeIndex = pokemon.url.split('/').slice(-2, -1)[0];
        const details = await fetch(pokemon.url).then((res) => res.json());
        return { 
          ...pokemon,
          index: Number(pokeIndex),
          types: details.types.map((typeInfo) => typeInfo.type.name) 
        };
      })
    );

    setAllPokemon(detailedData);
    setFilteredPokemon(detailedData);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    // Apply sorting whenever the sort option changes or filters are applied
    const sorted = [...filteredPokemon].sort((a, b) => {
      if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (sortOption === 'index-asc') {
        return a.index - b.index;
      } else if (sortOption === 'index-desc') {
        return b.index - a.index;
      }
      return 0;
    });

    setFilteredPokemon(sorted);
    setCurrentPage(1); // Reset to first page on sort change
  }, [sortOption, filteredPokemon]);

  const handleSearch = (search) => {
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilter = (selectedTypes) => {
    let filtered = allPokemon;
    if (selectedTypes.length > 0) {
      filtered = allPokemon.filter((pokemon) =>
        pokemon.types.some((type) => selectedTypes.includes(type))
      );
    }
    // Apply sorting after filtering
    const sorted = filtered.sort((a, b) => {
      if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (sortOption === 'index-asc') {
        return a.index - b.index;
      } else if (sortOption === 'index-desc') {
        return b.index - a.index;
      }
      return 0;
    });

    setFilteredPokemon(sorted);
    setCurrentPage(1); // Reset to first page
  };

  // Get current Pokémon based on pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      <div className="flex gap-4 mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
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
        {/* show page numbers */}
        <div className="flex gap-2 items-center">
          <p className="text-white">{currentPage}</p>
          <p className="text-white">/</p>
          <p className="text-white">{Math.ceil(filteredPokemon.length / pokemonPerPage)}</p>
        </div>
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
