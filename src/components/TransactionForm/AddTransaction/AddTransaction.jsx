import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

import { addTransaction } from "../../../redux/transactions/operations.js";
import icon from "../../../img/icons.svg";
import TransactionForm from "../TransactionForm.jsx";
import {
  selectPerPage,
  selectTotalItems,
} from "../../../redux/transactions/selectors.js";

const AddTransaction = ({ onClose, currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const [transactionType, setTransactionType] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    sum: "",
    comment: "",
    date: new Date(),
    category: "",
  };

  const totalItems = useSelector(selectTotalItems);
  const perPage = useSelector(selectPerPage);

  const onSubmit = async (values, { resetForm }) => {
    const finalData = {
      ...values,
      type: transactionType,
    };

    if (transactionType === "income") {
      finalData.category = "Income";
      setSelectedCategory("Income");
    }

    setIsLoading(true);
    try {
      await dispatch(addTransaction(finalData)).unwrap();

      const newTotalPages = Math.ceil((totalItems + 1) / perPage);

      if (newTotalPages > currentPage) {
        setCurrentPage(newTotalPages);
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to add transaction:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (selectedType) => {
    setTransactionType(selectedType);
  };

  const handleBackdropClick = (e) => {
    if (isLoading) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal" onClick={stopPropagation}>
        <button className="closeButton" onClick={onClose} disabled={isLoading}>
          <svg className="closeSvg" width="16" height="16">
            <use href={`${icon}#icon-close`}></use>
          </svg>
        </button>

        <h2 className="text">Add transaction</h2>

        <TransactionForm
          onClose={onClose}
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={isLoading}
          transactionType={transactionType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setTransactionType={handleToggle}
        />
      </div>
    </div>
  );
};

export default AddTransaction;
