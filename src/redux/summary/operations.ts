import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchSummary, SummaryType } from "./summary.types";

export const fetchSummary = createAsyncThunk<
  SummaryType,
  FetchSummary,
  { rejectValue: string }
>(
  "summary/fetchSummaryByMonthYear",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/summary", {
        params: { month, year },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
