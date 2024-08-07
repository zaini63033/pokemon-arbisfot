/* eslint-disable no-useless-catch */
import { fetchData } from '@/utils/fetch-data';

export const fetchInitialResults = async () => {
  const page = 0,
    limit = 10;
  try {
    const data = await fetchData({
      URL: `${process.env.NEXT_PUBLIC_SHOW_DEFAULT_URL}`,
      queryParams: { page, limit },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchShows = async (searchTerm) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SHOW_SEARCH_URL}`;
    const q = searchTerm,
      limit = 10;

    const data = await fetchData({ URL, queryParams: { q, limit } });
    return data;
  } catch (error) {
    throw error;
  }
};
