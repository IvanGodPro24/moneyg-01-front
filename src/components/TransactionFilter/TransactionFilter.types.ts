import { Filters } from "../../redux/transactions/transactions.types";

export type TransactionFilterProps = {
  filters: Filters;
  onApplyFilters: (newFilters: Filters) => void;
};
