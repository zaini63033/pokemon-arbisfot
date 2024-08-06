import { fetchData } from '@/utils/fetch-data';

export const fetchPokemons = async ({ limit = 10, offset = 0 } = {}) => {
  try {
    const data = await fetchData({
      URL: process.env.NEXT_PUBLIC_POKEMON_URL,
      queryParams: { limit, offset },
    });

    const pokemonDetails = [];

    let id = offset;

    const image = process.env.NEXT_PUBLIC_POKEMON_IMAGE;

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
    throw error;
  }
};
