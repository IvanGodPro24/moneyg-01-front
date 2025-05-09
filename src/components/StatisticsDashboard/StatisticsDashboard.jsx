import Select from "react-select";

import styles from "./StatisticsDashboard.module.css";

const months = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    borderRadius: "8px",
    border: state.isFocused
      ? "1px solid rgba(255, 255, 255, 1)"
      : "1px solid rgba(255, 255, 255, 0.6)",
    boxShadow: "none",
    height: "50px",
    width: "100%",
    cursor: "pointer",
    padding: "0 20px",
    transition: "all 0.3s",
    "&:hover": {
      border: "1px solid rgba(255, 255, 255, 1)",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
    textAlign: "left",
    fontWeight: "500",
    margin: 0,
    fontSize: "16px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#bdbdbd",
  }),
  menu: (provided) => ({
    ...provided,
    background: `linear-gradient(0deg, 
      rgba(83, 61, 186, 1) 0%, 
      rgba(80, 48, 154, 1) 43.14%, 
      rgba(106, 70, 165, 1) 73.27%, 
      rgba(133, 93, 175, 1) 120.03%);`,
    borderRadius: "8px",
    overflow: "hidden",
    top: 42,
  }),
  menuList: () => ({
    paddingTop: "10px",
    paddingBottom: "10px",
    maxHeight: "160px",
    overflowY: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgba(255, 255, 255, 0.1);"
      : state.isFocused
      ? "rgba(255, 255, 255, 0.2)"
      : "transparent",
    color: state.isSelected ? "rgba(255, 134, 141, 1);" : "#fff",
    cursor: "pointer",
    padding: "4px 20px",
    fontSize: 16,
    textAlign: "left",
    transition: "all 0.3s",
    "&:hover": {
      color: "rgba(255, 134, 141, 1)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    color: "#fff",
    transform: state.isOpen ? "rotate(180deg)" : "rotate(0deg)",
  }),
};

const StatisticsDashboard = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  const now = new Date();

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = now.getFullYear() - i;
    return { value: year, label: year.toString() };
  });

  return (
    <div className={styles.dashboard}>
      <Select
        styles={customStyles}
        className={styles.select}
        options={months}
        value={selectedMonth}
        onChange={onMonthChange}
      />
      <Select
        styles={customStyles}
        className={styles.select}
        options={years}
        value={selectedYear}
        onChange={onYearChange}
      />
    </div>
  );
};

export default StatisticsDashboard;
