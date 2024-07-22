import { fetchData } from "../utils/fetchData";

export const fetchPokemonData = async ({ limit = 10, offset = 0 } = {}) => {
  try {
    const data = await fetchData({URL :`https://pokeapi.co/api/v2/pokemon`, query : {limit, offset}});
    
    const pokemonDetails = [];

    let id = offset;

    for (const pokemon of data.results) {
      pokemonDetails.push({id, name: pokemon.name, image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`});
      ++id;
    }

    return pokemonDetails;
  } catch (error) {
    console.error(error);
    return []; 
  }
};
