import { RootState } from "../store.types";

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectTotalBalance = (state: RootState) => state.auth.user.balance;
