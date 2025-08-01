import { MouseEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../../hooks/useAppDispatch.js";
import { useAppSelector } from "../../../hooks/useAppSelector.js";

import { addTransaction } from "../../../redux/transactions/operations.js";
import icon from "../../../img/icons.svg";
import TransactionForm from "../TransactionForm.jsx";
import {
  selectPerPage,
  selectTotalItems,
} from "../../../redux/transactions/selectors.js";
import {
  AddTransactionProps,
  InitValues,
  SubmitProps,
} from "./AddTransaction.types.js";
import { TransactionType } from "../../../redux/transactions/transactions.types.js";

const AddTransaction = ({
  onClose,
  currentPage,
  setCurrentPage,
}: AddTransactionProps) => {
  const dispatch = useAppDispatch();
  const [transactionType, setTransactionType] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: InitValues = {
    sum: null,
    comment: "",
    date: new Date(),
    category: "",
  };

  const totalItems = useAppSelector(selectTotalItems);
  const perPage = useAppSelector(selectPerPage);

  const onSubmit = async (values: InitValues, { resetForm }: SubmitProps) => {
    const finalData: TransactionType = {
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

      if (totalItems) {
        const newTotalPages = Math.ceil((totalItems + 1) / perPage);

        if (newTotalPages > currentPage) {
          setCurrentPage(newTotalPages);
        }
      }

      resetForm();
      onClose();
    } catch (error: any) {
      console.error("Failed to add transaction:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (selectedType: string) => {
    setTransactionType(selectedType);
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isLoading) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

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
