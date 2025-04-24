import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const current = createAsyncThunk(
  "user/current",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/current", user);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
