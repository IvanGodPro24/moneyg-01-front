import { createSlice } from "@reduxjs/toolkit";
import { CurrencyInitState } from "./currency.types";

const initialState: CurrencyInitState = {
  activeCurrency: "UAH",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setActiveCurrency(state, action) {
      state.activeCurrency = action.payload;
    },
  },
});

export const { setActiveCurrency } = currencySlice.actions;

export default currencySlice.reducer;
