import Logo from "./Logo/Logo";
import s from "./LogoutModel.module.css";

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={s.container}>
      <div className={s.modal}>
        <div className={s.logo}>
          <Logo />
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
