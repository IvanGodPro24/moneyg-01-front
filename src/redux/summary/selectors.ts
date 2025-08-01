import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store.types";

export const selectSummary = (state: RootState) => state.summary.summary;

export const selectSummaryLoading = (state: RootState) => state.summary.loading;

export const selectSummaryError = (state: RootState) => state.summary.error;

export const selectExpensesData = createSelector([selectSummary], (summary) => {
  if (!summary) return [];

  return Object.entries(summary.expenses.byCategory).map(
    ([category, value]) => ({
      name: category,
      value,
    })
  );
});

export const selectTotalExpenses = (state: RootState) => {
  return state.summary.summary?.expenses?.total ?? 0;
};

export const selectTotalIncome = (state: RootState) => {
  return state.summary.summary?.income?.total ?? 0;
};
