import css from "./EditTransactionToggle.module.css";
import clsx from "clsx";
import { EditTransactionToggleProps } from "./EditTransactionToggle.types";

const EditTransactionToggle = ({
  currentType,
  onChange,
}: EditTransactionToggleProps) => {
  return (
    <div className={css.toggleContainer}>
      <span
        className={clsx(css.label, currentType === "income" && css.income)}
        onClick={() => {
          if (currentType !== "income") {
            onChange("income");
          }
        }}
      >
        Income
      </span>

      <span className={css.separator}>/</span>

      <span
        className={clsx(css.label, currentType === "expense" && css.expense)}
        onClick={() => {
          if (currentType !== "expense") {
            onChange("expense");
          }
        }}
      >
        Expense
      </span>
    </div>
  );
};

export default EditTransactionToggle;
