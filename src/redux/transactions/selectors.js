export const selectTransaction = (state) => state.transactions.items;

export const selectIsLoading = (state) => state.transactions.isLoading;

export const selectError = (state) => state.transactions.error;

export const selectTransactions = (state) => {
  if (!state.transactions) {
    return [];
  }
  return state.transactions.items;
};

export const selectTotalBalance = (state) =>
  state.transactions.items.reduce((sum, transaction) => {
    const amount = transaction.type === "+" ? transaction.sum : transaction.sum;
    return sum + amount;
  }, 0);
