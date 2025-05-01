import { useDispatch } from "react-redux";
import { LuPencil } from "react-icons/lu";

import s from "./TransactionsItem.module.css";
import { deleteTransaction } from "../../redux/transactions/operations";
import { format } from "date-fns";
import { useState } from "react";
import TransactionEditForm from "../TransactionEditForm/TransactionEditForm";

const TransactionsItem = ({ id, date, category, comment, sum, type }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransaction({ _id: id, type: sum })).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  };

  const formattedDate = format(new Date(date), "dd.MM.yy");

  return (
    <tr className={s.tr}>
      <td className={s.td}>{formattedDate}</td>
      <td className={s.td}>{type === "income" ? "+" : "-"}</td>
      <td className={s.td}>{category}</td>
      <td className={s.td}>{comment || "-"}</td>
      <td className={`${type === "income" ? s.income : s.expense}`}>
        {sum.toFixed(2)}
      </td>
      <td>
        <button className={s.edit} onClick={handleToggleModal}>
          <LuPencil />
        </button>
        <button className={s.delete} onClick={handleDelete}>
          Delete
        </button>

        {isOpen && (
          <div className="modalBackdrop">
            <TransactionEditForm
              onClose={handleToggleModal}
              _id={id}
              date={date}
              category={category}
              comment={comment}
              sum={sum}
              type={type}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TransactionsItem;
