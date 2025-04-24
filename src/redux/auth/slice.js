import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { login, logout, registered } from "./operations";
=======
import { login, logout, register } from "./operations";
>>>>>>> 678129a (Add redux)
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
<<<<<<< HEAD
      .addCase(registered.fulfilled, () => {
        toast.success("Successfull registration!");
      })
      .addCase(registered.rejected, () => {
=======
      .addCase(register.fulfilled, () => {
        toast.success("Successfull registration!");
      })
      .addCase(register.rejected, () => {
>>>>>>> 678129a (Add redux)
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
