import { useDispatch } from "react-redux";
import { LuPencil } from "react-icons/lu";
import { format } from "date-fns";

import { deleteTransaction } from "../../redux/transactions/operations";
import s from "./TransactionCard.module.css";

const TransactionCard = ({ id, date, category, comment, sum, type }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  };

  const formattedDate = format(new Date(date), "dd.MM.yy");

  return (
    <li className={`${s.item} ${type === "income" ? s.income : s.expense}`}>
      <p className={s.info}>
        <span className={s.text}>Date</span> {formattedDate}
      </p>
      <p className={s.info}>
        <span className={s.text}>Type</span> {type === "income" ? "+" : "-"}
      </p>
      <p className={s.info}>
        <span className={s.text}>Category</span>
        {category || ""}
      </p>
      <p className={s.info}>
        <span className={s.text}>Comment</span>
        {comment || "-"}
      </p>
      <p className={s.info}>
        <span className={s.text}>Sum</span>
        {sum}
      </p>
      <div className={s.btn}>
        <button className={s.delete} onClick={handleDelete}>
          Delete
        </button>
        <button className={s.edit}>
          <LuPencil width="14" height="14" />
          <span className={s.text}>Edit</span>
        </button>
      </div>
    </li>
  );
};

export default TransactionCard;
