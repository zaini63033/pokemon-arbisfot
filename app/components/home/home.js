'use client';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';
import { fetchPokemonData } from '../../../api/fetch-pokemon';
import styles from './home.module.css';

export const HomePage = ({ initialPokemonDetails }) => {
  const limit = 10;
  const [pokemon, setPokemon] = useState(initialPokemonDetails);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(initialPokemonDetails.length);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => { 
    if (isLoading) return;

    setIsLoading(true);

    try
    { 
      const newPokemon = await fetchPokemonData({ limit, offset });
      setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]);
      setOffset(offset + limit);
    }
    catch(error)
    {
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
      <InfiniteScroll initialLoad={false} pageStart={0} loadMore={loadMore} hasMore={hasMore}>
        <div className={styles['pokemon-container']}>
          {pokemon.map((p) => (
            <div key={p.id} className={styles['pokemon-item']}>
              <Image src={p.back_image} alt={p.name} width={150} height={150} />
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {isLoading && <div>Loading more Pokémon...</div>}
    </div>
  );
};

