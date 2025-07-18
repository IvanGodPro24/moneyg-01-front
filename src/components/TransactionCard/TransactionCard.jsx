import { LuPencil, LuRepeat } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import s from "./TransactionCard.module.css";
import { useState } from "react";
import EditTransaction from "../TransactionForm/EditTransaction/EditTransaction";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";

const TransactionCard = ({
  id,
  date,
  category,
  comment,
  sum,
  type,
  formattedDate,
  onToggle,
  onDelete,
  onRepeat,
}) => {
  const repeatModal = useModal();
  const editModal = useModal();
  const [loading, setLoading] = useState(false);

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
        <span className={s.comment}>{comment || "-"}</span>
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
          <button className="delete" onClick={() => onDelete(id, setLoading)}>
            Delete
          </button>
        )}

        <button
          className={s.edit}
          onClick={() => onToggle(editModal)}
          disabled={loading}
        >
          <LuPencil width="14" height="14" />
          <span className={s.text}>Edit</span>
        </button>

        <button
          className={s.edit}
          onClick={() => onToggle(repeatModal)}
          disabled={loading}
        >
          <LuRepeat />
          <span className={s.text}>Repeat</span>
        </button>
      </div>

      {editModal.isOpen && (
        <div className={s.modalBackdrop}>
          <EditTransaction
            onClose={() => onToggle(editModal)}
            _id={id}
            date={date}
            category={category}
            comment={comment}
            sum={sum}
            type={type}
          />
        </div>
      )}

      <Modal
        isOpen={repeatModal.isOpen}
        onConfirm={() => {
          onRepeat();
          repeatModal.closeModal();
        }}
        onCancel={repeatModal.closeModal}
        text="Do you want to repeat this transaction?"
        confirm="repeat"
      />
    </li>
  );
};

export default TransactionCard;
