import { RootState } from "../store.types";

export const selectActiveCurrency = (state: RootState) =>
  state.currency.activeCurrency;
