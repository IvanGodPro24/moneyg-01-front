import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import css from "./TransactionEditForm.module.css";
import TransactionToggle from "../TransactionToggle/TransactionToggle";
import icon from "../../img/icons.svg";
import EditTransactionToggle from "../EditTransactionToggle/EditTransactionToggle";
import { useDispatch } from "react-redux";
import { editTransaction } from "../../redux/transactions/operations";

const categories = [
  "Products",
  "Health",
  "Transport",
  "Alcohol",
  "Entertainment",
  "Housing",
  "Technique",
  "Communal",
  "Sports",
  "Education",
  "Other",
];

export default function TransactionEditForm({ onClose, initialTransaction }) {
  const [transactionType, setTransactionType] = useState(
    initialTransaction.type
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialTransaction.category || ""
  );

  const dispatch = useDispatch();

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
    const updatedTransaction = {
      ...values,
      type: transactionType,
      date: values.date.toISOString(),
    };

    try {
      await dispatch(
        editTransaction({
          id: initialTransaction._id,
          updatedData: updatedTransaction,
        })
      ).unwrap();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Edit transaction failed:", error);
    }
  };

  return (
    <div
      className={`${css.EditModal} ${
        transactionType !== "expense" && css.smallWindow
      }`}
    >
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.closeSvg} width="16" height="16">
          <use href={`${icon}#icon-close`}></use>
        </svg>
      </button>

      <h2 className={css.editText}>Edit transaction</h2>

      <Formik
        initialValues={{
          sum: initialTransaction.sum || "",
          comment: initialTransaction.comment || "",
          date: new Date(initialTransaction.date),
          category: initialTransaction.category || "",
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
                  <span className={css.arrow}></span>

                  {isDropdownOpen && (
                    <ul className={css.options}>
                      {categories.map((cat) => (
                        <li
                          key={cat}
                          className={`${css.option} ${
                            selectedCategory === cat ? css.activeOption : ""
                          }`}
                          onClick={(e) => {
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
              <div className={css.sumField}>
                <Field
                  type="number"
                  id="sum"
                  name="sum"
                  placeholder="0.00"
                  className={css.editSumTransaction}
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

              <div>
                <Field
                  type="text"
                  id="comment"
                  name="comment"
                  placeholder="Comment"
                  className={css.editCommentTransaction}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.errorText}
                />
              </div>
            </div>

            <div className={css.editTransactionButtonContainer}>
              <button className={css.editButton} type="submit">
                SAVE
              </button>
              <button
                className={css.cancelButton}
                type="button"
                onClick={onClose}
              >
                CANCEL
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
