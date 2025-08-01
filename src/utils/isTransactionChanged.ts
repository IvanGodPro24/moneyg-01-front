import { TransactionType } from "../redux/transactions/transactions.types";
import { isTransactionChangedType } from "./isTransactionChanged.types";

export const isTransactionChanged = (
  initialValues: isTransactionChangedType,
  currentValues: TransactionType
) =>
  Number(initialValues.sum) !== Number(currentValues.sum) ||
  initialValues.comment !== currentValues.comment ||
  initialValues.category !== currentValues.category ||
  new Date(initialValues.date).toISOString() !==
    new Date(currentValues.date).toISOString();
