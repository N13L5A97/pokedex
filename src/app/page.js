import getPokemon from "@/actions/getPokemon";
import getAllPokemon from "@/actions/getAllPokemon";
import Search from "@/components/Search";
import PokemonCard from "@/components/PokemonCard";
import Pagination from "@/components/Pagination";

export default async function Home({ searchParams }) {
  // Get the current page 
  const page = parseInt(searchParams.page || "1", 10);
  // get search query
  const searchQuery = searchParams.search || "";

  console.log(searchQuery)

  //fetch Pokémon based on the page
  const fetchUrl = page > 1 
    ? `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20` 
    : 'https://pokeapi.co/api/v2/pokemon';

  // Fetch the Pokémon data from the API
  let pokemonData = await getPokemon({ fetchUrl });

  // Extract Pokémon and pagination info from the API response
  let pokemons = pokemonData.results;
  let totalResults = 1020;
  let totalPages = Math.ceil(totalResults / 20);
  
 // Check if there's a search query
 if (searchQuery) {
  // Fetch all Pokémon to filter
  const allPokemon = await getAllPokemon();

  // Filter Pokémon based on search query
  const filteredPokemon = allPokemon.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total results and total pages for pagination
  totalResults = filteredPokemon.length;
  totalPages = Math.ceil(totalResults / 20);

  // Paginate the filtered results
  pokemons = filteredPokemon.slice((page - 1) * 20, page * 20);
}
  
  return (
    <main className="flex flex-col items-center min-h-screen p-24 pt-0">
      <Search />
      <div className="grid w-full grid-cols-1 gap-4 mt-10 md:grid-cols-4 lg:grid-cols-5">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} />
    </main>
  );
}
