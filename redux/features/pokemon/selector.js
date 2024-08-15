import { get } from 'lodash';

import { SLICE_NAME } from './service';

export const getPokemon = (state) =>
  get(state, `${SLICE_NAME}.pokemonList`, []);
export const getHasMore = (state) => get(state, `${SLICE_NAME}.hasMore`, true);

export const getIsLoadingPokemonList = (state) =>
  get(state, `${SLICE_NAME}.isLoadingPokemonList`, false);

export const getIsLoadingPokemonData = (state) =>
  get(state, `${SLICE_NAME}.isLoadingPokemonData`, false);

export const getPokemonDetails = (pokemonName) => (state) =>
  get(state, `${SLICE_NAME}.pokemonsDetails.${pokemonName}`);
