export type EditTransactionProps = {
  onClose: () => void;
  _id: string;
  date: string;
  category: string;
  comment?: string;
  sum: number | null;
  type: string;
};
