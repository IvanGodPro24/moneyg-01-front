export type AddButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export type CancelButtonProps = {
  children: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLElement>;
  isLoading?: boolean;
};
