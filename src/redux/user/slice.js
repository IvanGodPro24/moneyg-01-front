import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: {
      name: null,
      balance: null,
    },
  },

  extraReducers: (builder) => {
    builder.addCase;
  },
});

export default userSlice.reducer;
