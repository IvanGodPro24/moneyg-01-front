import { ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: ReactNode;
  confirm: ReactNode;
};
