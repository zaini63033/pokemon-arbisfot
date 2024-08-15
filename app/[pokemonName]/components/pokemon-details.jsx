'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styles from './pokemon.module.css';
import { formatText } from '@/utils/format-text';
import { useSelector } from 'react-redux';
import {
  getPokemonDetails,
  getIsLoading,
} from '@/redux/features/pokemon/selector';
import { useAppDispatch } from '@/redux/store';
import { fetchPokemonDataThunk } from '@/redux/features/pokemon/service';

export const PokemonPage = ({ name }) => {
  const dispatch = useAppDispatch();
  const pokemonData = useSelector(getPokemonDetails(name));
  const isLoading = useSelector(getIsLoading);
  const [selectedSprite, setSelectedSprite] = useState('');

  const spriteKeys = useMemo(
    () => Object.keys(pokemonData?.sprites ?? {}),
    [pokemonData?.sprites]
  );

  useEffect(() => {
    dispatch(fetchPokemonDataThunk({ name }));
  }, []);

  useEffect(() => {
    if (spriteKeys.length > 0) {
      setSelectedSprite(spriteKeys[0]);
    }
  }, [spriteKeys]);

  const handleSpriteChange = useCallback((spriteKey) => {
    setSelectedSprite(spriteKey);
  }, []);

  const changeSprite = useCallback(
    (spriteKey) => () => {
      handleSpriteChange(spriteKey);
    },
    [handleSpriteChange]
  );

  const movesList = useMemo(
    () => (
      <ul>
        {pokemonData?.moves
          ?.slice(0, 10)
          .map((move) => (
            <li key={move?.move?.name}>
              {formatText(move?.move?.name.replace('-', ' '))}
            </li>
          )) ?? <li>Unknown</li>}
      </ul>
    ),
    [pokemonData?.moves]
  );

  const statsList = useMemo(
    () => (
      <ul>
        {pokemonData?.stats?.slice(0, 10).map((stat) => (
          <li key={stat?.stat?.name}>
            <strong>{formatText(stat?.stat?.name.replace('-', ' '))}:</strong>{' '}
            {stat?.base_stat}
          </li>
        )) ?? <li>Unknown</li>}
      </ul>
    ),
    [pokemonData?.stats]
  );

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!pokemonData) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Pokémon Details - ${formatText(pokemonData?.name)}`}</title>
      </Head>

      <div className={styles.content}>
        <div className={styles.spriteButtons}>
          {spriteKeys.map((spriteKey) => (
            <button
              key={spriteKey}
              onClick={changeSprite(spriteKey)}
              className={styles.spriteButton}
            >
              <strong>{formatText(spriteKey.replaceAll('_', ' '))}</strong>
            </button>
          ))}
        </div>

        <div className={styles.mainSection}>
          <h1>{formatText(pokemonData?.name)}</h1>
          <div className={styles.imageSection}>
            {selectedSprite && (
              <Image
                src={pokemonData?.sprites?.[selectedSprite]}
                alt={pokemonData?.name}
                width={200}
                height={200}
              />
            )}
          </div>
          <p>
            <strong>Height:</strong> {pokemonData?.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemonData?.weight}
          </p>
          <p>
            <strong>Type:</strong> {pokemonData?.types?.[0]?.type?.name}
          </p>
        </div>

        <div className={styles.sideSection}>
          <div className={styles.movesSection}>
            <h2>Moves</h2>
            {movesList}
          </div>

          <div className={styles.statsSection}>
            <h2>Stats</h2>
            {statsList}
          </div>
        </div>
      </div>
    </div>
  );
};
