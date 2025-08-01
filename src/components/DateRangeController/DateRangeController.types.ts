import { Control } from "react-hook-form";
import { ReactNode } from "react";
import { Filters } from "../../redux/transactions/transactions.types";

export type DateRangeControllerProps = {
  control: Control<Filters>;
  id: string;
  className: string;
  icon: ReactNode;
};
