import { LuCopy, LuPencil, LuRepeat } from "react-icons/lu";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import s from "./TransactionsItem.module.css";
import EditTransaction from "../TransactionForm/EditTransaction/EditTransaction";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import clsx from "clsx";
import { IoCheckmark } from "react-icons/io5";

const TransactionsItem = ({
  id,
  date,
  category,
  comment,
  sum,
  type,
  copiedId,
  formattedDate,
  onToggle,
  onDelete,
  onRepeat,
  onCopy,
}) => {
  const repeatModal = useModal();
  const editModal = useModal();
  const [loading, setLoading] = useState(false);

  return (
    <tr className={s.tr}>
      <td className={s.td}>{formattedDate}</td>
      <td className={s.td}>{type === "income" ? "+" : "-"}</td>
      <td className={s.td}>{category}</td>
      <td className={s.td}>{comment || "-"}</td>
      <td className={clsx(type === "income" ? s.income : s.expense)}>
        {sum.toFixed(2)}
      </td>
      <td>
        <div className={s.btnContainer}>
          <button className={s.edit} onClick={onCopy} disabled={loading}>
            {copiedId === id ? <IoCheckmark /> : <LuCopy />}
          </button>
          <button
            className={s.edit}
            onClick={() => onToggle(repeatModal)}
            disabled={loading}
          >
            <LuRepeat />
          </button>
          <button
            className={s.edit}
            onClick={() => onToggle(editModal)}
            disabled={loading}
          >
            <LuPencil />
          </button>
          {loading ? (
            <div className={s.loader}>
              <ClipLoader size={25} color="#3498db" />
            </div>
          ) : (
            <button className="delete" onClick={() => onDelete(id, setLoading)}>
              Delete
            </button>
          )}
        </div>

        {editModal.isOpen && (
          <EditTransaction
            onClose={() => onToggle(editModal)}
            _id={id}
            date={date}
            category={category}
            comment={comment}
            sum={sum}
            type={type}
          />
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
      </td>
    </tr>
  );
};

export default TransactionsItem;
