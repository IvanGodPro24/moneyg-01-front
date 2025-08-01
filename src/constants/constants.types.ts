export type NumberOptions = {
  value: number;
  label: string;
};

export type StringOptions = {
  value: string;
  label: string;
};

export type SortOptions = {
  label: string;
  value: Values;
};

export type Values = {
  field: string;
  order: string;
};
