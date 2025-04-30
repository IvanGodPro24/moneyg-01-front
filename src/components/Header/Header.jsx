import css from "./Header.module.css";
import { useState } from "react";
import icon from "../../img/icons.svg";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLogOutModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.header}>
      <div className={css.logoWrap}>
        <img
          className={css.logoSvg}
          src="/src/assets/logo.svg"
          alt="Money Guard logo"
        />
        <p className={css.logoText}>Money Guard</p>
      </div>
      <div className={css.headerNav}>
        <p className={css.navText}>Name</p>
        <button onClick={openLogOutModal} className={css.buttonExit}>
          <svg width={18} height={18}>
            <use href={`${icon}#icon-exit`}></use>
          </svg>
        </button>
      </div>
      {isModalOpen && (
        <div>
          <p>log out modal is open</p>
        </div>
      )}
    </div>
  );
};

export default Header;
