import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, editTransaction } from "./operations";
import { toast } from "sonner";

const handlePending = (state) => {
  state.isLoading = true;
};

const transactionsSlice = createSlice({
  name: "transactions",

  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
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
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        toast.success("Transaction edited successfully!");
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to edit transaction!");
      })

      .addMatcher((action) => {
        return action.type.endsWith("pending");
      }, handlePending);
  },
});

export default transactionsSlice.reducer;
