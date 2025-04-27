import { createSlice } from '@reduxjs/toolkit';
import { addTransaction } from './operations';
import { toast } from 'sonner';

const transactionsSlice = createSlice({
  name: 'transactions',

  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        toast.success('Transaction added successfully!');
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Failed to add transaction!');
      });
  },
});

export default transactionsSlice.reducer;
