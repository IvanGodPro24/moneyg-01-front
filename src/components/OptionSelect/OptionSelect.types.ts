import { PropsValue, SingleValue } from "react-select";
import {
  NumberOptions,
  SortOptions,
  StringOptions,
} from "../../constants/constants.types";

export type OptionSelectProps<T> = {
  name?: string;
  options: T[];
  placeholder?: string;
  onChange: (selectedOption: SingleValue<T> | null) => void;
  value?: PropsValue<T>;
  isClearable?: boolean;
  isDisabled?: boolean;
};

export type OptionType = NumberOptions | StringOptions | SortOptions;
