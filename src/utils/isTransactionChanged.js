export const isTransactionChanged = (initialValues, currentValues) =>
  initialValues.sum !== currentValues.sum ||
  initialValues.comment !== currentValues.comment ||
  initialValues.category !== currentValues.category ||
  new Date(initialValues.date).toISOString() !==
    currentValues.date.toISOString();
