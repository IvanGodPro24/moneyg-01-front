import { createSlice } from "@reduxjs/toolkit";
import { current, login, logout, registered } from "./operations";
import { toast } from "sonner";
import { addTransaction, deleteTransaction } from "../transactions/operations";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: {
      name: null,
      email: null,
      balance: 0,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(registered.fulfilled, () => {
        toast.success("Successfull registration!");
      })
      .addCase(registered.rejected, () => {
        toast.error("Error registration!");
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, () => {
        toast.error("Error login!");
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(current.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(current.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(current.rejected, (state) => {
        state.isRefreshing = false;
        toast.error("Please log in again!");
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        const { type, sum } = action.payload;

        type === "income"
          ? (state.user.balance += sum)
          : (state.user.balance -= sum);
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const { type, sum } = action.payload;
        type === "income"
          ? (state.user.balance -= sum)
          : (state.user.balance += sum);
      });
  },
});

export default authSlice.reducer;
