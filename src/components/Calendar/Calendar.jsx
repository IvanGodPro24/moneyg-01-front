import DatePicker from "react-datepicker";
import css from "./Calendar.module.css";
import clsx from "clsx";
import { format, isValid, parseISO } from "date-fns";

const Calendar = ({
  values,
  setFieldValue,
  onChange,
  id,
  isLoading,
  range = false,
  filter = false,
  placeholder,
}) => {
  const formatDateOnly = (date) => {
    if (!date) return null;
    return format(date, "yyyy-MM-dd");
  };

  const handleDateChange = (date) => {
    if (range) {
      const [startDate, endDate] = date;
      onChange({
        dateFrom: formatDateOnly(startDate),
        dateTo: formatDateOnly(endDate),
      });
    } else {
      setFieldValue("date", formatDateOnly(date));
    }
  };

  const parseDate = (d) => {
    if (!d) return null;
    const parsed = typeof d === "string" ? parseISO(d) : d;
    return isValid(parsed) ? parsed : null;
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
      placeholderText={placeholder}
    />
  );
};

export default Calendar;
