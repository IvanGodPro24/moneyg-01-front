import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/transactions", transactionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/transactions/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
