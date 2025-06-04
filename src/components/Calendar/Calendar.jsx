import DatePicker from "react-datepicker";
import css from "./Calendar.module.css";

const Calendar = ({ values, setFieldValue, isLoading, format = false }) => {
  return (
    <DatePicker
      selected={values.date}
      onChange={(date) => {
        setFieldValue("date", format ? date.toISOString() : date);
      }}
      dateFormat="dd.MM.yyyy"
      minDate={new Date("2025-01-01")}
      maxDate={new Date()}
      className={css.datePicker}
      calendarClassName={css.calendar}
      popperPlacement="bottom-end"
      disabled={isLoading}
    />
  );
};

export default Calendar;
