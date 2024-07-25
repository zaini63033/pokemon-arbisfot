'use client';

export const PokemonPage = ({ pokemonData }) => {
  return (
    <div>
      <h1>Pokémon Details</h1>
      <div>
        <h2>Name</h2>
        <p>{pokemonData.name}</p>
      </div>
      <div>
        <h2>Height</h2>
        <p>{pokemonData.height}</p>
      </div>
    </div>
  );
};
