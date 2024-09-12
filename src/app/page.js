import PokemonCard from "@/components/PokemonCard";
import getPokemon from "@/actions/getPokemon";
import Pagination from "@/components/Pagination";

export default async function Home({ searchParams }) {
  // Get the current page from the query string or default to 1
  const page = parseInt(searchParams.page || "1", 10);
  
  // Calculate the fetch URL based on the page number
  const fetchUrl = page > 1 
    ? `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20` 
    : 'https://pokeapi.co/api/v2/pokemon';

  // Fetch the Pokémon data using the dynamic fetchUrl
  const pokemonData = await getPokemon({ fetchUrl });
  const pokemons = pokemonData.results;
  
  const totalPages = Math.ceil(pokemonData.count / 20); // Total pages based on API count
  
  return (
    <main className="flex flex-col items-center min-h-screen p-24 pt-0">
      <div className="grid w-full grid-cols-1 gap-4 mt-10 md:grid-cols-4 lg:grid-cols-5">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} />
    </main>
  );
}
