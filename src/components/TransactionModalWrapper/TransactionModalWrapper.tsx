import AddTransaction from "../TransactionForm/AddTransaction/AddTransaction";
import css from "./TransactionModalWrapper.module.css";
import icon from "../../img/icons.svg";
import useModal from "../../hooks/useModal";
import { TransactionModalWrapperProps } from "./TransactionModalWrapper.types";

const TransactionModalWrapper = ({
  currentPage,
  setCurrentPage,
}: TransactionModalWrapperProps) => {
  const addModal = useModal();

  const handleToggleModal = () => addModal.toggleModal();

  return (
    <div>
      <button onClick={handleToggleModal} className={css.openModalBtn}>
        <svg className={css.plusTransaction}>
          <use href={`${icon}#icon-sign-plus`}></use>
        </svg>
      </button>

      {addModal.isOpen && (
        <AddTransaction
          onClose={handleToggleModal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TransactionModalWrapper;
