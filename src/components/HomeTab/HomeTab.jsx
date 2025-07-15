import s from "./HomeTab.module.css";
import icons from "../../img/icons.svg";
import { useState } from "react";
import TransactionList from "../TransactionList/TransactionList";
import TransactionModalWrapper from "../TransactionModalWrapper/TransactionModalWrapper";
import TransactionFilter from "../TransactionFilter/TransactionFilter";

const HomeTab = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowFilter, setIsShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    type: null,
    categoryTitle: null,
    minSum: null,
    maxSum: null,
    dateFrom: null,
    dateTo: null,
    comment: null,
  });

  const toggleIsShowFilter = () => setIsShowFilter((prev) => !prev);

  const onApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <button onClick={toggleIsShowFilter} className={s.showFilter}>
        {isShowFilter ? "Hide Filters" : "Show Filters"}
        <svg
          width="14"
          height="14"
          className={`${s.icon} ${isShowFilter && s.rotated}`}
        >
          <use href={`${icons}#icon-arrow-down`} />
        </svg>
      </button>

      <div className={`${s.filterContainer} ${isShowFilter && s.show}`}>
        <TransactionFilter filters={filters} onApplyFilters={onApplyFilters} />
      </div>

      <TransactionList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filters={filters}
      />
      <TransactionModalWrapper />
    </div>
  );
};

export default HomeTab;
