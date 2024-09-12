import Image from "next/image";
import Link from "next/link";

export default function Pokemon({ pokemon, index }) {
    const pokeIndex = pokemon.index;
    const stringIndex = ('000' + pokeIndex).slice(-3);

    // console.log(pokemon.index);

    return (
        <div key={index} className="relative flex-col items-center justify-center w-full p-4 text-black bg-white rounded-lg">
            <Link href={`/pokemon/${pokemon.name}`}>
                <Image
                    src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${stringIndex}.png`}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="m-auto"
                />
                <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                <span className="absolute top-0 left-0 p-2 text-sm text-gray-500">#{stringIndex}</span>
            </Link>
        </div>
    );
}
