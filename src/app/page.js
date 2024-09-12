import Link from "next/link";
import PokemonCard from "@/components/PokemonCard";
import getPokemon from "@/actions/getPokemon"
import Pagination from "@/components/Pagination";

export default async function Home() {

  const pokemonData = await getPokemon();
  const pokemons = pokemonData.results;
  // console.log(pokemonData)
  
  const totalPages = Math.ceil(pokemonData.count / 20);
  // console.log(totalPages);
  
  
  return (
    <main className="flex flex-col items-center min-h-screen p-24 pt-0">
      <div className="grid w-full grid-cols-1 gap-4 mt-10 md:grid-cols-4 lg:grid-cols-5">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url}/>
          ))}
        </div>
        < Pagination totalPages={totalPages} />
    </main>
  );
}