import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./operations";
import { toast } from "sonner";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, () => {
        toast.success("Successfull registration!");
      })
      .addCase(register.rejected, () => {
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
      });
  },
});

export default authSlice.reducer;
