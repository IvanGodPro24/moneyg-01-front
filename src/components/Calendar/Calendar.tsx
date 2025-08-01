import DatePicker from "react-datepicker";
import css from "./Calendar.module.css";
import clsx from "clsx";
import { format, isValid, parseISO } from "date-fns";
import { CalendarProps } from "./Calendar.types";

const Calendar = ({
  values,
  setFieldValue,
  onChange,
  id,
  isLoading,
  range = false,
  filter = false,
  placeholder,
}: CalendarProps) => {
  const formatDateOnly = (date: Date) => {
    if (!date) return null;
    return format(date, "yyyy-MM-dd");
  };

  const handleDateChange = (date: Date | [Date | null, Date | null]) => {
    if (Array.isArray(date) && range) {
      const [startDate, endDate] = date;
      if (onChange) {
        onChange({
          dateFrom: formatDateOnly(startDate as Date),
          dateTo: formatDateOnly(endDate as Date),
        });
      }
    } else {
      setFieldValue && setFieldValue("date", formatDateOnly(date as Date));
    }
  };

  const parseDate = (d: string | Date | null) => {
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
      startDate={range ? dateFrom : undefined}
      endDate={range ? dateTo : undefined}
      onChange={handleDateChange}
      selectsRange={range as any}
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
