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

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/categories");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
