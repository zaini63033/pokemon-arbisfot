'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styles from './pokemon.module.css';
import { formatText } from '@/utils/format-text';
import { useSelector } from 'react-redux';
import { getPokemonDetails } from '@/redux/features/pokemon/selector';
import { useAppDispatch } from '@/redux/store';
import { fetchPokemonDataThunk } from '@/redux/features/pokemon/service';

export const PokemonPage = ({ name }) => {
  const dispatch = useAppDispatch();
  const pokemonData = useSelector(getPokemonDetails(name));
  const [selectedSprite, setSelectedSprite] = useState('');

  useEffect(() => {
    dispatch(fetchPokemonDataThunk({ name }));
  }, []);

  useEffect(() => {
    setSelectedSprite(Object.keys(pokemonData?.sprites ?? {})[0]);
  }, [pokemonData?.sprites]);

  const handleSpriteChange = (spriteKey) => {
    setSelectedSprite(spriteKey);
  };

  if (!pokemonData) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Pokémon Details - ${formatText(pokemonData?.name)}`}</title>
      </Head>

      <div className={styles.content}>
        <div className={styles.spriteButtons}>
          {Object.keys(pokemonData.sprites).map((spriteKey) => (
            <button
              key={spriteKey}
              onClick={() => handleSpriteChange(spriteKey)}
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
            <ul>
              {pokemonData?.moves
                ?.slice(0, 10)
                .map((move) => (
                  <li key={move?.move?.name}>
                    {formatText(move?.move?.name.replace('-', ' '))}
                  </li>
                )) ?? <li>Unknown</li>}
            </ul>
          </div>

          <div className={styles.statsSection}>
            <h2>Stats</h2>
            <ul>
              {pokemonData?.stats?.slice(0, 10).map((stat) => (
                <li key={stat?.stat?.name}>
                  <strong>
                    {formatText(stat?.stat?.name.replace('-', ' '))}:
                  </strong>{' '}
                  {stat?.base_stat}
                </li>
              )) ?? <li>Unknown</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
