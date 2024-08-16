"use client"
import Image from "next/image";
import Pokemon from "../components/Pokemon";
import { useEffect, useState } from "react";


export default async function Home() {

  const initialData = await getInitialPokemon();
 
  const [data, setData] = useState(initialData);

  const fetchPokemon = async (url) => {
    const res = await fetch(url);
    const nextData = await res.json();
    setData(nextData);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-10 text-white">Pokedex</h1>
      {/* search option */}
      <input
        type="text"
        placeholder="Search for a Pokemon"
        className="w-full p-2 rounded-lg mb-10"
      />
      {/* filter option */}
      {/* <div className="mb-10 flex">
        <label>
          Fire
          <input type="checkbox" name="filter" value="fire" />
        </label>
        <label>
          Water
          <input type="checkbox" name="filter" value="water" />
        </label>
      </div> */}

      {/* pokemon cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.results.map((pokemon, index) => (
          <Pokemon key={index} pokemon={pokemon} index={index} />
        ))}
      </div>
      <div className="w-full flex justify-center gap-4 mt-10">
        <button 
          className="p-2 px-4 rounded-md bg-sky-500"
          onClick={() => fetchPokemon(data.previous)}
          >
          Prev
        </button>
        <button 
          className="p-2 px-4 rounded-md bg-sky-500"
          onClick={() => fetchPokemon(data.next)}
        >
          Next
        </button>
      </div>
    </main>
  );
}


export async function getInitialPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon');
  const initialData = await res.json();

  return initialData;
}