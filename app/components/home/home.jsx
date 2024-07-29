'use client';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';
import { fetchPokemons } from '@/api/fetch-pokemons';
import styles from './home.module.css';
import Link from 'next/link';

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

const PokemonItem = ({ pokemon }) => {
  const [isFrontImage, setIsFrontImage] = useState(true);

  return (
    <div className={styles['pokemon-item']}>
      <Link href={`/${pokemon.name}`}>
        <div className={styles['image-container']}>
          <Image
            src={isFrontImage ? pokemon.front_image : pokemon.back_image}
            alt={pokemon.name}
            width={150}
            height={150}
          />
        </div>
      </Link>
      <div className={styles['details-container']}>
        <p>ID: {pokemon.id + 1}</p>
        <p>{pokemon.name}</p>
      </div>
      <div className={styles['button-container']}>
        <button onClick={() => setIsFrontImage(true)}>Front</button>
        <button onClick={() => setIsFrontImage(false)}>Back</button>
      </div>
    </div>
  );
};
