import { useDispatch } from "react-redux";
import { LuPencil } from "react-icons/lu";

import s from "./TransactionsItem.module.css";
import { deleteTransaction } from "../../redux/transactions/operations";

const TransactionsItem = ({ id, date, category, comment, sum, type }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  };

  const typeClassName = type === "+" ? s.income : s.expense;

  return (
    <tr className={s.tr}>
      <td className={s.td}>{date}</td>
      <td className={s.td}>{type}</td>
      <td className={s.td}>{category}</td>
      <td className={s.td}>{comment}</td>
      <td className={`${typeClassName}`}>{sum.toFixed(2)}</td>
      <td className={s.td}>
        <button className={s.edit}>
          <LuPencil />
        </button>
        <button className={s.delete} onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
