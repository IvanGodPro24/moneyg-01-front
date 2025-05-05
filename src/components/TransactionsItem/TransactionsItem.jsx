import { useDispatch } from "react-redux";
import { LuPencil } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import { useState } from "react";

import s from "./TransactionsItem.module.css";
import { deleteTransaction } from "../../redux/transactions/operations";
import TransactionEditForm from "../TransactionEditForm/TransactionEditForm";

const TransactionsItem = ({ id, date, category, comment, sum, type }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteTransaction({ _id: id, type: sum })).unwrap();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
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
        <div className={s.btnContainer}>
          <button
            className={s.edit}
            onClick={handleToggleModal}
            disabled={loading}
          >
            <LuPencil />
          </button>
          {loading ? (
            <div className={s.loader} я>
              <ClipLoader size={25} color="#3498db" />
            </div>
          ) : (
            <button className={s.delete} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>

        {isOpen && (
          <div className={s.modalBackdrop}>
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
