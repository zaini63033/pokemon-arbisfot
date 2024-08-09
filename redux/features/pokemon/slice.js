import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemonsThunk, SLICE_NAME } from './service';

const pokemonSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    list: [],
    hasMore: true,
    isLoading: false,
    error: null,
  },
  reducers: {
    setPokemonList: (state, { payload }) => {
      state.list = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchPokemonsThunk.fulfilled, (state, { payload }) => {
        state.list = [...state.list, ...payload];
        state.isLoading = false;

        if (state.list.length >= 100000) {
          state.hasMore = false;
        }
      })
      .addCase(fetchPokemonsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Failed to fetch Pokémon';
      });
  },
});

export const { setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
