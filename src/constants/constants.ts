import { NumberOptions, SortOptions, StringOptions } from "./constants.types";

export const months: NumberOptions[] = [
  { value: 0, label: "All months" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const perPageOptions: NumberOptions[] = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
];

export const typeOptions: StringOptions[] = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

export const categoriesOptions: StringOptions[] = [
  { value: "Main expenses", label: "Main expenses" },
  { value: "Products", label: "Products" },
  { value: "Car", label: "Car" },
  { value: "Self care", label: "Self care" },
  { value: "Child care", label: "Child care" },
  { value: "Household products", label: "Household products" },
  { value: "Education", label: "Education" },
  { value: "Leisure", label: "Leisure" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Other expenses", label: "Other expenses" },
];

export const sortOptions: SortOptions[] = [
  { label: "Date ↑", value: { field: "date", order: "asc" } },
  { label: "Date ↓", value: { field: "date", order: "desc" } },
  { label: "Type ↑", value: { field: "type", order: "asc" } },
  { label: "Type ↓", value: { field: "type", order: "desc" } },
  { label: "Category ↑", value: { field: "categoryTitle", order: "asc" } },
  { label: "Category ↓", value: { field: "categoryTitle", order: "desc" } },
  { label: "Comment ↑", value: { field: "comment", order: "asc" } },
  { label: "Comment ↓", value: { field: "comment", order: "desc" } },
  { label: "Sum ↑", value: { field: "sum", order: "asc" } },
  { label: "Sum ↓", value: { field: "sum", order: "desc" } },
];

export const currencies: string[] = ["UAH", "USD", "EUR"];
