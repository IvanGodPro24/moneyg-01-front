import { InitValues, SubmitProps } from "./AddTransaction/AddTransaction.types";

export type TransactionFormProps = {
  onClose: () => void;
  initialValues: InitValues;
  onSubmit: (values: InitValues, { resetForm }: SubmitProps) => void;
  isLoading: boolean;
  transactionType: string;
  selectedCategory: string;
  setSelectedCategory: (arg: string) => void;
  setTransactionType: (arg: string) => void;
  edit?: boolean;
};
