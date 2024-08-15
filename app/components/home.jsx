'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import styles from './home.module.css';
import { PokemonItem } from './pokemon-item/pokemon-item';
import { fetchPokemonsThunk } from '@/redux/features/pokemon/service';
import {
  getPokemon,
  getHasMore,
  getIsLoadingPokemonList,
} from '@/redux/features/pokemon/selector';
import { setPokemonList } from '@/redux/features/pokemon/slice';
import { useAppDispatch } from '@/redux/store';

export const HomePage = ({ initialPokemonDetails }) => {
  const dispatch = useAppDispatch();
  const pokemon = useSelector(getPokemon);
  const hasMore = useSelector(getHasMore);
  const isLoading = useSelector(getIsLoadingPokemonList);

  useEffect(() => {
    if (!pokemon.length) {
      dispatch(setPokemonList(initialPokemonDetails));
    }
  }, []);

  const loadMore = async () => {
    if (isLoading) return;

    dispatch(fetchPokemonsThunk({ offset: pokemon.length, limit: 10 }));
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
            <PokemonItem key={p?.id} pokemon={p} />
          ))}
        </div>
      </InfiniteScroll>
      {isLoading && (
        <div className={styles['loading-container']}>
          <div className={styles['loading-text']}>Loading more Pokémon...</div>
        </div>
      )}
    </div>
  );
};
