import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';
import { CurrenciesObjType } from '../types/CurrenciesTypes';

export interface ICurrenciesState {
  currencies: CurrenciesObjType | null;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: ICurrenciesState = {
  currencies: null,
  isLoading: false
};

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async () => {
  const response = await api.currencies.getAllcurrencies();
  return response.data;
});

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCurrencies
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCurrencies.fulfilled,
      (state, action: PayloadAction<CurrenciesObjType>) => {
        state.isLoading = false;
        state.currencies = action.payload;
      }
    );
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
  }
});

export default currenciesSlice.reducer;
