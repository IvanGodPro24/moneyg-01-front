import React, { useState } from "react";
import { useDispatch } from "react-redux";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const now = new Date();

  const [month, setMont] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 5 }, (_, idx) => now.getFullYear() - idx);

  return (
    <div>
      <select
        value={month}
        // onChange={handleMonthChange}
      >
        {months.map((name, index) => (
          <option key={index} value={index + 1}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={year}
        // onChange={handleYearChange}
      >
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatisticsDashboard;
