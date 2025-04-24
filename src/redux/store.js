import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import transactionReducer from "./transactions/slice";
import userReducer from "./user/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    user: userReducer,
  },
});
