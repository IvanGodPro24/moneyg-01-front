import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import s from "./TransactionList.module.css";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import { selectTransactions } from "../../redux/transactions/selectors";
import { fetchTransactions } from "../../redux/transactions/operations";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (!transactions || transactions.length === 0) {
    return <p className={s.text}>You don't have any transactions yet.</p>;
  }

  return (
    <>
      <table className={s.table}>
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
        <tbody className={s.tbody}>
          {transactions.map((t) => (
            <TransactionsItem
              key={t._id}
              id={t._id}
              date={t.date}
              category={t.categoryId?.title}
              comment={t.comment}
              sum={t.sum}
              type={t.type}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TransactionList;
