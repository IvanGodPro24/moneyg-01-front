import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import css from './TransactionEditForm.module.css';
import icon from '../../img/icons.svg';
import EditTransactionToggle from '../EditTransactionToggle/EditTransactionToggle';
import { useDispatch, useSelector } from 'react-redux';
import {
  editTransaction,
  getAllCategories,
} from '../../redux/transactions/operations';
import { selectCategories } from '../../redux/transactions/selectors';

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
  const [selectedCategory, setSelectedCategory] = useState(category || '');

  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('TransactionEditForm useEffect: fetching categories if needed');
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories]);

  const validationSchema = Yup.object({
    sum: Yup.number()
      .typeError('Must be a number')
      .positive('Must be positive')
      .required('Sum is required'),
    comment: Yup.string().max(50, 'Comment is too long'),
    date: Yup.date().required('Date is required'),
    category: Yup.string().when([], {
      is: () => transactionType === 'expense',
      then: (schema) => schema.required('Category is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log('onSubmit called with values:', values);
    console.log('transactionType in onSubmit:', transactionType);
    const incomeCategoryObject = categories.find(
      (cat) => cat.title === 'Income'
    );
    console.log('incomeCategoryObject in onSubmit:', incomeCategoryObject);
    const selectedCategoryId =
      transactionType === 'income' && incomeCategoryObject
        ? incomeCategoryObject._id
        : categories.find((cat) => cat.title === selectedCategory)?._id;

    const updatedTransaction = {
      ...values,
      type: transactionType,
      date: values.date.toISOString(),
      sum: values.sum,
      comment: values.comment,
      categoryId: selectedCategoryId,
    };

    console.log('updatedTransaction before dispatch:', updatedTransaction);
    dispatch(editTransaction({ ...updatedTransaction, _id }));
    console.log('editTransaction dispatched with:', {
      ...updatedTransaction,
      _id,
    });

    console.log('Updated transaction:', updatedTransaction);
    resetForm();
    onClose();
  };

  const handleToggle = (type) => {
    console.log('handleToggle called with type:', type);
    setTransactionType(type);
    if (type === 'income') {
      setSelectedCategory('Income');
      console.log(
        'Transaction type set to income, selectedCategory set to Income'
      );
    } else {
      console.log('Transaction type set to expense');
    }
  };

  return (
    <div
      className={`${css.EditModal} ${
        transactionType !== 'expense' && css.smallWindow
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
          sum: sum || '',
          comment: comment || '',
          date: new Date(date),
          category: category || '',
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

            {transactionType === 'expense' && (
              <div className={css.selectWrapper}>
                <div
                  className={`${css.dropdown} ${
                    isDropdownOpen ? css.active : ''
                  }`}
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <span className={css.selected}>
                    {selectedCategory || 'Select a category'}
                  </span>
                  <span className={css.arrow}></span>

                  {isDropdownOpen && (
                    <ul className={css.options}>
                      {categories
                        .filter((cat) => !(cat === 'Income'))
                        .map((cat) => (
                          <li
                            key={cat._id}
                            className={`${css.option} ${
                              selectedCategory === cat.title
                                ? css.activeOption
                                : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategory(cat.title);
                              setFieldValue('category', cat.title);
                              setDropdownOpen(false);
                              console.log(
                                'Selected category:',
                                cat.title,
                                'with id:',
                                cat._id
                              );
                            }}
                          >
                            {cat.title}
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
                  onChange={(e) => {
                    setFieldValue('sum', Number(e.target.value));
                    console.log('Sum changed to:', Number(e.target.value));
                  }}
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
                    setFieldValue('date', date);
                    console.log('Date changed to:', date);
                  }}
                  dateFormat="dd.MM.yyyy"
                  minDate={new Date('2023-01-01')}
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
                  onChange={(e) => {
                    setFieldValue('comment', e.target.value);
                    console.log('Comment changed to:', e.target.value);
                  }}
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
