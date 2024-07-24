import { fetchData } from '../utils/fetch-data';

export const fetchPokemons = async ({ limit = 10, offset = 0 } = {}) => {
  try {
    const data = await fetchData({
      URL: `https://pokeapi.co/api/v2/pokemon`,
      query: { limit, offset },
    });

    const pokemonDetails = [];

    let id = offset;

    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;

    for (const pokemon of data.results) {
      pokemonDetails.push({
        ...pokemon,
        id,
        front_image: `${image}${id + 1}.png`,
        back_image: `${image}/back/${id + 1}.png`,
      });
      ++id;
    }

    return pokemonDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};
