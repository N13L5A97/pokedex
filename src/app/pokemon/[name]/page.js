export default async function Page() {
    const pokeData = await fetchDetails();
    console.log(pokeData);

    return(
        <div className="text-white flex flex-wrap gap-10">
            <div className="flex justify-between w-full">
                <h1>{pokeData.name}</h1>
                <img src={pokeData.sprites.front_default} alt={pokeData.name} />
            </div>
            <div>
                <h2>Base Experience: {pokeData.base_experience}</h2>
                <h2>Height: {pokeData.height}</h2>
                <h2>Weight: {pokeData.weight}</h2>
            </div>
            <div>
            <h2>Abilities</h2>
            <ul>
                {pokeData.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                ))}
            </ul>
            </div>
            <div>
            <h2>Types</h2>
            <ul>
                {pokeData.types.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                ))}
            </ul>
            </div>
            <div>
            <h2>Stats</h2>
            <ul>
                {pokeData.stats.map((stat, index) => (
                    <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
            </ul>
            </div>
            <div>
            <h2>Moves</h2>
            <ul>
                {pokeData.moves.map((move, index) => (
                    <li key={index}>{move.move.name}</li>
                ))}
            </ul>
            </div>
        </div>
    )
}

const fetchDetails = async () => {
    try{
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur`).then((res) => res.json());
        return data;
    } catch (error) {
        console.log(error);
    }
  }