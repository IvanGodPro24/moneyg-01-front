import { ModalType } from "../../hooks/useModal.types";

export type TransactionsItemProps = {
  id: string;
  date: string;
  category: string;
  comment?: string;
  sum: number;
  type: string;
  copiedId: string | null;
  convertedSum: number;
  formattedDate: string;
  onToggle: (modal: ModalType) => void;
  onDelete: (id: string, setLoading: (arg: boolean) => void) => void;
  onRepeat: () => void;
  onCopy: () => void;
};
