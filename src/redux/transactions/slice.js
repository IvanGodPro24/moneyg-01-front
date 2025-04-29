import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
  getAllCategories
} from "./operations";
import { toast } from "sonner";

const handlePending = (state) => {
  state.isLoading = true;
};

const transactionsSlice = createSlice({
  name: "transactions",

  initialState: {
    items: [
      {
        id: 1,
        date: "04.01.23",
        category: "Other",
        comment: "Gift for your wife",
        sum: 300.0,
        type: "-",
      },
      {
        id: 2,
        date: "05.01.23",
        category: "Income",
        comment: "January bonus",
        sum: 8000.0,
        type: "+",
      },
      {
        id: 3,
        date: "07.01.23",
        category: "Car",
        comment: "Oil",
        sum: 1000.0,
        type: "-",
      },
      {
        id: 4,
        date: "07.01.23",
        category: "Products",
        comment: "Vegetables for the week",
        sum: 280.0,
        type: "-",
      },
      {
        id: 5,
        date: "07.01.23",
        category: "Income",
        comment: "Gift",
        sum: 1000.0,
        type: "+",
      },
    ],
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
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
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
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
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
