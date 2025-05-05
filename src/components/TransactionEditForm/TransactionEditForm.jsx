import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";

import {
  editTransaction,
  getAllCategories,
} from "../../redux/transactions/operations";
import css from "./TransactionEditForm.module.css";
import icon from "../../img/icons.svg";
import EditTransactionToggle from "../EditTransactionToggle/EditTransactionToggle";
import { selectCategories } from "../../redux/transactions/selectors";

export default function TransactionEditForm({
  onClose,
  _id,
  date,
  category,
  comment,
  sum,
  type,
}) {
  const [transactionType, setTransactionType] = useState(type);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [loading, setLoading] = useState(false);

  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories]);

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
    setLoading(true);

    const updatedTransaction = {
      ...values,
      type: transactionType,
      date: values.date.toISOString(),
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

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  setDropdownOpen;
  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={`${css.EditModal} ${
          transactionType !== "expense" && css.smallWindow
        }`}
        onClick={stopPropagation}
      >
        <button
          className={css.closeButton}
          onClick={onClose}
          disabled={loading}
        >
          <svg className={css.closeSvg} width="16" height="16">
            <use href={`${icon}#icon-close`}></use>
          </svg>
        </button>

        <h2 className={css.editText}>Edit transaction</h2>

        <Formik
          initialValues={{
            sum: sum || "",
            comment: comment || "",
            date: new Date(date),
            category: category || "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className={css.transactionTypeContainer}>
                <EditTransactionToggle
                  currentType={transactionType}
                  onChange={handleToggle}
                  disabled={loading}
                />
              </div>

              {transactionType === "expense" && (
                <div className={css.selectWrapper}>
                  <div
                    className={`${css.dropdown} ${
                      isDropdownOpen ? css.active : ""
                    }`}
                    onClick={() => {
                      if (!loading) setDropdownOpen(!isDropdownOpen);
                    }}
                  >
                    <span className={css.selected}>
                      {selectedCategory || "Select a category"}
                    </span>
                    <span className={css.arrow}></span>

                    {isDropdownOpen && !loading && (
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
                                if (loading) return;
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

              <div className={css.transactionInfoContainer}>
                <div className={css.sumDateWrapper}>
                  <div className={css.sumField}>
                    <Field
                      type="number"
                      id="sum"
                      name="sum"
                      placeholder="0.00"
                      className={css.editSumTransaction}
                      disabled={loading}
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
                        setFieldValue("date", date);
                      }}
                      dateFormat="dd.MM.yyyy"
                      minDate={new Date("2023-01-01")}
                      maxDate={new Date()}
                      className={css.datePicker}
                      disabled={loading}
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
                    className={css.editCommentTransaction}
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className={css.errorText}
                  />
                </div>
              </div>

              <div className={css.editTransactionButtonContainer}>
                {loading ? (
                  <ClipLoader size={50} color="#3498db" />
                ) : (
                  <button
                    className={css.editButton}
                    type="submit"
                    disabled={loading}
                  >
                    SAVE
                  </button>
                )}
                <button
                  className={css.cancelButton}
                  type="button"
                  onClick={onClose}
                  disabled={loading}
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
}
