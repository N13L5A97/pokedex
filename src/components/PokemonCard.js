import Image from "next/image";
import Link from "next/link";

export default function Pokemon(pokemon) {

    const index = pokemon.url.slice(34).slice(0, -1); 
    let pokeIndex = ("000" + index).slice(-3);

    // make string into int to check if index is above 999
    const indexInt = parseInt(index, 10);

    console.log(indexInt);

    if (indexInt >= 1000) {
        pokeIndex = index;
        // console.log("its higher then 999")
    }

    // console.log(pokeIndex);
    
    return (
        <div className="relative flex-col items-center justify-center w-full p-4 text-black bg-white rounded-lg">
            <Link href={`/pokemon/${pokemon.name}`}>
                {/* <Image
                    src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokeIndex}.png`}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="m-auto"
                /> */}
                <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                <span className="absolute top-0 left-0 p-2 text-sm text-gray-500">#{pokeIndex}</span>
            </Link>
        </div>
    );
}


// https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png
// https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/1025.png