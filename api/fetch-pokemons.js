import { fetchData } from '@/utils/fetch-data';
import { POKEMON_IMAGE } from '@/utils/constants';

export const fetchPokemons = async ({ limit = 10, offset = 0 } = {}) => {
  try {
    const data = await fetchData({
      URL: process.env.NEXT_PUBLIC_POKEMON_URL,
      queryParams: { limit, offset },
    });

    const pokemonDetails = [];

    let id = offset;

    for (const pokemon of data.results) {
      pokemonDetails.push({
        ...pokemon,
        id,
        front_image: `${POKEMON_IMAGE}${id + 1}.png`,
        back_image: `${POKEMON_IMAGE}/back/${id + 1}.png`,
      });
      ++id;
    }

    return pokemonDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
