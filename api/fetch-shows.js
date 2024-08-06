import { fetchData } from '@/utils/fetch-data';

export const fetchInitialResults = async (
  setInitialResults,
  setResults,
  setIsLoading,
  setError
) => {
  setIsLoading(true);
  setError('');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SHOW_DEFAULT_URL}?page=0&limit=10`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setInitialResults(data);
    setResults(data);
  } catch (error) {
    setError('Failed to fetch data. Please try again.');
    console.error('Error fetching data:', error);
  }
  setIsLoading(false);
};

export const fetchShows = async (
  searchTerm,
  setResults,
  setIsLoading,
  setError
) => {
  setIsLoading(true);
  setError('');
  try {
    const url = `${process.env.NEXT_PUBLIC_SHOW_SEARCH_URL}?q=${searchTerm}&limit=10`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setResults(data);
  } catch (error) {
    setError('Failed to fetch data. Please try again.');
    console.error('Error fetching data:', error);
  }
  setIsLoading(false);
};
