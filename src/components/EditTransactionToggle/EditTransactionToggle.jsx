import React from "react";
import css from "./EditTransactionToggle.module.css";

const TransactionToggle = ({ currentType, onChange }) => {
  return (
    <div className={css.toggleContainer}>
      <span
        className={`${css.label} ${currentType === "income" ? css.income : ""}`}
        onClick={() => onChange("income")}
      >
        Income
      </span>

      <span className={css.separator}>/</span>

      <span
        className={`${css.label} ${
          currentType === "expense" ? css.expense : ""
        }`}
        onClick={() => onChange("expense")}
      >
        Expense
      </span>
    </div>
  );
};

export default TransactionToggle;
