/* eslint-disable no-useless-catch */
import { fetchData } from '@/utils/fetch-data';

export const fetchInitialResults = async ({ page, limit }) => {
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

export const fetchShows = async ({ searchTerm, limit }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SHOW_SEARCH_URL}`;
    const data = await fetchData({
      URL,
      queryParams: { q: searchTerm, limit },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
