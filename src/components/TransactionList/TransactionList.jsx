import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CiCircleChevUp } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";

import {
  selectHasNextPage,
  selectHasPreviousPage,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectTransactions,
} from "../../redux/transactions/selectors";
import { fetchTransactions } from "../../redux/transactions/operations";
import { setPerPage } from "../../redux/transactions/slice";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import TransactionCard from "../TransactionCard/TransactionCard";
import useDevice from "../../hooks/useDevice";
import s from "./TransactionList.module.css";
import Sum from "../Sum/Sum";
import Pagination from "../Pagination/Pagination";
import EmptyTransaction from "../EmptyTransaction/EmptyTransaction";

const TransactionList = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const hasNextPage = useSelector(selectHasNextPage);
  const hasPreviousPage = useSelector(selectHasPreviousPage);

  const [currentPage, setCurrentPage] = useState(1);

  const { isMobile } = useDevice();
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const [isFiltered, setIsFiltered] = useState(false);
  const [sortedTransactions, setSortedTransactions] = useState(
    transactions || []
  );

  const toggleFiltered = () => setIsFiltered((prev) => !prev);

  const handlePerPageChange = (selectedOption) => {
    const newPerPage = selectedOption.value;

    dispatch(setPerPage(newPerPage));
    dispatch(fetchTransactions({ page: 1, perPage: newPerPage }));
    setCurrentPage(1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchTransactions({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

  useEffect(() => {
    const sortedData = [...(transactions || [])].sort((a, b) =>
      isFiltered ? a.sum - b.sum : b.sum - a.sum
    );
    setSortedTransactions(sortedData);
  }, [isFiltered, transactions]);

  useEffect(() => {
    setSortedTransactions(transactions || []);
  }, [transactions]);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (!isLoading && (!transactions || transactions.length === 0)) {
    return <EmptyTransaction />;
  }

  return (
    <>
      <div className={s.tableWrapper}>
        <table className={s.tableHead}>
          <thead className={s.thead}>
            <tr>
              <th className={s.th}>Date</th>
              <th className={s.th}>Type</th>
              <th className={s.th}>Category</th>
              <th className={s.th}>Comment</th>
              <th className={s.th}>
                <Sum isFiltered={isFiltered} toggleFiltered={toggleFiltered} />
              </th>
              <th className={s.th}>
                <button
                  onClick={() => setSortedTransactions(transactions || [])}
                >
                  <TfiReload className="icon" />
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className={s.scrollBody}>
        <table className={s.tableBody}>
          <tbody className={s.tbody}>
            {isLoading ? (
              <tr>
                <td>
                  <div className={s.loader}>
                    <ClipLoader size={100} color="#3498db" />
                  </div>
                </td>
              </tr>
            ) : (
              sortedTransactions.map((t) => (
                <TransactionsItem
                  key={t._id}
                  id={t._id}
                  date={t.date}
                  category={t.categoryId.title}
                  comment={t.comment}
                  sum={t.sum}
                  type={t.type}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {isMobile && isLoading ? (
        <div className={s.loader}>
          <ClipLoader size={120} color="#3498db" />
        </div>
      ) : (
        <ul className={s.list}>
          {transactions.map((t) => (
            <TransactionCard
              key={t._id}
              id={t._id}
              date={t.date}
              category={t.categoryId.title}
              comment={t.comment}
              sum={t.sum}
              type={t.type}
            />
          ))}
        </ul>
      )}

      {isMobile && (
        <button
          className={`${s.scrollTopBtn} ${showScrollBtn ? s.visible : ""}`}
          onClick={scrollToTop}
        >
          <CiCircleChevUp className={s.UpBtm} />
        </button>
      )}

      <Pagination
        currentPage={page}
        perPage={perPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPerPageChange={handlePerPageChange}
      />
    </>
  );
};

export default TransactionList;
