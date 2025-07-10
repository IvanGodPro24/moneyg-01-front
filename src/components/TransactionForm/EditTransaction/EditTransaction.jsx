import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";

import { editTransaction } from "../../../redux/transactions/operations";
import icon from "../../../img/icons.svg";
import { isTransactionChanged } from "../../../utils/isTransactionChanged";
import TransactionForm from "../TransactionForm";

export default function EditTransaction({
  onClose,
  _id,
  date,
  category,
  comment,
  sum,
  type,
}) {
  const dispatch = useDispatch();
  const [transactionType, setTransactionType] = useState(type);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    sum: sum || "",
    comment: comment || "",
    date: new Date(date),
    category: category || "",
  };

  const onSubmit = async (values, { resetForm }) => {
    if (!isTransactionChanged(initialValues, values)) {
      onClose();
      return;
    }

    setLoading(true);

    const updatedTransaction = {
      ...values,
      type: transactionType,
      date: new Date(values.date).toISOString(),
    };

    try {
      await dispatch(editTransaction({ ...updatedTransaction, _id })).unwrap();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Edit error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (type) => {
    setTransactionType(type);
    if (type === "income") {
      setSelectedCategory("Income");
    }
  };

  const handleBackdropClick = (e) => {
    if (loading) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

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
