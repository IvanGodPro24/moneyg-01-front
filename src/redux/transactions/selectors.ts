import { RootState } from "../store.types";

export const selectTransactions = (state: RootState) =>
  state.transactions.items;

export const selectCategories = (state: RootState) =>
  state.transactions.categories;

export const selectIsLoading = (state: RootState) =>
  state.transactions.isLoading;

export const selectPage = (state: RootState) => state.transactions.page;

export const selectPerPage = (state: RootState) => state.transactions.perPage;

export const selectTotalPages = (state: RootState) =>
  state.transactions.totalPages;

export const selectTotalItems = (state: RootState) =>
  state.transactions.totalItems;

export const selectHasNextPage = (state: RootState) =>
  state.transactions.hasNextPage;

export const selectHasPreviousPage = (state: RootState) =>
  state.transactions.hasPreviousPage;
