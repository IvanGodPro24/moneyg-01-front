export type AddTransactionProps = {
  onClose: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export type SubmitProps = {
  resetForm: () => void;
};

export type InitValues = {
  sum: number | null;
  date: Date;
  category: string;
  comment: string;
};
