export type CalendarProps = {
  values: Values;
  setFieldValue?: (field: string, value: any) => void;
  onChange?: (value: {
    dateFrom?: string | null;
    dateTo?: string | null;
  }) => void;
  id?: string;
  isLoading?: boolean;
  range?: boolean;
  filter?: boolean;
  placeholder?: string;
};

export type Values = {
  category?: string;
  date: string | Date | null;
  dateFrom: string | Date | null;
  dateTo: string | Date | null;
};
