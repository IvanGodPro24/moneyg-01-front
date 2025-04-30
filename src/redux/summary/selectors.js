import { createSelector } from "@reduxjs/toolkit";

export const selectSummary = (state) => state.summary.summary;

export const selectSummaryLoading = (state) => state.summary.loading;

export const selectSummaryError = (state) => state.summary.error;

export const selectExpensesData = createSelector([selectSummary], (summary) => {
  if (!summary) return [];

  return Object.entries(summary.expenses.byCategory).map(
    ([category, value]) => ({
      name: category,
      value,
    })
  );
});

export const selectTotalExpenses = (state) => {
  return state.summary.summary?.expenses?.total ?? 0;
};

export const selectTotalIncome = (state) => {
  return state.summary.summary?.income?.total ?? 0;
};
