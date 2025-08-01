import { Controller } from "react-hook-form";
import Calendar from "../Calendar/Calendar";
import { DateRangeControllerProps } from "./DateRangeController.types";

const DateRangeController = ({
  control,
  id,
  className,
  icon,
}: DateRangeControllerProps) => {
  return (
    <Controller
      name="dateFrom"
      control={control}
      render={({ field: dateFromField }) => (
        <Controller
          name="dateTo"
          control={control}
          render={({ field: dateToField }) => (
            <label htmlFor={id} className={className}>
              <Calendar
                id={id}
                range={true}
                filter={true}
                onChange={({ dateFrom, dateTo }) => {
                  dateFromField.onChange(dateFrom);
                  dateToField.onChange(dateTo);
                }}
                values={{
                  dateFrom: dateFromField.value,
                  dateTo: dateToField.value,
                  date: "",
                }}
                placeholder="Select date range"
              />

              {icon}
            </label>
          )}
        />
      )}
    />
  );
};

export default DateRangeController;
