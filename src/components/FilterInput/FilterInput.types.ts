import { UseFormRegister } from "react-hook-form";
import { Filters } from "../../redux/transactions/transactions.types";

export type FilterInputProps = {
  id: string;
  type: string;
  register: UseFormRegister<Filters>;
  field: keyof Filters;
  placeholder: string;
};
