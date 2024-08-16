export default async function Page({ params }) {
    const pokeData = await fetchDetails(params.name);
    console.log(pokeData);
    return (
        <div className="text-white flex flex-wrap gap-10">
            <div className="flex justify-between w-full">
                <h1 className="text-4xl font-bold capitalize">{pokeData.name}</h1>
                <img src={pokeData.sprites.front_default} alt={pokeData.name} />
            </div>
            <div>
                <h2 className="text-xl">Base Experience: {pokeData.base_experience}</h2>
                <h2 className="text-xl">Height: {pokeData.height}</h2>
                <h2 className="text-xl">Weight: {pokeData.weight}</h2>
            </div>
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
    );
}

const fetchDetails = async (name) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) {
            throw new Error('Failed to fetch Pokémon details');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
