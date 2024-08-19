export default async function Page({ params }) {
    const pokeData = await fetchDetails(params.name);
    console.log(pokeData.evolution_chain); 

    return (
        <div className="text-white flex flex-wrap gap-10 p-24">
            <div className="w-full flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold capitalize">{pokeData.name}</h1>
                    <img src={pokeData.sprites.front_default} alt={pokeData.name} width={200} height={200} />
                </div>
                <div>
                    <h2 className="text-xl">Base Experience: {pokeData.base_experience}</h2>
                    <h2 className="text-xl">Height: {pokeData.height}</h2>
                    <h2 className="text-xl">Weight: {pokeData.weight}</h2>
                </div>
            </div>
            <div className="w-full flex justify-between">
                <div>
                    <h2 className="text-2xl">Abilities</h2>
                    <ul>
                        {pokeData.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl">Types</h2>
                    <ul>
                        {pokeData.types.map((type, index) => (
                            <li key={index}>{type.type.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl">Stats</h2>
                    <ul>
                        {pokeData.stats.map((stat, index) => (
                            <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl">Moves</h2>
                    <ul>
                        {pokeData.moves.slice(0, 10).map((move, index) => (
                            <li key={index}>{move.move.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="w-full">
                <h2 className="text-2xl">Evolution Chain</h2>
                <div className="flex gap-4">
                    {pokeData.evolution_chain.evolutions.map((evolution, index) => (
                        <div key={index} className="text-center">
                            <img src={evolution.image} alt={evolution.name} width={150} height={150} />
                            <p className="capitalize">{evolution.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const fetchDetails = async (name) => {
    try {
        // Fetch Pokémon details
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) {
            throw new Error('Failed to fetch Pokémon details');
        }
        const pokemonData = await res.json();

        // Fetch Pokémon species details to get the evolution chain URL
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        if (!speciesRes.ok) {
            throw new Error('Failed to fetch Pokémon species details');
        }
        const speciesData = await speciesRes.json();

        // Fetch evolution chain data
        const evolutionChainRes = await fetch(speciesData.evolution_chain.url);
        if (!evolutionChainRes.ok) {
            throw new Error('Failed to fetch evolution chain details');
        }
        const evolutionChainData = await evolutionChainRes.json();

        // Function to fetch Pokémon details and images
        const fetchPokemonImage = async (pokemonName) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch details for ${pokemonName}`);
            }
            const data = await res.json();
            return {
                name: data.name,
                image: data.sprites.front_default
            };
        };

        // Fetch details for all Pokémon in the evolution chain
        const fetchAllEvolutions = async (chain) => {
            const evolutions = [];
            let current = chain;

            while (current) {
                const pokemonImage = await fetchPokemonImage(current.species.name);
                evolutions.push(pokemonImage);

                if (current.evolves_to.length > 0) {
                    current = current.evolves_to[0]; // Assuming linear evolution chain
                } else {
                    break;
                }
            }

            return evolutions;
        };

        const evolutions = await fetchAllEvolutions(evolutionChainData.chain);

        return {
            ...pokemonData,
            evolution_chain: {
                ...evolutionChainData,
                evolutions
            }
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

