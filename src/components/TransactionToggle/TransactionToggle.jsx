import React, { useState } from 'react';
import css from './TransactionToggle.module.css';
import icon from '../../img/icons.svg';

const TransactionToggle = ({ onChange }) => {
  const [isIncome, setIsIncome] = useState(false);

  const handleToggle = () => {
    const newType = isIncome ? 'expense' : 'income';
    setIsIncome(!isIncome);
    onChange(newType);
  };

  return (
    <div className={css.toggleContainer}>
      <span className={`${css.label} ${isIncome ? css.activeIncome : ''}`}>Income</span>
      <div className={`${css.toggle} ${isIncome ? css.left : css.right}`} onClick={handleToggle}>
        <div className={`${css.circle} ${isIncome ? css.incomeColor : css.expenseColor}`}>
          {isIncome ? (
            <svg width='20' height='20'>
              <use href={`${icon}#icon-sign-plus`}></use>
            </svg>
          ) : (
            <svg width='20' height='20'>
              <use href={`${icon}#icon-sign-minus`}></use>
            </svg>
          )}
        </div>
      </div>
      <span className={`${css.label} ${!isIncome ? css.activeExpense : ''}`}>Expense</span>
    </div>
  );
};

export default TransactionToggle;
