import { useState } from 'react';
import AddTransaction from '../AddTransaction/AddTransaction';
import css from './TransactionModalWrapper.module.css';
import icon from '../../img/icons.svg';

const TransactionModalWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleToggleModal} className={css.openModalBtn}>
        <svg className={css.plusTransaction}>
          <use href={`${icon}#icon-sign-plus`}></use>
        </svg>
      </button>

      {isModalOpen && (
        <div className="modalBackdrop">
          <AddTransaction onClose={handleToggleModal} />
        </div>
      )}
    </div>
  );
};

export default TransactionModalWrapper;
