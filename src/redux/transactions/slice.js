import { createSlice } from "@reduxjs/toolkit";

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

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  toast.error("Something went wrong...");
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
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
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
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          toast.success("Transaction edited successfully!");
        }
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })

      .addMatcher((action) => {
        return action.type.endsWith("pending");
      }, handlePending)

      .addMatcher((action) => {
        return action.type.endsWith("rejected");
      }, handleRejected);
  },
});

export default transactionsSlice.reducer;
