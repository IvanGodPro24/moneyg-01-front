import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registered = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", user);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data || error.message);
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
      return rejectWithValue(error.response?.data?.data || error.message);
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
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const current = createAsyncThunk(
  "user/current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const persistedToken = state.auth.token;

      if (persistedToken === null)
        return rejectWithValue("Unable to fetch user");

      setAuthHeader(persistedToken);

      const response = await axios.get("/user/current");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);
