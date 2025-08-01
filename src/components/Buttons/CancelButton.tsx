import clsx from "clsx";
import css from "./Button.module.css";
import { CancelButtonProps } from "./Buttons.types";

const CancelButton = ({ children, onClose, isLoading }: CancelButtonProps) => {
  return (
    <button
      className={clsx(css.btn, css["cancel-btn"])}
      type="button"
      onClick={onClose}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default CancelButton;
