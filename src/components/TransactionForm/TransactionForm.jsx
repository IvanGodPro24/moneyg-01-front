import { Formik } from "formik";
import * as Yup from "yup";
import TransactionFormContent from "../TransactionFormContent/TransactionFormContent";

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
      <TransactionFormContent
        onClose={onClose}
        isLoading={isLoading}
        transactionType={transactionType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setTransactionType={setTransactionType}
        edit={edit}
      />
    </Formik>
  );
};

export default TransactionForm;
