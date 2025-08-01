import { ReactNode } from "react";

export type SortableThProps = {
  field: string;
  label: ReactNode;
  sortOrder: string | null;
  sortBy: string;
  onSort: (field: string, order: string) => void;
};
