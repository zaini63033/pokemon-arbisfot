import { get } from 'lodash';

import { SLICE_NAME } from './service';

export const getPokemon = (state) =>
  get(state, `${SLICE_NAME}.pokemonList`, []);
export const getHasMore = (state) => get(state, `${SLICE_NAME}.hasMore`, true);
export const getIsLoading = (state) =>
  get(state, `${SLICE_NAME}.isLoading`, false);

export const getPokemonDetails = (pokemonName) => (state) =>
  get(state, `${SLICE_NAME}.pokemonsDetails.${pokemonName}`);
