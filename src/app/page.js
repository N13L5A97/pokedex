import Image from "next/image";
import Pokemon from "./components/pokemon";


export default async function Home() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon').then((res) =>
    res.json()
  )

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
    </main>
  );
}
