import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPokemonsThunk,
  fetchPokemonDataThunk,
  SLICE_NAME,
} from './service';

const pokemonSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    pokemonList: [],
    hasMore: true,
    isLoadingPokemonList: false,
    isLoadingPokemonData: false,
    error: '',
    pokemonsDetails: {},
  },
  reducers: {
    setPokemonList: (state, { payload }) => {
      state.pokemonList = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsThunk.pending, (state) => {
      state.isLoadingPokemonList = true;
      state.error = '';
    });
    builder.addCase(fetchPokemonsThunk.fulfilled, (state, { payload }) => {
      state.pokemonList = [...state.pokemonList, ...payload];
      state.isLoadingPokemonList = false;

      if (state.pokemonList.length >= 100000) {
        state.hasMore = false;
      }
    }),
      builder.addCase(fetchPokemonsThunk.rejected, (state, { payload }) => {
        state.isLoadingPokemonList = false;
        state.error = payload || 'Failed to fetch Pokémons';
      }),
      builder.addCase(fetchPokemonDataThunk.pending, (state) => {
        state.isLoadingPokemonData = true;
        state.error = '';
      }),
      builder.addCase(
        fetchPokemonDataThunk.fulfilled,
        (state, { payload, meta: { arg } }) => {
          state.pokemonsDetails[arg.name] = payload;
          state.isLoadingPokemonData = false;
        }
      ),
      builder.addCase(fetchPokemonDataThunk.rejected, (state, { payload }) => {
        state.isLoadingPokemonData = false;
        state.error = payload || 'Failed to fetch Pokémon data';
      });
  },
});

export const { setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
