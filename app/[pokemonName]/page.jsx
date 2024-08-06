import { PokemonPage } from './components/pokemon-details';
import { fetchPokemonData } from '@/api/fetch-pokemon-data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  return {
    title: `${params.pokemonName.replace(/\b\w/g, (char) => char.toUpperCase())}`,
  };
}

export default async function Page({ params }) {
  const data = await fetchPokemonData({ name: params.pokemonName });
  if (!data) return notFound();

  return <PokemonPage pokemonData={data} />;
}
