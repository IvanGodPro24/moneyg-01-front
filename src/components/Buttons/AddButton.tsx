import clsx from "clsx";
import css from "./Button.module.css";
import { AddButtonProps } from "./Buttons.types";

const AddButton = ({ children, onClick }: AddButtonProps) => {
  return (
    <button
      className={clsx(css.btn, css["add-btn"])}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AddButton;
