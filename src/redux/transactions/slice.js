import { createSlice } from "@reduxjs/toolkit";

import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
  getAllCategories,
} from "./operations";

import { toast } from "sonner";

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
  name: "transactions",

  initialState: {
    items: [],
    page: null,
    perPage: 10,
    hasNextPage: null,
    hasPreviousPage: null,
    totalPages: null,
    categories: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;

        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success("Transaction added successfully!");
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        toast.success("Transaction delete successfully!");
      })

      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          toast.success("Transaction edited successfully!");
        }
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      .addMatcher((action) => {
        return action.type.endsWith("rejected");
      }, handleRejected);
  },
});

export const { setPerPage } = transactionsSlice.actions;

export default transactionsSlice.reducer;
