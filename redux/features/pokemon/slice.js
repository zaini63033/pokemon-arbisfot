import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPokemonsThunk,
  fetchPokemonDataThunk,
  SLICE_NAME,
} from './service';

const pokemonSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    list: [],
    hasMore: true,
    isLoading: true,
    error: '',
    details: {},
  },
  reducers: {
    setPokemonList: (state, { payload }) => {
      state.list = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchPokemonsThunk.fulfilled, (state, { payload }) => {
      state.list = [...state.list, ...payload];
      state.isLoading = false;

      if (state.list.length >= 100000) {
        state.hasMore = false;
      }
    }),
      builder.addCase(fetchPokemonsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Failed to fetch Pokémons';
      }),
      builder.addCase(fetchPokemonDataThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      }),
      builder.addCase(
        fetchPokemonDataThunk.fulfilled,
        (state, { payload, meta: { arg } }) => {
          state.details[arg.name] = payload;
        }
      ),
      builder.addCase(fetchPokemonDataThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Failed to fetch Pokémon data';
      });
  },
});

export const { setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
