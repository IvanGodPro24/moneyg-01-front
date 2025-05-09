import { createSlice } from "@reduxjs/toolkit";

import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
  getAllCategories,
} from "./operations";

import { toast } from "sonner";

const transactionsSlice = createSlice({
  name: "transactions",

  initialState: {
    items: [],
    categories: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        toast.success("Transaction added successfully!");
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to add transaction!");
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        toast.success("Transaction delete successfully!");
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          toast.success("Transaction edited successfully!");
        }
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to edit transaction!");
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to fetch categories!");
      });
  },
});

export default transactionsSlice.reducer;
