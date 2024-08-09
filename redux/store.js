import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './features/pokemon/slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export default store;

// use app dispatch
export const useAppDispatch = useDispatch.withTypes();
