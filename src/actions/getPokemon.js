export default async function getPokemon () {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await res.json();
  
        // console.log(data);

    return(data)
}