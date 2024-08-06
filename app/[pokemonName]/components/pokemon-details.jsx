'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styles from './pokemon.module.css';
import { formatText } from '@/utils/format-text';

export const PokemonPage = ({ pokemonData }) => {
  const [selectedSprite, setSelectedSprite] = useState('');
  const [nonNullSprites, setNonNullSprites] = useState([]);

  useEffect(() => {
    const validSprites = Object.keys(pokemonData.sprites).filter((key) => {
      const value = pokemonData.sprites[key];
      return typeof value === 'string' && value.trim() !== '';
    });
    setNonNullSprites(validSprites);

    if (validSprites.length > 0) {
      setSelectedSprite(validSprites[0]);
    }
  }, [pokemonData]);

  const handleSpriteChange = (spriteKey) => {
    setSelectedSprite(spriteKey);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Pokémon Details - ${formatText(pokemonData.name)}`}</title>
      </Head>

      <div className={styles.content}>
        <div className={styles.spriteButtons}>
          {nonNullSprites.map((spriteKey) => (
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
          <h1>{formatText(pokemonData.name)}</h1>
          <div className={styles.imageSection}>
            {selectedSprite && (
              <Image
                src={pokemonData.sprites[selectedSprite]}
                alt={pokemonData.name}
                width={200}
                height={200}
              />
            )}
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
                <li key={move.move.name}>
                  {formatText(move.move.name.replace('-', ' '))}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.statsSection}>
            <h2>Stats</h2>
            <ul>
              {pokemonData.stats.slice(0, 10).map((stat) => (
                <li key={stat.stat.name}>
                  <strong>
                    {formatText(stat.stat.name.replace('-', ' '))}:
                  </strong>{' '}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
