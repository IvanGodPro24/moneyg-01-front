import { useState } from 'react';
import AddTransaction from '../AddTransction/AddTransaction';
import css from './TransactionModalWrapper.module.css';

const TransactionModalWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleToggleModal} className={css.openModalBtn}>
        Add Transaction
      </button>

      {isModalOpen && (
        <div className={css.modalBackdrop}>
          <AddTransaction onClose={handleToggleModal} />
        </div>
      )}
    </div>
  );
};

export default TransactionModalWrapper;
