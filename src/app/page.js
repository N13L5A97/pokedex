// pages/index.js
"use client";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import Header from "../components/Header";
import Search from "../components/Search";
import Filters from "../components/Filters";
import Sorting from "../components/Sorting";

export default function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('index-asc'); // Default sort by index ascending
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const pokemonPerPage = 20;

  const fetchAllPokemon = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=999');
      const data = await res.json();

      console.log(data);

      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetch(pokemon.url).then((res) => res.json());
          const pokeIndex = details.id;
          // console.log(pokemon.url);
          return { 
            ...pokemon,
            index: pokeIndex,
            types: details.types.map((typeInfo) => typeInfo.type.name) 
          };
        })
      );

      setAllPokemon(detailedData);
      setFilteredPokemon(detailedData);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    // Apply filtering
    let filtered = allPokemon;

    if (selectedTypes.length > 0) {
      filtered = allPokemon.filter((pokemon) =>
        pokemon.types.some((type) => selectedTypes.includes(type))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
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

    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page on filter or sort change
  }, [sortOption, selectedTypes, allPokemon]);

  const handleSearch = (search) => {
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilter = (types) => {
    setSelectedTypes(types);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Get current Pokémon based on pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-0">
      <Header></Header>
      <Search onSearch={handleSearch}> </Search>
      <Filters onFilter={handleFilter}> </Filters>
      <Sorting sortOption={sortOption} onSortChange={handleSortChange}> </Sorting>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mt-10">
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
        </>
      )}
    </main>
  );
}
