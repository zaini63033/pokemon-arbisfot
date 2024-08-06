import { fetchData } from '@/utils/fetch-data';

export const fetchPokemonData = async ({ name = '' } = {}) => {
  try {
    const data = await fetchData({
      URL: `${process.env.NEXT_PUBLIC_POKEMON_URL}/${name}`,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
