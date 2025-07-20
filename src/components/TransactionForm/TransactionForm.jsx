import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/transactions/selectors";
import { getAllCategories } from "../../redux/transactions/operations";
import Calendar from "../Calendar/Calendar";
import { FaMoneyBillWave, FaCommentDollar } from "react-icons/fa6";
import clsx from "clsx";
import css from "./TransactionForm.module.css";
import icon from "../../img/icons.svg";
import AddButton from "../Buttons/AddButton";
import CancelButton from "../Buttons/CancelButton";
import TransactionToggle from "../TransactionToggle/TransactionToggle";
import EditTransactionToggle from "../EditTransactionToggle/EditTransactionToggle";

const TransactionForm = ({
  onClose,
  initialValues,
  onSubmit,
  isLoading,
  transactionType,
  selectedCategory,
  setSelectedCategory,
  setTransactionType,
  edit = false,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          {edit ? (
            <EditTransactionToggle
              currentType={transactionType}
              onChange={setTransactionType}
              disabled={isLoading}
            />
          ) : (
            <div className={css.transactionTypeContainer}>
              <TransactionToggle
                onChange={setTransactionType}
                disabled={isLoading}
              />
            </div>
          )}

          {transactionType === "expense" && (
            <div
              className={clsx(
                css.selectWrapper,
                "label",
                "relative",
                isDropdownOpen && "active"
              )}
            >
              <div
                className="dropdown"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <span className="selected">
                  {selectedCategory || "Select a category"}
                </span>
                <span className="arrow">
                  <svg
                    width="18"
                    height="9"
                    className={isDropdownOpen ? "rotate-180" : "rotate-0"}
                  >
                    <use href={`${icon}#icon-arrow-down`}></use>
                  </svg>
                </span>

                {isDropdownOpen && !isLoading && (
                  <ul className="options">
                    {categories
                      .filter((cat) => cat !== "Income")
                      .map((cat) => (
                        <li
                          key={cat}
                          className={`option ${
                            selectedCategory === cat ? "activeOption" : ""
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
                className="errorText"
              />
            </div>
          )}

          <div className="sumDateWrapper">
            <label className={clsx("label", "relative")}>
              <FaMoneyBillWave className="input-icon" />
              <Field
                type="number"
                id="sum"
                name="sum"
                placeholder="0.00 ₴"
                className={clsx("input", "addSum")}
                disabled={isLoading}
              />
              <ErrorMessage name="sum" component="div" className="errorText" />
            </label>

            <label className={clsx("datePickerWrapper", "label", "relative")}>
              <Calendar
                values={values}
                setFieldValue={setFieldValue}
                isLoading={isLoading}
              />
              <svg width="24" height="24">
                <use href={`${icon}#icon-date-range`}></use>
              </svg>
              <ErrorMessage name="date" component="div" className="errorText" />
            </label>
          </div>

          <div className="comment-container">
            <label className={clsx("label", "relative")}>
              <FaCommentDollar className="input-icon" />
              <Field
                type="text"
                id="comment"
                name="comment"
                placeholder="Comment"
                className={clsx("input", "addComment")}
                disabled={isLoading}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="errorText"
              />
            </label>
          </div>

          <div className="btn-container">
            {isLoading ? (
              <ClipLoader size={50} color="#3498db" />
            ) : (
              <AddButton>{edit ? "save" : "add"}</AddButton>
            )}
            <CancelButton onClose={onClose} isLoading={isLoading}>
              cancel
            </CancelButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
