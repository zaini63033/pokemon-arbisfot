import { fetchData } from '@/utils/fetch-data';

export const fetchInitialResults = async () => {
  try {
    const data = await fetchData({
      URL: `${process.env.NEXT_PUBLIC_SHOW_DEFAULT_URL}?page=0&limit=10`,
    });
    return data;
  } catch (error) {
    console.error('Error fetching initial data:', error);
    throw new Error('Failed to fetch initial data. Please try again.');
  }
};

export const fetchShows = async (searchTerm) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SHOW_SEARCH_URL}?q=${searchTerm}&limit=10`;
    const data = await fetchData({ URL });
    return data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw new Error('Failed to fetch shows. Please try again.');
  }
};
