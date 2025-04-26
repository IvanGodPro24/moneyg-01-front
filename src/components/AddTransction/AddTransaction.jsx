import css from './AddTransaction.module.css';
import TransactionToggle from '../TransactionToggle/TransactionToggle.jsx';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import icon from '../../img/icons.svg';

const categories = [
  'Products',
  'Health',
  'Transport',
  'Alcohol',
  'Entertainment',
  'Housing',
  'Technique',
  'Communal',
  'Sports',
  'Education',
  'Other',
];

const AddTransaction = ({ onClose }) => {
  const [transactionType, setTransactionType] = useState('expense');

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const initialValues = {
    sum: '',
    comment: '',
    date: new Date(),
    category: '',
  };

  const validationSchema = Yup.object({
    sum: Yup.number().typeError('Must be a number').positive('Must be positive').required('Sum is required'),
    comment: Yup.string().max(50, 'Comment is too long'),
    date: Yup.date().required('Date is required'),
    category: Yup.string().when([], {
      is: () => transactionType === 'expense',
      then: (schema) => schema.required('Category is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const onSubmit = (values, { resetForm }) => {
    const finalData = {
      ...values,
      type: transactionType,
    };

    console.log('Submitted data:', finalData);
    resetForm();
    onClose();
  };

  const handleToggle = (selectedType) => {
    setTransactionType(selectedType);
  };

  return (
    <div className={`${css.AddModal} ${transactionType !== 'expense' && css.smallWindow}`}>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.closeSvg} width='16' height='16'>
          <use href={`${icon}#icon-close`}></use>
        </svg>
      </button>
      <h2 className={`${css.AddText} ${transactionType === 'expense' && css.expenseMobileText}`}>Add transaction</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <div
              className={`${css.transactionTypeContainer} ${
                transactionType !== 'income' ? css.expenseMobileMargin : ''
              }`}
            >
              <TransactionToggle onChange={handleToggle} />
            </div>

            {transactionType === 'expense' && (
              <div className={css.selectWrapper}>
                <div
                  className={`${css.dropdown} ${isDropdownOpen ? css.active : ''}`}
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <span className={css.selected}>{selectedCategory || 'Select a category'}</span>
                  <span className={css.arrow}>
                    <svg width='18' height='9'>
                      <use href={`${icon}#icon-arrow-down`}></use>
                    </svg>
                  </span>

                  {isDropdownOpen && (
                    <ul className={css.options}>
                      {categories.map((cat) => (
                        <li
                          key={cat}
                          className={`${css.option} ${selectedCategory === cat ? css.activeOption : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(cat);
                            setFieldValue('category', cat);
                            setDropdownOpen(false);
                          }}
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <div className={css.transactionInfoContainer}>
              <div className={css.sumField}>
                <Field type='text' id='sum' name='sum' placeholder='0.00' className={css.addSumTransaction} />
                <ErrorMessage name='sum' component='div' className={css.errorText} />
              </div>

              <div className={css.datePickerWrapper}>
                <DatePicker
                  selected={values.date}
                  onChange={(date) => setFieldValue('date', date)}
                  dateFormat='dd.MM.yyyy'
                  minDate={new Date('2025-01-01')}
                  maxDate={new Date()}
                  className={css.datePicker}
                />
                <svg className={css.celndar} width='24' height='24'>
                  <use href={`${icon}#icon-date-range`}></use>
                </svg>
                <ErrorMessage name='date' component='div' className={css.errorText} />
              </div>

              <div>
                <Field
                  type='text'
                  id='comment'
                  name='comment'
                  placeholder='Comment'
                  className={css.addCommentTransaction}
                />
                <ErrorMessage name='comment' component='div' className={css.errorText} />
              </div>
            </div>

            <div className={css.addTransactionButtonContainer}>
              <button className={css.addButton} type='submit'>
                ADD
              </button>
              <button className={css.cencelButton} type='button' onClick={onClose}>
                CANCEL
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTransaction;
