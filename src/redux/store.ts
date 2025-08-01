import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import transactionReducer from "./transactions/slice";
import summaryReducer from "./summary/slice";
import currencyReducer from "./currency/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const currencyPersistConfig = {
  key: "currency",
  storage,
  whitelist: ["activeCurrency"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const persistedCurrencyReducer = persistReducer(
  currencyPersistConfig,
  currencyReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    transactions: transactionReducer,
    summary: summaryReducer,
    currency: persistedCurrencyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
