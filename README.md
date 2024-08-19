# Pokédex

Voor de Pokédex heb ik verschillende componenten gebruikt zodat deze (eventueel in de toekomst) hergebruikt kunnen worden. Zo heb ik componenten voor filters, een zoekbalk sorterings opties en de header en pokemon cards.

## De Header

De header is simpel opgebouwd uit een logo en een titel. Met wat styling zet ik deze onder elkaar en centreer in deze op de pagina.

```js
import Image from "next/image";

export default function Header() {
    return (
        <div className="pt-10 flex flex-col items-center">
            <Image src="/pokeball.png" alt="Pokeball" width={100} height={100} />
            <h1 className="text-4xl font-bold mb-10 text-white text-center mt-5">Pokédex</h1>
        </div>
    );
}

```

Deze wordt in de layout geïmplementeerd zodat deze op elke pagina te zien is. Hier zijn ook de titel en de description van de website aangepast.

```js
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokédex",
  description: "a Next.js Pokédex by Niels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

## Homepage

Aan het begin van de homepage importeer ik alle componenten (deze worden later een voor een uitgelegd). Om de rerultaten van het filteren, zoeken en sorteren te updaten heb ik useEffect en useState van react, dus ook deze importeer in bovenin de pagina. Aangezien dit een client side functie is moet ik aangeven dat ik client side wil renderen.

```js
"use client";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import Header from "../components/Header";
import Search from "../components/Search";
import Filters from "../components/Filters";
import Sorting from "../components/Sorting";
```

Vervolgens maak ik variabelen aan om de oude states te vervangen en een default state aan te geven.
Ik kan hier ook benoemen hoeveel pokemons ik per pagina wil laten zien. Deze zou ik eventueel dynamisch kunnen maken zodat de gebruiker zelf kan kiezen hoeveel Pokémons deze per pagina zou willen zien.

```js
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('index-asc'); // Default sort by index ascending
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const pokemonPerPage = 20;
```

Bij het renderen van de pagina moeten er een aantal dingen gebeuren. We moeten alle pokemons ophalen deze tonen op basis van wat de gebruiker wil zien. Hieronder definiëren we hoe we de pokemons ophalen. Dit doen we async zodat het tegelijkertijd gebeurd met alle andere opdrachten die er uitgevoerd moeten worden. Zo hoeft de pagina niet te wachten tot de ene taak is uitgevoerd en verder kan met de volgende.

Hier fetchen we alle pokemons (999) en stoppen deze in een json format. Vervolgens gebruiken we de urls van alle pokemons om de details op te halen die we nodig hebben voor het filteren op types en voor de detail pagina's. De pokemons, de index en de types stoppen we vervolgens in detailedData. Als dit niet lukt zal de console een error geven en als het klaar is zal de loading state stoppen.

```js
export default function Home() {

  const fetchAllPokemon = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=999');
      const data = await res.json();

      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetch(pokemon.url).then((res) => res.json());
          const pokeIndex = details.id;
          return { 
            ...pokemon,
            index: pokeIndex,
            types: details.types.map((typeInfo) => typeInfo.type.name) 
          };
        })
      );

      setAllPokemon(detailedData);
      setFilteredPokemon(detailedData);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);
```

Hier onder kun je zien hoe de filters werken. In principe is de variabele "filtered" het zelfde als "allPokemon". Dit is de state wanneer er geen filter is geselecteerd. Als er meer dan 1 filter is geselecteerd zal de variabele niet meer "allPokemin" zijn, maar alle pokemons selecteren die het zelfde type hebben als een van de geselecteerde geselecteerde types.

In dezelfde functie sorteren we de pokemons meteen op naam of index. Dit kan omdat in eerste instantie de gefilterde pokemons hetzelfde zijn als alle Pokémons ongefilterd. We zetten de pagina index hier weer op 1 zodat de zoekresultaten vanaf het begin af aan worden weergeven.

```js
  useEffect(() => {
    // Apply filtering
    let filtered = allPokemon;

    if (selectedTypes.length > 0) {
      filtered = allPokemon.filter((pokemon) =>
        pokemon.types.some((type) => selectedTypes.includes(type))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (sortOption === 'index-asc') {
        return a.index - b.index;
      } else if (sortOption === 'index-desc') {
        return b.index - a.index;
      }
      return 0;
    });

    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page on filter or sort change
  }, [sortOption, selectedTypes, allPokemon]);
