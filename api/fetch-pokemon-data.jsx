import { fetchData } from '../utils/fetch-data';

export const fetchPokemonData = async ({ name = '' } = {}) => {
  try {
    const data = await fetchData({
      URL: `https://pokeapi.co/api/v2/pokemon/${name}`,
      query: {},
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
