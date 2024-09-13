export default async function getPokemon({ fetchUrl = 'https://pokeapi.co/api/v2/pokemon' }) {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    return data;
}