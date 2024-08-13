import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons } from '@/api/fetch-pokemons';
import { fetchPokemonData } from '@/api/fetch-pokemon-data';

export const SLICE_NAME = 'pokemon';

const ACTION_TYPE = {
  FETCH_POKEMONS: `${SLICE_NAME}/fetchPokemons`,
  FETCH_POKEMON: `${SLICE_NAME}/fetchPokemon`,
};

export const fetchPokemonsThunk = createAsyncThunk(
  ACTION_TYPE.FETCH_POKEMONS,
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const newPokemon = await fetchPokemons({ limit, offset });
      return newPokemon ?? [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPokemonDataThunk = createAsyncThunk(
  ACTION_TYPE.FETCH_POKEMON,
  async ({ name }, { rejectWithValue }) => {
    try {
      const pokemonData = await fetchPokemonData({ name });

      const validSprites = Object.fromEntries(
        Object.entries(pokemonData.sprites).filter(
          ([, value]) => typeof value === 'string' && value.trim() !== ''
        )
      );

      pokemonData.sprites = { ...validSprites };

      return pokemonData ?? {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
