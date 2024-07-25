import { HomePage } from './components';
import { fetchPokemons } from '@/api/fetch-pokemons';

export const metadata = {
  title: 'Pokemon Gallery',
};

export default async function Page() {
  let initialPokemonDetails = [];

  try {
    initialPokemonDetails = await fetchPokemons({ limit: 30 });
  } catch (error) {
    console.error(error);
  }

  return <HomePage initialPokemonDetails={initialPokemonDetails} />;
}
