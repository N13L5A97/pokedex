import Image from "next/image";
import Link from "next/link";

export default function Pokemon({ pokemon, index }) {
    // Calculate the correct Pokédex number by considering the page offset
    const pokeIndex = pokemon.url.split('/').filter(Boolean).pop();
    const paddedIndex = ('000' + pokeIndex).slice(-3);

    return (
        <div key={index} className="bg-white p-4 rounded-lg flex-col justify-center items-center relative w-full">
            <Link href={`/pokemon/${pokemon.name}`}>
                <Image
                    src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${paddedIndex}.png`}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="m-auto"
                />
                <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                <span className="text-sm text-gray-500 absolute top-0 left-0 p-2">#{paddedIndex}</span>
            </Link>
        </div>
    );
}
