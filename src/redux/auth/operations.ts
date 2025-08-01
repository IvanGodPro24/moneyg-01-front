import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginCredentials,
  RegisterCredentials,
  ResetPassword,
  Response,
  UpdateUser,
  User,
  UserData,
} from "./auth.types";
import { RootState } from "../store.types";

axios.defaults.baseURL = "https://moneyg-01-front.onrender.com";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registered = createAsyncThunk<
  User,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/register", user);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const login = createAsyncThunk<
  UserData,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/login", user);

    setAuthHeader(response.data.token);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const requestResetEmail = createAsyncThunk<
  Response,
  string,
  { rejectValue: string }
>("auth/request-reset-email", async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/request-reset-email", { email });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const resetPassword = createAsyncThunk<
  Response,
  ResetPassword,
  { rejectValue: string }
>("auth/reset-password", async ({ token, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/reset-password", {
      token,
      password,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const loginWithGoogle = createAsyncThunk<
  UserData,
  string | null,
  { rejectValue: string }
>("auth/googleLogin", async (code, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/confirm-oauth", { code });

    setAuthHeader(response.data.token);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout");

      clearAuthHeader();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const current = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string; state: RootState }
>("user/current", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) return rejectWithValue("Unable to fetch user");

    setAuthHeader(persistedToken);

    const response = await axios.get("/user/current");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const updateUser = createAsyncThunk<
  UserData,
  UpdateUser,
  { rejectValue: string }
>("user/update", async (values, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    values.name && formData.append("name", values.name);
    values.email && formData.append("email", values.email);
    values.registrationDate &&
      formData.append("registrationDate", values.registrationDate);

    if (values.clearAvatar) {
      formData.append("clearAvatar", "true");
    } else if (values.avatar instanceof File) {
      formData.append("avatarURL", values.avatar);
    }

    const response = await axios.patch("/user/update", formData);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});
