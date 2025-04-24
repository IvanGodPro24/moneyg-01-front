import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

<<<<<<< HEAD
export const registered = createAsyncThunk(
=======
export const register = createAsyncThunk(
>>>>>>> 678129a (Add redux)
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", user);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", user);

      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout");

      clearAuthHeader();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
