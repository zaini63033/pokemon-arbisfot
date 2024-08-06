'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import styles from './shows.module.css';
import { fetchInitialResults, fetchShows } from '@/api/fetch-shows';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialResults, setInitialResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchInitialResults(
        setInitialResults,
        setResults,
        setIsLoading,
        setError
      );
    };

    fetchData();
  }, []);

  const handleSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm) {
        setResults([]);
        await fetchShows(searchTerm, setResults, setIsLoading, setError);
      } else {
        setResults(initialResults);
      }
    }, 1000),
    [initialResults]
  );

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search for a TV Show</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter show name"
        />
        <button onClick={() => handleSearch(query)} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.results}>
        {results.map((result) => (
          <div key={result?.show?.id ?? 'unknown'} className={styles.showCard}>
            {result?.show?.image?.medium || result?.image?.medium ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={result?.show?.image?.medium ?? result?.image?.medium}
                  alt={result?.show?.name ?? result?.name ?? 'No name'}
                  layout="responsive"
                  width={300}
                  height={420}
                />
              </div>
            ) : (
              <div className={styles.imageWrapper}>
                <Image
                  src="/default-image.jpg"
                  alt="Default image"
                  layout="responsive"
                  width={300}
                  height={420}
                />
              </div>
            )}
            <div className={styles.showDetails}>
              <h2>{result?.show?.name ?? result?.name ?? 'No name'}</h2>
              <p>
                <strong>Genre:</strong>{' '}
                {result?.show?.genres?.join(', ') ?? result?.genres?.join(', ')}
              </p>
              <p>
                <strong>Language:</strong>{' '}
                {result?.show?.language ?? result?.language}
              </p>
              <p>
                <strong>Runtime:</strong>{' '}
                {result?.show?.runtime ?? result?.runtime}
              </p>
              <p>
                <strong>Rating:</strong>{' '}
                {result?.show?.rating?.average ?? result?.rating?.average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