```

Naast filteren en sorteren kunnen we ook zoeken. Wanneer er in de zoekbalk iets wordt ingetypt wordt er gekeken of een van de namen van de pokemon de ingetypte letters bevat. Dit wordt ook automatisch omgezet naar lowecase omdat er geen hoofletters in de namen van het json bestand zitten. Dit is om typfouten te voorkomen.

```js
  const handleSearch = (search) => {
    const filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset to first page
  };
```

Hieronoder worden de functies aangeroepen vanuit de losse componenten filters en sort.

```js
  const handleFilter = (types) => {
    setSelectedTypes(types);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };
```

Als laatst is het handig om de index te weten van alle Pokemons. Hiermee kan de pagination gemaakt worden. Omdat we hiermee weten wat de eerste pokemon en laatste pokemon van de pagina is kunnen we de juiste pokemon per pagina laten zien.

```js
  // Get current Pokémon based on pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
```

Wanneer alle data is verzameld kunnen we de pagina opbouwen. Omdat ik alle onderdelen onder elkaar wil hebben zet in de main op display flex column met de items gecentreerd in het midden. In de main zet ik alle componenten die ik heb gebouwd onder elkaar. De data die ik nodig heb voor deze componenten stuur ik mee. Onder de componenten zet ik een loasin state omdat het best lang kan duren voor alle Pokemon geladen zijn. wanneer dit klaar is met laden worden alle Pokemon laten zien in een grid. Op klein scherm heeft dit grid 1 column, op gemiddeld scherm 4 en op groot scherm 5. Dit heb ik zo gedaan omdat je 20 makkelijk door 4 en 5 kan delen en dus mooi uitkomt op de pagina.

```js
  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-0">
      <Header></Header>
      <Search onSearch={handleSearch}> </Search>
      <Filters onFilter={handleFilter}> </Filters>
      <Sorting sortOption={sortOption} onSortChange={handleSortChange}> </Sorting>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mt-10">
            {currentPokemon.map((pokemon, index) => (
              <Pokemon key={index} pokemon={pokemon} index={indexOfFirstPokemon + index} />
            ))}
          </div>
```

Onder de Pokemon hebben we 2 knoppen om te kunnen navigeren tussen de pagina's. Wanneer de current page gelijk is aan 1 wordt de prev knop disabled. Tussen de knoppen in kun je zien op welke pagina je bent.

```js
          <div className="w-full flex justify-center gap-4 mt-10">
            <button 
              className="p-2 px-4 rounded-md bg-sky-500"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <div className="flex gap-2 items-center">
              <p className="text-white">{currentPage}</p>
              <p className="text-white">/</p>
              <p className="text-white">{Math.ceil(filteredPokemon.length / pokemonPerPage)}</p>
            </div>
            <button 
              className="p-2 px-4 rounded-md bg-sky-500"
              onClick={() => setCurrentPage((prev) => (indexOfLastPokemon < filteredPokemon.length ? prev + 1 : prev))}
              disabled={indexOfLastPokemon >= filteredPokemon.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}
```

## Filter Component

In het filter component definieer ik als eerste welke types er allemaal zijn. We gebruiken useState hier weer om de state te updaten wanneer deze veranderd. De handleTypeChange function checkt of the filter al is geselecteerd. Zo ja dan verijderd hij hem uit de array (er wordt een nieuwe array aangemaakt zonder de zojuist gedeselecteerde filter) zo niet dan voegt hij hem toe aan de filter array. Daarna stuurt hij deze array naar de handleFilter functie in page.js.

```js
'use client';

