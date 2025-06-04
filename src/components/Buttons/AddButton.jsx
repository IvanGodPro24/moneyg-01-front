import clsx from "clsx";
import css from "./Button.module.css";

const AddButton = ({ children }) => {
  return (
    <button className={clsx(css.btn, css["add-btn"])} type="submit">
      {children}
    </button>
  );
};

export default AddButton;
