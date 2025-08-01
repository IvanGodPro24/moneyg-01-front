import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Categories,
  FetchTransactions,
  Transaction,
  TransactionData,
  TransactionType,
} from "./transactions.types";

export const addTransaction = createAsyncThunk<
  Transaction,
  TransactionType,
  { rejectValue: string }
>(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/transactions", transactionData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk<
  TransactionData,
  FetchTransactions,
  { rejectValue: string }
>(
  "transactions/fetchTransactions",
  async (
    { page = 1, perPage, filters = {}, sortOrder, sortBy },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get("/transactions", {
        params: { page, perPage, sortOrder, sortBy, ...filters },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk<
  Transaction,
  string,
  { rejectValue: string }
>("transactions/deleteTransaction", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/transactions/${id}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editTransaction = createAsyncThunk<
  Transaction,
  TransactionType,
  { rejectValue: string }
>(
  "transactions/editTransaction",
  async ({ _id, ...updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/transactions/${_id}`, updatedData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllCategories = createAsyncThunk<
  Categories,
  void,
  { rejectValue: string }
>("categories/getAllCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/categories");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
