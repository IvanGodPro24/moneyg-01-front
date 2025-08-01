export type SummaryType = {
  expenses: {
    byCategory: SummaryCategories;
    total: number;
  };
  income: {
    byCategory: {
      Income: number;
    };
    total: number;
  };
};

export type FetchSummary = {
  month: number | null;
  year: number;
};

export type SummaryCategories = {
  "Main expenses": number;
  Products: number;
  Car: number;
  "Self care": number;
  "Child care": number;
  "Household products": number;
  Education: number;
  Leisure: number;
  "Other expenses": number;
  Entertainment: number;
};

export type SummaryInitState = {
  summary: SummaryType | null;
  loading: boolean;
  error?: string | null;
};

export type SummaryColors = {
  name: string;
  value: number;
};
