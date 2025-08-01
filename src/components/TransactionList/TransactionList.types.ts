import { Filters } from "../../redux/transactions/transactions.types";

export type TransactionListProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  filters: Filters;
};

export type Copy = {
  id: string;
  type: string;
  category: string;
  date: string;
  sum: number;
  comment?: string;
};
