import css from "./EditTransactionToggle.module.css";

export default function EditTransactionToggle({ currentType, onChange }) {
  return (
    <div className={css.toggleWrapper}>
      <button
        type="button"
        className={`${css.toggleButton} ${
          currentType === "income" ? css.active : ""
        }`}
        onClick={() => onChange("income")}
      >
        Income
      </button>
      <span className={css.separator}>/</span>
      <button
        type="button"
        className={`${css.toggleButton} ${
          currentType === "expense" ? css.active : ""
        }`}
        onClick={() => onChange("expense")}
      >
        Expense
      </button>
    </div>
  );
}
