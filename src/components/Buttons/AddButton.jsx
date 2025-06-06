import clsx from "clsx";
import css from "./Button.module.css";

const AddButton = ({ children, onClick }) => {
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