import { useState } from 'react';

export default function Filters({ onFilter }) {
    const types = [
        'fire', 'water', 'grass', 'bug', 'normal', 'electric',
        'ground', 'flying', 'fighting', 'psychic', 'rock', 'poison',
        'ice', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleTypeChange = (type) => {
        const updatedTypes = selectedTypes.includes(type)
            ? selectedTypes.filter((t) => t !== type)
            : [...selectedTypes, type];
        setSelectedTypes(updatedTypes);
        if (onFilter) {
            onFilter(updatedTypes);
        }
    };
```

Hieronder worden de filter opties weergeven. We hebben eerder alle types gedefinieerd en kunnen hier voor iedere filter een label met een input aanmaken daarvoor. Wanneer er iets veranderd aan deze filter (selecteren of deselecteren) gaat hij de handleTypeChange functie aanroepen met de desbetreffende type als value. Hier wordt er ook voor gezorgd dat deze types een hoofdletter krijgen.

```js
    return (
        <div className="mb-10 flex gap-4 flex-wrap justify-center">
            {types.map(type => (
                <label key={type} className="cursor-pointer text-white font-bold rounded-full border-4 pt-1 pb-1 p-6 border-gray-500 bg-gray-600">
                    <input
                        className="hidden"
                        type="checkbox"
                        value={type}
                        onChange={() => handleTypeChange(type)}
                    />{" "}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
            ))}
        </div>
    );
}
```

## Sorting Component

In het sorting component wordt elke keer dat er iets veranderd de data (op wat we willen sorteren) doorgestuurd naar de page.js. Waar we de functie uitvoeren om de pokemons te sorteren op naam of index nummer.

```js
'use client';

export default function SortingOptions({ sortOption, onSortChange }) {
    return (
        <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="p-2 rounded-md"
        >
            <option value="index-asc">Sort by Index (asc)</option>
            <option value="index-desc">Sort by Index (desc)</option>
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
        </select>
    );
}
```

## Search Component

In de search compoment hoeven we alleen maar een input te maken waar we een pokemon in kunnen typen. Hierin zit een onChange function die elke keer als het veranderd de search variabele update en deze doorstuurd naar de page.js die de search functie uitvoert.

```js
'use client';

import { useState, useEffect } from 'react';

export default function Search({ onSearch }) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        onSearch(search);
    }, [search]);

    return (
        <input
            type="search"
            id="search"
            placeholder="Search for a Pokemon"
            className="w-full p-2 rounded-lg mb-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
```

## Pokemon Component

Het Pokemon component is een kaartje van één Pokemon die hergebruikt worden voor alle Pokemon in de Pokedex. Omdat het een linkje moet worden naar de detail pagina importeer ik link van next en voor de afbeelding van de Pokemon gebruik ik image van next. Ik importeer dit i.p.v. het gebruik van de a en img tag omdat dit efficiënter en sneller schijnt te zijn.

Omdat ik de afbeeldingen van pokemon.com mooier vind gebruik ik de index van de pokemon om deze op te halen. De afbeeldingen zijn namelijk benoemnd naar heet index nummer via deze site, maar omdat de index hier uit de pokemon api niet altijd 3 getallen heeft moeten we dit aanpassen. Dit doen we door 3 nullen voor de index te zetten en hem dan te knippen vanaf het laatste getal. Dus "0001" wordt "001",m "00023" wordt "023" en "000245" wordt "245". Dit kan je dan vervolgens gebruiken in een fetch voor de afbeelding van de Pokemon.

Ik heb in dit geval een limit tot 999 pokemon omdat hij anders de afbeelding niet kan vinden. Dit zou ik later oplossen met een if else statement. (If pokeIndex => 999 .slice(-4)). Iets in die richting. Voor nu laat ik de limit even op 999 staan om de site niet te zwaar te maken.

```js
import Image from "next/image";
import Link from "next/link";

export default function Pokemon({ pokemon, index }) {
    const pokeIndex = pokemon.index;
    const stringIndex = ('000' + pokeIndex).slice(-3);

    console.log(pokemon.index);

    return (
        <div key={index} className="bg-white p-4 rounded-lg flex-col justify-center items-center relative w-full">
            <Link href={`/pokemon/${pokemon.name}`}>
                <Image
                    src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${stringIndex}.png`}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="m-auto"
                />
                <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                <span className="text-sm text-gray-500 absolute top-0 left-0 p-2">#{stringIndex}</span>
            </Link>
        </div>
    );
}


```

## Detail Page

Als laatste hebben we nog de detail pagina van de Pokemon. Hiervoor hebben we de specifieke data nodig van de geselecteerde pokemon. Ik heb er nu voor gekozen heel simpel een de naam, afbeelding en at stats te laten zien. Ook vond ik het leuk om te laten zien wat de evolution chain is van de pokemon en deze onder aan de pagina te tonen.

```js
export default async function Page({ params }) {
    const pokeData = await fetchDetails(params.name);

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
```

De meeste data kon ik gewoon tonen door de details van de pokemon te fetchen maar om bij de evolution chain te komen moest ik wat dieper gaan. Met wat hulp van onze vriend Chat kreeg ik alle pokemons die in de evolution chain zaten en heb ik deze onderaan de pagina toegevoegd.

```js
const fetchDetails = async (name) => {
    try {
        // Fetch Pokémon details
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
```

## Reflectie

Ik moet zeggen dat ik toch iets meer tijd dan 6 uur in dit project heb gestoken. Deels omdat ik naast de opdracht ook veel moest uitzoeken over Next.js en tailwind, maar ook omdat ik het zo graag wilde afmaken en niet zo snel opgeef. Zo stuitte ik op wat problemen i.v.m. client en serverside rendering en moest ik een aantal classes opzoeken. Gelukkig heeft het internet me goed weten te helpen.

Ik zou graag nog het laden van de Pokemons willen optimaliseren, meer details willen toevoegen aan de Pokemon cards zoals base_xp en types en de detail pagina van de Pokemon willen stylen en uitbreiden. Verder zit er ook nog een foutje in de sorteer/filter functies. Namelijk dat je niet kan sorteren als er geen filter is geselecteerd. Ik heb geen idee waar dit aan licht.

Ik denk dat dit een hele goede opdracht is geweest om kennis te maken met Next.js en Tailwind en ik heb er met plezier aan gewerkt. Ik moet wel zeggen dat ik het lastiger vond dan in eerste instantie ingeschat.

## Bronnen

- https://sentry.io/answers/how-to-allow-domains-for-images-in-next-js/
- https://www.pokemon.com/us/pokedex
- https://tailwindcss.com/docs/installation
- https://pokeapi.co/docs/v2
- https://www.youtube.com/watch?v=NSRbWHSmEn4
- https://www.youtube.com/watch?v=TlP5WIxVirU
- https://www.youtube.com/watch?v=pg-4eHwaoJM
- https://www.youtube.com/watch?v=-4XpG5_Lj_o
- https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side
- https://www.youtube.com/watch?v=QoMHwks6hUA
- https://www.freecodecamp.org/news/three-dots-operator-in-javascript/
- https://www.linkedin.com/pulse/understanding-promiseall-javascript-guide-examples-laurence-svekis--gscwf/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
- https://gist.github.com/johnnygizmo/531991a77047112b7ca89f78b840fba5
- https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
- https://nextjs.org/docs/app/building-your-application/styling/tailwind-css
- https://nextjs.org/docs/app/api-reference/components/image
- https://nextjs.org/docs/app/api-reference/components/link
- https://stackoverflow.com/questions/67881424/why-should-i-use-next-image
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
- https://mikebifulco.com/posts/javascript-filter-boolean
- https://tailwindcss.com/docs/hover-focus-and-other-states#checked