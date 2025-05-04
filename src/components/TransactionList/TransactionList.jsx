import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CiCircleChevUp } from "react-icons/ci";
import { ClipLoader } from "react-spinners";

import {
  selectIsLoading,
  selectTransactions,
} from "../../redux/transactions/selectors";
import { fetchTransactions } from "../../redux/transactions/operations";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import TransactionCard from "../TransactionCard/TransactionCard";
import useDevice from "../../hooks/useDevice";
import s from "./TransactionList.module.css";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const { isMobile } = useDevice();
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const isLoading = useSelector(selectIsLoading);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

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
    return (
      <div>
        <p className={s.text}>You don't have any transactions yet.</p>
      </div>
    );
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
              <th className={s.th}>Sum</th>
              <th className={s.th}></th>
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
              transactions.map((t) => (
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
    </>
  );
};

export default TransactionList;
