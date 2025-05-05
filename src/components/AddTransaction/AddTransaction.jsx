import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";

import {
  addTransaction,
  getAllCategories,
} from "../../redux/transactions/operations.js";
import icon from "../../img/icons.svg";
import css from "./AddTransaction.module.css";
import TransactionToggle from "../TransactionToggle/TransactionToggle.jsx";
import { selectCategories } from "../../redux/transactions/selectors.js";

const AddTransaction = ({ onClose }) => {
  const dispatch = useDispatch();
  const [transactionType, setTransactionType] = useState("expense");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories]);

  const initialValues = {
    sum: "",
    comment: "",
    date: new Date(),
    category: "",
  };

  const validationSchema = Yup.object({
    sum: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("Sum is required"),
    comment: Yup.string().max(50, "Comment is too long"),
    date: Yup.date().required("Date is required"),
    category: Yup.string().when([], {
      is: () => transactionType === "expense",
      then: (schema) => schema.required("Category is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

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
      await dispatch(addTransaction(finalData));
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to add transaction:", error);
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

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={`${css.AddModal} ${
          transactionType !== "expense" && css.smallWindow
        }`}
        onClick={stopPropagation}
      >
        <button
          className={css.closeButton}
          onClick={onClose}
          disabled={isLoading}
        >
          <svg className={css.closeSvg} width="16" height="16">
            <use href={`${icon}#icon-close`}></use>
          </svg>
        </button>
        <h2
          className={`${css.AddText} ${
            transactionType === "expense" && css.expenseMobileText
          }`}
        >
          Add transaction
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div
                className={`${css.transactionTypeContainer} ${
                  transactionType !== "income" ? css.expenseMobileMargin : ""
                }`}
              >
                <TransactionToggle
                  onChange={handleToggle}
                  disabled={isLoading}
                />
              </div>

              {transactionType === "expense" && (
                <div className={css.selectWrapper}>
                  <div
                    className={`${css.dropdown} ${
                      isDropdownOpen ? css.active : ""
                    }`}
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={css.selected}>
                      {selectedCategory || "Select a category"}
                    </span>
                    <span className={css.arrow}>
                      <svg width="18" height="9">
                        <use href={`${icon}#icon-arrow-down`}></use>
                      </svg>
                    </span>

                    {isDropdownOpen && !isLoading && (
                      <ul className={css.options}>
                        {categories
                          .filter((cat) => !(cat === "Income"))
                          .map((cat) => (
                            <li
                              key={cat}
                              className={`${css.option} ${
                                selectedCategory === cat ? css.activeOption : ""
                              }`}
                              onClick={(e) => {
                                if (isLoading) return;
                                e.stopPropagation();
                                setSelectedCategory(cat);
                                setFieldValue("category", cat);
                                setDropdownOpen(false);
                              }}
                            >
                              {cat}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className={css.errorText}
                  />
                </div>
              )}
              <div className={css.container}>
                <div className={css.sumDateWrapper}>
                  <div className={css.sumField}>
                    <Field
                      type="number"
                      id="sum"
                      name="sum"
                      placeholder="0.00"
                      className={css.addSumTransaction}
                      disabled={isLoading}
                    />
                    <ErrorMessage
                      name="sum"
                      component="div"
                      className={css.errorText}
                    />
                  </div>

                  <div className={css.datePickerWrapper}>
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => {
                        const formattedDate = date.toISOString();
                        setFieldValue("date", formattedDate);
                      }}
                      dateFormat="dd.MM.yyyy"
                      minDate={new Date("2025-01-01")}
                      maxDate={new Date()}
                      className={css.datePicker}
                      popperPlacement="bottom-end"
                      disabled={isLoading}
                    />
                    <svg className={css.celndar} width="24" height="24">
                      <use href={`${icon}#icon-date-range`}></use>
                    </svg>
                    <ErrorMessage
                      name="date"
                      component="div"
                      className={css.errorText}
                    />
                  </div>
                </div>
                <div>
                  <Field
                    type="text"
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    className={css.addCommentTransaction}
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className={css.errorText}
                  />
                </div>
              </div>

              <div className={css.addTransactionButtonContainer}>
                {isLoading ? (
                  <ClipLoader size={50} color="#3498db" />
                ) : (
                  <button className={css.addButton} type="submit">
                    ADD
                  </button>
                )}
                <button
                  className={css.cencelButton}
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  CANCEL
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTransaction;
