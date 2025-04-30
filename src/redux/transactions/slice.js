import { createSlice } from "@reduxjs/toolkit";

import { addTransaction, editTransaction } from "./operations";

import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
  getAllCategories,
} from "./operations";

import { toast } from "sonner";

const handlePending = (state) => {
  state.isLoading = true;
};

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

        console.log("addTransaction.fulfilled:", action.payload);
        toast.success("Transaction added successfully!");
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to add transaction!");
      })

      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        toast.success("Transaction edited successfully!");

      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTransaction = action.payload;
        const index = state.transactions.findIndex(
          (t) => t.id === updatedTransaction.id
        );
        if (index !== -1) {
          state.transactions[index] = updatedTransaction;
        }

      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to edit transaction!");

      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("getAllCategories.fulfilled:", action.payload);
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to fetch categories!");
      })

      .addMatcher((action) => {
        return action.type.endsWith("pending");
      }, handlePending);
  },
});

export default transactionsSlice.reducer;
