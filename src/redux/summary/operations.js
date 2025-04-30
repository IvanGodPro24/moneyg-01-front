import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSummary = createAsyncThunk(
  "summary/fetchSummaryByMonthYear",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/summary", {
        params: { month, year },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
