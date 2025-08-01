export type User = {
  name: string | null;
  email: string | null;
  balance: number;
  avatarURL: string | null;
  registrationDate: string | null;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type RegisterSchema = {
  name: string;
  email: string;
  password: string;
  newPassword: string;
};

export type UserData = {
  user: User;
  token: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RequestReset = {
  email: string;
};

export type Response = {
  message: string;
};

export type ResetPassword = {
  token: string | null;
  password: string;
};

export type UpdateUser = {
  name: string;
  email: string | null;
  balance?: number;
  avatar: File | string | null;
  registrationDate: string | null;
  clearAvatar: boolean;
};

export type AuthInitState = {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error?: string | null;
};
