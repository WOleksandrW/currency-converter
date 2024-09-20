import { combineReducers, configureStore } from '@reduxjs/toolkit';
import currenciesSlice from './currenciesSlice';

const rootReducer = combineReducers({
  currenciesSlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
