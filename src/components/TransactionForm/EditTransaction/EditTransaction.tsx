import { MouseEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { editTransaction } from "../../../redux/transactions/operations";
import icon from "../../../img/icons.svg";
import { isTransactionChanged } from "../../../utils/isTransactionChanged";
import TransactionForm from "../TransactionForm";
import { EditTransactionProps } from "./EditTransaction.types";
import {
  InitValues,
  SubmitProps,
} from "../AddTransaction/AddTransaction.types";
import { TransactionType } from "../../../redux/transactions/transactions.types";

export default function EditTransaction({
  onClose,
  _id,
  date,
  category,
  comment,
  sum,
  type,
}: EditTransactionProps) {
  const dispatch = useAppDispatch();
  const [transactionType, setTransactionType] = useState(type);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [loading, setLoading] = useState(false);

  const initialValues: InitValues = {
    sum: sum || null,
    comment: comment || "",
    date: new Date(date),
    category: category || "",
  };

  const onSubmit = async (values: InitValues, { resetForm }: SubmitProps) => {
    if (!isTransactionChanged(initialValues, values)) {
      onClose();
      return;
    }

    setLoading(true);

    const updatedTransaction: TransactionType = {
      ...values,
      type: transactionType,
      date: new Date(values.date),
      _id,
    };

    try {
      await dispatch(editTransaction(updatedTransaction)).unwrap();
      resetForm();
      onClose();
    } catch (error: any) {
      console.error("Edit error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (type: string) => {
    setTransactionType(type);
    if (type === "income") {
      setSelectedCategory("Income");
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (loading) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal" onClick={stopPropagation}>
        <button className="closeButton" onClick={onClose} disabled={loading}>
          <svg className="closeSvg" width="16" height="16">
            <use href={`${icon}#icon-close`}></use>
          </svg>
        </button>

        <h2 className="text">Edit transaction</h2>

        <TransactionForm
          onClose={onClose}
          initialValues={initialValues}
          onSubmit={onSubmit}
          isLoading={loading}
          transactionType={transactionType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setTransactionType={handleToggle}
          edit={true}
        />
      </div>
    </div>
  );
}
