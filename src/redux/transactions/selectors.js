export const selectTransactions = (state) => state.transactions.items;

export const selectCategories = (state) => state.transactions.categories;

export const selectIsLoading = (state) => state.transactions.isLoading;

export const selectPage = (state) => state.transactions.page;

export const selectTotalPages = (state) => state.transactions.totalPages;

export const selectHasNextPage = (state) => state.transactions.hasNextPage;

export const selectHasPreviousPage = (state) =>
  state.transactions.hasPreviousPage;
