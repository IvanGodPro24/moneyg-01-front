import Logo from "./Logo/Logo";
import s from "./LogoutModel.module.css";

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
