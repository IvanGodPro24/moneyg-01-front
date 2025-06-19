import { useDispatch } from "react-redux";
import { LuPencil } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import { useState } from "react";

import s from "./TransactionsItem.module.css";
import { deleteTransaction } from "../../redux/transactions/operations";
import EditTransaction from "../TransactionForm/EditTransaction/EditTransaction";
import useModal from "../../hooks/useModal";

const TransactionsItem = ({ id, date, category, comment, sum, type }) => {
  const dispatch = useDispatch();
  const editModal = useModal();
  const [loading, setLoading] = useState(false);

  const handleToggleModal = () => editModal.toggleModal();

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
            <div className={s.loader}>
              <ClipLoader size={25} color="#3498db" />
            </div>
          ) : (
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>

        {editModal.isOpen && (
          <EditTransaction
            onClose={handleToggleModal}
            _id={id}
            date={date}
            category={category}
            comment={comment}
            sum={sum}
            type={type}
          />
        )}
      </td>
    </tr>
  );
};

export default TransactionsItem;
