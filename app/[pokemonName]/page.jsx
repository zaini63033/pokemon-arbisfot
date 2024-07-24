import { PokemonPage } from '../components/pokemon-details/pokemon-details';
import { fetchPokemonData } from '../../api/fetch-pokemon-data';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Pokemon Details',
};

export default async function Page({ params }) {
  const data = await fetchPokemonData({ name: params.pokemonName });
  console.log(data);
  if (!data) return notFound();

  return <PokemonPage pokemonData={data} />;
}
