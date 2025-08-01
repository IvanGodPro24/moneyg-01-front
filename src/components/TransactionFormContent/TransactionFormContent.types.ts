export type TransactionFormContentProps = {
  onClose: () => void;
  isLoading: boolean;
  transactionType: string;
  selectedCategory: string;
  setSelectedCategory: (arg: string) => void;
  setTransactionType: (arg: string) => void;
  edit?: boolean;
};
