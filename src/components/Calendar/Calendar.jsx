import DatePicker from "react-datepicker";
import css from "./Calendar.module.css";
import clsx from "clsx";
import { format, isValid, parseISO } from "date-fns";

const Calendar = ({
  values,
  setFieldValue,
  id,
  isLoading,
  range = false,
  filter = false,
}) => {
  const formatDateOnly = (date) => {
    if (!date) return null;
    return format(date, "yyyy-MM-dd");
  };

  const handleDateChange = (date) => {
    if (range) {
      const [startDate, endDate] = date;
      setFieldValue("dateFrom", formatDateOnly(startDate));
      setFieldValue("dateTo", formatDateOnly(endDate));
    } else {
      setFieldValue("date", formatDateOnly(date));
    }
  };

  const parseDate = (dateValue) => {
    if (!dateValue) return null;
    if (dateValue instanceof Date) return dateValue;
    if (typeof dateValue === "string") {
      const parsed = parseISO(dateValue);
      if (isValid(parsed)) return parsed;

      const fallback = new Date(dateValue);
      return isValid(fallback) ? fallback : null;
    }
    return null;
  };

  const dateFrom = parseDate(values.dateFrom);
  const dateTo = parseDate(values.dateTo);
  const singleDate = parseDate(values.date);

  return (
    <DatePicker
      selected={range ? dateFrom : singleDate}
      startDate={range && dateFrom}
      endDate={range && dateTo}
      onChange={handleDateChange}
      selectsRange={range}
      dateFormat="dd.MM.yyyy"
      minDate={new Date("2025-01-01")}
      maxDate={new Date()}
      className={clsx(css.datePicker, filter && css.filter)}
      calendarClassName={css.calendar}
      popperPlacement="bottom-end"
      disabled={isLoading}
      id={id}
      placeholderText="Select date range"
    />
  );
};

export default Calendar;
