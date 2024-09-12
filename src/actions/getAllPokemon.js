export default async function getAllPokemon() {  
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    const data = await res.json();
    return data;
  }