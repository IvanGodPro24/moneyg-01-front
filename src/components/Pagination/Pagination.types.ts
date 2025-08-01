import { SingleValue } from "react-select";
import { NumberOptions } from "../../constants/constants.types";

export type PaginationProps = {
  currentPage: number | null;
  perPage: number;
  totalPages: number | null;
  onPageChange: (newPage: number) => void;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
  onPerPageChange: (selectedOption: SingleValue<NumberOptions> | null) => void;
};
