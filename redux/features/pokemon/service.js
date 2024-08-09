import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons } from '@/api/fetch-pokemons';

export const SLICE_NAME = 'pokemon';

const ACTION_TYPE = { FETCH_POKEMONS: `${SLICE_NAME}/fetchPokemons` };

export const fetchPokemonsThunk = createAsyncThunk(
  ACTION_TYPE,
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const newPokemon = await fetchPokemons({ limit, offset });
      return newPokemon ?? [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
