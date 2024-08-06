'use client';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchPokemons } from '@/api/fetch-pokemons';
import styles from './home.module.css';
import { PokemonItem } from './pokemon-item/pokemon-item';

export const HomePage = ({ initialPokemonDetails }) => {
  const limit = 10;
  const [pokemon, setPokemon] = useState(initialPokemonDetails);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(initialPokemonDetails.length);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const newPokemon = await fetchPokemons({ limit, offset });
      setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]);
      setOffset(offset + limit);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

    if (offset >= 100000) {
      setHasMore(false);
    }
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
      >
        <div className={styles['pokemon-container']}>
          {pokemon.map((p) => (
            <PokemonItem key={p.id} pokemon={p} />
          ))}
        </div>
      </InfiniteScroll>
      {isLoading && <div>Loading more Pokémon...</div>}
    </div>
  );
};
