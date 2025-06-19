import { useDispatch } from "react-redux";
import { LuPencil } from "react-icons/lu";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";

import { deleteTransaction } from "../../redux/transactions/operations";
import s from "./TransactionCard.module.css";
import { useState } from "react";
import EditTransaction from "../TransactionForm/EditTransaction/EditTransaction";
import useModal from "../../hooks/useModal";

const TransactionCard = ({ id, date, category, comment, sum, type }) => {
  const dispatch = useDispatch();
  const editModal = useModal();
  const [loading, setLoading] = useState(false);

  const handleToggleModal = () => {
    if (loading) return;
    editModal.toggleModal();
  };

  const handleDelete = async () => {
    if (editModal.isOpen) return;
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
    <li className={`${s.item} ${type === "income" ? s.income : s.expense}`}>
      <p className={s.info}>
        <span className={s.text}>Date</span> {formattedDate}
      </p>
      <p className={s.info}>
        <span className={s.text}>Type</span> {type === "income" ? "+" : "-"}
      </p>
      <p className={s.info}>
        <span className={s.text}>Category</span>
        {category}
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
        {loading ? (
          <div className={s.loader}>
            <ClipLoader size={25} color="#3498db" />
          </div>
        ) : (
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        )}

        <button
          className={s.edit}
          onClick={handleToggleModal}
          disabled={loading}
        >
          <LuPencil width="14" height="14" />
          <span className={s.text}>Edit</span>
        </button>
      </div>

      {editModal.isOpen && (
        <div className={s.modalBackdrop}>
          <EditTransaction
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
    </li>
  );
};

export default TransactionCard;
