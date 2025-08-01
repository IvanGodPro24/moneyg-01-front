import s from "./HomeTab.module.css";
import icons from "../../img/icons.svg";
import { useState } from "react";
import TransactionList from "../TransactionList/TransactionList";
import TransactionModalWrapper from "../TransactionModalWrapper/TransactionModalWrapper";
import TransactionFilter from "../TransactionFilter/TransactionFilter";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Filters } from "../../redux/transactions/transactions.types";

const HomeTab = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowFilter, setIsShowFilter] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    type: null,
    categoryTitle: null,
    minSum: null,
    maxSum: null,
    dateFrom: null,
    dateTo: null,
    comment: null,
  });

  const toggleIsShowFilter = () => setIsShowFilter((prev) => !prev);

  const onApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <>
      <title>Home</title>

      <div className={s.container}>
        <button
          onClick={toggleIsShowFilter}
          className={clsx(s.showFilter, isShowFilter && s.margin)}
        >
          {isShowFilter ? "Hide Filters" : "Show Filters"}
          <svg
            width="14"
            height="14"
            className={clsx(s.icon, isShowFilter && s.rotated)}
          >
            <use href={`${icons}#icon-arrow-down`} />
          </svg>
        </button>

        <AnimatePresence>
          {isShowFilter && (
            <motion.div
              className={s.filterContainer}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <TransactionFilter
                filters={filters}
                onApplyFilters={onApplyFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <TransactionList
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filters={filters}
        />
        <TransactionModalWrapper
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default HomeTab;
