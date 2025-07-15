import { Controller } from "react-hook-form";
import Calendar from "../Calendar/Calendar";

const DateRangeController = ({ control, id, className, icon }) => {
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
