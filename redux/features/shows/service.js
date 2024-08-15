import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInitialResult, fetchShows } from '@/api/fetch-shows';

export const SLICE_NAME = 'show';

const ACTION_TYPE = {
  FETCH_INITIAL_SHOWS: `${SLICE_NAME}/fetchInitialShows`,
  FETCH_SHOWS: `${SLICE_NAME}/fetchShows`,
};

export const fetchInitialShowsThunk = createAsyncThunk(
  ACTION_TYPE.FETCH_INITIAL_SHOWS,
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const initialShows = await fetchInitialResult({ page, limit });
      return initialShows ?? [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchShowsThunk = createAsyncThunk(
  ACTION_TYPE.FETCH_SHOWS,
  async ({ searchTerm, limit }, { rejectWithValue }) => {
    try {
      const showData = await fetchShows({ searchTerm, limit });
      return showData ?? {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
