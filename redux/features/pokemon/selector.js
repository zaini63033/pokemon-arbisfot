import { get } from 'lodash';

export const getPokemon = (state) => get(state, 'pokemon.list', []);
export const getHasMore = (state) => get(state, 'pokemon.hasMore', true);
export const getIsLoading = (state) => get(state, 'pokemon.isLoading', false);
