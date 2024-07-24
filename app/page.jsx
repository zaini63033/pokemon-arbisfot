import { HomePage } from "./components";
import { fetchPokemonData } from "../api/fetch-pokemon";

export const metadata = {
  title: 'Pokemon Gallery',
};

export default async function Page() {
  let initialPokemonDetails = [];

  try {
    initialPokemonDetails = await fetchPokemonData({ limit: 30 });
  } catch (error) {
    console.error(error);
  }

  return <HomePage initialPokemonDetails={initialPokemonDetails} />;
}
