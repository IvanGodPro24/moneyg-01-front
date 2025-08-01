export type TransactionData = {
  data: Transaction[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type Transaction = {
  _id: string;
  type: string;
  categoryId: {
    title: string;
  };
  date: string;
  sum: number;
  comment?: string;
  userBalance: number;
};

export type TransactionType = {
  _id?: string;
  type?: string;
  category: string;
  date: Date | string;
  sum: number | null;
  comment?: string;
};

export type FetchTransactions = {
  page: number;
  perPage: number | null;
  filters: Filters;
  sortOrder: string | null;
  sortBy: string;
};

export type Filters = {
  type: string | null;
  categoryTitle: string | null;
  minSum: number | null;
  maxSum: number | null;
  dateFrom: Date | null;
  dateTo: Date | null;
  comment: string | null;
};

export type Categories = [
  | "Income"
  | "Main expenses"
  | "Products"
  | "Car"
  | "Self care"
  | "Child care"
  | "Household products"
  | "Education"
  | "Leisure"
  | "Other expenses"
  | "Entertainment"
];

export type TransactionInitState = {
  items: Transaction[];
  page: number | null;
  perPage: number;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
  totalPages: number | null;
  totalItems: number | null;
  categories: Categories | [];
  isLoading: boolean;
  error?: string | null;
};
