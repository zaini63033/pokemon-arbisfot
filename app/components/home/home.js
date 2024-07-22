'use client';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';
import { fetchPokemonData } from '../../../api/fetch-pokemon';
import styles from "./home.module.css";

export const HomePage = () => {
  const limit = 10;
  const [pokemon, setPokemon] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const map = {};

  const loadMore = async () => {

    if(offset in map)
      return

    map[offset] = true;

    const newPokemon = await fetchPokemonData({limit, offset});
    setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]);

    setOffset(offset + limit);

    if (offset >= 100000) {
      setHasMore(false);
    }

  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore}>
        <div className= {styles["pokemon-container"]}>
          {pokemon.map((p) => (
            <div key={p.id} className= {styles["pokemon-item"]}>
              <Image
                src={p.image}
                alt={p.name}
                width={100}
                height={100}
              />
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

