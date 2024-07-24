'use client';
import styles from './pokemon.module.css';

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
      <div>
        <h2>Forms</h2>
      </div>
      <div>
        <h2>Moves</h2>
        {pokemonData.moves.map((pokemon) => console.log(pokemon))}
      </div>
    </div>
  );
};
