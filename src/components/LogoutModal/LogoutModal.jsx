import Logo from "../Logo/Logo";
import s from "./LogoutModel.module.css";
import icon from "../../img/icons.svg";

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onCancel();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={s.container} onClick={handleBackdropClick}>
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

        <p className={s.text}>Are you sure you want to exit?</p>
        <button className={s.btn} onClick={onConfirm}>
          Logout
        </button>
        <button className={s.btn} onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
