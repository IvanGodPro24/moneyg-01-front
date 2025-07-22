import Logo from "../Logo/Logo";
import s from "./Modal.module.css";
import icon from "../../img/icons.svg";
import CancelButton from "../Buttons/CancelButton";
import AddButton from "../Buttons/AddButton";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";

const Modal = ({ isOpen, isLoading, onConfirm, onCancel, text, confirm }) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => onCancel();

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className={clsx("backdrop", s.container)}
      onClick={handleBackdropClick}
    >
      <div className={s.modal} onClick={stopPropagation}>
        <button onClick={onCancel} className="closeButton">
          <svg className="closeSvg" width="16" height="16">
            <use href={`${icon}#icon-close`}></use>
          </svg>
        </button>

        <div className={s.logo}>
          <Logo width={28} height={35} />
          <h2 className={s.title}>Money Guard</h2>
        </div>

        <p className={s.text}>{text}</p>

        <div className={clsx("btn-container", "mt-0")}>
          {isLoading ? (
            <ClipLoader size={50} color="#3498db" />
          ) : (
            <AddButton onClick={onConfirm}>{confirm}</AddButton>
          )}
          <CancelButton onClose={onCancel}>cancel</CancelButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
