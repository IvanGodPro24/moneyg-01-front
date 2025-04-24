import React, { useState } from 'react';
import css from './TransactionToggle.module.css';

const TransactionToggle = ({ onChange }) => {
  const [isIncome, setIsIncome] = useState(false); // Expense за замовчуванням

  const handleToggle = () => {
    const newType = isIncome ? 'expense' : 'income';
    setIsIncome(!isIncome);
    onChange(newType);
  };

  return (
    <div className={css.toggleContainer}>
      <span className={`${css.label} ${isIncome ? css.activeIncome : ''}`}>Income</span>
      <div className={`${css.toggle} ${isIncome ? css.left : css.right}`} onClick={handleToggle}>
        <div className={`${css.circle} ${isIncome ? css.incomeColor : css.expenseColor}`}>+</div>
      </div>
      <span className={`${css.label} ${!isIncome ? css.activeExpense : ''}`}>Expense</span>
    </div>
  );
};

export default TransactionToggle;
