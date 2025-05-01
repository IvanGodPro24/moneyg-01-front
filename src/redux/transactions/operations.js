import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/transactions');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/transactions/${transaction._id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async ({ _id, ...updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/transactions/${_id}`, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'categories/getAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/categories');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
