import { PokemonPage } from '@/app/components/pokemon-details/pokemon-details';
import { fetchPokemonData } from '@/api/fetch-pokemon-data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  return {
    title: `${params.pokemonName}`,
  };
}

export default async function Page({ params }) {
  const data = await fetchPokemonData({ name: params.pokemonName });
  if (!data) return notFound();

  return <PokemonPage pokemonData={data} />;
}
