'use client';

import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styles from './pokemon.module.css';

const SPRITE_KEYS = [
  'front_default',
  'front_shiny',
  'back_default',
  'back_shiny',
  'front_female',
  'front_shiny_female',
  'back_female',
  'back_shiny_female',
];

export const PokemonPage = ({ pokemonData }) => {
  const [spriteIndex, setSpriteIndex] = useState(0);

  const getSpriteUrl = () => {
    const key = SPRITE_KEYS[spriteIndex];
    return pokemonData.sprites[key] || '';
  };

  const nextSprite = () => {
    setSpriteIndex((prevIndex) => (prevIndex + 1) % SPRITE_KEYS.length);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Pokémon Details - ${pokemonData.name}`}</title>
      </Head>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <h1>{pokemonData.name}</h1>
          <div className={styles.imageSection}>
            <button className={styles.imageButton} onClick={nextSprite}>
              Next Image
            </button>
            <Image
              src={getSpriteUrl()}
              alt={pokemonData.name}
              width={200}
              height={200}
            />
          </div>
          <p>
            <strong>Height:</strong> {pokemonData.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemonData.weight}
          </p>
          <p>
            <strong>Type:</strong> {pokemonData.types[0].type.name}
          </p>
        </div>

        <div className={styles.sideSection}>
          <div className={styles.movesSection}>
            <h2>Moves</h2>
            <ul>
              {pokemonData.moves.slice(0, 10).map((move) => (
                <li key={move.move.name}>{move.move.name}</li>
              ))}
            </ul>
          </div>

          <div className={styles.statsSection}>
            <h2>Stats</h2>
            <ul>
              {pokemonData.stats.slice(0, 10).map((stat) => (
                <li key={stat.stat.name}>
                  <strong>{stat.stat.name}:</strong> {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
